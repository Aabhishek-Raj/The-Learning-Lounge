// apps/web/app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { loginSchema } from "@/lib/auth/server/validate";
import { db } from "@repo/db";
import { comparePassword, hashToken, setAuthCookies, signAccessToken, signRefreshToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = loginSchema.safeParse(json);
    if (!parsed.success) return NextResponse.json({ error: parsed.error }, { status: 400 });

    const { email, password } = parsed.data;
    const profile = await db.profile.findUnique({ where: { email } });
    if (!profile) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

    const ok = await comparePassword(password, profile.password);
    if (!ok) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

     const payload = {
        profileId: profile.id,
        email: profile.email,
        name: profile.name,
    };


    // issue tokens
    const accessToken = await signAccessToken(payload);
    const refreshToken = await signRefreshToken({ profileId: profile.id });

    // store hashed refresh token in DB and set cookie
    const refreshHash = await hashToken(refreshToken);
    const expiresAt = new Date(Date.now() + Number(process.env.REFRESH_TOKEN_EXPIRES_IN_DAYS || 7) * 24 * 60 * 60 * 1000);

    await db.refreshToken.create({
      data: {
        tokenHash: refreshHash,
        profileId: profile.id,
        expiresAt,
      },
    });

    await setAuthCookies(accessToken, refreshToken);

    const safeprofile = { id: profile.id, name: profile.name, email: profile.email };
    return NextResponse.json({ profile: safeprofile });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}