import { create } from "zustand";

type Theme = "light" | "dark";

type ThemeStore = {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  initializeTheme: () => void;
};

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: "light",

  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(newTheme);
      return { theme: newTheme };
    }),

  setTheme: (theme) => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    set({ theme });
  },

  initializeTheme: () => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    const preferred = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    const theme = savedTheme || preferred;
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    set({ theme });
  },
}));
