# AUTO Widget Spec — v1

A **widget** is a small sidecar instrument for the AUTO HUD: a self-contained
panel of information or interaction that AUTO can summon and dismiss by voice.

> "Auto, show the weather widget." · "Test me." · "Display hello world." · "Hide it."

Built-in widgets (weather, moon, teaser, timer) ship inside AUTO itself.
**This folder is for yours.** Drop a file in here, push, say
*"Auto, pull the widgets"* — and it is live on the HUD, no redeploy.

---

## The contract

One widget = one file in this folder, named:

```
<name>.widget.js          e.g.  hello-world.widget.js
```

- lower-case letters, digits, dots, dashes, underscores only
- 200 KB maximum — a widget is a small thing
- the file registers exactly one widget by calling `AUTO.registerWidget(...)`

```js
AUTO.registerWidget({
  name: 'hello-world',            // required — how voice addresses it
  title: 'Hello World',           // shown in the panel's title bar
  aliases: ['hello', 'greeting'], // optional — extra voice matches
  mount(el, ctx) {                // required — build the panel here
    el.innerHTML = '<div class="wgt-hero">HI</div>';
    return () => { /* optional cleanup: cancel timers, close things */ };
  }
});
```

### `mount(el, ctx)`

Called every time the widget is shown. `el` is an empty container inside the
HUD panel — fill it with DOM. Return a cleanup function (or nothing); it runs
when the widget is hidden. `mount` may be `async`.

`ctx` provides:

| member         | what it is                                                          |
|----------------|---------------------------------------------------------------------|
| `ctx.close()`  | close the panel programmatically                                    |
| `ctx.api(path, init?)` | `fetch` against the AUTO server, authentication handled — e.g. `ctx.api('/api/forecast?lat=-26&lon=28')` |
| `ctx.store`    | per-widget persistence: `ctx.store.get()` → your saved object or `null`; `ctx.store.set(obj)` saves it |
| `ctx.feedNote(text)` | drop a one-line note onto the conversation reel               |

### House styling

The panel inherits the HUD theme. Ready-made classes, free to use:

- `wgt-hero` — the big glowing number/word
- `wgt-sub` — letter-spaced subtitle line
- `wgt-dim` — small dim mono caption
- `wgt-center` — centre text
- `wgt-row3` — a spaced three-stat row
- `wgt-days` / `wgt-dayrow` / `wgt-day` / `wgt-hilo` — list rows
- `wgt-grid` — 2-column button grid
- `wgt-btn` — HUD button (`.good` / `.bad` states)
- `wgt-question` — large centred prose

Canvas is welcome; scale for `devicePixelRatio`. Cyan `#6ee7ff` on dark is the
house palette.

## How loading works (and the security model)

1. You push a widget to this folder. **You are the only writer on this repo.**
2. The AUTO server keeps a private clone and serves widget files **only from
   that clone, over its authenticated API** — widget code is never fetched
   from the open internet, and no other source is consulted.
3. The HUD downloads the file through that authenticated channel and runs it.

A widget runs with full access to the HUD page — it is *your* code, trusted
exactly like AUTO's own files. Which is the point, and the warning: **never
merge a widget you didn't write or read.** The 200 KB cap and the filename
rules are enforced server-side.

## Voice grammar that reaches widgets

- "show the `<name>` widget" / "display `<name>`" → show
- "hide the widget" / "close it" / "hide whatever is open" → hide (no name needed)
- "what widgets do you have" → list
- "pull the widgets" / "update the widgets" → refresh from this repo; a newly
  arrived widget is shown automatically

Names are fuzzily matched — `aliases` catches the rest.

## Reference implementation

[`hello-world.widget.js`](hello-world.widget.js) in this folder exercises the
whole spec: registration, aliases, canvas animation, cleanup. Copy it, rename
it, make it yours.
