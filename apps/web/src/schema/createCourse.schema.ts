import { z } from "zod";

export const createCourseSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(80, "Title cannot exceed 80 characters"),

  category: z
    .string()
    .min(1, "Category is required"),

  // type: z
  //   .enum(["free", "paid", "private"], "Course type is required"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description cannot exceed 500 characters"),
});

// type for TS
export type CreateCourseInputType = z.infer<typeof createCourseSchema>;
