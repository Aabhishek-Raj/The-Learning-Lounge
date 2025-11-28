import { ServerSidebar } from '@/components/server/ServerSideBar'
import { getCurrentProfile } from '@/lib/auth'
import { db } from '@repo/db'

import { redirect } from 'next/navigation'

const ServerIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ serverId: string }>
}) => {
  const profile = await getCurrentProfile()
  const { serverId } = await params

  if (!profile) return redirect('/')

  const server = await db.server.findUnique({
    where: {
      id: serverId,
      members: {
        some: {
          profileId: profile.profileId,
        },
      },
    },
  })

  if (!server) {
    return redirect('/')
  }

  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
        <ServerSidebar serverId={serverId} />
      </div>
      <div className="h-full md:pl-60">{children}</div>
    </div>
  )
}

export default ServerIdLayout
