// apps/web/app/api/auth/me/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyAccessToken } from "@/lib/auth/tokens";
import { db } from "@repo/db";

export async function GET() {
  try {
    const token = cookies().get("access_token")?.value;
    if (!token) return NextResponse.json({ user: null });

    let payload;
    try {
      payload = verifyAccessToken(token);
    } catch {
      return NextResponse.json({ user: null });
    }

    const user = await db.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, name: true, email: true, username: true },
    });

    return NextResponse.json({ user });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ user: null });
  }
}
