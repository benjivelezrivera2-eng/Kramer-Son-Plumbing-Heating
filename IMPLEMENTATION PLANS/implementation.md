# Implementation plans

One plan file per GitHub issue. Plans live here — not under a generic `IMPLEMENTATION_PLAN.md`.

## Naming

- Name the file after the **issue** (slug from the title is fine).
- Use a numeric prefix when order matters so the folder sorts by work sequence.

## Work order so far (campus → Kramer)

1. **Project management** — now / next / done; slow down to stay sharp; tool separation (GitHub + Sentry vs Linear + Slack/Discord)
2. GitHub overview → MCP overview → GitHub MCP → branches → Sentry → Linear → Slack
3. **Backend Booking CRM** — dashboard (reference), then **profiles**, then **admin office mockup** (current)

## Active plans in this folder

| Order | File | Issue(s) | Status |
|---|---|---|---|
| 01 | `01-Dashboard.md` | Prior backend/dashboard reference | Reference |
| 02 | `02-profiles.md` | [#16](https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating/issues/16) parent | Current track |
| 03 | `03-extend-profiles-table.md` | [#29](https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating/issues/29) | Next to implement |
| 04 | `04-avatars-bucket.md` | [#30](https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating/issues/30) | After #29 |
| 05 | `05-admin-profile-page.md` | [#31](https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating/issues/31) | Done |
| 06 | `06-admin-office-mockup.md` | [#32](https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating/issues/32) | Current |
| — | `07-services.md` | [#33](https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating/issues/33) through [#38](https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating/issues/38) | The only services starting-price plan. This is the file to read |
| 08 | `08-bookings.md` | [#39](https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating/issues/39) | Bookings sample: filters, visit actions, and price. Waiting for a yes |
| 09 | `09-overview.md` | [#40](https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating/issues/40) | Overview sample: cards follow visit status, date filter, and admin activity. In progress |
| 10 | `10-correct-visit-service.md` | [#41](https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating/issues/41) | Correct a visit's service from the dialog. Done in the sample |
| 11 | `11-card-tips.md` | [#42](https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating/issues/42) | Small hover tip above each dashboard card. Current |
| 12 | `12-service-summary-and-visit-note.md` | Draft in `service-summary-and-visit-note.issue.md`. Not on GitHub yet | Service summary column and a note on each visit. Not started |
| 13 | `13-site-wide-tips.md` | Local draft `.issue-12-site-wide-tips.md`. GitHub **#43** | One tip at a time, then the same tip on the rest of the site. Not started |

Read `07-services.md` on the BookingCRM branch. That file is the merged services plan. It holds all eight starting prices. There are no separate numbered starting-price plans.

Related open issues without separate plans yet: [#27](https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating/issues/27) login, [#28](https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating/issues/28) protect `/admin` (gates for the profiles track).
