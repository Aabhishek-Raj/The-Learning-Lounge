import { redirect } from "next/navigation";
import { use } from "react";

export default function CreateRedirect({
  params,
}: {
  params: Promise<{ courseId: string }>
}) {
  const { courseId } =  use(params)

  return redirect(`/tutor/courses/${courseId}/manage/goals`);
}