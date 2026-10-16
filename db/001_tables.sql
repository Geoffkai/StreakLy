create table profiles (
    id  uuid primary key references auth.users(id) on delete cascade,
    name text not null,
    created_at timestamptz not null default now()
);

alter table profiles enable row level security;

