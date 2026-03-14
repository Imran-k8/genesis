import type { TextareaHTMLAttributes } from "react";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, ...props },
  ref,
) {
  return (
    <textarea
      className={cn(
        "min-h-40 w-full rounded-[1.5rem] border border-border bg-white/75 px-4 py-3 text-sm leading-7 text-foreground outline-none placeholder:text-muted/75 focus:border-accent/35 focus:bg-white focus:ring-4 focus:ring-accent/10",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
