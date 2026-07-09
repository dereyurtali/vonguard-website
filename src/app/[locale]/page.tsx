import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/marketing/Hero";
import { StatsStrip } from "@/components/marketing/StatsStrip";
import { ServiceGrid } from "@/components/marketing/ServiceGrid";
import { HeritageSection } from "@/components/marketing/HeritageSection";
import { ProcessTimeline } from "@/components/marketing/ProcessTimeline";
import { ContactCtaBanner } from "@/components/marketing/ContactCtaBanner";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <StatsStrip />
      <ServiceGrid />
      <HeritageSection />
      <ProcessTimeline />
      <ContactCtaBanner />
    </>
  );
}
