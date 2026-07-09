"use client";

import { animate, useInView, useMotionValue, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { MotionReveal } from "@/components/shared/MotionReveal";

interface Stat {
  value: number;
  suffix?: string;
  label: string;
  decimals?: number;
}

function Counter({ to, decimals = 0 }: { to: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => v.toFixed(decimals));
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    const unsub = rounded.on("change", (v) => setDisplay(v));
    return () => unsub();
  }, [rounded]);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [inView, mv, to]);

  return <span ref={ref}>{display}</span>;
}

export function StatsStrip() {
  const t = useTranslations("stats");

  const stats: Stat[] = [
    { value: 37, label: t("yearsLabel") },
    { value: 1200, suffix: "+", label: t("vehiclesLabel") },
    { value: 10, label: t("warrantyLabel") },
    { value: 99.2, decimals: 1, suffix: "%", label: t("satisfactionLabel") },
  ];

  return (
    <section className="border-y border-hairline bg-surface/30">
      <div className="mx-auto max-w-[1280px] px-6 py-20 md:px-8 md:py-24">
        <MotionReveal>
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-accent" />
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
              {t("eyebrow")}
            </p>
          </div>
          <h2 className="vg-display mt-6 max-w-2xl text-3xl text-text-primary md:text-5xl">
            {t("heading")}
          </h2>
        </MotionReveal>

        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 md:mt-16 md:grid-cols-4 md:gap-8">
          {stats.map((s, i) => (
            <MotionReveal key={s.label} delay={i * 0.06}>
              <div className="relative">
                <div className="vg-display-tight text-[clamp(2.5rem,5vw,4.5rem)] text-text-primary">
                  <Counter to={s.value} decimals={s.decimals} />
                  {s.suffix && (
                    <span className="text-accent">{s.suffix}</span>
                  )}
                </div>
                <div className="mt-4 vg-hairline-solid" />
                <p className="mt-4 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-text-muted">
                  {s.label}
                </p>
              </div>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
