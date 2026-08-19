---
name: inbox-triage
description: The inbox sorted by consequence — urgent, needs-action, waiting, noise — with a one-line verdict on each item that matters and suggested replies drafted for approval.
say: triage my inbox · sort my mail · run an inbox triage
---

Turn the inbox from a pile into a verdict. Read, classify, recommend — never
act on the mail itself.

## Procedure

1. check_email for the recent unread set.
2. Classify every item into exactly one bucket:
   - **URGENT** — a person is waiting on the user, money is moving, or a
     deadline is inside 48 hours.
   - **NEEDS ACTION** — requires a reply or a decision, but not today.
   - **WAITING** — the user is owed something; this is the tracking copy.
   - **NOISE** — newsletters, receipts, promotions, automated notices.
3. read_email every URGENT item and anything ambiguous — never classify a
   consequential mail on its subject line alone.
4. For each URGENT and NEEDS ACTION item, produce:
   - one line: who, what they want, by when;
   - a suggested reply in the user's voice, two or three sentences,
     marked clearly as A DRAFT FOR APPROVAL. AUTO does not send mail.
5. Count the noise; do not enumerate it ("31 newsletters and receipts").

## Report shape

- Lead with the single most consequential item.
- Then URGENT (all), NEEDS ACTION (up to five), WAITING (up to three).
- One closing line: what the user should do first.

## Judgement notes

- A short mail from a person outranks a long mail from a system.
- Money mentioned = read it fully, always.
- If two mails are the same thread, verdict the thread, not each mail.
- If the inbox is genuinely quiet, the whole report is two sentences —
  do not inflate.
