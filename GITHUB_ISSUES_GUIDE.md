# GitHub Issues Guide

Repo: [benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating](https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating)

This is the website demo for the AI receptionist offer. The voice agent (Vapi assistant, Twilio number, caller texts) lives outside this repo. Track that work here anyway with the `voice-agent` label.

Follow this guide on every task. Benji confirms the issue before any code is written.

## Prime rule

No code until a GitHub Issue exists for the work. Plan the issue first, then build.

## Before you start

1. List open issues: `gh issue list`.
2. Pick the issue this chat will work on, or draft a new one if none fits.
3. Confirm that choice with Benji. Wait for a yes before writing code.

## Issue format

- **Title:** specific and clear.
- **Goal:** one short paragraph on the outcome.
- **Steps:** a checkbox list of the work.
- **Done when:** the checks that prove it is finished.

```markdown
## Goal
<one short paragraph>

## Steps
- [ ] ...

## Done when
- [ ] ...
```

Put every new issue on the milestone **Demo ready for Monday calls**.

## Labels

Use only labels that already exist. Check with `gh label list`. If the right label is missing, ask Benji to create it. Do not invent or create labels.

- **enhancement:** New features or improvements
- **bug:** Errors or broken functionality
- **documentation:** Changes to README, guides, or code comments
- **refactor:** Code cleanup with no change in behavior
- **urgent:** Blocks something critical, like Monday's sales calls or getting paid
- **voice-agent:** AI receptionist work (Vapi assistant, Twilio number, caller texts)

## Milestones

Every issue belongs to a milestone. The current milestone is **Demo ready for Monday calls**.

If that milestone is not on the repo, ask Benji to create it before you open the issue.

## While working

Comment on the issue with progress and any decision you make. Keep comments short and factual.

## When finished

1. Check off the completed steps.
2. Comment with a short summary of what changed.
3. Close the issue.
4. Move its card to **Done** on the GitHub Project board.

## Do not delete

Never delete issues, this repo, or branches unless Benji explicitly says yes in the same chat.

## Secrets

Keep Vapi keys, Twilio credentials, client phone numbers, and other secrets out of issues, comments, and code.
