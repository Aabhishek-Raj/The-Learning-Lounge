import { apiRefresh } from "./auth-api";
import { tokenStore } from "./token-store";

export async function authFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  let token = tokenStore.get();

  const makeRequest = async (accessToken: string | null) => {
    return await fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
      credentials: "include",
    });
  };

  // 1) Try with current token
  let res = await makeRequest(token);

  // 2) If expired, try refresh
  if (res.status === 401) {
    const newToken = await apiRefresh();

    if (!newToken) {
      tokenStore.clear();
      return res;
    }

    token = newToken;

    // Retry original request with new token
    res = await makeRequest(newToken);
  }

  return res;
}
