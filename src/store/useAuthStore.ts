// src/store/useAuthStore.ts
import { create } from "zustand";

type User = {
  username: string;
  role: "admin" | "user";
};

type AuthStore = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  login: (user) => {
    localStorage.setItem("token", "fake-token");
    set({ user });
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null });
  },
}));
