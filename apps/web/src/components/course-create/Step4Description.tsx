"use client";

import { Textarea } from "@/components/ui/textarea";
import { useCourseCreate } from "@/store/createCourseStore";

export default function Step4Description() {
  const { description, setField } = useCourseCreate();

  const descriptionData = description ?? ''

  const onSubmit = (title: string, value: string) => {
    setField(title, value.trim() === "" ? null: value)
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Description</h2>
      <Textarea
        value={descriptionData}
        onChange={(e) => onSubmit("description", e.target.value)}
        placeholder="Write a detailed description..."
      />
    </div>
  );
}
