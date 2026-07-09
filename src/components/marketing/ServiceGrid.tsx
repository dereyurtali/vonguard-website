import { useTranslations } from "next-intl";
import { Layers, Hammer, SprayCan, Gem } from "lucide-react";
import { MotionReveal } from "@/components/shared/MotionReveal";
import { ServiceCard } from "./ServiceCard";

export function ServiceGrid() {
  const t = useTranslations("services");

  const cards = [
    {
      icon: Layers,
      eyebrow: "PPF",
      title: t("ppf.title"),
      summary: t("ppf.summary"),
      bullets: [t("ppf.b1"), t("ppf.b2"), t("ppf.b3")],
      href: "/hizmetler/ppf" as const,
    },
    {
      icon: Hammer,
      eyebrow: "PDR",
      title: t("dent.title"),
      summary: t("dent.summary"),
      bullets: [t("dent.b1"), t("dent.b2"), t("dent.b3")],
      href: "/hizmetler/gocuk-tamiri" as const,
    },
    {
      icon: SprayCan,
      eyebrow: "Scratch",
      title: t("scratch.title"),
      summary: t("scratch.summary"),
      bullets: [t("scratch.b1"), t("scratch.b2"), t("scratch.b3")],
      href: "/hizmetler/cizik-tamiri" as const,
    },
    {
      icon: Gem,
      eyebrow: "Combo",
      title: t("combo.title"),
      summary: t("combo.summary"),
      bullets: [t("combo.b1"), t("combo.b2"), t("combo.b3")],
      href: "/iletisim" as const,
    },
  ];

  return (
    <section
      id="services"
      className="relative mx-auto max-w-[1280px] px-6 py-24 md:px-8 md:py-40"
    >
      <MotionReveal>
        <div className="max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-accent" />
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
              {t("eyebrow")}
            </p>
          </div>
          <h2 className="vg-display mt-6 text-4xl text-text-primary sm:text-5xl md:text-[56px]">
            {t("heading")}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-text-muted md:text-lg">
            {t("sub")}
          </p>
        </div>
      </MotionReveal>

      <div className="mt-14 grid gap-5 md:grid-cols-2">
        {cards.map((card, i) => (
          <MotionReveal key={card.href + card.eyebrow} delay={i * 0.06}>
            <ServiceCard {...card} readMore={t("readMore")} />
          </MotionReveal>
        ))}
      </div>
    </section>
  );
}
