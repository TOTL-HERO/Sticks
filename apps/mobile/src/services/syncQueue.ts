import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoundStore } from '../stores/roundStore';
import { apiFetch } from '../lib/api';

// --- Types ---
export interface SyncOperation {
  id: string;
  type: 'hole' | 'shot-batch';
  payload: unknown;
  attempts: number;
  lastAttempt: number | null;
  status: 'pending' | 'in-flight' | 'failed';
}
export interface SyncQueueState {
  operations: SyncOperation[];
  maxRetries: number;
  baseDelayMs: number;
  maxDelayMs: number;
  jitterFactor: number;
}
interface ConflictLogEntry {
  holeNumber: number;
  localValues: unknown;
  serverValues: unknown;
  timestamp: string;
  roundId: string;
}
const SYNC_QUEUE_KEY = 'sync-queue-state';
const SYNC_CONFLICTS_KEY = 'sync-conflicts';
const MAX_RETRIES = 10;
const BASE_DELAY_MS = 1000;
const MAX_DELAY_MS = 60000;
const JITTER_FACTOR = 0.25;

export function getBackoffDelay(
  attempt: number,
  base: number = BASE_DELAY_MS,
  max: number = MAX_DELAY_MS,
  jitter: number = JITTER_FACTOR,
): number {
  const exponential = Math.min(base * Math.pow(2, attempt), max);
  const jitterRange = exponential * jitter;
  return exponential + (Math.random() * 2 - 1) * jitterRange;
}

let queueState: SyncQueueState = {
  operations: [], maxRetries: MAX_RETRIES,
  baseDelayMs: BASE_DELAY_MS, maxDelayMs: MAX_DELAY_MS, jitterFactor: JITTER_FACTOR,
};
let unsubscribe: (() => void) | null = null;
let isSyncingHoles = false;
let isSyncingShots = false;

async function persistQueueState(): Promise<void> {
  try { await AsyncStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(queueState)); } catch { /* noop */ }
}
async function loadQueueState(): Promise<void> {
  try {
    const raw = await AsyncStorage.getItem(SYNC_QUEUE_KEY);
    if (raw) { const parsed = JSON.parse(raw) as SyncQueueState; queueState = { ...queueState, ...parsed }; }
  } catch { /* noop */ }
}
async function logConflict(entry: ConflictLogEntry): Promise<void> {
  try {
    const raw = await AsyncStorage.getItem(SYNC_CONFLICTS_KEY);
    const existing: ConflictLogEntry[] = raw ? JSON.parse(raw) : [];
    existing.push(entry);
    await AsyncStorage.setItem(SYNC_CONFLICTS_KEY, JSON.stringify(existing));
  } catch { /* noop */ }
}
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function syncPendingHoles(): Promise<void> {
  if (isSyncingHoles) return;
  isSyncingHoles = true;
  try {
    const { activeRound, markHoleSynced, setSyncStatus } = useRoundStore.getState();
    if (!activeRound) return;
    const pending = activeRound.holes.filter((h) => !h.synced && h.strokes > 0);
    if (pending.length === 0) {
      if (activeRound.shotPoints.filter((sp) => !sp.synced).length === 0) setSyncStatus('synced');
      return;
    }
    setSyncStatus('pending');
    const sorted = [...pending].sort((a, b) => a.holeNumber - b.holeNumber);
    for (const hole of sorted) {
      let op = queueState.operations.find(
        (o) => o.type === 'hole' && (o.payload as any)?.holeNumber === hole.holeNumber,
      );
      if (!op) {
        op = {
          id: `hole-${activeRound.id}-${hole.holeNumber}-${Date.now()}`,
          type: 'hole',
          payload: { roundId: activeRound.id, holeNumber: hole.holeNumber, strokes: hole.strokes, putts: hole.putts, penalties: hole.penalties, par: hole.par, gpsTimestamp: hole.gpsTimestamp },
          attempts: 0, lastAttempt: null, status: 'pending',
        };
        queueState.operations.push(op);
      }
      if (op.status === 'failed') continue;
      op.status = 'in-flight';
      op.attempts += 1;
      op.lastAttempt = Date.now();
      try {
        await apiFetch(`/rounds/${activeRound.id}/holes/${hole.holeNumber}`, {
          method: 'PUT',
          body: JSON.stringify({ strokes: hole.strokes, putts: hole.putts, penalties: hole.penalties, par: hole.par, gpsTimestamp: hole.gpsTimestamp }),
        });
        markHoleSynced(hole.holeNumber);
        queueState.operations = queueState.operations.filter((o) => o.id !== op!.id);
      } catch (err: any) {
        const is409 = err?.message?.includes('409');
        if (is409) {
          try {
            await apiFetch(`/rounds/${activeRound.id}/holes/${hole.holeNumber}`, {
              method: 'PUT', headers: { 'x-force': 'true' },
              body: JSON.stringify({ strokes: hole.strokes, putts: hole.putts, penalties: hole.penalties, par: hole.par, gpsTimestamp: hole.gpsTimestamp }),
            });
            markHoleSynced(hole.holeNumber);
            queueState.operations = queueState.operations.filter((o) => o.id !== op!.id);
            await logConflict({ holeNumber: hole.holeNumber, localValues: { strokes: hole.strokes, putts: hole.putts, penalties: hole.penalties }, serverValues: null, timestamp: new Date().toISOString(), roundId: activeRound.id });
          } catch { op.status = 'pending'; }
        } else if (op.attempts >= MAX_RETRIES) {
          op.status = 'failed';
        } else {
          op.status = 'pending';
          await sleep(getBackoffDelay(op.attempts - 1));
        }
      }
    }
    await persistQueueState();
  } finally { isSyncingHoles = false; }
}

async function syncPendingShots(): Promise<void> {
  if (isSyncingShots) return;
  isSyncingShots = true;
  try {
    const { activeRound, markShotsSynced, setSyncStatus } = useRoundStore.getState();
    if (!activeRound) return;
    const pending = activeRound.shotPoints.filter((sp) => !sp.synced);
    if (pending.length === 0) return;
    setSyncStatus('pending');
    const sorted = [...pending].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    const payload = { shots: sorted.map((sp) => ({ id: sp.id, holeNumber: sp.holeNumber, shotNumber: sp.shotNumber, startLatitude: sp.startLatitude, startLongitude: sp.startLongitude, endLatitude: sp.endLatitude, endLongitude: sp.endLongitude, timestamp: sp.timestamp, eventType: sp.eventType, accuracy: sp.accuracy, altitude: sp.altitude })) };
    let op = queueState.operations.find((o) => o.type === 'shot-batch' && o.status !== 'failed');
    if (!op) {
      op = { id: `shot-batch-${activeRound.id}-${Date.now()}`, type: 'shot-batch', payload, attempts: 0, lastAttempt: null, status: 'pending' };
      queueState.operations.push(op);
    }
    if (op.status === 'failed') return;
    op.status = 'in-flight';
    op.attempts += 1;
    op.lastAttempt = Date.now();
    try {
      await apiFetch(`/rounds/${activeRound.id}/shots`, { method: 'POST', body: JSON.stringify(payload) });
      markShotsSynced(sorted.map((sp) => sp.id));
      queueState.operations = queueState.operations.filter((o) => o.id !== op!.id);
    } catch {
      if (op.attempts >= MAX_RETRIES) { op.status = 'failed'; }
      else { op.status = 'pending'; await sleep(getBackoffDelay(op.attempts - 1)); }
    }
    await persistQueueState();
  } finally { isSyncingShots = false; }
}

function handleNetworkChange(state: NetInfoState): void {
  const { activeRound, setSyncStatus } = useRoundStore.getState();
  if (!activeRound) return;
  if (state.isConnected && state.isInternetReachable !== false) {
    syncPendingHoles();
    syncPendingShots();
  } else { setSyncStatus('offline'); }
}

export async function startSyncQueue(): Promise<void> {
  if (unsubscribe) return;
  await loadQueueState();
  unsubscribe = NetInfo.addEventListener(handleNetworkChange);
  const netState = await NetInfo.fetch();
  if (netState.isConnected && netState.isInternetReachable !== false) {
    syncPendingHoles();
    syncPendingShots();
  }
}
export function stopSyncQueue(): void {
  if (unsubscribe) { unsubscribe(); unsubscribe = null; }
}
export function flushSyncQueue(): void {
  syncPendingHoles();
  syncPendingShots();
}
export function getQueueState(): SyncQueueState { return queueState; }
export { syncPendingHoles, syncPendingShots };
