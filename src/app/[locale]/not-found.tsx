import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <section className="mx-auto flex min-h-[60dvh] max-w-[1240px] flex-col items-start justify-center px-6 py-24 md:px-8">
      <p className="font-mono text-sm font-medium tracking-[0.16em] text-accent">
        {t("code")}
      </p>
      <h1 className="vg-display mt-4 text-4xl text-text-primary md:text-6xl">
        {t("heading")}
      </h1>
      <p className="mt-4 max-w-md text-base text-text-muted">{t("sub")}</p>
      <Link
        href="/"
        className="mt-8 inline-flex h-12 items-center rounded-sm border border-border px-6 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-text-primary transition-colors hover:border-accent hover:bg-surface"
      >
        {t("back")}
      </Link>
    </section>
  );
}
