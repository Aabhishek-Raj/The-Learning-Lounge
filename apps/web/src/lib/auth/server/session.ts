'use server';

import { getAccessTokenFromCookie } from "./cookies";
import { JwtUserPayload } from "../shared/types";
import { verifyAccessToken } from "./token";

export async function getCurrentProfile(): Promise<JwtUserPayload | null> {
  const token = await getAccessTokenFromCookie();
  if (!token) return null;

  try {
    return verifyAccessToken(token);
  } catch {
    return null;
  }
}
