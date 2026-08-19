# AUTO Skill Spec — v1

A **skill** is a procedure AUTO knows how to perform: a written playbook it
follows step by step, using its own tools, to produce a finished piece of
work. Instruments show; skills *do*.

> "Auto, what are your skills?" · "Run the morning briefing." ·
> "Use the research skill on the Rand." · "Do an inbox triage in the background."

Skills live in this folder, one file each, and load straight from the repo —
edit, push, and the new procedure is live on the next pull. The default set
below ships with AUTO; change them freely, they are yours.

---

## The contract

One skill = one markdown file in this folder, named:

```
<name>.skill.md           e.g.  morning-briefing.skill.md
```

- lower-case letters, digits, dashes only in the name
- 64 KB maximum — a skill is instructions, not a database
- the file starts with a frontmatter block, then the procedure:

```markdown
---
name: morning-briefing
description: One composed brief — weather, overnight mail, reminders, money, headlines.
say: brief me · morning briefing
---

The procedure, written to AUTO. Steps, quality bar, output shape.
```

- `name` — how the skill is addressed. Must match the filename.
- `description` — one line; this is what AUTO reads when listing skills and
  deciding which one fits a request.
- `say` — example phrases, dot-separated, shown in listings.

## How skills run

- **In conversation** — AUTO reads the skill and follows it live, narrating
  as it goes.
- **In the background** — the task engine loads the skill into the job's
  instructions and works it server-side; AUTO reports when it is done.

Skills command only the tools AUTO already has, and they inherit the HARD
RULE: background work is read-only (save_media into this repo is the one
permitted write). A skill cannot grant new powers — it is choreography,
not capability.
