import ProgressHeader from "@/components/header/ProgressHeader"
import { use } from "react"

type Params = Promise<{ step: string }>

const CreateCourseLayout = (props: {
  children: React.ReactNode
  params: Params
}) => {
  const params = use(props.params)
  console.log(params)
  return (
    <div>
      <ProgressHeader step={params.step} />
      {props.children}
    </div>
  )
}

export default CreateCourseLayout
