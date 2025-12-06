import { Menu } from "lucide-react"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import React from "react"

import { Button } from "../ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

type MobileToggleProps = {
  children: React.ReactNode
}

export const MobileToggle = ({ children }: MobileToggleProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 flex-col gap-0 ">
        <VisuallyHidden>
          <SheetHeader>
            <SheetTitle>Navigation bar</SheetTitle>
          </SheetHeader>
        </VisuallyHidden>
        <div className="flex h-full">{children}</div>
      </SheetContent>
    </Sheet>
  )
}
