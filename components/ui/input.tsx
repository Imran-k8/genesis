import type { InputHTMLAttributes } from "react";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ className, ...props }, ref) {
  return (
    <input
      className={cn(
        "h-12 w-full rounded-2xl border border-border bg-white/75 px-4 text-sm text-foreground outline-none placeholder:text-muted/75 focus:border-accent/35 focus:bg-white focus:ring-4 focus:ring-accent/10",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
