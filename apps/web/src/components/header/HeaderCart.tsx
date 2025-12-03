import { ShoppingCart } from "lucide-react"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

const HeaderCart = () => {
  return (
    <HoverCard openDelay={10}>
      <HoverCardTrigger asChild>
        <ShoppingCart className="icon-button" />
      </HoverCardTrigger>
      <HoverCardContent>
        The React Framework – created and maintained by @vercel.
      </HoverCardContent>
    </HoverCard>
  )
}

export default HeaderCart
