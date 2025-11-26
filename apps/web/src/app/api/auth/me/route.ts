// apps/web/app/api/auth/me/route.ts
import { NextResponse } from "next/server";
import { db } from "@repo/db";
import { getCurrentProfile } from "@/lib/auth";

export async function GET() {
  try {
    const payload = await getCurrentProfile();

    const user = await db.profile.findUnique({
      where: { id: payload?.profileId },
      select: { id: true, name: true, email: true },
    });

    return NextResponse.json({ user });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ user: null });
  }
}
