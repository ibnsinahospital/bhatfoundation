/* ==========================================================================
   Bhat Foundation Welfare Society — Main Script
   Handles: mobile nav, sticky header shadow, scroll reveal, footer year
   ========================================================================== */

(function () {
  'use strict';

  /* ---------- 1. Mobile navigation ---------- */
  var navToggle = document.getElementById('navToggle');
  var primaryNav = document.getElementById('primaryNav');

  function closeNav() {
    if (!primaryNav || !navToggle) return;
    primaryNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
    document.body.classList.remove('nav-open');
  }

  function openNav() {
    if (!primaryNav || !navToggle) return;
    primaryNav.classList.add('is-open');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Close menu');
    document.body.classList.add('nav-open');
  }

  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      isOpen ? closeNav() : openNav();
    });

    /* Close when a nav link is tapped */
    primaryNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeNav);
    });

    /* Close on Escape */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });

    /* Close when returning to desktop width */
    var mq = window.matchMedia('(min-width: 1000px)');
    var handleMq = function (e) { if (e.matches) closeNav(); };
    mq.addEventListener ? mq.addEventListener('change', handleMq) : mq.addListener(handleMq);

    /* Close if user taps outside the panel */
    document.addEventListener('click', function (e) {
      if (!primaryNav.classList.contains('is-open')) return;
      if (primaryNav.contains(e.target) || navToggle.contains(e.target)) return;
      closeNav();
    });
  }

  /* ---------- 2. Sticky header shadow on scroll ---------- */
  var header = document.getElementById('siteHeader');

  if (header) {
    var ticking = false;

    var updateHeader = function () {
      if (window.scrollY > 8) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
      ticking = false;
    };

    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
      }
    }, { passive: true });

    updateHeader();
  }

  /* ---------- 3. Scroll reveal ---------- */
  var revealItems = document.querySelectorAll('.reveal');
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (revealItems.length) {
    if (prefersReduced || !('IntersectionObserver' in window)) {
      revealItems.forEach(function (el) { el.classList.add('is-visible'); });
    } else {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

      revealItems.forEach(function (el, i) {
        /* Slight stagger within a group */
        el.style.transitionDelay = (Math.min(i % 4, 3) * 70) + 'ms';
        observer.observe(el);
      });
    }
  }

  /* ---------- 4. Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();