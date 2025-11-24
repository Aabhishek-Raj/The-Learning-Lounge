'use server'

import { cookies } from "next/headers";

export async function setAuthCookies(accessToken: string, refreshToken: string, refreshMaxAge = 7 * 24 * 60 * 60) {
  const c = cookies();
  // Access token (short-lived) — httpOnly
  c.set({
    name: "access_token",
    value: accessToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    // maxAge omitted for short-term; set if you want
  });

  // Refresh token (longer)
  c.set({
    name: "refresh_token",
    value: refreshToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: refreshMaxAge,
  });
}

export async function clearAuthCookies() {
  const c = cookies();
  c.delete("access_token");
  c.delete("refresh_token");
}
