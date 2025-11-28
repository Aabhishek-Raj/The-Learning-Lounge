"use client"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import Step1Title from "@/components/course-create/Step1Title"
import Step2Category from "@/components/course-create/Step2Category"
import Step3Type from "@/components/course-create/Step3Type"
import Step4Description from "@/components/course-create/Step4Description"
import { useCourseCreate } from "@/store/createCourseStore"
import { JSX, use, useEffect } from "react"
import StepProgress from "@/components/course-create/StepProgress"

type CourseStore = ReturnType<typeof useCourseCreate.getState>

const StepComponents: Record<number, JSX.Element> = {
  1: <Step1Title />,
  2: <Step2Category />,
  3: <Step3Type />,
  4: <Step4Description />,
}

const fieldMap: Record<number, keyof CourseStore> = {
  1: "title",
  2: "category",
  3: "type",
  4: "description",
}

export default function CreatePage({
  params,
}: {
  params: Promise<{ step: string }>
}) {
  const router = useRouter()

  const { step } = use(params)
  const stepInt = Number(step)

  const state = useCourseCreate()

  // ensure Zustand step matches URL
  useEffect(() => {
    // If user refreshed browser (store empty)
    if (!state.isInitialized) {
      state.markInitialized()
      router.replace("/course/create/1")
      return
    }

    if (state.step !== stepInt) {
      state.setStep(stepInt)
    }
  }, [stepInt, state, router])

  const requiredField = state[fieldMap[stepInt]]
  const canGoNext = requiredField !== null

  const onFinalSubmit = () => {
    console.log(state)
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-10">
      <StepProgress step={stepInt}/>
      {/* Render step */}
      {StepComponents[stepInt]}

      {/* Navigation buttons */}
      <div className="flex justify-between pt-10">
        {stepInt > 1 && (
          <Button
            variant="outline"
            onClick={() => router.push(`/course/create/${stepInt - 1}`)}
          >
            Previous
          </Button>
        )}

        {stepInt < 4 ? (
          <Button
            disabled={!canGoNext}
            onClick={() => router.push(`/course/create/${stepInt + 1}`)}
          >
            Next
          </Button>
        ) : (
          <Button disabled={!canGoNext} onClick={onFinalSubmit}>
            Finish
          </Button>
        )}
      </div>
    </div>
  )
}
