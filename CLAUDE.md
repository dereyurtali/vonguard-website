@AGENTS.md

# VonGuard Türkiye — agent notes

## Stack (Phase 1 — shipped)
- Next.js 16.2 App Router, TypeScript, Tailwind v4 (via `@tailwindcss/postcss`)
- next-intl v4 (`tr` default, `en`) with localized pathnames in `src/i18n/routing.ts`
- `motion` (framer-motion successor) for scroll reveals and hero parallax
- `react-hook-form` + `zod` for forms

## Next.js 16 gotchas
- `params` and `searchParams` are Promises — `await` in every page/layout.
- `headers()` / `cookies()` / `draftMode()` are async — `await`.
- `middleware.ts` still works (next-intl needs it for edge runtime); Next 16 also supports `proxy.ts` on Node.
- Tailwind v4: no `@tailwind` directives; tokens declared via `@theme` in `globals.css`.
- `motion` imports from `motion/react`, not `framer-motion`.

## Directory layout
```
src/middleware.ts                   next-intl middleware
src/i18n/{routing,request,navigation}.ts
src/app/layout.tsx                  minimal root (passes through to [locale])
src/app/[locale]/layout.tsx         html/body, fonts, NextIntlClientProvider, header/footer
src/app/[locale]/page.tsx           landing
src/app/[locale]/{hakkimizda,hizmetler,iletisim,garanti}/
src/app/api/contact/route.ts        contact form (Phase 1: logs; Phase 4: Supabase + email)
src/components/{shared,marketing,warranty,ui}/
messages/{tr,en}.json               i18n bundles
supabase/migrations/{0001_init,0002_rls,0003_storage}.sql
```

## Design tokens (Graphite Steel — LOCKED)
- `bg #0a0b0d` / `surface #14161a` / `surface-2 #1c1f24` / `border #2a2e35`
- `text-primary #f2f3f5` / `text-muted #8a8f98` / `text-dim #5a606b`
- `accent #c8a96a` / `steel #b0b5bd` / success/warning/danger
- Display: Space Grotesk · Body: Inter · Mono: JetBrains Mono (all via `next/font/google`)

## Not yet implemented (planned phases)
- Phase 2: Supabase client + admin panel + warranty CRUD + photo upload + QR
- Phase 3: public `/garanti/[code]` detail page + rate limit
- Phase 4: SEO polish, email notifications, analytics

## Content rules
- Business details in `messages/*.json` (phone, address) are placeholders until launch — keep them clearly fake (e.g. `555 00 00`, `No: 000`).
- Brand claims must stay within "Alman standartlarında / German-inspired standards" positioning; no certification marks (TÜV/DIN/ISO) without real certificates. Legal review before launch.
