import type { Metadata } from "next";
import { SprayCan } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ServiceDetail } from "@/components/marketing/ServiceDetail";
import { ContactCtaBanner } from "@/components/marketing/ContactCtaBanner";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.scratch" });
  return { title: t("title"), description: t("description") };
}

export default async function ScratchPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "services.scratch" });

  return (
    <>
      <ServiceDetail
        icon={SprayCan}
        eyebrow="Scratch"
        title={t("title")}
        heroCopy={t("heroCopy")}
        specTitle={t("specTitle")}
        specs={[
          { key: t("spec1Key"), value: t("spec1Value") },
          { key: t("spec2Key"), value: t("spec2Value") },
          { key: t("spec3Key"), value: t("spec3Value") },
          { key: t("spec4Key"), value: t("spec4Value") },
        ]}
        image="https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=1600&auto=format&fit=crop"
      />
      <ContactCtaBanner />
    </>
  );
}
