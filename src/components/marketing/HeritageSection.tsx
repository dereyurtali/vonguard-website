import { useTranslations } from "next-intl";
import { MotionReveal } from "@/components/shared/MotionReveal";

export function HeritageSection() {
  const t = useTranslations("heritage");

  const timeline = [
    { year: t("t1Year"), label: t("t1Label") },
    { year: t("t2Year"), label: t("t2Label") },
    { year: t("t3Year"), label: t("t3Label") },
    { year: t("t4Year"), label: t("t4Label") },
  ];

  return (
    <section className="relative isolate overflow-hidden border-y border-border bg-surface/50">
      <div className="vg-grain pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_10%_50%,rgba(200,169,106,0.05),transparent_60%)]"
      />
      <div className="relative mx-auto max-w-[1280px] px-6 py-24 md:px-8 md:py-40">
        <div className="grid items-start gap-14 lg:grid-cols-[1fr_1.1fr]">
          <MotionReveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-border bg-bg">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1613294326794-e7c74e8b6e7f?q=80&w=1200&auto=format&fit=crop')",
                  filter: "grayscale(0.85) contrast(1.08) brightness(0.75)",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent" />
            </div>
          </MotionReveal>

          <div>
            <MotionReveal>
              <p className="vg-overline">{t("eyebrow")}</p>
              <h2 className="vg-display mt-5 text-4xl text-text-primary md:text-5xl lg:text-[56px]">
                {t("heading")}
              </h2>
            </MotionReveal>

            <MotionReveal delay={0.08}>
              <p className="mt-8 text-base leading-relaxed text-text-muted md:text-lg">
                {t("p1")}
              </p>
              <p className="mt-6 text-base leading-relaxed text-text-muted md:text-lg">
                {t("p2")}
              </p>
            </MotionReveal>

            <MotionReveal delay={0.16}>
              <div className="mt-14">
                <div className="vg-hairline" />
                <ol className="mt-8 grid grid-cols-2 gap-y-8 md:grid-cols-4">
                  {timeline.map((item, i) => (
                    <li key={item.year} className="relative">
                      <span
                        aria-hidden
                        className="absolute -top-[34px] left-0 block h-1.5 w-1.5 rounded-full bg-accent"
                      />
                      <p className="font-mono text-sm font-medium tracking-[0.08em] text-accent">
                        {item.year}
                      </p>
                      <p className="mt-2 text-xs leading-snug text-text-muted">
                        {item.label}
                      </p>
                      {i < timeline.length - 1 && (
                        <span
                          aria-hidden
                          className="absolute -top-[31px] left-3 hidden h-px w-[calc(100%-0.75rem)] bg-border md:block"
                        />
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            </MotionReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
