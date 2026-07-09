"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { Link } from "@/i18n/navigation";

export function Hero() {
  const t = useTranslations("hero");
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 800], [0, 80]);

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden"
      aria-labelledby="hero-heading"
      style={{ minHeight: "min(92vh, 960px)" }}
    >
      {/* Full-bleed background photo */}
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0, scale: 1.03 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ y: parallaxY }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=2400&auto=format&fit=crop')",
            filter: "saturate(0.78) contrast(1.08) brightness(0.72)",
          }}
        />
        {/* Darken from bottom for copy legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/70 to-bg/20" />
        {/* Side vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-bg/80 via-transparent to-bg/40" />
        {/* Film grain */}
        <div className="vg-grain absolute inset-0" />
      </motion.div>

      {/* Top gold glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] bg-[radial-gradient(80%_50%_at_50%_0%,rgba(200,169,106,0.07),transparent_60%)]"
      />

      {/* Overlay content — bottom-left anchor */}
      <div className="relative mx-auto flex min-h-[inherit] max-w-[1280px] flex-col justify-end px-6 pt-32 pb-20 md:px-8 md:pt-40 md:pb-28 lg:pt-48 lg:pb-32">
        <div className="max-w-[720px]">
          <motion.p
            className="vg-overline"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {t("eyebrow")}
          </motion.p>

          <motion.h1
            id="hero-heading"
            className="vg-display-tight mt-6 text-text-primary"
            style={{ fontSize: "clamp(2.75rem, 6vw, 6rem)" }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {t("headlineA")}
            <br />
            <span className="text-text-muted">{t("headlineB")}</span>
          </motion.h1>

          <motion.p
            className="mt-8 max-w-xl text-base leading-relaxed text-text-muted md:text-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {t("sub")}
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href="/garanti"
              className="group inline-flex h-12 items-center gap-2.5 rounded-sm bg-accent px-6 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-bg transition-all duration-200 hover:bg-accent-hover"
            >
              {t("primaryCta")}
              <ArrowRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="/hizmetler"
              className="group inline-flex h-12 items-center gap-2.5 px-2 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-text-primary transition-colors duration-200 hover:text-accent"
            >
              {t("secondaryCta")}
              <ArrowRight
                size={14}
                className="opacity-60 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100"
              />
            </Link>
          </motion.div>
        </div>

        {/* Trust strip — bottom hairline with stats */}
        <motion.div
          className="mt-16 md:mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.7, ease: "easeOut" }}
        >
          <div className="vg-hairline-solid" />
          <div className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-text-muted">
            <span>{t("trustA")}</span>
            <span className="text-accent">◆</span>
            <span>{t("trustB")}</span>
            <span className="text-accent">◆</span>
            <span>{t("trustC")}</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-4 left-1/2 hidden -translate-x-1/2 md:block"
      >
        <motion.div
          className="h-8 w-px bg-gradient-to-b from-transparent via-accent to-transparent"
          animate={{ opacity: [0.3, 0.9, 0.3] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </section>
  );
}
