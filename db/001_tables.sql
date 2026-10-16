-- StreakLy schema v0.3: tables, relationships, rules
-- Run in Supabase SQL Editor. Order matters: parents before children.
-- begin/commit = all or nothing. If any line fails, no tables are created.
begin;
create table profiles (
    id uuid primary key references auth.users (id) on delete cascade,
    name text not null,
    created_at timestamptz not null default now ()
);
alter table profiles enable row level security;
create table subjects (
    id uuid primary key default gen_random_uuid (),
    user_id uuid not null references profiles (id) on delete cascade,
    name text not null,
    is_archived boolean not null default false,
    created_at timestamptz not null default now (),
    unique (user_id, name)
);
alter table subjects enable row level security;
create table topics (
    id uuid primary key default gen_random_uuid (),
    subject_id uuid not null references subjects (id) on delete cascade,
    name text not null,
    estimated_hours numeric(5, 2) not null check (estimated_hours > 0),
    is_archived boolean not null default false,
    created_at timestamptz not null default now (),
    unique (subject_id, name)
);
alter table topics enable row level security;
create table study_sessions (
    id uuid primary key default gen_random_uuid (),
    user_id uuid not null references profiles (id) on delete cascade,
    topic_id uuid not null references topics (id) on delete cascade,
    started_at timestamptz not null,
    ended_at timestamptz not null,
    duration_seconds integer not null check (duration_seconds > 0),
    local_date date not null,
    is_shared boolean not null default false,
    proof_image_path text,
    created_at timestamptz not null default now (),
    check (ended_at > started_at)
);
alter table study_sessions enable row level security;
create table daily_plans (
    id uuid primary key default gen_random_uuid (),
    user_id uuid not null references profiles (id) on delete cascade,
    plan_date date not null,
    created_at timestamptz not null default now (),
    unique (user_id, plan_date)
);
alter table daily_plans enable row level security;
create table daily_plan_items (
    id uuid primary key default gen_random_uuid (),
    daily_plan_id uuid not null references daily_plans (id) on delete cascade,
    topic_id uuid not null references topics (id) on delete cascade,
    created_at timestamptz not null default now (),
    unique (daily_plan_id, topic_id)
);
alter table daily_plan_items enable row level security;
create table friendships (
    id uuid primary key default gen_random_uuid (),
    requester_id uuid not null references profiles (id) on delete cascade,
    addressee_id uuid not null references profiles (id) on delete cascade,
    status text not null default 'pending' check (status in ('pending', 'accepted')),
    created_at timestamptz not null default now (),
    responded_at timestamptz,
    check (requester_id <> addressee_id)
);
create unique index friendships_one_per_pair on friendships (
    least (requester_id, addressee_id),
    greatest (requester_id, addressee_id)
);
alter table friendships enable row level security;
create table reactions (
    id uuid primary key default gen_random_uuid (),
    user_id uuid not null references profiles (id) on delete cascade,
    study_session_id uuid not null references study_sessions (id) on delete cascade,
    type text not null check (type in ('fire', 'clap', 'heart')),
    created_at timestamptz not null default now(),
    unique (user_id, study_session_id)
);
alter table reactions enable row level security;
commit;