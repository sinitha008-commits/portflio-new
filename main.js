/* ═══════════════════════════════════════════════
   Sintha Portfolio — Clean Apple-Style Engine
   ═══════════════════════════════════════════════ */

(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─── THEME ─── */
  const html = document.documentElement;
  const themeBtn = document.getElementById('themeToggle');
  const metaTheme = document.querySelector('meta[name="theme-color"]');

  function getTheme() { return html.getAttribute('data-theme') || 'light'; }

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('sintha-theme', theme);
    themeBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
    themeBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    metaTheme.setAttribute('content', theme === 'dark' ? '#000000' : '#fbfbfd');
  }

  // Init
  const saved = localStorage.getItem('sintha-theme');
  if (saved) {
    applyTheme(saved);
  } else {
    applyTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }

  themeBtn.addEventListener('click', () => {
    applyTheme(getTheme() === 'dark' ? 'light' : 'dark');
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('sintha-theme')) applyTheme(e.matches ? 'dark' : 'light');
  });

  /* ─── LOADER ─── */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => setTimeout(() => loader.classList.add('hide'), 1200));
  if (document.readyState === 'complete') setTimeout(() => loader.classList.add('hide'), 1000);

  /* ─── TYPING ─── */
  const typingEl = document.getElementById('heroTyping');
  const phrases = [
    'Creative IoT enthusiast & future-focused developer.',
    'Passionate about intelligent systems.',
    'Designing modern web experiences.',
    'Exploring technology beyond limits.',
  ];
  let pIdx = 0, cIdx = 0, deleting = false;

  function typeLoop() {
    const text = phrases[pIdx];
    if (!deleting) {
      cIdx++;
      typingEl.innerHTML = text.substring(0, cIdx) + '<span class="typing-cursor"></span>';
      if (cIdx === text.length) { setTimeout(() => { deleting = true; typeLoop(); }, 2400); return; }
      setTimeout(typeLoop, 48 + Math.random() * 28);
    } else {
      cIdx--;
      typingEl.innerHTML = text.substring(0, cIdx) + '<span class="typing-cursor"></span>';
      if (cIdx === 0) { deleting = false; pIdx = (pIdx + 1) % phrases.length; setTimeout(typeLoop, 500); return; }
      setTimeout(typeLoop, 22);
    }
  }

  if (!prefersReducedMotion) setTimeout(typeLoop, 1500);
  else typingEl.textContent = phrases[0];

  /* ─── NAVBAR ─── */
  const navbar = document.getElementById('navbar');
  const navAnchors = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section, .hero');
  let ticking = false;

  function onScroll() {
    const y = window.scrollY;
    let active = '';
    sections.forEach(sec => { if (y >= sec.offsetTop - 200) active = sec.getAttribute('id'); });
    navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + active));
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });

  /* ─── HAMBURGER ─── */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', open);
  });

  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  }));

  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });

  /* ─── SCROLL REVEAL ─── */
  const revealEls = document.querySelectorAll('.reveal');
  if (!prefersReducedMotion) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const siblings = Array.from(entry.target.parentElement.querySelectorAll(':scope > .reveal'));
          const idx = siblings.indexOf(entry.target);
          setTimeout(() => entry.target.classList.add('visible'), idx * 80);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    revealEls.forEach(el => obs.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ─── SMOOTH SCROLL ─── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const top = target.getBoundingClientRect().top + window.scrollY - 60;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ─── FORM ─── */
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const n = form.querySelector('#name');
    const em = form.querySelector('#email');
    const msg = form.querySelector('#message');
    if (!n.value.trim() || !em.value.trim() || !msg.value.trim()) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em.value.trim())) { em.focus(); return; }

    const btn = document.getElementById('formSubmit');
    const original = btn.textContent;
    btn.textContent = '✓ Sent!';
    btn.disabled = true;
    setTimeout(() => { btn.textContent = original; btn.disabled = false; form.reset(); }, 2500);
  });

  /* ─── FOOTER YEAR ─── */
  const yearEl = document.getElementById('footerYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ─── DAILY LOG: EXPAND / COLLAPSE ─── */
  document.querySelectorAll('.day-header').forEach(header => {
    function toggle() {
      const item = header.closest('.timeline-item');
      const isExpanded = item.classList.toggle('expanded');
      header.setAttribute('aria-expanded', isExpanded);

      // Collapse other items
      document.querySelectorAll('.timeline-item.expanded').forEach(other => {
        if (other !== item) {
          other.classList.remove('expanded');
          other.querySelector('.day-header').setAttribute('aria-expanded', 'false');
        }
      });
    }

    header.addEventListener('click', toggle);
    header.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
  });

  /* ─── DAILY LOG: FILTER ─── */
  const filterBtns = document.querySelectorAll('.filter-pill');
  const timelineItems = document.querySelectorAll('.timeline-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      // Update active pill
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Filter items
      timelineItems.forEach(item => {
        const cat = item.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          item.classList.remove('hidden-filter');
        } else {
          item.classList.add('hidden-filter');
          item.classList.remove('expanded');
          const h = item.querySelector('.day-header');
          if (h) h.setAttribute('aria-expanded', 'false');
        }
      });
    });
  });

})();
