---
name: morning-briefing
description: The day, composed — weather with clothing judgement, overnight inbox triaged, reminders due, the rand and bitcoin, three headlines that matter. One brief, spoken like a butler, detail on the HUD.
say: brief me · morning briefing · run the morning briefing
---

Assemble the user's morning in ONE pass — gather everything first, compose once,
never narrate the fetching.

## Gather (in parallel where the tools allow)

1. **Weather** — search_web for today's forecast at the user's location (the
   localisation instrument names the city). Capture: high/low, rain chance,
   wind, and anything unusual (heat, storms, cold snap).
2. **Overnight mail** — check_email. For anything that looks consequential
   (a person writing directly, money, deadlines), read_email it. Ignore
   newsletters and receipts unless one contains a charge that looks wrong.
3. **Today's obligations** — check_reminders. Note what is due today and the
   first thing due tomorrow.
4. **Money** — convert_currency USD→ZAR for the rand's level, and search_web
   for bitcoin's price and its 24h move.
5. **The world** — get_news. Pick AT MOST three stories: prefer South Africa,
   markets, and technology; skip celebrity and sport unless enormous.

## Compose

One brief, in this order, spoken-style — short sentences, no lists read aloud:

- Greeting with the day and date.
- Weather in one sentence, with a judgement ("a jacket day", "rain from noon —
  plan indoors").
- Mail: "N new overnight — one needs you: …" Name only what matters. If
  nothing matters, say so in five words.
- Obligations: what is due today, by name and time.
- Money: the rand against the dollar and bitcoin's move, one sentence,
  with direction ("firmer", "softer", "flat").
- The three headlines, one line each, no editorialising.
- Close with the single most important thing of the day, chosen by judgement.

## Quality bar

- The whole spoken brief under 45 seconds.
- Every number real and current — if a fetch failed, say "X is unreachable
  this morning" rather than inventing or omitting silently.
- Detail (full forecast, mail summaries, headline links) belongs on the HUD,
  not in the voice.
