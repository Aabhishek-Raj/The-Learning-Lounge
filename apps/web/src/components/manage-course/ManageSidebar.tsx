"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { manageSidebarItems } from "@/constants/sidebarItems"

type ManageSidebarProps = {
  courseId: string
  completed?: Record<string, boolean>
}

export default function ManageSidebar({
  courseId,
  completed = {},
}: ManageSidebarProps) {
  const pathname = usePathname()

  return (
    <div className="space-y-8 p-4 w-full">
      {manageSidebarItems.map((section) => (
        <div key={section.title}>
          <h4 className="text-sm font-semibold text-muted-foreground mb-3">
            {section.title}
          </h4>

          <div className="space-y-3">
            {section.items.map((item) => {
              const href = `/tutor/courses/${courseId}/manage/${item.section}`
              const isActive = pathname.startsWith(href)
              const isChecked = completed[item.key]

              return (
                <Link
                  key={item.key}
                  href={href}
                  className={`flex items-center gap-3 p-2 rounded-lg transition 
                    ${isActive ? "bg-primary/10 text-primary" : "hover:bg-muted text-muted-foreground"}`}
                >
                  <Checkbox
                    checked={isChecked}
                    className="pointer-events-none"
                  />
                  <Label>{item.label}</Label>
                </Link>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
