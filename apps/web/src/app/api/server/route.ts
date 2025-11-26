import { NextRequest, NextResponse } from 'next/server'
import { db, genId, MemberRole } from '@repo/db'
import { getCurrentProfile } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const { name, imageUrl } = await req.json()
    const profile = await getCurrentProfile()

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const server = await db.server.create({
      data: {
        profileId: profile.profileId,
        name,
        imageUrl,
        inviteCode: genId(),
        channels: {
          create: [{ name: 'general', profileId: profile.profileId }],
        },
        members: {
          create: [{ profileId: profile.profileId, systemRole: MemberRole.TUTOR }],
        },
      },
    })

    return NextResponse.json(server)
  } catch (error) {
    console.log('[SERVERS_POST]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
