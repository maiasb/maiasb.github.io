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

  /* ---------- widgets dos projetos (tudo fictício, nada é enviado) ---------- */
  const swap = (root, id) => root.querySelectorAll(':scope > .view').forEach((v) => { v.hidden = v.id !== id; });
  const brl = (n) => 'R$ ' + n.toLocaleString('pt-BR');
  const tween = (el, to, fmt = String) => {
    const from = +el.dataset.v || 0;
    el.dataset.v = to;
    if (reduce) { el.textContent = fmt(to); return; }
    const t0 = performance.now();
    const f = (t) => {
      const p = Math.min((t - t0) / 700, 1);
      el.textContent = fmt(Math.round(from + (to - from) * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(f);
    };
    requestAnimationFrame(f);
  };
  const pressed = (box, btn) => box.querySelectorAll('.chip').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));

  /* Wing: página de venda -> lead capturado */
  const wingStack = document.querySelector('#wingPlans').parentElement;
  document.querySelectorAll('.plan').forEach((p) => p.addEventListener('click', () => {
    document.getElementById('wingPick').textContent = p.dataset.plan;
    document.getElementById('wingLogPlan').textContent = p.dataset.plan;
    swap(wingStack, 'wingForm');
  }));
  document.getElementById('wingSend').addEventListener('click', () => swap(wingStack, 'wingDone'));
  document.getElementById('wingReset').addEventListener('click', () => swap(wingStack, 'wingPlans'));

  /* Guará: emissão de voucher */
  const gCount = document.getElementById('gCount'), gTotal = document.getElementById('gTotal');
  const gCode = document.getElementById('gCode'), gQr = document.getElementById('gQr'), gTicket = document.getElementById('gTicket');
  let vouchers = 12;
  gCount.dataset.v = vouchers; gTotal.dataset.v = vouchers * 60;
  const drawQr = (seed) => {
    let h = 0; for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
    const rnd = () => (h = (h * 1664525 + 1013904223) >>> 0) / 4294967296;
    /* três cantos fixos (anel 3x3 com centro vazado), o resto vem da semente */
    const corners = [[0, 0], [6, 0], [0, 6]];
    const inCorner = (x, y) => corners.some(([cx, cy]) => x >= cx && x < cx + 3 && y >= cy && y < cy + 3);
    const hole = (x, y) => corners.some(([cx, cy]) => x === cx + 1 && y === cy + 1);
    let out = '';
    for (let y = 0; y < 9; y++) for (let x = 0; x < 9; x++) {
      const on = inCorner(x, y) ? !hole(x, y) : rnd() > .5;
      if (on) out += `<rect x="${x}" y="${y}" width="1" height="1"/>`;
    }
    gQr.innerHTML = out;
  };
  drawQr(gCode.textContent);
  document.getElementById('gBtn').addEventListener('click', () => {
    const abc = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    const code = 'GA-' + Array.from({ length: 5 }, () => abc[Math.floor(Math.random() * abc.length)]).join('');
    gCode.textContent = code;
    drawQr(code);
    vouchers++;
    tween(gCount, vouchers);
    tween(gTotal, vouchers * 60, brl);
    gTicket.classList.remove('pop'); void gTicket.offsetWidth; gTicket.classList.add('pop');
  });

  /* GiiG: receitas x despesas por mês (em milhares de reais) */
  const giig = [{ r: 4200, d: 3600 }, { r: 4650, d: 4100 }, { r: 4380, d: 4520 }, { r: 5020, d: 4310 }];
  const fmtK = (n) => 'R$ ' + (n / 1000).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + ' mi';
  const giigSet = (i) => {
    const m = giig[i], max = 5500, saldo = m.r - m.d;
    document.getElementById('giigRec').style.width = (m.r / max) * 100 + '%';
    document.getElementById('giigDes').style.width = (m.d / max) * 100 + '%';
    document.getElementById('giigRecV').textContent = fmtK(m.r);
    document.getElementById('giigDesV').textContent = fmtK(m.d);
    const sv = document.getElementById('giigSaldo');
    sv.textContent = (saldo < 0 ? '− ' : '+ ') + fmtK(Math.abs(saldo));
    sv.style.color = saldo < 0 ? 'oklch(0.7 0.18 27)' : '';
  };
  const giigChips = document.getElementById('giigChips');
  giigChips.addEventListener('click', (e) => {
    const b = e.target.closest('.chip'); if (!b) return;
    pressed(giigChips, b); giigSet(+b.dataset.m);
  });
  giigSet(3);

  /* INFOPEN: indicadores genéricos por período */
  const inf = { dia: [128, 14, 6], semana: [842, 63, 21], mes: [3410, 210, 87] };
  const infSet = (k) => {
    const [ok, ana, pen] = inf[k], tot = ok + ana + pen;
    tween(document.getElementById('infTotal'), tot, (n) => n.toLocaleString('pt-BR'));
    [['infOk', ok], ['infAna', ana], ['infPen', pen]].forEach(([id, v]) => {
      document.getElementById(id).style.width = (v / tot) * 100 + '%';
      document.getElementById(id + 'V').textContent = v.toLocaleString('pt-BR');
    });
  };
  const infChips = document.getElementById('infChips');
  infChips.addEventListener('click', (e) => {
    const b = e.target.closest('.chip'); if (!b) return;
    pressed(infChips, b); infSet(b.dataset.p);
  });
  infSet('dia');

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
