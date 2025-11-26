'use client'

import { create } from "zustand";
import { apiLogin, apiLogout, apiMe, apiRegister } from "./auth-api";
import { tokenStore } from "./token-store";

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;

  login: (values: { email: string; password: string }) => Promise<void>;
  register: (values: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  getMe: () => Promise<void>;
  autoLogin: () => Promise<void>;
}

export const useAuth = create<AuthState>((set, get) => ({
  user: null,
  loading: true,

  // -----------------------
  // LOGIN
  // -----------------------
  login: async (values) => {
    const data = await apiLogin(values); // sets token internally
    // const user = await apiMe();
    // set({ user, loading: false });
    await get().getMe();
  },

  // -----------------------
  // REGISTER
  // -----------------------
  register: async (values) => {
    await apiRegister(values);
  },

  // -----------------------
  // ME
  // -----------------------
  getMe: async () => {
    try {
      const user = await apiMe(); // returns null if unauthorized
      set({ user, loading: false });
    } catch (err) {
      set({ user: null, loading: false });
    }
  },

  // -----------------------
  // LOGOUT
  // -----------------------
  logout: async () => {
    await apiLogout();
    tokenStore.clear();
    set({ user: null });
  },

  // -----------------------
  // AUTO LOGIN
  // Runs only on client-side
  // Checks token, attempts refresh, fetches /me
  // -----------------------
  autoLogin: async () => {
    if (typeof window === "undefined") return;

    const token = tokenStore.get();

    if (!token) {
      set({ loading: false });
      return;
    }

    await get().getMe();
    // const user = await apiMe();
    // set({ user, loading: false });
  },
}));
