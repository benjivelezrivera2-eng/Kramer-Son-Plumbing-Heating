# Correct the service on a visit

Issue: [#41](https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating/issues/41)

## Outcome

A visit can be recorded under the wrong service. From the visit dialog, the office can switch it to another service already on the office catalog.

This stays a sample. It does not read or write the database. A refresh restores the seed visits.

## Price

Changing the service clears that visit's own price. The old amount belonged to the wrong job. The row, the dialog, and dashboard revenue then use the new service's starting price.

Furnace and heating repair starts at $189. Water heater repair starts at $189. Leak detection starts at $249. The other starting prices stay the ones in `07-services.md`.

## Activity

The change is an admin action titled "Service changed." The detail names the customer, the old service, and the new service. It shows in Recent activity on the dashboard.

Confirm, mark pending, and cancel stay as they are.

## Files

- `src/layouts/AdminShell.tsx` — `setVisitService` on the shared visit list
- `src/lib/adminMock.ts` — the office context includes that setter
- `src/pages/admin/MockBookingsPage.tsx` — the service choice in the visit dialog

Do not change the public site. Do not connect this screen to Supabase.

## Steps

1. In the visit dialog, offer every service already on the office catalog.
2. On a real change, update the visit's service and clear its own price.
3. Add an admin activity row for the change.

## Verify

- Open Elena Ruiz. Change Water Heater Repair to Furnace & Heating Repair. The row shows that service and $189, and the status stays whatever it was.
- On the dashboard, her recent booking shows the new service. Revenue changes only if the visit is Confirmed.
- Recent activity, on admin actions, shows Service changed.
- The public homepage is unchanged.
