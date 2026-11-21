create table public.donations (
  id uuid primary key default gen_random_uuid(),
  donor_name text not null, email text not null, donation_type text not null default 'One-Time Donation',
  amount text not null default '', message text not null default '', status text not null default 'pending',
  receipt_sent boolean not null default false, created_at timestamptz not null default now());
create table public.volunteers (
  id uuid primary key default gen_random_uuid(),
  full_name text not null, email text not null, phone text not null default '', location text not null default '',
  skills text[] not null default '{}', availability text not null default '', motivation text not null default '',
  status text not null default 'new', created_at timestamptz not null default now());
create table public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null, email text not null, subject text not null default '', message text not null,
  status text not null default 'unread', created_at timestamptz not null default now());
create table public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique, active boolean not null default true, created_at timestamptz not null default now());
create table public.beneficiaries (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.projects(id) on delete set null,
  full_name text not null, gender text not null default '', age int, district text not null default '',
  community text not null default '', notes text not null default '', created_at timestamptz not null default now());
create table public.me_records (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.projects(id) on delete cascade,
  period text not null default '', objective text not null default '', indicator text not null default '',
  district text not null default '', community text not null default '',
  planned_beneficiaries int not null default 0, actual_male int not null default 0, actual_female int not null default 0,
  activities_planned int not null default 0, activities_completed int not null default 0,
  budget numeric not null default 0, expenditure numeric not null default 0,
  outcome text not null default '', evidence_url text, status text not null default 'draft',
  created_at timestamptz not null default now());
create table public.settings (
  id int primary key default 1 check (id = 1),
  org_name text not null default 'Education Connect Uganda', email text not null default 'info@educationconnectuganda.org',
  phone text not null default '+256 700 000 000', address text not null default 'West Nile, Uganda',
  facebook text not null default '', twitter text not null default '', instagram text not null default '', linkedin text not null default '');
insert into public.settings (id) values (1);
create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid, actor_email text, table_name text not null, action text not null, record_id text,
  summary text not null default '', created_at timestamptz not null default now());

do $$ declare t text; begin
  foreach t in array array['donations','volunteers','messages','subscribers','beneficiaries','me_records','settings','audit_logs'] loop
    execute format('grant select, insert, update, delete on public.%I to authenticated', t);
    execute format('grant all on public.%I to service_role', t);
    execute format('alter table public.%I enable row level security', t);
    execute format('create policy "Admins manage %1$s" on public.%1$I for all to authenticated using (public.has_role(auth.uid(), ''admin'')) with check (public.has_role(auth.uid(), ''admin''))', t);
  end loop;
  foreach t in array array['donations','volunteers','messages','subscribers'] loop
    execute format('grant insert on public.%I to anon', t);
    execute format('create policy "Anyone can submit %1$s" on public.%1$I for insert to anon, authenticated with check (true)', t);
  end loop;
end $$;
grant select on public.settings to anon;
create policy "Public read settings" on public.settings for select to anon, authenticated using (true);

-- audit trail
create or replace function public.log_change() returns trigger language plpgsql security definer set search_path = public as $$
declare rec jsonb := to_jsonb(coalesce(new, old));
begin
  if auth.uid() is null or not public.has_role(auth.uid(), 'admin') then return coalesce(new, old); end if;
  insert into public.audit_logs (actor_id, actor_email, table_name, action, record_id, summary)
  values (auth.uid(), auth.jwt()->>'email', tg_table_name, lower(tg_op), rec->>'id',
    coalesce(rec->>'title', rec->>'full_name', rec->>'donor_name', rec->>'name', rec->>'email', rec->>'indicator', rec->>'org_name', ''));
  return coalesce(new, old);
end $$;
do $$ declare t text; begin
  foreach t in array array['programs','projects','reports','posts','donations','volunteers','messages','subscribers','beneficiaries','me_records','settings'] loop
    execute format('create trigger audit_%1$s after insert or update or delete on public.%1$I for each row execute function public.log_change()', t);
  end loop;
end $$;

-- admin user management
create or replace function public.list_admins() returns table (user_id uuid, email text, role app_role)
language plpgsql stable security definer set search_path = public as $$
begin
  if not public.has_role(auth.uid(), 'admin') then raise exception 'Forbidden'; end if;
  return query select r.user_id, u.email::text, r.role from public.user_roles r join auth.users u on u.id = r.user_id order by u.email;
end $$;
create or replace function public.grant_role(_email text, _role app_role) returns void
language plpgsql security definer set search_path = public as $$
declare uid uuid;
begin
  if not public.has_role(auth.uid(), 'admin') then raise exception 'Forbidden'; end if;
  select id into uid from auth.users where lower(email) = lower(_email);
  if uid is null then raise exception 'No account with that email. Ask them to create one on the sign-in page first.'; end if;
  insert into public.user_roles (user_id, role) values (uid, _role) on conflict do nothing;
end $$;
create or replace function public.revoke_role(_user_id uuid, _role app_role) returns void
language plpgsql security definer set search_path = public as $$
begin
  if not public.has_role(auth.uid(), 'admin') then raise exception 'Forbidden'; end if;
  if _user_id = auth.uid() and _role = 'admin' then raise exception 'You cannot remove your own admin access.'; end if;
  delete from public.user_roles where user_id = _user_id and role = _role;
end $$;
revoke execute on function public.list_admins() from anon;
revoke execute on function public.grant_role(text, app_role) from anon;
revoke execute on function public.revoke_role(uuid, app_role) from anon;