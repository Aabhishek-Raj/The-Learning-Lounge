import { NextResponse } from "next/server"
import { getCurrentProfile } from "@/lib/auth"
import { db } from "@repo/db"
import { createCourseSchema } from "@/schema/createCourse.schema"
import z from "zod"

export async function POST(req: Request) {
  try {
    const profile = await getCurrentProfile()
    if (!profile) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const parsed = createCourseSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { errors: z.treeifyError(parsed.error) },
        { status: 400 },
      )
    }
    const created = await db.course.create({
      data: {
        ...parsed.data,
        tutorId: profile.profileId,
      },
    })

    return NextResponse.json({ data: created })
  } catch (err) {
    console.error("COURSE:", err)
    return NextResponse.json({ error: "Server Error" }, { status: 500 })
  }
}
