"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useCourseCreate } from "@/store/createCourseStore"
import { Label } from "@/components/ui/label"

export default function Step3Type() {
  const { type, setField } = useCourseCreate()

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Course Type</h2>
      <RadioGroup value={type} onValueChange={(v) => setField("type", v)}>
        <div className="flex items-center gap-3">
          <RadioGroupItem value="free" id="r1" />
          <Label htmlFor="r1">Free</Label>
        </div>
        <div className="flex items-center gap-3">
          <RadioGroupItem value="paid" id="r2" />
          <Label htmlFor="r2">Paid</Label>
        </div>
        <div className="flex items-center gap-3">
          <RadioGroupItem value="subscription" id="r3" />
          <Label htmlFor="r3">subscription</Label>
        </div>
      </RadioGroup>
    </div>
  )
}
