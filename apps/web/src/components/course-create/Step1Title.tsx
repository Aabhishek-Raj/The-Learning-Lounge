"use client";

import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useCourseCreate } from "@/store/createCourseStore";

export default function Step1Title() {
  const { title, setField } = useCourseCreate();

  const { register, watch } = useForm({
    defaultValues: { title: title ?? "" },
  });

  const value = watch("title");

  useEffect(() => {
    setField("title", value.trim() === "" ? null : value);
  }, [value, setField]);

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold">Course Title</h2>
      <input
        {...register("title")}
        className="border p-2 rounded w-full"
        placeholder="Enter title…"
      />
    </div>
  );
}

