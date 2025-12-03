"use client"
import { useRouter } from "next/navigation"
import { JSX, use, useEffect } from "react"
import z from "zod"

import Step1Title from "@/components/course-create/Step1Title"
import Step2Category from "@/components/course-create/Step2Category"
import Step3Type from "@/components/course-create/Step3Type"
import Step4Description from "@/components/course-create/Step4Description"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useCourseCreate } from "@/store/createCourseStore"
import { authFetch } from "@/lib/auth"
import { createCourseSchema } from "@/schema/createCourse.schema"

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

  const onFinalSubmit = async () => {
    try {
      const rawData = {
        title: state.title?.trim(),
        description: state.description?.trim(),
        category: state.category?.trim()
      }

      const parsed = createCourseSchema.safeParse(rawData)
      if (!parsed.success) {
        console.log(z.treeifyError(parsed.error))
        return
      }
      const res = await authFetch("/api/courses", {
        method: "POST",
        body: JSON.stringify(parsed.data),
      })
      if (!res.ok) {
        const msg = await res.text()
        throw new Error(`Failed to create course: ${msg}`)
      }
      const response = await res.json()

      if (!response?.data?.id) {
        throw new Error("Invalid API response structure.")
      }
      router.push(`/tutor/courses/${response.data.id}`)
    } catch (error) {
      console.error("Course creation error:", error)
    }
  }

  return (
    <div className="flex flex-col max-w-2xl min-h-[calc(100vh-84px)] justify-between mx-auto p-6 space-y-10">
      {/* Render step */}
      <div className="flex-1 py-7">
      {StepComponents[stepInt]}
      </div>

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
            Create Course
          </Button>
        )}
      </div>
    </div>
  )
}
