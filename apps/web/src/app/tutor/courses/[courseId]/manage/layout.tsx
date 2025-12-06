import { use } from "react"

import { MobileToggle } from "@/components/actions/MobileToggle"
import ManageSidebar from "@/components/manage-course/ManageSidebar"
import { Button } from "@/components/ui/button"

type ManageLayoutProps = {
  children: React.ReactNode
  params: Promise<{ courseId: string }>
}

const ManageLayout = ({ children, params }: ManageLayoutProps) => {
  const { courseId } = use(params)

  const completed = {
    details: true,
    curriculum: false,
    media: true,
    publish: false,
  }

  return (
    <div className="flex min-h-[calc(100vh-74px)] w-full overflow-hidden">
      <aside className="hidden md:block w-64 border-r border-border bg-background-secondary">
        <ManageSidebar courseId={courseId} />
      </aside>

      <main className="flex-1 p-4">
        <div className="md:hidden flex justify-between">
          <MobileToggle>
            <ManageSidebar courseId={courseId} completed={completed} />
          </MobileToggle>
          <Button>Submit for Review</Button>
        </div>
        {children}
      </main>
    </div>
  )
}

export default ManageLayout
