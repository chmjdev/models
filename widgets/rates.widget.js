// rates.widget.js — the currency board, ECB fixings against the rand.
AUTO.registerWidget({
  name: 'rates',
  title: 'The Rand',
  aliases: ['currency', 'exchange rates', 'the rand', 'forex'],
  mount(el, ctx) {
    el.innerHTML = '<div class="wgt-dim wgt-center" style="padding:10px 0">READING THE FIXINGS…</div>';
    (async () => {
      const pairs = [['USD', '$'], ['EUR', '€'], ['GBP', '£'], ['CNY', '¥']];
      const rows = [];
      for (const [code, sign] of pairs) {
        try {
          const d = await (await ctx.api(`/api/currency?amount=1&from=${code}&to=ZAR`)).json();
          if (d.result) rows.push([code, sign, Number(d.result).toFixed(2)]);
        } catch { /* one missing row beats none */ }
      }
      if (!rows.length) { el.innerHTML = '<div class="wgt-dim wgt-center">RATES UNREACHABLE</div>'; return; }
      el.innerHTML = rows.map(([code, sign, v]) => `
        <div class="wgt-dayrow">
          <span class="wgt-day">${sign}1 ${code}</span>
          <span class="wgt-hilo"><b>R ${v}</b></span>
        </div>`).join('')
        + '<div class="wgt-dim" style="margin-top:8px; font-size:9px">ECB DAILY FIXINGS</div>';
    })();
  }
});
