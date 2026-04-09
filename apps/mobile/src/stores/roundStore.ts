import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import * as SecureStore from 'expo-secure-store';

// SecureStore-based storage adapter for Zustand persist
const secureStoreStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return SecureStore.getItemAsync(name);
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await SecureStore.setItemAsync(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await SecureStore.deleteItemAsync(name);
  },
};

export interface LocalHoleState {
  holeNumber: number;
  strokes: number;
  putts: number;
  penalties: number;
  par: number;
  gpsTimestamp: string | null;
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
}

export type SyncStatus = 'synced' | 'pending' | 'offline';

interface RoundState {
  activeRound: ActiveRound | null;
  syncStatus: SyncStatus;

  startRound: (round: Omit<ActiveRound, 'currentHole' | 'holes'>) => void;
  updateHole: (holeNumber: number, data: Partial<Omit<LocalHoleState, 'holeNumber'>>) => void;
  advanceHole: () => void;
  finalizeRound: () => void;
  clearRound: () => void;
  setSyncStatus: (status: SyncStatus) => void;
  markHoleSynced: (holeNumber: number) => void;
}

function createDefaultHoles(coursePar: number): LocalHoleState[] {
  const parPerHole = Math.round(coursePar / 18);
  return Array.from({ length: 18 }, (_, i) => ({
    holeNumber: i + 1,
    strokes: 0,
    putts: 0,
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
          return {
            activeRound: { ...state.activeRound, currentHole: next },
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
      storage: createJSONStorage(() => secureStoreStorage),
    },
  ),
);
