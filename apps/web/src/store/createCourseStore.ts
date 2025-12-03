import { create } from "zustand"

interface CourseCreateState {
  step: number

  title: string | null
  category: string | null
  type: string | null
  description: string | null
  isInitialized: boolean

  setStep: (s: number) => void
  setField: (key: string, value: string | null) => void
  markInitialized: () => void
}

export const useCourseCreate = create<CourseCreateState>((set) => ({
  step: 1,

  title: null,
  category: null,
  type: null,
  description: null,
  isInitialized: false,

  setStep: (step) => set({ step }),
  setField: (key, value) => set({ [key]: value }),
  markInitialized: () => set({ isInitialized: true }),
}))
