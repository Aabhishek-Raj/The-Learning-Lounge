import { Heart } from "lucide-react"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

const HeaderWishlist = () => {
  return (
    <HoverCard openDelay={10}>
      <HoverCardTrigger asChild>
        <Heart className="icon-button" />
      </HoverCardTrigger>
      <HoverCardContent>
        The React Framework – created and maintained by @vercel.
      </HoverCardContent>
    </HoverCard>
  )
}

export default HeaderWishlist
