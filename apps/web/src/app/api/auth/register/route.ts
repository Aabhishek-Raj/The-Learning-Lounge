// apps/web/app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import { registerSchema } from "@/lib/auth/server/validate";
import { hashPassword } from "@/lib/auth/server/hash";
import { db } from "@repo/db";

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = registerSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const { name, username, email, password } = parsed.data;

    const exists = await db.user.findFirst({ where: { OR: [{ email }, { username }] } });
    if (exists) return NextResponse.json({ error: "User exists" }, { status: 400 });

    const hashed = await hashPassword(password);

    const user = await db.user.create({
      data: { name, username, email, password: hashed },
      select: { id: true, name: true, email: true, username: true },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
