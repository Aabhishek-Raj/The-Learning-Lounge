'use server'

import bcrypt from "bcryptjs";
import crypto from "crypto";

/** Password hash using bcrypt */
export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

/** Refresh token hashing for DB (use sha256) */
export async function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}
