import { MobileToggle } from "@/components/actions/MobileToggle"
// import { SocketIndicator } from '@/components/SocketIndicator'
import { UserAvatar } from "@/components/UserAvatar"
import { Hash } from "lucide-react"
import { ChatVideoButton } from "@/components/chat/ChatVedioButton"
import { SocketIndicator } from "@/components/SocketIndicator"
import { NavigationSidebar } from "@/components/navigation/NavigationSidebar"
import { ServerSidebar } from "@/components/server/ServerSideBar"

interface ChatHeader {
  serverId: string
  name: string
  type: "channel" | "conversation"
  imageUrl?: string
}

export const ChatHeader = ({ serverId, name, type, imageUrl }: ChatHeader) => {
  return (
    <div
      className="text-md font-semibold px-3 flex items-center h-12
     border-neutral-200 dark:border-neutral-800 border-b-2"
    >
      <MobileToggle>
        <div className="w-[72px]">
          <NavigationSidebar />
        </div>
        <ServerSidebar serverId={serverId} />
      </MobileToggle>
      
      {type === "channel" && <Hash className="w-5 h-5 text-foreground mr-2" />}
      {type == "conversation" && (
        <UserAvatar src={imageUrl} className="h-8 w-8 md:h-8 md:w-8 mr-2" />
      )}
      <p className="font-semibold text-md text-foreground">{name}</p>
      <div className="ml-auto flex items-center">
        {type === "conversation" && <ChatVideoButton />}
        <SocketIndicator />
      </div>
    </div>
  )
}
