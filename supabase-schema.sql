-- Cajun's Tarkov Contracts v4 - Supabase setup
-- Run this in Supabase SQL Editor.

create table if not exists public.ctc_streamer_profiles (
  id uuid primary key default gen_random_uuid(),
  streamer_name text unique not null,
  default_level int not null default 1,
  default_rubles int not null default 100000,
  created_at timestamptz not null default now()
);

create table if not exists public.ctc_events (
  id uuid primary key default gen_random_uuid(),
  event_code text unique not null,
  event_name text not null default 'Friday Night Mayhem',
  map text not null default 'Customs',
  time_of_day text not null default 'Day',
  status text not null default 'open',
  squad_rule text,
  last_rolled_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.ctc_event_players (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.ctc_events(id) on delete cascade,
  streamer_profile_id uuid not null references public.ctc_streamer_profiles(id) on delete cascade,
  streamer_name text not null,
  level int not null default 1,
  rubles int not null default 100000,
  playing boolean not null default true,
  ready boolean not null default false,
  created_at timestamptz not null default now(),
  unique(event_id, streamer_profile_id)
);

create table if not exists public.ctc_contracts (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.ctc_events(id) on delete cascade,
  event_player_id uuid references public.ctc_event_players(id) on delete set null,
  streamer_name text,
  level int,
  money int,
  weapon text,
  ammo text,
  weapon_style text,
  armor text,
  helmet text,
  rig text,
  backpack text,
  estimated_cost int,
  challenge text,
  error_message text,
  created_at timestamptz not null default now()
);

alter table public.ctc_streamer_profiles enable row level security;
alter table public.ctc_events enable row level security;
alter table public.ctc_event_players enable row level security;
alter table public.ctc_contracts enable row level security;

drop policy if exists "ctc profiles all" on public.ctc_streamer_profiles;
drop policy if exists "ctc events all" on public.ctc_events;
drop policy if exists "ctc event players all" on public.ctc_event_players;
drop policy if exists "ctc contracts all" on public.ctc_contracts;

create policy "ctc profiles all" on public.ctc_streamer_profiles for all using (true) with check (true);
create policy "ctc events all" on public.ctc_events for all using (true) with check (true);
create policy "ctc event players all" on public.ctc_event_players for all using (true) with check (true);
create policy "ctc contracts all" on public.ctc_contracts for all using (true) with check (true);

do $$
begin
  if not exists (select 1 from pg_publication_tables where pubname='supabase_realtime' and schemaname='public' and tablename='ctc_streamer_profiles') then alter publication supabase_realtime add table public.ctc_streamer_profiles; end if;
  if not exists (select 1 from pg_publication_tables where pubname='supabase_realtime' and schemaname='public' and tablename='ctc_events') then alter publication supabase_realtime add table public.ctc_events; end if;
  if not exists (select 1 from pg_publication_tables where pubname='supabase_realtime' and schemaname='public' and tablename='ctc_event_players') then alter publication supabase_realtime add table public.ctc_event_players; end if;
  if not exists (select 1 from pg_publication_tables where pubname='supabase_realtime' and schemaname='public' and tablename='ctc_contracts') then alter publication supabase_realtime add table public.ctc_contracts; end if;
end $$;
