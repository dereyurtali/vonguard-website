"use client";

import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useRouter } from "@/i18n/navigation";

export function CodeEntryForm() {
  const t = useTranslations("warranty");
  const router = useRouter();
  const [value, setValue] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = value.trim().toUpperCase();
    if (!code) return;
    setSubmitting(true);
    router.push({
      pathname: "/garanti/[code]",
      params: { code },
    });
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
      <label className="flex-1">
        <span className="sr-only">{t("codeLabel")}</span>
        <input
          type="text"
          inputMode="text"
          autoCapitalize="characters"
          autoComplete="off"
          spellCheck={false}
          placeholder={t("codePlaceholder")}
          value={value}
          onChange={(e) => setValue(e.target.value.toUpperCase())}
          className="vg-mono w-full rounded-sm border border-border bg-bg px-5 py-4 text-lg tracking-[0.08em] text-text-primary placeholder:text-text-dim focus:border-accent focus:outline-none sm:text-xl"
        />
      </label>
      <button
        type="submit"
        disabled={submitting || value.trim().length === 0}
        className="inline-flex h-14 items-center justify-center gap-2 rounded-sm bg-accent px-6 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-bg transition-colors duration-200 hover:bg-accent-hover disabled:opacity-60"
      >
        {t("submit")}
        <ArrowRight size={16} />
      </button>
    </form>
  );
}
