// quiz.widget.js — general-knowledge quiz, a repo widget.
// Distinct from the built-in brain teaser: this is trivia with a question
// bank, ten per round, score at the end. See README.md for the spec.

AUTO.registerWidget({
  name: 'quiz',
  title: 'Knowledge Quiz',
  aliases: ['trivia', 'quiz me', 'general knowledge'],

  mount(el, ctx) {
    const BANK = [
      { q: 'Which planet has the most moons?', o: ['Jupiter', 'Saturn', 'Uranus', 'Neptune'], a: 1 },
      { q: 'The Great Fire of London was in…', o: ['1566', '1616', '1666', '1716'], a: 2 },
      { q: 'Table Mountain overlooks which city?', o: ['Durban', 'Cape Town', 'Gqeberha', 'Knysna'], a: 1 },
      { q: 'DNA stands for…', o: ['Deoxyribonucleic acid', 'Dinucleic acid', 'Deoxyribose nitrate', 'Dual nucleic array'], a: 0 },
      { q: 'Which is the largest desert on Earth?', o: ['Sahara', 'Gobi', 'Kalahari', 'Antarctica'], a: 3 },
      { q: 'Who painted the Sistine Chapel ceiling?', o: ['Raphael', 'Michelangelo', 'Da Vinci', 'Donatello'], a: 1 },
      { q: 'The rand replaced which currency in 1961?', o: ['The pound', 'The guilder', 'The franc', 'The escudo'], a: 0 },
      { q: 'Sound travels fastest through…', o: ['Air', 'Water', 'Steel', 'A vacuum'], a: 2 },
      { q: 'Mount Kilimanjaro stands in…', o: ['Kenya', 'Tanzania', 'Uganda', 'Ethiopia'], a: 1 },
      { q: 'The first successful heart transplant was performed in…', o: ['London', 'Boston', 'Cape Town', 'Moscow'], a: 2 },
      { q: 'Which gas do plants absorb from the air?', o: ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Hydrogen'], a: 2 },
      { q: 'The Kruger National Park borders which country?', o: ['Botswana', 'Namibia', 'Lesotho', 'Mozambique'], a: 3 },
      { q: 'Light from the Sun reaches Earth in about…', o: ['8 seconds', '8 minutes', '8 hours', '8 days'], a: 1 },
      { q: '“Madiba” was the clan name of…', o: ['Walter Sisulu', 'Oliver Tambo', 'Nelson Mandela', 'Steve Biko'], a: 2 }
    ];

    let round = [], at = 0, score = 0, locked = false;
    const timers = [];

    function newRound() {
      round = [...BANK].sort(() => Math.random() - 0.5).slice(0, 10);
      at = 0; score = 0;
      ask();
    }

    function ask() {
      locked = false;
      const item = round[at];
      el.innerHTML = `
        <div class="wgt-row3"><span>QUESTION ${at + 1} / ${round.length}</span><span></span><span>SCORE ${score}</span></div>
        <div class="wgt-question">${item.q}</div>
        <div class="wgt-grid" id="qzOpts"></div>`;
      const grid = el.querySelector('#qzOpts');
      item.o.forEach((opt, i) => {
        const b = document.createElement('button');
        b.className = 'wgt-btn';
        b.textContent = opt;
        b.onclick = () => answer(i, b);
        grid.appendChild(b);
      });
    }

    function answer(i, btn) {
      if (locked) return;
      locked = true;
      const item = round[at];
      [...el.querySelectorAll('.wgt-btn')].forEach((b, j) => {
        if (j === item.a) b.classList.add('good');
        else if (j === i) b.classList.add('bad');
        b.disabled = true;
      });
      if (i === item.a) score++;
      timers.push(setTimeout(() => {
        at++;
        if (at < round.length) ask();
        else finish();
      }, i === item.a ? 800 : 1600));
    }

    function finish() {
      const verdict = score >= 9 ? 'FORMIDABLE, SIR' : score >= 7 ? 'RESPECTABLE'
        : score >= 5 ? 'MIDDLING — MORE TEA' : 'THE LIBRARY AWAITS';
      el.innerHTML = `
        <div class="wgt-hero">${score}/${round.length}</div>
        <div class="wgt-sub wgt-center">${verdict}</div>
        <div class="wgt-grid" style="grid-template-columns:1fr"><button class="wgt-btn" id="qzAgain">PLAY AGAIN</button></div>`;
      el.querySelector('#qzAgain').onclick = newRound;
      ctx.feedNote(`— quiz: ${score}/${round.length} · ${verdict.toLowerCase()} —`);
    }

    newRound();
    return () => timers.forEach(clearTimeout);
  }
});
