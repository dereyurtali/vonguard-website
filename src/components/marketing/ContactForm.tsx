"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "min"),
  email: z.string().email().or(z.literal("")).optional(),
  phone: z.string().min(6, "min"),
  message: z.string().min(8, "min"),
});

type FormValues = z.infer<typeof schema>;

export function ContactForm() {
  const t = useTranslations("contact");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", phone: "", message: "" },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("failed");
      toast.success(t("success"));
      reset();
    } catch {
      toast.error(t("error"));
    }
  };

  const inputCls =
    "w-full rounded-sm border border-border bg-bg px-4 py-3 text-sm text-text-primary placeholder:text-text-dim focus:border-accent focus:outline-none transition-colors";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-5"
      aria-label={t("formTitle")}
    >
      <div className="grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-text-muted">
            {t("nameLabel")}
          </span>
          <input
            type="text"
            autoComplete="name"
            placeholder={t("namePlaceholder")}
            className={inputCls}
            aria-invalid={!!errors.name}
            {...register("name")}
          />
        </label>

        <label className="block">
          <span className="mb-2 block font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-text-muted">
            {t("phoneLabel")}
          </span>
          <input
            type="tel"
            autoComplete="tel"
            placeholder={t("phonePlaceholder")}
            className={inputCls}
            aria-invalid={!!errors.phone}
            {...register("phone")}
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-2 block font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-text-muted">
          {t("emailLabel")}
        </span>
        <input
          type="email"
          autoComplete="email"
          placeholder={t("emailPlaceholder")}
          className={inputCls}
          aria-invalid={!!errors.email}
          {...register("email")}
        />
      </label>

      <label className="block">
        <span className="mb-2 block font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-text-muted">
          {t("messageLabel")}
        </span>
        <textarea
          rows={5}
          placeholder={t("messagePlaceholder")}
          className={`${inputCls} resize-none`}
          aria-invalid={!!errors.message}
          {...register("message")}
        />
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-sm bg-accent px-6 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-bg transition-colors duration-200 hover:bg-accent-hover disabled:opacity-60"
      >
        {isSubmitting ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}
