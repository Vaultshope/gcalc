// =====================
// Shared Site Utilities & Calculator Metadata
// Used by app.js (homepage grid) and standalone calculator pages.
// Each calculator's logic lives in its own page's inline <script>
// (calculators/<slug>/index.html) — this file only provides grid
// metadata and shared UI helpers.
// =====================
(function() {
  'use strict';

  // Absolute URL of this script — lets the service worker register at the
  // right path on GitHub Pages (/gcalc/), a custom domain root, or localhost.
  const SCRIPT_SRC = (document.currentScript && document.currentScript.src) || '';

  // Grid metadata only — rendered by app.js on the homepage.
  // `keywords` powers the homepage live search (synonyms users type).
  const calculators = [
    // HEALTH
    { id: 'bmi', slug: 'bmi-calculator', title: 'BMI Calculator', description: 'Body Mass Index with visual gauge', category: 'health', icon: '🏥', keywords: 'body mass index weight height fitness obese' },
    { id: 'age', slug: 'age-calculator', title: 'Age Calculator', description: 'Precise age with breakdowns', category: 'health', icon: '🎂', keywords: 'birthday born years months days date of birth' },
    { id: 'calorie', slug: 'calorie-calculator', title: 'Calorie Calculator', description: 'Daily calorie needs (BMR & TDEE)', category: 'health', icon: '🔥', keywords: 'bmr tdee diet nutrition food macros weight loss maintenance' },

    // FINANCE
    { id: 'tip', slug: 'tip-calculator', title: 'Tip Calculator', description: 'Bill splitting with percentage', category: 'finance', icon: '💵', keywords: 'gratuity restaurant bill split dinner service waiter' },
    { id: 'loan', slug: 'loan-calculator', title: 'Loan Calculator', description: 'Monthly payment estimation', category: 'finance', icon: '🏦', keywords: 'payment interest amortization car auto personal credit monthly' },
    { id: 'mortgage', slug: 'mortgage-calculator', title: 'Mortgage Calculator', description: 'Detailed monthly payment', category: 'finance', icon: '🏠', keywords: 'home house property payment interest amortization refinance real estate' },
    { id: 'investment', slug: 'investment-calculator', title: 'Investment Calculator', description: 'Compound interest growth', category: 'finance', icon: '📈', keywords: 'compound interest savings retirement growth wealth future value' },

    // UTILITY
    { id: 'unit', slug: 'unit-converter', title: 'Unit Converter', description: 'Length, weight, temperature', category: 'utility', icon: '🔄', keywords: 'convert conversion length weight temperature metric imperial measurement' },
    { id: 'percentage', slug: 'percentage-calculator', title: 'Percentage Calculator', description: 'Percent of, increase/decrease', category: 'utility', icon: '%', keywords: 'percent increase decrease change discount ratio off' },
    { id: 'date', slug: 'date-calculator', title: 'Date Calculator', description: 'Days between dates', category: 'utility', icon: '📅', keywords: 'days between dates duration difference add subtract countdown' },
    { id: 'fuel', slug: 'fuel-calculator', title: 'Fuel Calculator', description: 'Trip fuel cost estimation', category: 'utility', icon: '⛽', keywords: 'gas petrol trip car travel cost mpg efficiency distance' },

    // SCIENCE
    { id: 'scientific', slug: 'scientific-calculator', title: 'Scientific Calculator', description: 'Advanced math functions', category: 'science', icon: '🔬', keywords: 'math trigonometry sin cos tan log advanced functions' },
    { id: 'grade', slug: 'grade-calculator', title: 'Grade Calculator', description: 'GPA and weighted grades', category: 'science', icon: '🎓', keywords: 'gpa school college course marks average exam test weighted' }
  ];

  // =====================
  // Helpers
  // =====================
  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => showToast('Copied!')).catch(() => showToast('Failed to copy'));
  }

  function showToast(msg) {
    const toast = document.createElement('div');
    toast.className = 'toast show';
    toast.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg><span>${msg}</span>`;
    document.body.appendChild(toast);
    setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 300); }, 2000);
  }

  // =====================
  // Mobile navigation (shared across all pages)
  // =====================
  function initNavMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    if (!menuToggle || !navMenu) return;

    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('open');
    });

    // Close menu when a link is clicked
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('open');
      });
    });
  }

  document.addEventListener('DOMContentLoaded', initNavMenu);

  // =====================
  // Theme (dark mode)
  // The initial theme is applied by a tiny inline script in <head>
  // (no flash of the wrong theme). This injects the toggle button into
  // every page header — one implementation shared by all 16 pages.
  // =====================
  function initThemeToggle() {
    const headerInner = document.querySelector('.header-inner');
    if (!headerInner || document.getElementById('themeToggle')) return;

    const SUN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>';
    const MOON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

    const btn = document.createElement('button');
    btn.id = 'themeToggle';
    btn.className = 'theme-toggle';
    btn.type = 'button';

    const syncIcon = () => {
      const dark = document.documentElement.getAttribute('data-theme') === 'dark';
      btn.innerHTML = dark ? SUN : MOON;
      btn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    };

    // Keep the browser UI color (mobile address bar) in sync with the theme.
    const syncThemeColor = () => {
      const dark = document.documentElement.getAttribute('data-theme') === 'dark';
      document.querySelectorAll('meta[name="theme-color"]').forEach(m => {
        m.setAttribute('content', dark ? '#0A0A0A' : '#FAFAFA');
      });
    };

    btn.addEventListener('click', () => {
      const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('gcalc-theme', next); } catch (e) { /* private mode */ }
      syncIcon();
      syncThemeColor();
    });

    syncIcon();
    syncThemeColor();

    // Group with the mobile menu toggle so both buttons sit together on
    // the right edge of the header (reuses the .header-actions styles).
    const actions = document.createElement('div');
    actions.className = 'header-actions';
    actions.appendChild(btn);

    const menuToggle = document.getElementById('menuToggle');
    if (menuToggle && menuToggle.parentElement === headerInner) {
      headerInner.insertBefore(actions, menuToggle);
      actions.appendChild(menuToggle); // moving a node keeps its listeners
    } else {
      headerInner.appendChild(actions);
    }
  }

  document.addEventListener('DOMContentLoaded', initThemeToggle);

  // =====================
  // Recently used calculators (localStorage)
  // Each calculator page records its id on visit; the homepage turns the
  // list into one-click chips so return visits start where they left off.
  // =====================
  function trackRecentCalculator() {
    const path = location.pathname;
    const calc = calculators.find(c => path.indexOf('/calculators/' + c.slug + '/') !== -1);
    if (!calc) return;

    let recent = [];
    try { recent = JSON.parse(localStorage.getItem('gcalc-recent') || '[]'); } catch (e) { recent = []; }
    if (!Array.isArray(recent)) recent = [];

    recent = recent.filter(id => id !== calc.id);
    recent.unshift(calc.id);

    try { localStorage.setItem('gcalc-recent', JSON.stringify(recent.slice(0, 5))); } catch (e) { /* private mode */ }
  }

  function getRecentCalculators() {
    let recent = [];
    try { recent = JSON.parse(localStorage.getItem('gcalc-recent') || '[]'); } catch (e) { recent = []; }
    if (!Array.isArray(recent)) recent = [];
    return recent.map(id => calculators.find(c => c.id === id)).filter(Boolean);
  }

  document.addEventListener('DOMContentLoaded', trackRecentCalculator);

  // =====================
  // PWA — service worker registration
  // sw.js sits next to this file; resolving against SCRIPT_SRC keeps the
  // registration path correct on GitHub Pages, a custom domain, and localhost.
  // =====================
  function registerServiceWorker() {
    if (!SCRIPT_SRC) return;
    navigator.serviceWorker.register(new URL('sw.js', SCRIPT_SRC).href).catch(() => {});
  }

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', registerServiceWorker);
  }

  window.GCalcShared = {
    calculators,
    copyToClipboard,
    showToast,
    getRecentCalculators
  };
})();
