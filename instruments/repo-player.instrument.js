// repo-player.widget.js — a mini player for media saved in THIS repo.
// Lists the library's media/ folder and plays a picked file inline — the
// stream comes through the authenticated server, private repo and all.

AUTO.registerWidget({
  name: 'repo-player',
  title: 'Repo Player',
  aliases: ['media player', 'my media', 'library player', 'video player'],

  mount(el, ctx) {
    el.innerHTML = `
      <video id="rpVideo" controls playsinline
        style="display:none; width:auto; max-width:100%; max-height:38vh; margin:0 auto 10px;
               border:1px solid rgba(110,231,255,.25); border-radius:12px; background:#000"></video>
      <audio id="rpAudio" controls style="display:none; width:100%; margin-bottom:10px"></audio>
      <div id="rpNow" class="wgt-dim wgt-center" style="margin-bottom:8px"></div>
      <div class="wgt-dim" style="letter-spacing:.3em; color:#6ee7ff; margin-bottom:4px">LIBRARY MEDIA</div>
      <div class="wgt-days" id="rpList"><div class="wgt-dim wgt-center" style="padding:12px 0">READING THE SHELVES…</div></div>`;

    const video = el.querySelector('#rpVideo');
    const audio = el.querySelector('#rpAudio');
    const now = el.querySelector('#rpNow');
    const list = el.querySelector('#rpList');

    function play(folder, file) {
      const src = window.autoApiUrl
        ? window.autoApiUrl(`/api/library/file/${folder}/${file}`)
        : `/api/library/file/${folder}/${file}`;
      const isVideo = /\.(mp4|mov|webm)$/i.test(file);
      video.style.display = isVideo ? 'block' : 'none';
      audio.style.display = isVideo ? 'none' : 'block';
      const target = isVideo ? video : audio;
      (isVideo ? audio : video).pause();
      window.autoRadio?.stop();               // one thing plays at a time
      target.src = src;
      target.play().catch(() => { /* poster stays; the user can tap play */ });
      now.textContent = '▶ ' + file.toUpperCase();
    }

    (async () => {
      try {
        const d = await (await ctx.api('/api/library/list')).json();
        const media = [];
        for (const [folder, files] of Object.entries(d.library || {})) {
          for (const f of files) {
            if (/\.(mp4|mov|webm|mp3|wav|m4a)$/i.test(f)) media.push([folder, f]);
          }
        }
        list.innerHTML = '';
        if (!media.length) {
          list.innerHTML = '<div class="wgt-dim wgt-center" style="padding:12px 0">'
            + 'NOTHING HERE YET — SAY “SAVE THAT TO MY LIBRARY”</div>';
          return;
        }
        for (const [folder, file] of media) {
          const row = document.createElement('div');
          row.className = 'wgt-dayrow';
          row.style.cursor = 'pointer';
          row.innerHTML = `<span class="wgt-day">${file.toUpperCase()}</span>
            <span class="wgt-rain">${folder}</span>`;
          row.onclick = () => play(folder, file);
          list.appendChild(row);
        }
      } catch {
        list.innerHTML = '<div class="wgt-dim wgt-center" style="padding:12px 0">LIBRARY UNREACHABLE</div>';
      }
    })();

    return () => { video.pause(); audio.pause(); };
  }
});
