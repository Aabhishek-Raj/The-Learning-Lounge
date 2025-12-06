import { LayoutDashboard } from "lucide-react"
import { redirect } from "next/navigation"

import { db } from "@repo/db"
import { TitleForm } from "../_components/TitleForm"

const Course = async ({
  params,
}: {
  params: Promise<{ courseId: string }>
}) => {
  const { courseId } = await params

  const course = await db.course.findFirst({
    where: {
      id: courseId,
    },
  })

  if (!course) {
    redirect("/")
  }

  const requiredFields = [
    course.title,
    course.description,
    course.category,
    course.thumbnail,
  ]
  const completedFields = requiredFields.filter(Boolean).length

  const completionText = `(${completedFields}/${requiredFields.length})`

  return (
    <div className="p-6">
      <div className="flex item-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Course Landing Page</h1>
          <span className="text-sm text-muted">
            Complete all fields {completionText}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div className="flex items-center gap-x-2">
          <LayoutDashboard />
          <h2 className="text-xl">Customise your course</h2>
        </div>
        <TitleForm initialData={course} courseId={course.id} />
      </div>
    </div>
  )
}

export default Course
