"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { LogoMark } from "./LogoMark";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { cn } from "@/lib/utils";

type NavHref =
  | "/"
  | "/hakkimizda"
  | "/hizmetler"
  | "/iletisim"
  | "/garanti";

const nav: { href: NavHref; key: "home" | "about" | "services" | "contact" }[] =
  [
    { href: "/", key: "home" },
    { href: "/hizmetler", key: "services" },
    { href: "/hakkimizda", key: "about" },
    { href: "/iletisim", key: "contact" },
  ];

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border/70 bg-bg/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-[1280px] items-center justify-between gap-8 px-6 transition-[height] duration-300 md:px-8",
          scrolled ? "h-14 md:h-16" : "h-16 md:h-20",
        )}
      >
        <Link
          href="/"
          className="flex items-center gap-2.5 text-text-primary transition-opacity hover:opacity-80"
        >
          <LogoMark variant="monogram" className="h-7 w-7 text-accent" />
          <LogoMark variant="full" />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative text-sm font-medium transition-colors",
                  active
                    ? "text-text-primary"
                    : "text-text-muted hover:text-text-primary",
                )}
              >
                {t(item.key)}
                {active && (
                  <span className="absolute -bottom-1.5 left-0 right-0 h-px bg-accent" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <LocaleSwitcher />
          <Link
            href="/garanti"
            className="hidden rounded-sm bg-accent px-4 py-2 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-bg transition-colors hover:bg-accent-hover md:inline-flex"
          >
            {t("checkWarranty")}
          </Link>
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-border text-text-primary lg:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-bg/95 backdrop-blur-xl">
          <nav className="flex flex-col px-6 py-4" aria-label="Mobile">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-3 text-base font-medium text-text-primary"
              >
                {t(item.key)}
              </Link>
            ))}
            <Link
              href="/garanti"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex items-center justify-center rounded-sm bg-accent px-4 py-3 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-bg"
            >
              {t("checkWarranty")}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
