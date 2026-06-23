import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-[80px] w-full rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-black/40 px-4 py-3 text-sm shadow-inner transition-all duration-300 outline-none placeholder:text-foreground/40 focus-visible:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:bg-primary/5 focus-visible:shadow-[0_0_15px_rgba(75,134,247,0.15)] hover:border-black/20 dark:hover:border-white/20 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
