import { db } from "@repo/db";
import { NextResponse } from "next/server";

export async function GET() {
  const posts = await db.post.findMany({
    select: {
      id: true,
      content: true,
      createdAt: true,
      user: { select: { id: true, username: true, name: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(posts);
}
