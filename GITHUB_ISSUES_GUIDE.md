# GitHub Issues Guide

Repo: [benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating](https://github.com/benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating)

This repo is the Kramer & Son Plumbing & Heating demo website (Vite + React) for the AI receptionist offer. The voice agent (Vapi assistant, Twilio number, caller-summary texts) lives outside this repo. Track that work here as issues, but the fix is not website code.

Follow this guide on every task. Benji confirms the issue before any code is written.

## Prime rule

No code until a GitHub Issue exists for the work. After the issue exists, write an implementation plan file. No code until that file exists.

If the issue says the work is in Vapi or Twilio, do not add that logic to this website. Track it on the issue and do the change in the tool the issue names.

## Before you start

1. List open issues: `gh issue list --repo benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating`.
2. Pick the issue this chat will work on, or draft a new one if none fits.
3. Confirm that choice with Benji. Wait for a yes before writing code.
4. Write `IMPLEMENTATION/<number>-<slug>.md` for that issue. The plan names the outcome, the files to touch (or the Vapi / Twilio change, if the work is not in this repo), the steps, and how to verify.
5. Only then write code.

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

Use only labels that already exist. Check with `gh label list --repo benjivelezrivera2-eng/Kramer-Son-Plumbing-Heating`. If the right label is missing, ask Benji to create it. Do not invent or create labels.

## Standard labels

- **enhancement:** New features or improvements
- **bug:** Errors or broken functionality
- **documentation:** Changes to README, guides, or code comments
- **refactor:** Code cleanup with no change in behavior
- **urgent:** Blocks something critical, like the site, the demo line, Monday's sales calls, or getting paid

`voice-agent` is not on this repo. Ask Benji to create it before using it for Vapi or Twilio work.

## Milestones

Every issue belongs to a milestone. The current milestone is **Demo ready for Monday calls**.

If that milestone is not on the repo, ask Benji to create it before you open the issue. Do not create it yourself.

## While working

Comment on the issue with progress and any decision you make. Keep comments short and factual.

## When finished

1. Check off the completed steps.
2. Comment with a short summary of what changed.
3. Close the issue.
4. Move its card to **Done** on the Kramer & Son project board (columns: To Do, In Progress, Done).

If that board does not exist yet, ask Benji to create it and add the open issues. Do not create the board yourself.

## Do not add or delete

Never add or delete issues, this repo, or branches unless Benji explicitly says yes in the same chat.

## Secrets

Keep tokens, API keys, client phone numbers, and other secrets out of issues, comments, and code. That includes Vapi keys, Twilio credentials, and anything that would send a real text.
