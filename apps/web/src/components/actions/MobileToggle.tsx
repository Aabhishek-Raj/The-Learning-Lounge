import { Menu } from 'lucide-react'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet'
// import { ServerSidebar } from './server/ServerSidebar'
import { Button } from '../ui/button'
import { NavigationSidebar } from '../navigation/NavigationSidebar'

export const MobileToggle = ({ serverId }: { serverId: string }) => {
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
        <div className="w-[72px]">
          <NavigationSidebar />
        </div>
        {/* <ServerSidebar serverId={serverId} /> */}
      </SheetContent>
    </Sheet>
  )
}
