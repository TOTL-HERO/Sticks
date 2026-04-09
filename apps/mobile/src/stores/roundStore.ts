import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

// --- Corruption recovery constants ---

export const SNAPSHOT_KEY = 'sticks-round-snapshot';
export const CORRUPT_KEY = 'sticks-round-corrupt';

// --- Validation ---

export function validateRoundState(state: unknown): state is ActiveRound {
  if (!state || typeof state !== 'object') return false;
  const s = state as Record<string, unknown>;
  return (
    typeof s.id === 'string' &&
    typeof s.courseName === 'string' &&
    Array.isArray(s.holes) &&
    s.holes.length === 18 &&
    typeof s.currentHole === 'number'
  );
}

export interface LocalHoleState {
  holeNumber: number;
  strokes: number;
  putts: number | null;
  fairwayHit: boolean | null;
  gir: boolean | null;
  penalties: number;
  par: number;
  gpsTimestamp: string | null;
  synced: boolean;
}

export interface ShotPoint {
  id: string;
  holeNumber: number;
  shotNumber: number;
  startLatitude: number;
  startLongitude: number;
  endLatitude: number | null;
  endLongitude: number | null;
  timestamp: string;
  eventType: 'DETECTED' | 'MANUAL' | 'CORRECTED' | 'ROUND_START' | 'ROUND_END';
  accuracy: number;
  altitude: number | null;
  synced: boolean;
}

export interface ActiveRound {
  id: string;
  courseId: string | null;
  courseName: string;
  coursePar: number;
  startedAt: string;
  currentHole: number;
  holes: LocalHoleState[];
  shotPoints: ShotPoint[];
}

export type SyncStatus = 'synced' | 'pending' | 'offline';

interface RoundState {
  activeRound: ActiveRound | null;
  syncStatus: SyncStatus;

  startRound: (round: Omit<ActiveRound, 'currentHole' | 'holes' | 'shotPoints'>) => void;
  updateHole: (holeNumber: number, data: Partial<Omit<LocalHoleState, 'holeNumber'>>) => void;
  advanceHole: () => void;
  goToHole: (holeNumber: number) => void;
  addShotPoint: (point: Omit<ShotPoint, 'synced'>) => void;
  updateShotPoint: (id: string, data: Partial<ShotPoint>) => void;
  removeShotPoint: (id: string) => void;
  markShotsSynced: (ids: string[]) => void;
  finalizeRound: () => void;
  clearRound: () => void;
  setSyncStatus: (status: SyncStatus) => void;
  markHoleSynced: (holeNumber: number) => void;
}

function createDefaultHoles(coursePar: number): LocalHoleState[] {
  const parPerHole = Math.round(coursePar / 18);
  return Array.from({ length: 18 }, (_, i) => ({
    holeNumber: i + 1,
    strokes: parPerHole,
    putts: null,
    fairwayHit: null,
    gir: null,
    penalties: 0,
    par: parPerHole,
    gpsTimestamp: null,
    synced: false,
  }));
}

export const useRoundStore = create<RoundState>()(
  persist(
    (set) => ({
      activeRound: null,
      syncStatus: 'synced',

      startRound: (round) =>
        set({
          activeRound: {
            ...round,
            currentHole: 1,
            holes: createDefaultHoles(round.coursePar),
            shotPoints: [],
          },
          syncStatus: 'synced',
        }),

      updateHole: (holeNumber, data) =>
        set((state) => {
          if (!state.activeRound) return state;
          const holes = state.activeRound.holes.map((h) =>
            h.holeNumber === holeNumber
              ? { ...h, ...data, synced: false }
              : h,
          );
          return {
            activeRound: { ...state.activeRound, holes },
            syncStatus: 'pending',
          };
        }),

      advanceHole: () =>
        set((state) => {
          if (!state.activeRound) return state;
          const next = Math.min(state.activeRound.currentHole + 1, 18);
          const newRound = { ...state.activeRound, currentHole: next };

          // Write snapshot every 3 holes for corruption recovery
          if (state.activeRound.currentHole % 3 === 0) {
            AsyncStorage.setItem(SNAPSHOT_KEY, JSON.stringify(newRound)).catch(() => {
              // Best-effort snapshot write
            });
          }

          return { activeRound: newRound };
        }),

      goToHole: (holeNumber) =>
        set((state) => {
          if (!state.activeRound) return state;
          const clamped = Math.max(1, Math.min(18, holeNumber));
          return {
            activeRound: { ...state.activeRound, currentHole: clamped },
          };
        }),

      addShotPoint: (point) =>
        set((state) => {
          if (!state.activeRound) return state;
          return {
            activeRound: {
              ...state.activeRound,
              shotPoints: [...state.activeRound.shotPoints, { ...point, synced: false }],
            },
          };
        }),

      updateShotPoint: (id, data) =>
        set((state) => {
          if (!state.activeRound) return state;
          const shotPoints = state.activeRound.shotPoints.map((sp) =>
            sp.id === id ? { ...sp, ...data } : sp,
          );
          return {
            activeRound: { ...state.activeRound, shotPoints },
          };
        }),

      removeShotPoint: (id) =>
        set((state) => {
          if (!state.activeRound) return state;
          return {
            activeRound: {
              ...state.activeRound,
              shotPoints: state.activeRound.shotPoints.filter((sp) => sp.id !== id),
            },
          };
        }),

      markShotsSynced: (ids) =>
        set((state) => {
          if (!state.activeRound) return state;
          const idSet = new Set(ids);
          const shotPoints = state.activeRound.shotPoints.map((sp) =>
            idSet.has(sp.id) ? { ...sp, synced: true } : sp,
          );
          return {
            activeRound: { ...state.activeRound, shotPoints },
          };
        }),

      finalizeRound: () =>
        set((state) => {
          if (!state.activeRound) return state;
          return { syncStatus: 'pending' };
        }),

      clearRound: () => set({ activeRound: null, syncStatus: 'synced' }),

      setSyncStatus: (status) => set({ syncStatus: status }),

      markHoleSynced: (holeNumber) =>
        set((state) => {
          if (!state.activeRound) return state;
          const holes = state.activeRound.holes.map((h) =>
            h.holeNumber === holeNumber ? { ...h, synced: true } : h,
          );
          const allSynced = holes.every((h) => h.strokes === 0 || h.synced);
          return {
            activeRound: { ...state.activeRound, holes },
            syncStatus: allSynced ? 'synced' : 'pending',
          };
        }),
    }),
    {
      name: 'sticks-round-store',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => {
        return async (state, error) => {
          if (error || (state && state.activeRound && !validateRoundState(state.activeRound))) {
            // Rehydration failed or state is corrupt — attempt snapshot recovery
            try {
              const snapshotRaw = await AsyncStorage.getItem(SNAPSHOT_KEY);
              if (snapshotRaw) {
                const snapshot = JSON.parse(snapshotRaw);
                if (validateRoundState(snapshot)) {
                  // Restore from snapshot
                  useRoundStore.setState({ activeRound: snapshot });
                  console.warn('[RoundStore] Recovered from snapshot after corruption');
                  return;
                }
              }
            } catch {
              // Snapshot also failed
            }

            // Both persisted state and snapshot are invalid — preserve raw data
            try {
              const rawData = await AsyncStorage.getItem('sticks-round-store');
              if (rawData) {
                await AsyncStorage.setItem(CORRUPT_KEY, rawData);
              }
            } catch {
              // Best-effort preservation
            }

            // Clear the active round so the app doesn't crash
            useRoundStore.setState({ activeRound: null, syncStatus: 'synced' });
            console.error('[RoundStore] Corruption detected. Raw data preserved in CORRUPT_KEY.');
          }
        };
      },
    },
  ),
);
