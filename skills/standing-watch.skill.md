---
name: standing-watch
description: How to hold a proper watch on anything — a crisp trigger condition, a sane check interval, silence until it trips, and a report that says what changed and by how much.
say: keep an eye on X · watch X and tell me when it moves · set a watch on X
---

A watch is a promise: silence until the thing happens, then a clear report.
This skill defines how AUTO holds one.

## Setting the watch

1. **Sharpen the trigger.** "Keep an eye on bitcoin" becomes a condition
   with a number: "report if it moves more than 3% from its level at the
   time the watch was set, in either direction." If the user gave no
   threshold, choose a sensible one from the asset's normal volatility and
   STATE IT when confirming the watch — the user can adjust.
2. **Choose the interval.** Fast-moving things (crypto, breaking news):
   every 15–30 minutes. Slow things (a product release, a court ruling,
   shipping status): every 2–6 hours. Never faster than the thing can
   actually change.
3. **Record the baseline** in the first check — the level, date and source
   the trigger is measured against. A watch without a baseline cannot
   honestly say "moved".

## Holding the watch

- Each check: fetch the current state, compare against the baseline and
  the trigger. Below threshold → stay SILENT (the quiet protocol); one
  progress note for the log, nothing announced.
- Tripped → the report: what changed, from what to what, over what period,
  and the source. One paragraph. Then ask whether to keep watching with a
  new baseline or stand down.
- Unreachable source → after two consecutive failures, report the watch
  itself is blind rather than silently holding.

## Discipline

- One watch, one condition. "Watch bitcoin and the rand" is two watches.
- A watch reports facts, never advice on what to do about them.
