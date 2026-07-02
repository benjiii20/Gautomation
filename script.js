/* =============================================
   GAUTOMATION — script.js
   Mobile nav · Sticky header · Scroll reveal
   Active nav · Form handling
============================================= */

(function () {
  'use strict';

  /* ── Sticky header ─────────────────────────── */
  const header = document.getElementById('site-header');

  function updateHeader() {
    header.classList.toggle('scrolled', window.scrollY > 60);
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader(); // run once on load in case page is already scrolled

  /* ── Mobile nav toggle ─────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const body      = document.body;

  hamburger.addEventListener('click', function () {
    const isOpen = body.classList.toggle('nav-open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  // Close when a nav link is clicked
  document.querySelectorAll('.main-nav a').forEach(function (link) {
    link.addEventListener('click', function () {
      body.classList.remove('nav-open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Close when clicking outside the drawer
  document.addEventListener('click', function (e) {
    if (!body.classList.contains('nav-open')) return;
    if (!e.target.closest('.main-nav') && !e.target.closest('#hamburger')) {
      body.classList.remove('nav-open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });

  /* ── Scroll reveal ─────────────────────────── */
  const revealEls = document.querySelectorAll('[data-reveal]');

  // Pre-set stagger delays for card grids so they cascade in sequence
  document.querySelectorAll('.service-card').forEach(function (el, i) {
    el.style.transitionDelay = (i * 90) + 'ms';
  });
  document.querySelectorAll('.stat-card').forEach(function (el, i) {
    el.style.transitionDelay = (i * 80) + 'ms';
  });

  if ('IntersectionObserver' in window) {
    const revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) { revealObs.observe(el); });
  } else {
    // Fallback: reveal everything immediately
    revealEls.forEach(function (el) { el.classList.add('revealed'); });
  }

  /* ── Active nav link on scroll ─────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if ('IntersectionObserver' in window && navLinks.length) {
    const sectionObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const id = '#' + entry.target.id;
          navLinks.forEach(function (link) {
            link.classList.toggle('active', link.getAttribute('href') === id);
          });
        }
      });
    }, { threshold: 0.4 });

    sections.forEach(function (sec) { sectionObs.observe(sec); });
  }

  /* ── Contact form ──────────────────────────── */
  const form        = document.getElementById('contact-form');
  const formWrapper = document.getElementById('form-wrapper');
  const formSuccess = document.getElementById('form-success');
  const formError   = document.getElementById('form-error');
  const submitBtn   = document.getElementById('form-submit');

  const nameInput    = document.getElementById('name');
  const emailInput   = document.getElementById('email');
  const messageInput = document.getElementById('message');

  function setError(msg, field) {
    formError.textContent = msg;
    if (field) field.focus();
  }

  function isValidEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    setError('');

    const name    = nameInput.value.trim();
    const email   = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (!name) {
      setError('Please enter your name.', nameInput);
      return;
    }

    if (!email || !isValidEmail(email)) {
      setError('Please enter a valid email address.', emailInput);
      return;
    }

    if (!message) {
      setError('Please include a message.', messageInput);
      return;
    }

    submitBtn.disabled    = true;
    submitBtn.textContent = 'Sending…';

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    })
    .then(function (res) {
      if (res.ok) {
        formWrapper.classList.add('hidden');
        formSuccess.classList.add('visible');
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        return res.json().then(function (data) {
          throw new Error(data.errors ? data.errors.map(function(e){ return e.message; }).join(', ') : 'Submission failed.');
        });
      }
    })
    .catch(function (err) {
      formError.textContent = err.message || 'Something went wrong. Please try again.';
      submitBtn.disabled    = false;
      submitBtn.textContent = 'Send Message';
    });
  });

})();
