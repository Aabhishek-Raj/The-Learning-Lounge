// src/lib/auth/token-store.ts

let accessToken: string | null = null;

export const tokenStore = {
  get() {
    if (typeof window === "undefined") return null;
    return accessToken || localStorage.getItem("accessToken");
  },

  set(token: string) {
    accessToken = token;
    if (typeof window !== "undefined") {
      localStorage.setItem("accessToken", token);
    }
  },

  clear() {
    accessToken = null;
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
    }
  },
};
