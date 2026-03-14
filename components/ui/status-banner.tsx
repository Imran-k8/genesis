import { cn } from "@/lib/utils";

type StatusBannerProps = {
  className?: string;
  message: string;
  tone?: "success" | "error" | "info";
};

const toneClasses = {
  error: "border-danger/20 bg-danger/8 text-danger",
  info: "border-accent/12 bg-accent-soft/70 text-accent-strong",
  success: "border-accent/18 bg-accent-soft/80 text-accent-strong",
};

export function StatusBanner({ className, message, tone = "info" }: StatusBannerProps) {
  return (
    <div className={cn("rounded-2xl border px-4 py-3 text-sm leading-6", toneClasses[tone], className)}>
      {message}
    </div>
  );
}
