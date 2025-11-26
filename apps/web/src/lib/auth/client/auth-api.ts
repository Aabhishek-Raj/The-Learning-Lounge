// src/lib/auth/auth-api.ts

import { tokenStore } from "./token-store";

export async function apiLogin(values: { email: string; password: string }) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(values),
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (!res.ok) throw new Error("Login failed");

  const data = await res.json();

  tokenStore.set(data.accessToken);

  return data;
}

export async function apiRegister(values: { email: string; password: string }) {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(values),
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  if (!res.ok) throw new Error("Register failed");

  return await res.json();
}

export async function apiMe() {
  const token = tokenStore.get();

  const res = await fetch("/api/auth/me", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
    credentials: "include",
  });

  if (res.status === 401) return null;

  return await res.json();
}

export async function apiLogout() {
  const res = await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });

  tokenStore.clear();

  if (!res.ok) throw new Error("Logout failed");

  return true;
}

export async function apiRefresh() {
  const res = await fetch("/api/auth/refresh", {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) return null;

  const data = await res.json();
  tokenStore.set(data.accessToken);

  return data.accessToken;
}
