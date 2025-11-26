import { redirect } from 'next/navigation'
import { db } from '@repo/db'

import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ModeToggle } from '@/components/action/ModeToggle'
import { NavigationAction } from '@/components/navigation/NavigationAction'
import { NavigationItem } from '@/components/navigation/NavigationItem'
import { getCurrentProfile } from '@/lib/auth'

export const NavigationSidebar = async () => {
  const profile = await getCurrentProfile()

  if (!profile) {
    return redirect('/')
  }
  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.profileId,
        },
      },
    },
  })

  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] bg-[#E3E5E8] py-3">
      <NavigationAction />
      <Separator className="h-0.5 bg-background rounded-md w-10 mx-auto" />
      <ScrollArea className="flex-1 w-full">
        {servers.map((server) => (
          <div key={server.id} className="mb-4">
            <NavigationItem id={server.id} name={server.name} imageUrl={server.imageUrl} />
          </div>
        ))}
      </ScrollArea>
      <div className="p-3 mt-auto flex items-center flex-col gap-y-4">
        <ModeToggle />
      </div>
    </div>
  )
}
