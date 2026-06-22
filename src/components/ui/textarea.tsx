import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-16 w-full rounded-lg border border-border/40 bg-muted/10 px-3 py-2 text-sm shadow-inner transition-all duration-300 outline-none placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:bg-primary/5 focus-visible:shadow-[0_0_15px_rgba(75,134,247,0.25)] hover:border-border/80 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
