'use server'

import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET || process.env.ACCESS_TOKEN_SECRET as string;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET || process.env.REFRESH_TOKEN_SECRET as string;

if (!ACCESS_SECRET || !REFRESH_SECRET) {
  throw new Error("Missing token secrets in env");
}

export async function signAccessToken(payload: object) {
  // short lived
  return jwt.sign(payload, ACCESS_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || "15m" });
}

export async function verifyAccessToken(token: string) {
  return jwt.verify(token, ACCESS_SECRET) as any;
}

export async function signRefreshToken(payload: object) {
  // long lived token (we'll still rotate)
  const days = parseInt(process.env.REFRESH_TOKEN_EXPIRES_IN_DAYS || "7", 10);
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: `${days}d` });
}

export async function verifyRefreshToken(token: string) {
  return jwt.verify(token, REFRESH_SECRET) as any;
}
