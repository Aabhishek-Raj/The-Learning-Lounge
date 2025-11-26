// apps/web/app/api/auth/logout/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { db } from "@repo/db";

export async function POST() {
  try {
    const c = cookies();
    const token = c.get("refresh_token")?.value;

    // delete cookie
    c.delete("access_token");
    c.delete("refresh_token");

    if (token) {
      // revoke the refresh token in DB if present
      try {
        const { hash } = (await import("@/lib/auth/server/hash")) as any;
      } catch {}
      // best-effort: hash & revoke
      // we will import hash here to avoid circular import earlier (or move hash util into shared package)
      const { hashToken } = await import("@/lib/auth/server/hash");
      const tokenHash = hashToken(token);
      await db.refreshToken.updateMany({
        where: { tokenHash },
        data: { revoked: true },
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
