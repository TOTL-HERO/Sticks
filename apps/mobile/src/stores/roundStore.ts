import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
          return {
            activeRound: { ...state.activeRound, currentHole: next },
          };
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
    },
  ),
);
