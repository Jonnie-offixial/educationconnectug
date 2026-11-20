create type public.app_role as enum ('admin', 'moderator', 'user');
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "Users read own roles" on public.user_roles for select to authenticated using (user_id = auth.uid());

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

-- First account to sign up becomes admin
create or replace function public.handle_first_admin()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if not exists (select 1 from public.user_roles where role = 'admin') then
    insert into public.user_roles (user_id, role) values (new.id, 'admin');
  end if;
  return new;
end $$;
create trigger on_auth_user_created_admin after insert on auth.users
for each row execute function public.handle_first_admin();

create table public.programs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  summary text not null default '',
  image_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subtitle text not null default '',
  summary text not null default '',
  image_url text,
  progress int not null default 0,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
create table public.reports (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.projects(id) on delete set null,
  title text not null,
  category text not null default 'Project',
  report_date text not null default '',
  file_url text,
  created_at timestamptz not null default now()
);
create table public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null default 'Latest News',
  excerpt text not null default '',
  content text not null default '',
  author text not null default '',
  image_url text,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

do $$ declare t text; begin
  foreach t in array array['programs','projects','reports','posts'] loop
    execute format('grant select on public.%I to anon, authenticated', t);
    execute format('grant insert, update, delete on public.%I to authenticated', t);
    execute format('grant all on public.%I to service_role', t);
    execute format('alter table public.%I enable row level security', t);
    execute format('create policy "Admins manage %1$s" on public.%1$I for all to authenticated using (public.has_role(auth.uid(), ''admin'')) with check (public.has_role(auth.uid(), ''admin''))', t);
  end loop;
end $$;
create policy "Public read programs" on public.programs for select to anon, authenticated using (true);
create policy "Public read projects" on public.projects for select to anon, authenticated using (true);
create policy "Public read reports" on public.reports for select to anon, authenticated using (true);
create policy "Public read published posts" on public.posts for select to anon, authenticated using (published);

insert into public.programs (title, summary, sort_order) values
('Education & Skills Training','Providing quality education and vocational skills to improve employability and self-reliance.',1),
('Adolescent Health','Supporting young people with reproductive health education, counseling, and essential services.',2),
('Gender Development','Empowering women and girls through education, economic opportunities, and advocacy for equality.',3),
('Disability Inclusion','Ensuring persons with disabilities have equal access to education, health services, and economic opportunities.',4),
('Peace Building','Fostering social cohesion, conflict resolution, and harmony among diverse communities.',5),
('Advocacy & Human Rights','Raising the voices of the marginalised and promoting the rights of children, women and refugees.',6),
('WASH, HIV/AIDS & Sanitation','Clean water, hygiene promotion, sanitation facilities and HIV/AIDS awareness in schools and villages.',7),
('Youth Empowerment','Leadership, sports, and wellbeing programs to build confidence and life skills among young people.',8);

with p as (insert into public.projects (title, subtitle, summary, progress, sort_order) values
('AGENCI','Adolescent Girls Education in Crisis Initiative','Helping out-of-school and at-risk adolescent girls in refugee settlements return to learning and stay in school.',75,1),
('Community ECD Centers','Early Childhood Development','Community-run early learning centres that give young children a strong, play-based start.',60,2),
('Refugee Youth Skilling','Vocational training for refugee & host youth','Tailoring, carpentry, ICT and business skills for refugee and host-community youth.',50,3),
('Menstrual Hygiene Campaigns','Dignity kits & school outreach','Reusable pad distribution, hygiene education and breaking stigma in schools.',85,4)
returning id, title)
insert into public.reports (project_id, title, category, report_date)
select id, r.t, r.c, r.d from p join (values
 ('AGENCI','AGENCI Project Evaluation','Project','October 2024'),
 ('Community ECD Centers','ECD Centres Annual Report 2023','Annual','December 2023'),
 ('Refugee Youth Skilling','Youth Skilling Evaluation 2024','Evaluation','2024'),
 ('Menstrual Hygiene Campaigns','MHM Campaign Report 2023','Project','2023')) r(pt,t,c,d) on r.pt = p.title;
insert into public.reports (title, category, report_date) values
('Annual Report 2024','Annual','December 2024'),
('Community Health Assessment','Research','August 2024');

insert into public.posts (title, category, excerpt, author) values
('Hundreds of girls return to school through AGENCI','Latest News','The new term saw record enrolment of adolescent girls across our partner schools.','ECU Team'),
('Three new community ECD centres open','Field Reports','Parents and local leaders came together to build safe learning spaces for young children.','ECU Team'),
('Football for peace brings two communities together','Impact Stories','A youth league is helping refugee and host-community teenagers build lasting friendships.','ECU Team'),
('Women lead community dialogue on gender equity','Latest News','Community conversations are changing attitudes about girls'' education.','ECU Team');