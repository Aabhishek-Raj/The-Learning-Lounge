// apps/web/app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { loginSchema } from "@/lib/auth/server/validate";
import { comparePassword, hashToken } from "@/lib/auth/server/hash";
import { signAccessToken, signRefreshToken } from "@/lib/auth/tokens";
import { db } from "@repo/db";
import { setAuthCookies } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = loginSchema.safeParse(json);
    if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

    const { email, password } = parsed.data;
    const user = await db.user.findUnique({ where: { email } });
    if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

    const ok = await comparePassword(password, user.password);
    if (!ok) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

    // issue tokens
    const accessToken = signAccessToken({ userId: user.id });
    const refreshToken = signRefreshToken({ userId: user.id });

    // store hashed refresh token in DB and set cookie
    const refreshHash = hashToken(refreshToken);
    const expiresAt = new Date(Date.now() + Number(process.env.REFRESH_TOKEN_EXPIRES_IN_DAYS || 7) * 24 * 60 * 60 * 1000);

    await db.refreshToken.create({
      data: {
        tokenHash: refreshHash,
        userId: user.id,
        expiresAt,
      },
    });

    setAuthCookies(accessToken, refreshToken);

    const safeUser = { id: user.id, name: user.name, username: user.username, email: user.email };
    return NextResponse.json({ user: safeUser });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}