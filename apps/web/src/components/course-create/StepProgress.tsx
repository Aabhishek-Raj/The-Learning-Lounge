"use client";

export default function StepProgress({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      {[1, 2, 3, 4].map((s) => (
        <div key={s} className="flex items-center">
          <div
            className={`h-8 w-8 flex items-center justify-center rounded-full border
                        ${step >= s ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}
          >
            {s}
          </div>
          {s < 4 && <div className="w-10 h-[2px] bg-muted" />}
        </div>
      ))}
    </div>
  );
}
