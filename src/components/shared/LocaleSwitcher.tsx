"use client";

import { useLocale } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  return (
    <div
      className={cn(
        "inline-flex items-center gap-0 rounded-full border border-border bg-surface/60 p-0.5 font-mono text-[11px] font-medium uppercase tracking-[0.18em]",
        isPending && "opacity-60",
      )}
      role="group"
      aria-label="Language"
    >
      {routing.locales.map((loc) => {
        const active = loc === locale;
        return (
          <button
            key={loc}
            type="button"
            aria-pressed={active}
            disabled={isPending || active}
            onClick={() => {
              startTransition(() => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                router.replace(pathname as any, { locale: loc });
              });
            }}
            className={cn(
              "rounded-full px-2.5 py-1 transition-colors duration-200",
              active
                ? "bg-accent text-bg"
                : "text-text-muted hover:text-text-primary",
            )}
          >
            {loc}
          </button>
        );
      })}
    </div>
  );
}
