"use server";

import { ProfileEntity } from "@repo/db";
import jwt from "jsonwebtoken";
import { JwtUserPayload } from "../shared/types";

const ACCESS_SECRET =
  process.env.ACCESS_TOKEN_SECRET ||
  (process.env.ACCESS_TOKEN_SECRET as string);
const REFRESH_SECRET =
  process.env.REFRESH_TOKEN_SECRET ||
  (process.env.REFRESH_TOKEN_SECRET as string);

if (!ACCESS_SECRET || !REFRESH_SECRET) {
  throw new Error("Missing token secrets in env");
}

export async function signAccessToken(profile: JwtUserPayload) {
  const payload = {
    profileId: profile.profileId,
    email: profile.email,
    name: profile.name,
  };

  return jwt.sign(payload, ACCESS_SECRET, {
    expiresIn: (process.env.ACCESS_TOKEN_EXPIRES_IN as any) || "15m",
  });
}

export async function verifyAccessToken(token: string) {
  try {
    return jwt.verify(token, ACCESS_SECRET) as any;
  } catch (err) {
    return null;
  }
}

export async function signRefreshToken(payload: object) {
  // long lived token (we'll still rotate)
  const days = parseInt(process.env.REFRESH_TOKEN_EXPIRES_IN_DAYS || "7", 10);
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: `${days}d` });
}

export async function verifyRefreshToken(token: string) {
  try {
    return jwt.verify(token, REFRESH_SECRET);
  } catch (err) {
    return null;
  }
}
