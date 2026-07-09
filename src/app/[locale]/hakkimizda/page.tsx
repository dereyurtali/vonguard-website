import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { HeritageSection } from "@/components/marketing/HeritageSection";
import { ProcessTimeline } from "@/components/marketing/ProcessTimeline";
import { ContactCtaBanner } from "@/components/marketing/ContactCtaBanner";
import { MotionReveal } from "@/components/shared/MotionReveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.about" });
  return { title: t("title"), description: t("description") };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "heritage" });

  return (
    <>
      <section className="mx-auto max-w-[1280px] px-6 pt-24 pb-4 md:px-8 md:pt-40">
        <MotionReveal>
          <p className="vg-overline">{t("eyebrow")}</p>
          <h1 className="vg-display mt-5 max-w-4xl text-4xl text-text-primary sm:text-5xl md:text-[64px]">
            {t("heading")}
          </h1>
        </MotionReveal>
      </section>
      <HeritageSection />
      <ProcessTimeline />
      <ContactCtaBanner />
    </>
  );
}
