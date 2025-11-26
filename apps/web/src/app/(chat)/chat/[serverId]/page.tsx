import { getCurrentProfile } from '@/lib/auth'
import { db } from '@repo/db'
import { redirect } from 'next/navigation'

interface ServerPageProps {
  params: Promise<{ serverId: string }>
}

const ServerPage = async ({ params }: ServerPageProps) => {
  const profile = await getCurrentProfile()
  const { serverId } = await params

  if (!profile) {
    return redirect('/login')
  }

  console.log(serverId, 'Parm--')

  const server = await db.server.findUnique({
    where: {
      id: serverId,
      members: {
        some: {
          profileId: profile.profileId,
        },
      },
    },
    include: {
      channels: {
        where: {
          name: 'general',
        },
        orderBy: {
          createdAt: 'asc',
        },
      },
    },
  })

  const initialChannel = server?.channels[0]

  if (initialChannel?.name !== 'general') {
    return null
  }

  return redirect(`/chat/servers/${serverId}/channels/${initialChannel?.id}`)
}

export default ServerPage
