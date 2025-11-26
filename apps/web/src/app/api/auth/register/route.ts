// apps/web/app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import { registerSchema } from "@/lib/auth/server/validate";
import { hashPassword } from "@/lib/auth/server/hash";
import { db, genId } from "@repo/db";

export async function POST(req: Request) {
  try {
    console.log("API CAlled !");
    const json = await req.json();
    const parsed = registerSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    const { name, email, password } = parsed.data;

    const exists = await db.profile.findFirst({ where: { email } });
    if (exists)
      return NextResponse.json({ error: "profile already exists" }, { status: 400 });

    const hashed = await hashPassword(password);
    const data = {
      name,
      imageUrl: "https://4kwallpapers.com/images/walls/thumbs_3t/17094.jpg",
      userId: genId(),
      email: email,
      password: hashed,
    };

    const profile = await db.profile.create({
      data,
      select: { id: true, name: true, email: true },
    });

    return NextResponse.json({ profile }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
