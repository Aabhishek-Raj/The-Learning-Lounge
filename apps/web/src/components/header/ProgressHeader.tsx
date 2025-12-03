"use client"
import Image from "next/image"
import Link from "next/link"
import { Progress } from "../ui/progress"

const ProgressHeader = ({ step }: { step: string }) => {
  return (
    <>
      <div className="w-full flex items-center gap-6 px-6 py-3 bg-background border-b border-border">
        <Link
          href="/"
          className="flex items-center hover:opacity-80 transition"
        >
          <Image
            src="/training.png"
            alt="LearningLounge Logo"
            width={48}
            height={48}
            className="rounded-lg shadow-elegant"
          />
        </Link>
        <div className="flex-1 justify-start">Step {step} of 4</div>

        <Link href="/" className="hover:opacity-80 transition">
          Exit
        </Link>
      </div>
      <Progress value={Number(step) * 25} />
    </>
  )
}

export default ProgressHeader
