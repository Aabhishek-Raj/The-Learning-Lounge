'use client'

import { ModeToggle } from "@/components/actions/ModeToggle"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import {
  Command,
  CommandItem,
  CommandShortcut,
  CommandGroup,
  CommandSeparator,
} from "@/components/ui/command"

const ProfileDropdown = () => {


  return (
    <HoverCard openDelay={10}>
      <HoverCardTrigger asChild>
        <div className="bg-white 
          dark:bg-red-600 
          hover:bg-purple-300 
          dark:hover:bg-amber-700
          cursor-pointer 
          rounded-full 
          w-10 h-10 mr-4"/>
      </HoverCardTrigger> 

      <HoverCardContent className="w-80 p-0">
        <Command>
          <CommandGroup heading="My Account">
            <CommandItem>
              Profile
              <CommandShortcut>⇧⌘P</CommandShortcut>
            </CommandItem>

            <CommandItem>
              Billing
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>

            <CommandItem>
              Settings
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>

            <CommandItem>
              Keyboard shortcuts
              <CommandShortcut>⌘K</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          
           {/* DARK MODE */}
          <CommandGroup heading="Appearance">
            <CommandItem>
              Toggle Mode <ModeToggle />
              <CommandShortcut>{"🌙/☀️"}</CommandShortcut>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />
          

          <CommandGroup heading="Team">
            <CommandItem>Team</CommandItem>
            <CommandItem>Invite users</CommandItem>
            <CommandItem>New Team</CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup>
            <CommandItem>GitHub</CommandItem>
            <CommandItem>Support</CommandItem>
            <CommandItem disabled>API</CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandItem>
            Log out
            <CommandShortcut>⇧⌘Q</CommandShortcut>
          </CommandItem>
        </Command>
      </HoverCardContent>
    </HoverCard>
  )
}

export default ProfileDropdown
