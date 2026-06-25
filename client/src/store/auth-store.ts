import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setAuth: (user, token) => {
        if (typeof window !== "undefined") localStorage.setItem("auth_token", token);
        set({ user, token });
      },
      logout: () => {
        if (typeof window !== "undefined") localStorage.removeItem("auth_token");
        set({ user: null, token: null });
      },
    }),
    { name: "dsa-auth" },
  ),
);
