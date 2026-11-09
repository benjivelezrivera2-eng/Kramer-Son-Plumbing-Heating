-- Office bookings sample schema from IMPLEMENTATION PLANS/08-bookings.md.
-- The admin page still reads local sample data. These tables are the cabinet for later.

create table public.services (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  category text not null check (category in ('Plumbing', 'Heating')),
  starting_price integer check (starting_price is null or starting_price >= 0),
  created_at timestamptz not null default now()
);

create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  profile_id uuid references public.profiles (id) on delete set null,
  service_id uuid not null references public.services (id),
  visit_date date not null,
  visit_window text not null check (visit_window in ('Morning', 'Afternoon')),
  status text not null check (status in ('Requested', 'Confirmed', 'Done', 'Pending', 'Cancelled')),
  price integer check (price is null or price >= 0),
  created_at timestamptz not null default now()
);

create index bookings_visit_date_idx on public.bookings (visit_date);
create index bookings_status_idx on public.bookings (status);
create index bookings_service_id_idx on public.bookings (service_id);
create index bookings_profile_id_idx on public.bookings (profile_id);

alter table public.services enable row level security;
alter table public.bookings enable row level security;

insert into public.services (name, category, starting_price)
values
  ('Drain Cleaning', 'Plumbing', 149),
  ('Sewer Line Repair', 'Plumbing', 425),
  ('Water Heater Repair', 'Plumbing', 189),
  ('Water Heater Installation', 'Plumbing', 399),
  ('Leak Detection', 'Plumbing', 249),
  ('Pipe & Water Line Repair', 'Plumbing', 275),
  ('Toilet & Fixture Repair', 'Plumbing', 129),
  ('Furnace & Heating Repair', 'Heating', 189);
