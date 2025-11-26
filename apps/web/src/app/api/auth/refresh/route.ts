// apps/web/app/api/auth/refresh/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  verifyRefreshToken,
  signAccessToken,
  signRefreshToken,
} from "@/lib/auth/server/token";
import { hashToken } from "@/lib/auth/server/hash";
import { db } from "@repo/db";

/**
 * Refresh logic:
 * 1. Read refresh_token cookie
 * 2. Verify JWT signature & payload
 * 3. Hash the token and find DB entry
 * 4. If not found => possible reuse attack => revoke all tokens for profile
 * 5. If found and not revoked => rotate: create new refresh token, mark old token.replacedById, save new hashed token
 * 6. Issue new access token and set cookies
 */

export async function POST() {
  try {
    const _cookies = await cookies();
    const token = _cookies.get("refresh_token")?.value;
    if (!token)
      return NextResponse.json({ error: "No refresh token" }, { status: 401 });

    let payload;
    try {
      payload = await verifyRefreshToken(token);
    } catch (e) {
      // token invalid/expired
      return NextResponse.json(
        { error: "Invalid refresh token" },
        { status: 401 },
      );
    }

    const tokenHash = await hashToken(token);

    const dbToken = await db.refreshToken.findUnique({
      where: { tokenHash },
      include: { profile: true }, // include profile to rebuild access-token payload
    });

    if (!dbToken) {
      // Reuse detection: token not found in DB => someone reused or removed token.
      // As a safety measure, revoke all refresh tokens for this profile
      // If payload contains profileId, revoke their tokens
      if (payload?.profileId) {
        await db.refreshToken.updateMany({
          where: { profileId: payload.profileId },
          data: { revoked: true },
        });
      }
      return NextResponse.json(
        { error: "Token reuse detected" },
        { status: 403 },
      );
    }

    if (dbToken.revoked) {
      // This token has been revoked: possible reuse
      await db.refreshToken.updateMany({
        where: { profileId: dbToken.profileId },
        data: { revoked: true },
      });
      return NextResponse.json({ error: "Token revoked" }, { status: 403 });
    }

    // At this point token exists and is valid. Rotate token:
    const newRefreshToken = await signRefreshToken({ profileId: dbToken.profileId });
    const newHash = await hashToken(newRefreshToken);
    const expiresAt = new Date(
      Date.now() +
        Number(process.env.REFRESH_TOKEN_EXPIRES_IN_DAYS || 7) *
          24 *
          60 *
          60 *
          1000,
    );

    // Create new DB entry and mark old token replacedById
    const created = await db.refreshToken.create({
      data: {
        tokenHash: newHash,
        profileId: dbToken.profileId,
        expiresAt,
      },
    });

    // mark replaced token as revoked and set replacedById
    await db.refreshToken.update({
      where: { id: dbToken.id },
      data: { revoked: true, replacedById: created.id },
    });

     const user = dbToken.profile;

    const accessPayload = {
      profileId: user.id,
      email: user.email,
      name: user.name,
    };

    const newAccessToken = await signAccessToken(accessPayload);

    // set cookies
    _cookies.set({
      name: "access_token",
      value: newAccessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    _cookies.set({
      name: "refresh_token",
      value: newRefreshToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge:
        Number(process.env.REFRESH_TOKEN_EXPIRES_IN_DAYS || 7) * 24 * 60 * 60,
    });

    return NextResponse.json({ accessToken: newAccessToken });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
