import { create } from 'zustand';

interface AppState {
  hideTabBar: boolean;
  setHideTabBar: (hide: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  hideTabBar: false,
  setHideTabBar: (hide) => set({ hideTabBar: hide }),
}));
