(() => {
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  root.classList.add('js');

  /* imagem do hero: camada fixa com a mesma altura do hero (mantém o enquadramento) */
  const hero = document.getElementById('hero');
  const syncHeroH = () => hero.style.setProperty('--hero-h', hero.offsetHeight + 'px');
  syncHeroH();
  new ResizeObserver(syncHeroH).observe(hero);

  /* header: some ao rolar para baixo, volta ao subir */
  const nav = document.getElementById('nav');
  let lastY = scrollY, tick = false;
  addEventListener('scroll', () => {
    if (tick) return;
    tick = true;
    requestAnimationFrame(() => {
      const y = scrollY, dy = y - lastY;
      if (y < 80 || dy < -4) nav.classList.remove('hidden');
      else if (dy > 4) nav.classList.add('hidden');
      if (Math.abs(dy) > 4) lastY = y;
      tick = false;
    });
  }, { passive: true });

  /* revelar ao entrar na tela + contadores + texto digitado */
  const typed = (el) => {
    const text = el.dataset.text;
    if (reduce) { el.firstChild || el.prepend(text); return; }
    const node = document.createTextNode('');
    el.prepend(node);
    let i = 0;
    const t = setInterval(() => { node.data = text.slice(0, ++i); if (i >= text.length) clearInterval(t); }, 35);
  };
  const count = (el) => {
    const to = +el.dataset.to;
    if (reduce) return;
    const t0 = performance.now();
    const f = (t) => {
      const p = Math.min((t - t0) / 1600, 1);
      el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(f);
    };
    el.textContent = '0';
    requestAnimationFrame(f);
  };
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    io.unobserve(e.target);
    e.target.classList.add('in');
    if (e.target.dataset.text !== undefined) typed(e.target);
    if (e.target.classList.contains('count')) count(e.target);
  }), { threshold: 0.15 });
  document.querySelectorAll('.reveal, .typed, .count').forEach((el) => io.observe(el));

  /* spotlight que segue o mouse */
  document.querySelectorAll('.spot').forEach((el) => el.addEventListener('mousemove', (e) => {
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', e.clientX - r.left + 'px');
    el.style.setProperty('--my', e.clientY - r.top + 'px');
  }));

  /* botões magnéticos */
  if (!reduce && matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.querySelectorAll('.magnetic').forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .25}px, ${(e.clientY - r.top - r.height / 2) * .35}px)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });
  }

  /* celular de exemplo: alterna entre a tela do Pix e um comprovante fictício */
  const viewPix = document.getElementById('viewPix'), viewReceipt = document.getElementById('viewReceipt');
  const show = (to, focusEl) => { viewPix.hidden = to !== 'pix'; viewReceipt.hidden = to !== 'receipt'; focusEl.focus(); };
  document.getElementById('receiptBtn').addEventListener('click', () => {
    document.getElementById('rcptDate').textContent = new Date().toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
    show('receipt', document.getElementById('backBtn'));
  });
  document.getElementById('backBtn').addEventListener('click', () => show('pix', document.getElementById('receiptBtn')));

  /* copiar e-mail */
  const copyBtn = document.getElementById('copyBtn');
  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(copyBtn.dataset.email);
      copyBtn.textContent = 'Copiado';
    } catch (e) {
      copyBtn.textContent = copyBtn.dataset.email;
    }
    setTimeout(() => { copyBtn.textContent = 'Copiar e-mail'; }, 2200);
  });
})();
