import { redirect } from 'next/navigation'
import { Hash, Mic, Shield, ShieldAlert, ShieldCheck, Video } from 'lucide-react'

import { ServerSearch } from '@/components/server/ServerSearch'
import { ServerSection } from '@/components/server/ServerSection'
import { SeverChannel } from '@/components/server/ServerChannel'
import { ServerMember } from '@/components/server/ServerMember'
import { ServerHeader } from '@/components/server/ServerHeader'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { getCurrentProfile } from '@/lib/auth'
import { ChannelType, MemberRole } from '@repo/db/types'
import { db } from '@repo/db'

interface ServerSidebarProps {
  serverId: string
}

const iconMap = {
  [ChannelType.TEXT]: <Hash className="mr-2 h-4 w-4" />,
  [ChannelType.AUDIO]: <Mic className="mr-2 h-4 w-4" />,
  [ChannelType.VIDEO]: <Video className="mr-2 h-4 w-4" />,
}

const roleIconMap = {
  [MemberRole.STUDENT]: null,
  [MemberRole.MODERATOR]: <ShieldCheck className="h-4 w-4 mr-2 text-indigo-500" />,
  [MemberRole.TUTOR]: <ShieldAlert className="h-4 w-4 mr-2 text-rose-500" />,
}

export const ServerSidebar = async ({ serverId }: ServerSidebarProps) => {
  const profile = await getCurrentProfile()

  if (!profile) {
    return redirect('/')
  }
  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: 'asc',
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          systemRole: 'asc',
        },
      },
    },
  })

  const textChannels = server?.channels.filter((channel) => channel.type === ChannelType.TEXT)
  const audioChannels = server?.channels.filter((channel) => channel.type === ChannelType.AUDIO)
  const videoChannels = server?.channels.filter((channel) => channel.type === ChannelType.VIDEO)

  const members = server?.members.filter((member) => member.profileId !== profile.profileId)

  if (!server) {
    return redirect('/')
  }

  const role = server.members.find((member) => member.profileId === profile.profileId)?.systemRole

  return (
    <div className="flex flex-col h-full text-foreground w-full bg-background">
      <ServerHeader server={server} role={role} />
      <ScrollArea className="flex-1 px-3">
        <div className="mt-2">
          <ServerSearch
            data={[
              {
                label: 'Text channels',
                type: 'channel',
                data: textChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                })),
              },
              {
                label: 'Voice channels',
                type: 'channel',
                data: audioChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                })),
              },
              {
                label: 'Video channels',
                type: 'channel',
                data: videoChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                })),
              },
              {
                label: 'Members',
                type: 'member',
                data: members?.map((member) => ({
                  id: member.id,
                  name: member.profile.name,
                  icon: roleIconMap[member.systemRole],
                })),
              },
            ]}
          />
        </div>
        <Separator className="bg-muted-foreground rounded-md my-2" />
        {!!textChannels?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="channels"
              channelType={ChannelType.TEXT}
              role={role}
              label="Text Channels"
            />
            <div className="space-y-0.5">
              {textChannels.map((channel) => (
                <SeverChannel key={channel.id} channel={channel} role={role} server={server} />
              ))}
            </div>
          </div>
        )}
        {!!audioChannels?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="channels"
              channelType={ChannelType.AUDIO}
              role={role}
              label="Voice Channels"
            />
            <div className="space-y-0.5">
              {audioChannels.map((channel) => (
                <SeverChannel key={channel.id} channel={channel} role={role} server={server} />
              ))}
            </div>
          </div>
        )}
        {!!videoChannels?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="channels"
              channelType={ChannelType.VIDEO}
              role={role}
              label="Video Channels"
            />
            <div className="space-y-0.5">
              {videoChannels.map((channel) => (
                <SeverChannel key={channel.id} channel={channel} role={role} server={server} />
              ))}
            </div>
          </div>
        )}
        {!!members?.length && (
          <div className="mb-2">
            <ServerSection sectionType="members" role={role} label="Members" server={server} />
            <div className="space-y-0.5">
              {members.map((member) => (
                <ServerMember key={member.id} member={member} server={server} />
              ))}
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  )
}
