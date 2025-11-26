'use server'

import { cookies } from "next/headers";

export async function setAuthCookies(accessToken: string, refreshToken: string, refreshMaxAge = 7 * 24 * 60 * 60) {
  const _cookies = await cookies();
  // Access token (short-lived) — httpOnly
  _cookies.set({
    name: "access_token",
    value: accessToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    // maxAge omitted for short-term; set if you want
  });

  // Refresh token (longer)
  _cookies.set({
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
  const _cookies = await cookies();
  _cookies.delete("access_token");
  _cookies.delete("refresh_token");
}

export async function getAccessTokenFromCookie() {
  const _cookies = await cookies()
  return _cookies.get("access_token")?.value || null;
}

export async function getRefreshTokenFromCookie() {
  const _cookies = await cookies()
  return _cookies.get("refresh_token")?.value || null;
}
