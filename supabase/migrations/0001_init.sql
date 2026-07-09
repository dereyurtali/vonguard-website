-- VonGuard — initial schema
-- Run order: 0001_init.sql → 0002_rls.sql → 0003_storage.sql

create extension if not exists "pgcrypto";
create extension if not exists "citext";

-- ---------------------------------------------------------------------------
-- profiles (1:1 with auth.users)
-- ---------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('owner', 'staff')) default 'staff',
  full_name text,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- warranty_cards
-- One card per customer vehicle; the physical card printed with QR + short code.
-- ---------------------------------------------------------------------------
create table public.warranty_cards (
  id uuid primary key default gen_random_uuid(),
  code text not null,                            -- "VG-2026-A7K9"
  code_normalized citext not null unique,        -- case-insensitive lookup
  customer_name text not null,
  customer_phone text,
  customer_email text,
  vehicle_make text not null,
  vehicle_model text not null,
  vehicle_year int,
  vehicle_color text,
  vehicle_plate text,
  vin text,
  notes text,
  status text not null check (status in ('active', 'revoked')) default 'active',
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index on public.warranty_cards (created_at desc);
create index on public.warranty_cards (customer_phone);

-- ---------------------------------------------------------------------------
-- service_applications
-- Each row = one warranty unit. Combos are single rows with kind='combo_*'.
-- Reworks/extensions reference the original via parent_application_id.
-- ---------------------------------------------------------------------------
create type service_kind as enum (
  'ppf',
  'scratch',
  'dent',
  'combo_scratch_ppf',
  'combo_dent_ppf',
  'combo_triple'
);

create table public.service_applications (
  id uuid primary key default gen_random_uuid(),
  card_id uuid not null references public.warranty_cards(id) on delete cascade,
  kind service_kind not null,
  title text,                                    -- free-form, e.g. "Full front PPF"
  applied_on date not null,
  duration_years int not null check (duration_years in (5, 6, 7, 10)),
  expires_at timestamptz not null,               -- computed at write time
  price_try numeric(12, 2),
  is_primary boolean not null default true,      -- false = rework/extension
  parent_application_id uuid references public.service_applications(id),
  notes text,
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now()
);
create index on public.service_applications (card_id, applied_on desc);
create index on public.service_applications (expires_at);

-- Combo breakdown (optional, for reporting — which atomic services make up a combo).
create table public.service_application_components (
  application_id uuid not null
    references public.service_applications(id) on delete cascade,
  component text not null check (component in ('ppf', 'scratch', 'dent')),
  primary key (application_id, component)
);

-- ---------------------------------------------------------------------------
-- application_photos
-- Photos attached to an application. storage_path lives in the 'vonguard' bucket.
-- ---------------------------------------------------------------------------
create type photo_kind as enum ('before', 'after', 'progress', 'update');

create table public.application_photos (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null
    references public.service_applications(id) on delete cascade,
  kind photo_kind not null,
  storage_path text not null,                    -- applications/{app_id}/{kind}/{uuid}.jpg
  width int,
  height int,
  bytes int,
  caption text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
create index on public.application_photos (application_id, kind, sort_order);

-- ---------------------------------------------------------------------------
-- application_logs
-- Timeline events attached to an application (applied, inspection, rework, notes).
-- ---------------------------------------------------------------------------
create type log_kind as enum (
  'applied',
  'inspection',
  'rework',
  'note',
  'warranty_extended'
);

create table public.application_logs (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null
    references public.service_applications(id) on delete cascade,
  kind log_kind not null,
  title text not null,
  body text,
  occurred_on date not null default current_date,
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now()
);
create index on public.application_logs (application_id, occurred_on desc);

-- ---------------------------------------------------------------------------
-- lookup_attempts
-- Rate limiting for the public warranty lookup endpoint.
-- ---------------------------------------------------------------------------
create table public.lookup_attempts (
  id bigserial primary key,
  ip inet not null,
  code_attempt text not null,
  succeeded boolean not null,
  created_at timestamptz not null default now()
);
create index on public.lookup_attempts (ip, created_at desc);

-- ---------------------------------------------------------------------------
-- contact_messages
-- Public contact form submissions.
-- ---------------------------------------------------------------------------
create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  phone text,
  message text not null,
  locale text,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Helper: auto-update updated_at on warranty_cards
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger warranty_cards_updated_at
  before update on public.warranty_cards
  for each row execute function public.set_updated_at();
