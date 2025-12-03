import { Bell } from "lucide-react"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

const HeaderNotifciation = () => {
  return (
    <HoverCard openDelay={10}>
      <HoverCardTrigger asChild>
        <Bell className="icon-button" />
      </HoverCardTrigger>
      <HoverCardContent>
        The React Framework – created and maintained by @vercel.
      </HoverCardContent>
    </HoverCard>
  )
}

export default HeaderNotifciation
