-- Sample visits from the office bookings page. profile_id stays empty.

insert into public.bookings (client_name, profile_id, service_id, visit_date, visit_window, status, price)
select i.client_name, null, s.id, i.visit_date, i.visit_window, i.status, i.price
from (
  values
    ('Elena Ruiz'::text, 'Water Heater Repair'::text, date '2026-11-08', 'Morning'::text, 'Confirmed'::text, 240),
    ('Priya Shah', 'Furnace & Heating Repair', date '2026-11-10', 'Afternoon', 'Requested', null::integer),
    ('Owen Brooks', 'Leak Detection', date '2026-11-12', 'Morning', 'Confirmed', null::integer),
    ('Marcus Hale', 'Drain Cleaning', date '2026-11-18', 'Afternoon', 'Requested', null::integer),
    ('Hannah Cole', 'Toilet & Fixture Repair', date '2026-11-25', 'Morning', 'Done', null::integer)
) as i(client_name, service_name, visit_date, visit_window, status, price)
join public.services s on s.name = i.service_name
where not exists (
  select 1 from public.bookings b
  where b.client_name = i.client_name and b.visit_date = i.visit_date
);
