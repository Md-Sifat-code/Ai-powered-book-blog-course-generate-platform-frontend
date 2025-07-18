import { create } from "zustand";

type SidebarState = {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
  open: () => void;
};

export const useSidebarStore = create<SidebarState>((set) => ({
  isOpen: true,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  close: () => set({ isOpen: false }),
  open: () => set({ isOpen: true }),
}));
