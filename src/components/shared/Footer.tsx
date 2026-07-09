import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LogoMark } from "./LogoMark";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-border bg-bg">
      <div className="mx-auto max-w-[1240px] px-6 py-16 md:px-8">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5">
              <LogoMark variant="monogram" className="h-8 w-8 text-accent" />
              <LogoMark variant="full" />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-text-muted">
              {t("tagline")}
            </p>
            <div className="vg-hairline mt-6" />
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-text-dim">
              DEU 1987 · Türkiye Temsilcisi
            </p>
          </div>

          <div>
            <h3 className="vg-overline text-text-primary">{t("navigate")}</h3>
            <ul className="mt-5 space-y-3 text-sm text-text-muted">
              <li>
                <Link href="/" className="hover:text-text-primary">
                  {tNav("home")}
                </Link>
              </li>
              <li>
                <Link href="/hizmetler" className="hover:text-text-primary">
                  {tNav("services")}
                </Link>
              </li>
              <li>
                <Link href="/hakkimizda" className="hover:text-text-primary">
                  {tNav("about")}
                </Link>
              </li>
              <li>
                <Link href="/iletisim" className="hover:text-text-primary">
                  {tNav("contact")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="vg-overline text-text-primary">{t("services")}</h3>
            <ul className="mt-5 space-y-3 text-sm text-text-muted">
              <li>
                <Link
                  href="/hizmetler/ppf"
                  className="hover:text-text-primary"
                >
                  {t("servicePpf")}
                </Link>
              </li>
              <li>
                <Link
                  href="/hizmetler/gocuk-tamiri"
                  className="hover:text-text-primary"
                >
                  {t("serviceDent")}
                </Link>
              </li>
              <li>
                <Link
                  href="/hizmetler/cizik-tamiri"
                  className="hover:text-text-primary"
                >
                  {t("serviceScratch")}
                </Link>
              </li>
              <li>
                <Link href="/garanti" className="hover:text-text-primary">
                  {tNav("checkWarranty")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="vg-overline text-text-primary">{t("contact")}</h3>
            <ul className="mt-5 space-y-3 text-sm text-text-muted">
              <li>
                <a
                  href="tel:+902125550000"
                  className="hover:text-text-primary"
                >
                  +90 212 555 00 00
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@vonguardturkiye.com"
                  className="hover:text-text-primary"
                >
                  info@vonguardturkiye.com
                </a>
              </li>
              <li className="leading-relaxed">{t("address")}</li>
            </ul>
          </div>
        </div>

        <div className="vg-hairline mt-16" />

        <div className="mt-6 flex flex-col items-start justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-text-dim md:flex-row md:items-center">
          <p>
            © {year} VonGuard Türkiye · {t("rights")}
          </p>
          <p>{t("madeIn")}</p>
        </div>
      </div>
    </footer>
  );
}
