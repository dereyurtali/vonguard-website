import { cn } from "@/lib/utils";

type Variant = "full" | "monogram";

interface LogoMarkProps {
  variant?: Variant;
  className?: string;
}

export function LogoMark({ variant = "full", className }: LogoMarkProps) {
  if (variant === "monogram") {
    return (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        aria-label="VonGuard"
        className={cn("h-8 w-8", className)}
      >
        {/* Outer diamond */}
        <path
          d="M24 4 L44 24 L24 44 L4 24 Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="miter"
          fill="none"
        />
        {/* Inner hairline diamond */}
        <path
          d="M24 9 L39 24 L24 39 L9 24 Z"
          stroke="currentColor"
          strokeWidth="0.7"
          strokeOpacity="0.4"
          fill="none"
        />
        {/* V */}
        <path
          d="M14 18 L24 34 L34 18"
          stroke="currentColor"
          strokeWidth="2.8"
          strokeLinecap="square"
          strokeLinejoin="miter"
          fill="none"
        />
        {/* Center precision dot */}
        <circle cx="24" cy="24" r="1.1" fill="currentColor" opacity="0.7" />
      </svg>
    );
  }

  return (
    <div className={cn("inline-flex flex-col leading-none", className)}>
      <span className="font-display text-[15px] font-semibold tracking-[-0.01em] uppercase text-text-primary">
        VonGuard
      </span>
      <span className="font-mono text-[8px] font-medium tracking-[0.28em] uppercase text-text-muted">
        Türkiye
      </span>
    </div>
  );
}
