"use client";

import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "@/components/ui/select";
import { useCourseCreate } from "@/store/createCourseStore";

export default function Step2Category() {
  const { category, setField } = useCourseCreate();

  const categoryData = category ?? ''

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Category</h2>
      <Select value={categoryData} onValueChange={(v) => setField("category", v)}>
        <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="web">Web Development</SelectItem>
          <SelectItem value="mobile">Mobile</SelectItem>
          <SelectItem value="design">Design</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
