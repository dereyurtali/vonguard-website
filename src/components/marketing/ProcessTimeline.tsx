import { useTranslations } from "next-intl";
import { MotionReveal } from "@/components/shared/MotionReveal";

export function ProcessTimeline() {
  const t = useTranslations("process");

  const steps = [
    { n: "01", title: t("step1Title"), body: t("step1Body") },
    { n: "02", title: t("step2Title"), body: t("step2Body") },
    { n: "03", title: t("step3Title"), body: t("step3Body") },
    { n: "04", title: t("step4Title"), body: t("step4Body") },
  ];

  return (
    <section className="mx-auto max-w-[1280px] px-6 py-24 md:px-8 md:py-40">
      <MotionReveal>
        <div className="max-w-2xl">
          <p className="vg-overline">{t("eyebrow")}</p>
          <h2 className="vg-display mt-5 text-4xl text-text-primary md:text-5xl">
            {t("heading")}
          </h2>
        </div>
      </MotionReveal>

      <div className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-4">
        <div className="absolute inset-x-0 top-[18px] hidden h-px bg-border md:block" />
        {steps.map((step, i) => (
          <MotionReveal key={step.n} delay={i * 0.06}>
            <div className="relative">
              <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg font-mono text-xs font-semibold text-accent">
                {step.n}
              </div>
              <h3 className="mt-6 font-display text-lg font-semibold text-text-primary">
                {step.title}
              </h3>
              <p className="mt-2 max-w-[240px] text-sm leading-relaxed text-text-muted">
                {step.body}
              </p>
            </div>
          </MotionReveal>
        ))}
      </div>
    </section>
  );
}
