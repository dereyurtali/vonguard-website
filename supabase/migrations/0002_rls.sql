-- VonGuard — row-level security policies
-- Run after 0001_init.sql.

alter table public.profiles enable row level security;
alter table public.warranty_cards enable row level security;
alter table public.service_applications enable row level security;
alter table public.service_application_components enable row level security;
alter table public.application_photos enable row level security;
alter table public.application_logs enable row level security;
alter table public.lookup_attempts enable row level security;
alter table public.contact_messages enable row level security;

-- ---------------------------------------------------------------------------
-- Helper: is the current user an admin?
-- ---------------------------------------------------------------------------
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
      from public.profiles p
     where p.id = auth.uid()
       and p.role in ('owner', 'staff')
  );
$$;

-- ---------------------------------------------------------------------------
-- profiles
-- ---------------------------------------------------------------------------
create policy "profiles: self or admin select"
  on public.profiles
  for select
  using (id = auth.uid() or public.is_admin());

create policy "profiles: admin write"
  on public.profiles
  for all
  using (public.is_admin())
  with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- warranty_cards / service_applications / components / photos / logs
-- Admin only for CRUD. NO anonymous SELECT — public warranty lookup goes
-- through the service-role client in a server route handler after rate-limit
-- + exact-code match, then shapes a sanitized DTO.
-- ---------------------------------------------------------------------------
create policy "cards: admin all"
  on public.warranty_cards
  for all
  using (public.is_admin())
  with check (public.is_admin());

create policy "applications: admin all"
  on public.service_applications
  for all
  using (public.is_admin())
  with check (public.is_admin());

create policy "components: admin all"
  on public.service_application_components
  for all
  using (public.is_admin())
  with check (public.is_admin());

create policy "photos: admin all"
  on public.application_photos
  for all
  using (public.is_admin())
  with check (public.is_admin());

create policy "logs: admin all"
  on public.application_logs
  for all
  using (public.is_admin())
  with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- lookup_attempts
-- Anonymous users may INSERT (the server route records each attempt).
-- Only admins may read the log.
-- ---------------------------------------------------------------------------
create policy "lookup_attempts: anon insert"
  on public.lookup_attempts
  for insert
  to anon, authenticated
  with check (true);

create policy "lookup_attempts: admin select"
  on public.lookup_attempts
  for select
  using (public.is_admin());

-- ---------------------------------------------------------------------------
-- contact_messages
-- Anonymous INSERT only; admins read their inbox.
-- ---------------------------------------------------------------------------
create policy "contact_messages: anon insert"
  on public.contact_messages
  for insert
  to anon, authenticated
  with check (true);

create policy "contact_messages: admin select"
  on public.contact_messages
  for select
  using (public.is_admin());
