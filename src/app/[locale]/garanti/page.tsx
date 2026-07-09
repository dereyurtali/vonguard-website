import type { Metadata } from "next";
import { Check, ShieldCheck } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { CodeEntryForm } from "@/components/warranty/CodeEntryForm";
import { MotionReveal } from "@/components/shared/MotionReveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.warranty" });
  return {
    title: t("title"),
    description: t("description"),
    robots: { index: false, follow: true },
  };
}

export default async function WarrantyLookupPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "warranty" });

  const bullets = [
    t("whatBullet1"),
    t("whatBullet2"),
    t("whatBullet3"),
    t("whatBullet4"),
  ];

  return (
    <section className="relative mx-auto max-w-[1280px] px-6 pt-24 pb-24 md:px-8 md:pt-40 md:pb-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px] bg-[radial-gradient(80%_50%_at_50%_0%,rgba(200,169,106,0.1),transparent_60%)]"
      />
      <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div>
          <MotionReveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/50 px-3 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-accent">
              <ShieldCheck size={12} />
              {t("heroEyebrow")}
            </div>
            <h1 className="vg-display mt-6 max-w-2xl text-4xl text-text-primary sm:text-5xl md:text-[64px]">
              {t("heroHeading")}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-text-muted md:text-lg">
              {t("heroSub")}
            </p>
          </MotionReveal>

          <MotionReveal delay={0.1}>
            <div className="mt-10">
              <CodeEntryForm />
              <p className="mt-4 text-xs text-text-muted">
                {t("help")}{" "}
                <Link
                  href="/iletisim"
                  className="text-accent underline-offset-4 hover:underline"
                >
                  {t("helpLink")}
                </Link>
                .
              </p>
            </div>
          </MotionReveal>
        </div>

        <MotionReveal delay={0.16}>
          <div className="rounded-[20px] border border-border bg-surface p-8 md:p-10">
            <p className="vg-overline">{t("whatTitle")}</p>
            <ul className="mt-6 space-y-4">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-accent">
                    <Check size={12} strokeWidth={2.5} />
                  </span>
                  <span className="text-sm leading-relaxed text-text-primary">
                    {b}
                  </span>
                </li>
              ))}
            </ul>
            <div className="vg-hairline mt-8" />
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-text-dim">
              VG-YYYY-XXXX · 10 yıl / years
            </p>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
