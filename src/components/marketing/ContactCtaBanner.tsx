import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { MotionReveal } from "@/components/shared/MotionReveal";

export function ContactCtaBanner() {
  const t = useTranslations("contactCta");

  return (
    <section className="relative mx-auto max-w-[1280px] px-6 pb-24 md:px-8 md:pb-40">
      <MotionReveal>
        <div className="relative overflow-hidden rounded-[20px] border border-border bg-surface px-8 py-14 md:px-16 md:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[radial-gradient(circle_at_center,rgba(200,169,106,0.16),transparent_60%)]"
          />
          <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-xl">
              <p className="vg-overline">{t("eyebrow")}</p>
              <h2 className="vg-display mt-4 text-3xl text-text-primary md:text-5xl">
                {t("heading")}
              </h2>
              <p className="mt-4 text-base text-text-muted md:text-lg">
                {t("sub")}
              </p>
            </div>
            <Link
              href="/iletisim"
              className="group inline-flex h-12 shrink-0 items-center gap-2 rounded-sm bg-accent px-6 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-bg transition-all duration-200 hover:bg-accent-hover"
            >
              {t("cta")}
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </MotionReveal>
    </section>
  );
}
