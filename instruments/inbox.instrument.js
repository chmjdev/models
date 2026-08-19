// inbox.widget.js — the mail glance: who wrote, about what, nothing more.
AUTO.registerWidget({
  name: 'inbox',
  title: 'Inbox',
  aliases: ['mail', 'email glance', 'messages'],
  mount(el, ctx) {
    el.innerHTML = '<div class="wgt-dim wgt-center" style="padding:10px 0">OPENING THE POST…</div>';
    (async () => {
      try {
        const d = await (await ctx.api('/api/gmail/messages?max=5&q=newer_than:2d')).json();
        const msgs = d.messages || [];
        if (!msgs.length) {
          el.innerHTML = '<div class="wgt-dim wgt-center" style="padding:10px 0">NOTHING NEW, SIR</div>';
          return;
        }
        el.innerHTML = msgs.map(m => `
          <div class="wgt-dayrow" style="flex-direction:column; align-items:flex-start; gap:2px">
            <span class="wgt-day">${m.unread ? '● ' : ''}${(m.from || '').toUpperCase()}</span>
            <span class="wgt-hilo" style="font-size:11px">${m.subject}</span>
          </div>`).join('');
      } catch {
        el.innerHTML = '<div class="wgt-dim wgt-center">POST UNREACHABLE</div>';
      }
    })();
  }
});
