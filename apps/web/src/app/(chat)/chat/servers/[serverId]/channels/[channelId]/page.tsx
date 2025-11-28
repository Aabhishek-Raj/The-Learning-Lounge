import { redirect } from 'next/navigation'
import { ChannelType } from '@repo/db/types'
import { db } from '@repo/db'
import { ChatHeader } from '@/components/chat/ChatHeader'
import { ChatInput } from '@/components/chat/ChatInput'
import { ChatMessages } from '@/components/chat/ChatMessages'
import { MediaRoom } from '@/components/MediaRoom'
import { getCurrentProfile } from '@/lib/auth'

interface ChannelIdPageProps {
  params: Promise<{
    serverId: string
    channelId: string
  }>
}

const ChannelIdPage = async ({ params }: ChannelIdPageProps) => {
  const profile = await getCurrentProfile()

  if (!profile) return redirect('/login')

  const { channelId, serverId } = await params
  const channel = await db.channel.findUnique({
    where: {
      id: channelId,
    },
  })

  const member = await db.member.findFirst({
    where: {
      serverId: serverId,
      profileId: profile?.profileId,
    },
  })

  if (!channel || !member) {
    redirect(`/`)
  }

  return (
    <div className="bg-background-tertiary flex flex-col h-screen">
      <ChatHeader name={channel.name} serverId={channel.serverId} type="channel" />

      {channel.type === ChannelType.TEXT && (
        <>
      <ChatMessages
        member={member}
        name={channel.name}
        chatId={channel.id}
        type="channel"
        apiUrl="/api/messages"
        socketUrl="/api/messages"
        socketQuery={{
          channel: channel.id,
          serverId: channel.serverId,
        }}
        paramKey="channelId"
        paramValue={channel.id}
      />
        <ChatInput
          name={channel.name}
          type="channel"
          apiUrl="/api/messages"
          query={{
            channelId: channel.id,
            serverId: channel.serverId,
          }}
        />
        </>
      )}

      {channel.type === ChannelType.AUDIO && (
        <MediaRoom 
        chatId={channel.id}
        video={false}
        audio={true}
        />
      )}

      {channel.type === ChannelType.VIDEO && (
        <MediaRoom 
        chatId={channel.id}
        video={true}
        audio={true}
        />
      )}


    </div>
  )
}

export default ChannelIdPage
