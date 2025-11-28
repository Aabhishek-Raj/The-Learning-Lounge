import { getCurrentProfile } from "@/lib/auth";
import { db } from "@repo/db";
import { MemberRole } from "@repo/db/types";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const profile = await getCurrentProfile();
    const { name, type } = await req.json();
    const { searchParams } = new URL(req.url);

    const serverId = searchParams.get("serverId");

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!serverId) {
      return new NextResponse("ServerId is missing", { status: 400 });
    }
    if (name === "general") {
      return new NextResponse("Name cannot be general", { status: 400 });
    }
    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.profileId,
            systemRole: {
              in: [MemberRole.TUTOR, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          create: {
            profileId: profile.profileId,
            name,
            type,
          },
        },
      },
    });
    return NextResponse.json(server);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
