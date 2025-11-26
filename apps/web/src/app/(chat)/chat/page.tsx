import { redirect } from 'next/navigation'

import InitialModal from '@/components/modals/InitialModal'
import { db } from '@repo/db'
import { getCurrentProfile } from '@/lib/auth';

const SetupPage = async () => {
  const user = await getCurrentProfile();

  if (!user) return redirect("/login");


  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: user?.profileId,
        },
      },
    },
  })
  if (server) {
    return redirect(`chat/servers/${server.id}`)
  }
  return <InitialModal />
}

export default SetupPage
