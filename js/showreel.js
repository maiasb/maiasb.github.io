(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGsap = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';

  /* ---------- copiar e-mail ---------- */
  const copyBtn = document.getElementById('copyBtn');
  copyBtn.addEventListener('click', () => {
    const txt = document.getElementById('emailVal').textContent;
    const done = () => { copyBtn.textContent = 'Copiado'; setTimeout(() => copyBtn.textContent = 'Copiar', 1800); };
    try {
      navigator.clipboard.writeText(txt).then(done, () => selectEmail());
    } catch (e) { selectEmail(); }
  });
  function selectEmail() {
    const r = document.createRange(); r.selectNodeContents(document.getElementById('emailVal'));
    const s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
    copyBtn.textContent = 'Selecionado';
  }

  /* ---------- quebra palavra-a-palavra ---------- */
  function splitWords(el) {
    const walk = (node) => {
      [...node.childNodes].forEach(n => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) frag.appendChild(document.createTextNode(part));
            else { const s = document.createElement('span'); s.className = 'w'; s.textContent = part; frag.appendChild(s); }
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && !n.classList.contains('w')) walk(n);
      });
    };
    walk(el);
    return el.querySelectorAll('.w');
  }
  const headWords = splitWords(document.getElementById('headline'));
  const subWords = splitWords(document.getElementById('sub'));
  const ctaWords = splitWords(document.getElementById('ctaTitle'));

  /* ---------- cena atual (indicador) ---------- */
  const scenes = document.querySelectorAll('[data-scene]');
  const sceneNum = document.getElementById('sceneNum'), sceneName = document.getElementById('sceneName');
  const navLinks = document.querySelectorAll('[data-nav]');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      sceneNum.textContent = e.target.dataset.scene;
      sceneName.textContent = e.target.dataset.name;
      navLinks.forEach(a => a.classList.toggle('active', a.dataset.nav === e.target.id));
    });
  }, { rootMargin: '-45% 0px -45% 0px' });
  scenes.forEach(s => io.observe(s));

  /* ---------- grid de pontos com "cobrinha" ---------- */
  initDots();

  /* ---------- tilt 3D ---------- */
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (fine && !reduce) {
    document.querySelectorAll('.card').forEach(card => {
      const rx = hasGsap ? gsap.quickTo(card, 'rotationX', { duration: .5, ease: 'power3' }) : null;
      const ry = hasGsap ? gsap.quickTo(card, 'rotationY', { duration: .5, ease: 'power3' }) : null;
      card.addEventListener('pointermove', e => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        card.style.setProperty('--gx', px * 100 + '%'); card.style.setProperty('--gy', py * 100 + '%');
        if (rx) { rx((0.5 - py) * 14); ry((px - 0.5) * 16); }
      });
      card.addEventListener('pointerleave', () => { if (rx) { rx(0); ry(0); } });
    });
  }

  if (!hasGsap || reduce) {
    document.querySelectorAll('.count').forEach(c => c.textContent = c.dataset.to);
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* progresso de rolagem */
  gsap.to('#progressBar', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: .2 } });

  /* ===== CENA 01: linha → pílula → nome ===== */
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
  tl.set('#pill', { clipPath: 'inset(49.5% 50% 49.5% 50% round 999px)' })
    .set('.pill .ch', { yPercent: 115 })
    .set([headWords, subWords], { opacity: 0 })
    .set('.ctas > *', { opacity: 0, y: 20 })
    .set('.hero-meta > *', { opacity: 0, y: 10 })
    .to('#pill', { clipPath: 'inset(49.5% 0% 49.5% 0% round 999px)', duration: .8, ease: 'power3.inOut' })
    .to('#pill', { clipPath: 'inset(0% 0% 0% 0% round 999px)', duration: .7, ease: 'expo.inOut' })
    .to('.pill .ch', { yPercent: 0, duration: .9, stagger: .045 }, '-=.25')
    .fromTo('.echo', { opacity: .7, x: (i) => -60 * (i + 1) }, { opacity: 0, x: 0, duration: 1.1, stagger: .08, ease: 'power3.out', immediateRender: false }, '<')
    .fromTo(headWords, { opacity: 0, y: 40, filter: 'blur(10px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: .8, stagger: .06 }, '-=.7')
    .fromTo(subWords, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .5, stagger: .025, ease: 'power2.out' }, '-=.5')
    .to('.hero-meta > *', { opacity: 1, y: 0, duration: .5, stagger: .08 }, '-=.6')
    .to('.ctas > *', { opacity: 1, y: 0, duration: .6, stagger: .1 }, '-=.4');

  /* parallax de saída do hero */
  gsap.to('.name-stage', { yPercent: -30, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

  /* ===== títulos com echo trail ===== */
  document.querySelectorAll('.trail').forEach(t => {
    const st = { trigger: t, start: 'top 85%', once: true };
    gsap.from(t, { x: 80, opacity: 0, duration: 1, ease: 'expo.out', scrollTrigger: st });
    // os pseudo-elementos não são animáveis diretamente: usamos CSS vars
    gsap.fromTo(t, { '--e': 1 }, { '--e': 0, duration: 1.2, ease: 'power3.out', scrollTrigger: st });
  });
  const trailCss = document.createElement('style');
  trailCss.textContent = `.trail::before{opacity:calc(var(--e,0)*.6);transform:translateX(calc(var(--e,0)*-40px))}
  .trail::after{opacity:calc(var(--e,0)*.35);transform:translateX(calc(var(--e,0)*-80px))}`;
  document.head.appendChild(trailCss);

  document.querySelectorAll('.scene-head .eyebrow, .scene-head p').forEach(el =>
    gsap.from(el, { opacity: 0, y: 20, duration: .8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } }));

  /* ===== CENA 02: count-up ===== */
  document.querySelectorAll('.count').forEach(c => {
    const to = +c.dataset.to, obj = { v: 0 };
    c.textContent = '0';
    gsap.to(obj, { v: to, duration: 1.8, ease: 'power2.out', onUpdate: () => c.textContent = Math.round(obj.v),
      scrollTrigger: { trigger: c, start: 'top 85%', once: true } });
  });
  gsap.from('.stat', { y: 40, opacity: 0, duration: .9, stagger: .12, ease: 'power3.out', scrollTrigger: { trigger: '.stat-grid', start: 'top 85%', once: true } });
  gsap.from('#brandRow .b', { yPercent: 60, opacity: 0, filter: 'blur(8px)', duration: .8, stagger: .09, ease: 'expo.out', scrollTrigger: { trigger: '#brandRow', start: 'top 88%', once: true } });
  gsap.fromTo('#marquee', { xPercent: 0 }, { xPercent: -50, ease: 'none', scrollTrigger: { trigger: '.metrics', start: 'top bottom', end: 'bottom top', scrub: .5 } });

  /* ===== CENA 03: colunas + tags stagger ===== */
  document.querySelectorAll('.stack-col').forEach((col, i) => {
    const st = { trigger: col, start: 'top 85%', once: true };
    gsap.from(col, { y: 50, opacity: 0, duration: .9, delay: i * .08, ease: 'power3.out', scrollTrigger: st });
    gsap.from(col.querySelectorAll('.tag'), { scale: .6, opacity: 0, y: 14, duration: .5, delay: .25 + i * .08, stagger: .05, ease: 'back.out(2)', scrollTrigger: st });
  });

  /* ===== CENA 04: cards ===== */
  gsap.from('.card', { y: 80, rotationX: -18, opacity: 0, duration: 1.1, stagger: .14, ease: 'expo.out', transformOrigin: '50% 100%',
    scrollTrigger: { trigger: '.cards', start: 'top 82%', once: true } });
  gsap.from('.also > div', { y: 20, opacity: 0, duration: .7, stagger: .1, ease: 'power3.out', scrollTrigger: { trigger: '.also', start: 'top 90%', once: true } });

  /* ===== CENA 05: CTA ===== */
  const ctl = gsap.timeline({ scrollTrigger: { trigger: '.cta-card', start: 'top 78%', once: true } });
  ctl.from('.cta-card', { scale: .92, opacity: 0, borderRadius: 80, duration: 1, ease: 'expo.out' })
     .from(ctaWords, { yPercent: 100, opacity: 0, filter: 'blur(6px)', duration: .7, stagger: .06, ease: 'expo.out' }, '-=.6')
     .from('.cta-card p', { opacity: 0, y: 14, duration: .5 }, '-=.4')
     .from('.link', { y: 30, opacity: 0, duration: .6, stagger: .08, ease: 'power3.out' }, '-=.3');

  window.addEventListener('load', () => ScrollTrigger.refresh());

  /* ---------- canvas ---------- */
  function initDots() {
    const cv = document.getElementById('dots'); if (!cv) return;
    const ctx = cv.getContext('2d');
    const GAP = 28;
    let w, h, cols, rows, dpr, raf = null, visible = false;
    let mouse = { x: -999, y: -999 };
    const snakes = [];
    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = cv.getBoundingClientRect(); w = r.width; h = r.height;
      cv.width = w * dpr; cv.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / GAP) + 1; rows = Math.ceil(h / GAP) + 1;
      snakes.length = 0;
      const n = w < 700 ? 2 : 4;
      for (let i = 0; i < n; i++) snakes.push(makeSnake(i));
      if (reduce) draw(0);
    }
    function makeSnake(i) {
      const x = Math.floor(Math.random() * cols), y = Math.floor(Math.random() * rows);
      return { body: [{ x, y }], dir: [[1,0],[0,1],[-1,0],[0,-1]][i % 4], len: 12 + Math.floor(Math.random() * 10), color: i % 2 ? '25,240,216' : '0,102,255' };
    }
    function step(s) {
      const head = s.body[0];
      if (Math.random() < .22) {
        const turns = s.dir[0] ? [[0,1],[0,-1]] : [[1,0],[-1,0]];
        s.dir = turns[Math.random() < .5 ? 0 : 1];
      }
      let nx = head.x + s.dir[0], ny = head.y + s.dir[1];
      if (nx < 0 || nx >= cols) { s.dir = [-s.dir[0], 0]; nx = head.x + s.dir[0]; }
      if (ny < 0 || ny >= rows) { s.dir = [0, -s.dir[1]]; ny = head.y + s.dir[1]; }
      s.body.unshift({ x: nx, y: ny });
      if (s.body.length > s.len) s.body.pop();
    }
    let last = 0;
    function draw(ts) {
      ctx.clearRect(0, 0, w, h);
      for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
        const px = x * GAP, py = y * GAP;
        const d = Math.hypot(px - mouse.x, py - mouse.y);
        const k = Math.max(0, 1 - d / 160);
        ctx.fillStyle = k > 0 ? `rgba(25,240,216,${.12 + k * .6})` : 'rgba(255,255,255,.09)';
        ctx.beginPath(); ctx.arc(px, py, 1.2 + k * 1.8, 0, 6.283); ctx.fill();
      }
      if (ts - last > 90) { snakes.forEach(step); last = ts; }
      snakes.forEach(s => s.body.forEach((p, i) => {
        const a = 1 - i / s.len;
        ctx.fillStyle = `rgba(${s.color},${a * .9})`;
        if (i === 0) { ctx.shadowColor = `rgba(${s.color},1)`; ctx.shadowBlur = 14; }
        ctx.beginPath(); ctx.arc(p.x * GAP, p.y * GAP, i === 0 ? 3.6 : 2.6 * a + .6, 0, 6.283); ctx.fill();
        ctx.shadowBlur = 0;
      }));
      if (visible && !reduce) raf = requestAnimationFrame(draw);
    }
    cv.parentElement.addEventListener('pointermove', e => { const r = cv.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; if (reduce) draw(0); });
    cv.parentElement.addEventListener('pointerleave', () => { mouse.x = mouse.y = -999; if (reduce) draw(0); });
    new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !reduce && !raf) raf = requestAnimationFrame(draw);
      if (!visible && raf) { cancelAnimationFrame(raf); raf = null; }
    }).observe(cv);
    window.addEventListener('resize', resize);
    resize(); draw(0);
  }
})();
