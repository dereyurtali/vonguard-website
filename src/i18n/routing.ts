import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["tr", "en"],
  defaultLocale: "tr",
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/hakkimizda": {
      tr: "/hakkimizda",
      en: "/about",
    },
    "/hizmetler": {
      tr: "/hizmetler",
      en: "/services",
    },
    "/hizmetler/ppf": {
      tr: "/hizmetler/ppf",
      en: "/services/ppf",
    },
    "/hizmetler/cizik-tamiri": {
      tr: "/hizmetler/cizik-tamiri",
      en: "/services/scratch-repair",
    },
    "/hizmetler/gocuk-tamiri": {
      tr: "/hizmetler/gocuk-tamiri",
      en: "/services/dent-repair",
    },
    "/iletisim": {
      tr: "/iletisim",
      en: "/contact",
    },
    "/garanti": {
      tr: "/garanti",
      en: "/warranty",
    },
    "/garanti/[code]": {
      tr: "/garanti/[code]",
      en: "/warranty/[code]",
    },
  },
});

export type Locale = (typeof routing.locales)[number];
