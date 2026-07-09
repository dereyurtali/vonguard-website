import type { Metadata } from "next";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactForm } from "@/components/marketing/ContactForm";
import { MapEmbed } from "@/components/marketing/MapEmbed";
import { MotionReveal } from "@/components/shared/MotionReveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.contact" });
  return { title: t("title"), description: t("description") };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contact" });

  const infos = [
    {
      icon: Phone,
      title: t("phoneTitle"),
      value: t("phoneValue"),
      href: "tel:+902125550000",
    },
    {
      icon: Mail,
      title: t("emailTitle"),
      value: t("emailValue"),
      href: "mailto:info@vonguardturkiye.com",
    },
    {
      icon: MapPin,
      title: t("addressTitle"),
      value: t("addressValue"),
    },
    {
      icon: Clock,
      title: t("hoursTitle"),
      value: `${t("hoursWeek")}\n${t("hoursSun")}`,
    },
  ];

  return (
    <>
      <section className="mx-auto max-w-[1280px] px-6 pt-24 pb-12 md:px-8 md:pt-40 md:pb-16">
        <MotionReveal>
          <p className="vg-overline">{t("heroEyebrow")}</p>
          <h1 className="vg-display mt-5 max-w-3xl text-4xl text-text-primary sm:text-5xl md:text-[64px]">
            {t("heroHeading")}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-text-muted md:text-lg">
            {t("heroSub")}
          </p>
        </MotionReveal>
      </section>

      <section className="mx-auto max-w-[1280px] px-6 pb-24 md:px-8 md:pb-40">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <MotionReveal>
            <div className="rounded-[20px] border border-border bg-surface p-8 md:p-10">
              <h2 className="font-display text-2xl font-semibold text-text-primary">
                {t("formTitle")}
              </h2>
              <div className="vg-hairline mt-6" />
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.08}>
            <div className="flex flex-col gap-8">
              <div className="grid gap-5 sm:grid-cols-2">
                {infos.map((info) => {
                  const Body = (
                    <>
                      <div className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-bg text-accent">
                        <info.icon size={16} strokeWidth={1.6} />
                      </div>
                      <p className="mt-4 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-text-muted">
                        {info.title}
                      </p>
                      <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-text-primary">
                        {info.value}
                      </p>
                    </>
                  );
                  return info.href ? (
                    <a
                      key={info.title}
                      href={info.href}
                      className="rounded-lg border border-border bg-surface p-5 transition-colors hover:border-accent/40 hover:bg-surface-2"
                    >
                      {Body}
                    </a>
                  ) : (
                    <div
                      key={info.title}
                      className="rounded-lg border border-border bg-surface p-5"
                    >
                      {Body}
                    </div>
                  );
                })}
              </div>
              <MapEmbed />
            </div>
          </MotionReveal>
        </div>
      </section>
    </>
  );
}
