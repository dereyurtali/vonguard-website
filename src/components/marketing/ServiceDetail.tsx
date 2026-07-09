import type { LucideIcon } from "lucide-react";
import { MotionReveal } from "@/components/shared/MotionReveal";

interface SpecRow {
  key: string;
  value: string;
}

interface ServiceDetailProps {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  heroCopy: string;
  specTitle: string;
  specs: SpecRow[];
  image: string;
}

export function ServiceDetail({
  icon: Icon,
  eyebrow,
  title,
  heroCopy,
  specTitle,
  specs,
  image,
}: ServiceDetailProps) {
  return (
    <section className="mx-auto max-w-[1280px] px-6 pt-24 pb-24 md:px-8 md:pt-40 md:pb-40">
      <MotionReveal>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-surface text-accent">
            <Icon size={18} strokeWidth={1.6} />
          </div>
          <p className="vg-overline">{eyebrow}</p>
        </div>
        <h1 className="vg-display mt-6 max-w-4xl text-4xl text-text-primary sm:text-5xl md:text-[64px]">
          {title}
        </h1>
      </MotionReveal>

      <div className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_1fr]">
        <MotionReveal delay={0.06}>
          <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-border bg-surface">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${image})`,
                filter: "saturate(0.75) contrast(1.05) brightness(0.85)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg/40 via-transparent to-transparent" />
          </div>
        </MotionReveal>

        <MotionReveal delay={0.12}>
          <p className="text-base leading-relaxed text-text-muted md:text-lg">
            {heroCopy}
          </p>

          <div className="mt-10">
            <p className="vg-overline">{specTitle}</p>
            <div className="mt-5">
              <div className="vg-hairline" />
              {specs.map((s) => (
                <div
                  key={s.key}
                  className="flex items-start justify-between gap-6 border-b border-border py-4 last:border-b-0"
                >
                  <span className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-text-muted">
                    {s.key}
                  </span>
                  <span className="max-w-[60%] text-right text-sm text-text-primary">
                    {s.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
