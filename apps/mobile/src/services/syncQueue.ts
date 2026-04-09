import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import { useRoundStore } from '../stores/roundStore';
import { apiFetch } from '../lib/api';

let unsubscribe: (() => void) | null = null;
let isSyncing = false;

async function syncPendingHoles(): Promise<void> {
  if (isSyncing) return;
  isSyncing = true;

  try {
    const { activeRound, markHoleSynced, setSyncStatus } =
      useRoundStore.getState();
    if (!activeRound) {
      isSyncing = false;
      return;
    }

    const pending = activeRound.holes.filter(
      (h) => !h.synced && h.strokes > 0,
    );
    if (pending.length === 0) {
      setSyncStatus('synced');
      isSyncing = false;
      return;
    }

    setSyncStatus('pending');

    for (const hole of pending) {
      try {
        await apiFetch(
          `/rounds/${activeRound.id}/holes/${hole.holeNumber}`,
          {
            method: 'PUT',
            body: JSON.stringify({
              strokes: hole.strokes,
              putts: hole.putts,
              penalties: hole.penalties,
              par: hole.par,
              gpsTimestamp: hole.gpsTimestamp,
            }),
          },
        );
        markHoleSynced(hole.holeNumber);
      } catch {
        // If a single hole fails, keep going with the rest
      }
    }
  } finally {
    isSyncing = false;
  }
}

function handleNetworkChange(state: NetInfoState): void {
  const { activeRound, setSyncStatus } = useRoundStore.getState();
  if (!activeRound) return;

  if (state.isConnected && state.isInternetReachable !== false) {
    // Online — trigger sync
    syncPendingHoles();
  } else {
    setSyncStatus('offline');
  }
}

export function startSyncQueue(): void {
  if (unsubscribe) return;
  unsubscribe = NetInfo.addEventListener(handleNetworkChange);
}

export function stopSyncQueue(): void {
  if (unsubscribe) {
    unsubscribe();
    unsubscribe = null;
  }
}

export { syncPendingHoles };
