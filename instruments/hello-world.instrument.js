// hello-world.widget.js — the reference AUTO widget, with theatre.
// Proves the sidecar runtime end to end: pulled from the repo, served from the
// clone, registered live, animated, cleaned up. See README.md for the spec.

AUTO.registerWidget({
  name: 'hello-world',
  title: 'Hello World',
  aliases: ['hello', 'hello world', 'greeting protocol'],

  mount(el, ctx) {
    el.innerHTML = `
      <canvas id="hwRing"></canvas>
      <div id="hwBoot" class="wgt-dim" style="min-height:64px;line-height:2;letter-spacing:.18em"></div>
      <div id="hwHero" class="wgt-hero" style="font-size:40px;letter-spacing:.14em;min-height:52px"></div>
      <div id="hwSub" class="wgt-dim wgt-center" style="opacity:0;transition:opacity 1.2s"></div>`;

    const cv = el.querySelector('#hwRing');
    const S = 150, dpr = Math.min(3, window.devicePixelRatio || 1);
    cv.width = S * dpr; cv.height = S * dpr;
    cv.style.cssText = `width:${S}px;height:${S}px;display:block;margin:4px auto 10px`;
    const g = cv.getContext('2d');
    g.scale(dpr, dpr);

    // Orbiting sparks around a breathing arc-reactor ring.
    const sparks = Array.from({ length: 26 }, (_, i) => ({
      a: (i / 26) * Math.PI * 2,
      r: 34 + Math.random() * 28,
      v: 0.008 + Math.random() * 0.02,
      s: 0.6 + Math.random() * 1.6
    }));
    let t = 0, raf;
    const paint = () => {
      t++;
      g.clearRect(0, 0, S, S);
      const breathe = 0.55 + 0.45 * Math.sin(t / 22);
      g.strokeStyle = `rgba(110,231,255,${0.35 + 0.45 * breathe})`;
      g.lineWidth = 2;
      g.shadowColor = 'rgba(110,231,255,.8)';
      g.shadowBlur = 14 * breathe;
      g.beginPath(); g.arc(S / 2, S / 2, 30, 0, 7); g.stroke();
      g.beginPath(); g.arc(S / 2, S / 2, 20, t / 30, t / 30 + 4.6); g.stroke();
      g.shadowBlur = 0;
      g.fillStyle = '#6ee7ff';
      for (const p of sparks) {
        p.a += p.v;
        g.globalAlpha = 0.25 + 0.75 * Math.abs(Math.sin(p.a * 3));
        g.fillRect(S / 2 + Math.cos(p.a) * p.r, S / 2 + Math.sin(p.a) * p.r, p.s, p.s);
      }
      g.globalAlpha = 1;
      raf = requestAnimationFrame(paint);
    };
    paint();

    // The boot litany, then the reveal, letter by letter.
    const boot = el.querySelector('#hwBoot');
    const hero = el.querySelector('#hwHero');
    const sub = el.querySelector('#hwSub');
    const LINES = [
      'SIDECAR RUNTIME ......... ONLINE',
      'REPO LINK ............... TRUSTED',
      'GREETING PROTOCOL ....... ARMED'
    ];
    const timers = [];
    const later = (fn, ms) => timers.push(setTimeout(fn, ms));

    LINES.forEach((line, i) => later(() => {
      boot.innerHTML += (i ? '<br>' : '') + line;
    }, 350 + i * 520));

    const WORD = 'HELLO, WORLD';
    later(() => {
      [...WORD].forEach((ch, i) => later(() => {
        hero.textContent += ch;
      }, i * 90));
      later(() => {
        sub.textContent = 'THE SUIT CAN ALWAYS BE EXTENDED, SIR.';
        sub.style.opacity = '1';
        ctx.feedNote('— hello-world widget: all systems nominal —');
      }, WORD.length * 90 + 500);
    }, 350 + LINES.length * 520 + 300);

    return () => { cancelAnimationFrame(raf); timers.forEach(clearTimeout); };
  }
});
