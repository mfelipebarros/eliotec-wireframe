/* Eliotec — page motion (GSAP + ScrollTrigger). Content stays visible if GSAP or JS fails. */
(function () {
  if (!window.gsap || !window.ScrollTrigger) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  gsap.registerPlugin(ScrollTrigger);
  var $ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };

  /* split h1 into words (masked) */
  $('h1').forEach(function (h) {
    var t = h.textContent.trim().split(/\s+/);
    h.setAttribute('aria-label', h.textContent.trim());
    h.innerHTML = t.map(function (w) { return '<span class="w" aria-hidden="true"><span class="wi">' + w + '</span></span>'; }).join(' ');
  });

  var hero = document.querySelector('.hero');
  var intro = document.querySelector('.hero, .intro');

  /* ---------- hero / intro entrance ---------- */
  if (intro) {
    var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    var img = hero && hero.querySelector('.img');
    if (img) tl.fromTo(img, { scale: 1.32 }, { scale: 1.2, duration: 2.2, ease: 'power2.out' }, 0);
    tl.from('.hd-top .hd-in', { y: -24, opacity: 0, duration: .8 }, .15)
      .from(intro.querySelectorAll('.eyebrow,.crumb'), { y: 18, opacity: 0, duration: .7 }, .25)
      .from(intro.querySelectorAll('h1 .wi'), { yPercent: 115, duration: .95, stagger: .07 }, .35)
      .from(intro.querySelectorAll('.lead'), { y: 24, opacity: 0, duration: .8 }, .75)
      .from(intro.querySelectorAll('.ctas > *'), { y: 22, opacity: 0, duration: .7, stagger: .1, clearProps: 'transform,opacity' }, .9)
      .from(intro.querySelectorAll('.col > .small'), { opacity: 0, duration: .8 }, 1.15);
  }

  /* ---------- hero scroll parallax ---------- */
  if (hero) {
    var himg = hero.querySelector('.img');
    if (himg) gsap.to(himg, { yPercent: 9, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to(hero.querySelector('.col'), { yPercent: -8, opacity: .15, ease: 'none', scrollTrigger: { trigger: hero, start: '40% top', end: 'bottom top', scrub: true } });
  }

  /* ---------- section headings ---------- */
  $('.sec:not(.hero):not(.intro) .head, .sec:not(.hero):not(.intro) > .wrap > h2, .split-text').forEach(function (el) {
    gsap.from(el, { y: 40, opacity: 0, duration: .9, ease: 'power3.out', clearProps: 'transform,opacity', scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
  });

  /* ---------- cards: staggered batches ---------- */
  var cards = $('.card');
  if (cards.length) {
    gsap.set(cards, { y: 56, opacity: 0 });
    ScrollTrigger.batch(cards, {
      start: 'top 90%', once: true,
      onEnter: function (b) {
        gsap.to(b, { y: 0, opacity: 1, duration: .85, ease: 'power3.out', stagger: .12, clearProps: 'transform,opacity' });
        gsap.from(b.map(function (c) { return c.querySelector('.ico'); }).filter(Boolean), { scale: 0, rotate: -40, duration: .7, ease: 'back.out(2)', stagger: .12, delay: .2, clearProps: 'transform' });
      }
    });
  }

  /* ---------- photos: wipe-in ---------- */
  $('.sec:not(.hero) .img[role="img"]').forEach(function (el) {
    if (el.closest('.card')) return;
    gsap.from(el, { clipPath: 'inset(0 0 100% 0 round 20px)', duration: 1.1, ease: 'power3.inOut', clearProps: 'clipPath', scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
  });
  $('.card .img[role="img"]').forEach(function (el) {
    gsap.fromTo(el, { backgroundSize: '125%' }, { backgroundSize: '100%', ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  /* ---------- text blocks, logos, map, form, footer ---------- */
  $('.logos, .map, form, .sec:not(.hero):not(.intro) .ctas, .ft-grid').forEach(function (el) {
    gsap.from(el, { y: 44, opacity: 0, duration: .9, ease: 'power3.out', clearProps: 'transform,opacity', scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
  });
  $('details:not(.dd):not(.mm)').forEach(function (el, i) {
    gsap.from(el, { y: 24, opacity: 0, duration: .6, ease: 'power2.out', clearProps: 'transform,opacity', scrollTrigger: { trigger: el, start: 'top 93%', once: true } });
  });

  /* floating ticket button */
  gsap.from('.wa-float', { y: 40, opacity: 0, duration: .8, ease: 'back.out(1.6)', delay: 1.6, clearProps: 'transform,opacity' });

  window.addEventListener('load', function () { ScrollTrigger.refresh(); });
})();
