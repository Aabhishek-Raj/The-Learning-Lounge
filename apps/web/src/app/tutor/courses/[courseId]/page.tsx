import { use } from "react"

const Course = ({ params }: { params: Promise<{ courseId: string }> }) => {
  const { courseId } = use(params)
  return <div>Course :- {courseId}</div>
}

export default Course
