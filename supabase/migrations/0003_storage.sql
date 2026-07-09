-- VonGuard — storage bucket + policies
-- Run in Supabase SQL editor after 0001 and 0002.

-- Create private bucket. Public = false means objects are not directly fetchable;
-- the server hands out short-lived signed URLs via createSignedUrl().
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'vonguard',
  'vonguard',
  false,
  524288,                                    -- 512 KB hard cap per object
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

-- Admin-only write + read on objects in this bucket.
-- Public warranty lookup uses the service-role client to issue signed URLs,
-- which bypasses RLS, so no anon policy is required here.
create policy "vonguard: admin read"
  on storage.objects
  for select
  using (bucket_id = 'vonguard' and public.is_admin());

create policy "vonguard: admin insert"
  on storage.objects
  for insert
  with check (bucket_id = 'vonguard' and public.is_admin());

create policy "vonguard: admin update"
  on storage.objects
  for update
  using (bucket_id = 'vonguard' and public.is_admin())
  with check (bucket_id = 'vonguard' and public.is_admin());

create policy "vonguard: admin delete"
  on storage.objects
  for delete
  using (bucket_id = 'vonguard' and public.is_admin());
