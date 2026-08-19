// reminders.widget.js — what is due and what is coming, on the glass.
AUTO.registerWidget({
  name: 'reminders',
  title: 'Reminders',
  aliases: ['upcoming', 'schedule', 'due'],
  mount(el, ctx) {
    el.innerHTML = '<div class="wgt-dim wgt-center" style="padding:10px 0">CHECKING THE BOOK…</div>';
    let timer;
    const load = async () => {
      try {
        const d = await (await ctx.api('/api/reminders')).json();
        const upcoming = (d.upcoming || []).slice(0, 6);
        const due = (d.due || []).slice(0, 3);
        if (!upcoming.length && !due.length) {
          el.innerHTML = '<div class="wgt-dim wgt-center" style="padding:10px 0">NOTHING PENDING — A CLEAR BOOK</div>';
          return;
        }
        const fmt = (t) => new Date(t).toLocaleString('en-GB',
          { weekday: 'short', hour: '2-digit', minute: '2-digit' }).toUpperCase();
        el.innerHTML =
          due.map(r => `<div class="wgt-dayrow"><span class="wgt-day" style="color:#ffc46b">DUE</span>
            <span class="wgt-hilo">${r.message}</span></div>`).join('') +
          upcoming.map(r => `<div class="wgt-dayrow"><span class="wgt-day">${fmt(r.at)}</span>
            <span class="wgt-hilo">${r.message}${r.repeat ? ' ↻' : ''}</span></div>`).join('');
      } catch {
        el.innerHTML = '<div class="wgt-dim wgt-center">BOOK UNREACHABLE</div>';
      }
    };
    load();
    timer = setInterval(load, 30000);
    return () => clearInterval(timer);
  }
});
