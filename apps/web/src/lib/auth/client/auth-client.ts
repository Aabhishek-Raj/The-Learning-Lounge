// src/lib/auth/client/auth-fetch.ts
import { apiRefresh, apiLogout } from './auth-api';
import { tokenStore } from './token-store';

let refreshingPromise: Promise<string | null> | null = null;

async function doRefreshOnce(): Promise<string | null> {
  if (refreshingPromise) return refreshingPromise; // single-flight
  refreshingPromise = (async () => {
    try {
      const newToken = await apiRefresh(); // calls /api/auth/refresh
      return newToken;
    } catch (err) {
      // refresh failed -> make sure to cleanup
      tokenStore.clear();
      try { await apiLogout(); } catch(_) {}
      return null;
    } finally {
      // allow subsequent refresh attempts in future
      refreshingPromise = null;
    }
  })();
  return refreshingPromise;
}

export async function authFetch(url: string, options: RequestInit = {}) {
  let token = tokenStore.get();

  const makeRequest = (t: string | null) =>
    fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        ...(t ? { Authorization: `Bearer ${t}` } : {}),
      },
      credentials: 'include',
    });

  // try original
  let res = await makeRequest(token);

  // if unauthorized -> attempt refresh once, then retry
  if (res.status === 401 || res.status === 403) {
    const newToken = await doRefreshOnce();
    if (!newToken) return res; // refresh failed -> caller handles logout UI
    token = newToken;
    res = await makeRequest(newToken);
  }

  return res;
}
