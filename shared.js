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

  // =====================
  // MONETIZATION CONFIG — edit these two lines to go live.
  //
  // 1. GA4: create a property at analytics.google.com, copy the
  //    Measurement ID (looks like "G-XXXXXXXXXX") and paste it below.
  //    Analytics then loads automatically for visitors who accepted
  //    cookies (consent banner below).
  // 2. Ko-fi: paste your donation page URL (https://ko-fi.com/yourname)
  //    and a "Support us" button appears in every footer.
  // =====================
  const GA4_MEASUREMENT_ID = ''; // e.g. 'G-XXXXXXXXXX'
  const KOFI_URL = '';           // e.g. 'https://ko-fi.com/yourname'

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

  // =====================
  // Result features — shareable URL params, Share/Print buttons,
  // and a print-only header. Runs only on calculator pages (they all
  // have .calc-form-panel); the homepage, about and 404 pages skip out.
  // =====================
  function activateContainerFor(el) {
    // If a prefilled input sits inside a hidden tab panel (date/grade
    // calculators) or a hidden unit-mode form (fuel calculator), click
    // the tab/mode button that reveals it so the shared state is shown.
    const container = el.closest('[id*="panel-"], [id*="form-"]');
    if (!container || container.offsetParent !== null) return;
    const m = container.id.match(/(?:panel|form)-(.+)$/);
    if (!m) return;
    const btn = document.querySelector('[data-tab="' + m[1] + '"], #mode-' + m[1]);
    if (btn) btn.click();
  }

  function shareResult() {
    const panel = document.querySelector('.calc-form-panel');
    if (!panel) return;
    const params = new URLSearchParams();
    panel.querySelectorAll('input[id], select[id]').forEach(el => {
      if (!el.value || el.offsetParent === null) return; // skip empty + hidden-mode inputs
      params.set(el.id, el.value);
    });
    const qs = params.toString();
    history.replaceState(null, '', qs ? '?' + qs : location.pathname);
    navigator.clipboard.writeText(location.href)
      .then(() => showToast('Link copied!'))
      .catch(() => showToast('Copy failed — link is in the address bar'));
  }

  function initResultFeatures() {
    const panel = document.querySelector('.calc-form-panel');
    if (!panel) return;

    // 1. Prefill from URL params (?tip-bill=120&tip-percent=20 …) and
    //    auto-run the calculation so shared links open with results.
    const params = new URLSearchParams(location.search);
    const filled = [];
    params.forEach((value, key) => {
      const el = document.getElementById(key);
      if (el && /^(INPUT|SELECT|TEXTAREA)$/.test(el.tagName) && value !== '') {
        filled.push({ el, value });
      }
    });
    if (filled.length) {
      // Deferred so page-level DOMContentLoaded handlers run first —
      // some pages set default input values on load (e.g. the date
      // calculator resets its fields to today) and must not clobber
      // the shared values.
      setTimeout(() => {
        filled.forEach(({ el, value }) => { el.value = value; });
        filled.forEach(({ el }) => activateContainerFor(el));
        const buttons = new Set();
        filled.forEach(({ el }) => {
          const form = el.closest('.calc-form');
          const btn = form && form.querySelector('.form-actions .btn-primary');
          if (btn) buttons.add(btn);
        });
        buttons.forEach(btn => btn.click());
      }, 0);
    }

    // 2. Share + Print buttons under the calculator.
    const actions = document.createElement('div');
    actions.className = 'result-actions no-print';
    if (panel.querySelector('input[id], select[id]')) {
      const shareBtn = document.createElement('button');
      shareBtn.type = 'button';
      shareBtn.className = 'btn btn-secondary';
      shareBtn.textContent = 'Share Result';
      shareBtn.addEventListener('click', shareResult);
      actions.appendChild(shareBtn);
    }
    const printBtn = document.createElement('button');
    printBtn.type = 'button';
    printBtn.className = 'btn btn-secondary';
    printBtn.textContent = 'Print / Save PDF';
    printBtn.addEventListener('click', () => window.print());
    actions.appendChild(printBtn);
    panel.appendChild(actions);

    // 3. Print-only header with brand, calculator name, source URL and date.
    const heading = panel.querySelector('h3');
    const printHeader = document.createElement('div');
    printHeader.className = 'print-header';
    const title = heading ? heading.textContent : document.title;
    printHeader.innerHTML =
      '<span class="print-brand">GCalc</span> — <strong>' + title + '</strong>' +
      '<span class="print-meta">' + location.href + ' · ' + new Date().toLocaleDateString() + '</span>';
    panel.prepend(printHeader);
  }

  document.addEventListener('DOMContentLoaded', initResultFeatures);

  // =====================
  // Cookie consent (GDPR/ePrivacy) — required before GA4 or AdSense
  // drop their cookies. Stored in localStorage as 'gcalc-consent':
  //   'all'      → analytics + ads allowed
  //   'essential'→ only what the site needs (theme, recent list)
  // The banner is injected by JS so no page HTML needs to change.
  // =====================
  function getConsent() {
    try { return localStorage.getItem('gcalc-consent'); } catch (e) { return null; }
  }

  function setConsent(value) {
    try { localStorage.setItem('gcalc-consent', value); } catch (e) { /* private mode */ }
    document.querySelectorAll('.consent-banner').forEach(b => b.remove());
    if (value === 'all') loadAnalytics();
  }

  function initConsentBanner() {
    if (getConsent()) return; // already chose — never nag again

    const banner = document.createElement('div');
    banner.className = 'consent-banner no-print';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', 'Cookie consent');

    const resolveBase = new URL('privacy-policy/', SCRIPT_SRC || location.href).href;

    banner.innerHTML =
      '<div class="consent-inner">' +
      '  <p class="consent-text">We use cookies for analytics and ads to keep GCalc free. ' +
      '    <a href="' + resolveBase + '">Privacy Policy</a>' +
      '  </p>' +
      '  <div class="consent-actions">' +
      '    <button type="button" class="btn btn-secondary consent-btn" data-consent="essential">Essential only</button>' +
      '    <button type="button" class="btn btn-primary consent-btn" data-consent="all">Accept all</button>' +
      '  </div>' +
      '</div>';

    banner.querySelectorAll('.consent-btn').forEach(btn => {
      btn.addEventListener('click', () => setConsent(btn.getAttribute('data-consent')));
    });

    document.body.appendChild(banner);
  }

  document.addEventListener('DOMContentLoaded', initConsentBanner);

  // =====================
  // Google Analytics 4 — loaded only when a Measurement ID is set AND
  // the visitor accepted analytics cookies. Configure once above
  // (GA4_MEASUREMENT_ID); no per-page snippets needed.
  // =====================
  function loadAnalytics() {
    if (!GA4_MEASUREMENT_ID || document.getElementById('gcalc-gtag')) return;

    const s = document.createElement('script');
    s.id = 'gcalc-gtag';
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA4_MEASUREMENT_ID;
    document.head.appendChild(s);

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA4_MEASUREMENT_ID, { anonymize_ip: true });
  }

  if (getConsent() === 'all') loadAnalytics();

  // =====================
  // Related calculators — injected on every calculator page below the
  // article content. Same-category tools first, then popular others.
  // Real crawlable <a> links grow pageviews (and ad impressions).
  // =====================
  function initRelatedCalculators() {
    const info = document.querySelector('.calc-info-panel');
    if (!info) return; // homepage / about / 404 skip out

    const path = location.pathname;
    const current = calculators.find(c => path.indexOf('/calculators/' + c.slug + '/') !== -1);
    if (!current) return;

    const sameCategory = calculators.filter(c => c.category === current.category && c.id !== current.id);
    const others = calculators.filter(c => c.category !== current.category);
    const related = sameCategory.concat(others).slice(0, 4);
    if (!related.length) return;

    // SCRIPT_SRC is always <site-root>/shared.js, so './calculators/<slug>/'
    // resolves correctly on GitHub Pages (/gcalc/), a custom domain, or localhost.
    const resolve = slug => new URL('./calculators/' + slug + '/', SCRIPT_SRC || location.href).href;

    const section = document.createElement('section');
    section.className = 'related-calcs no-print';
    section.setAttribute('aria-label', 'Related calculators');
    section.innerHTML =
      '<h2 class="related-title">Keep exploring</h2>' +
      '<div class="related-grid">' +
      related.map(c =>
        '<a class="related-card" href="' + resolve(c.slug) + '">' +
        '  <span class="related-icon" aria-hidden="true">' + c.icon + '</span>' +
        '  <span class="related-name">' + c.title + '</span>' +
        '  <span class="related-desc">' + c.description + '</span>' +
        '</a>'
      ).join('') +
      '</div>';

    info.appendChild(section);
  }

  document.addEventListener('DOMContentLoaded', initRelatedCalculators);

  // =====================
  // Affiliate recommendations — renders GCalcAffiliates[calcId] under the
  // article. Links with a placeholder '#' URL are skipped, so nothing
  // shows until real tracking URLs are pasted into affiliates.js.
  // rel="sponsored nofollow" is required by Google for affiliate links.
  // =====================
  function initAffiliateLinks() {
    const info = document.querySelector('.calc-info-panel');
    if (!info || !window.GCalcAffiliates) return;

    const path = location.pathname;
    const current = calculators.find(c => path.indexOf('/calculators/' + c.slug + '/') !== -1);
    if (!current) return;

    const data = window.GCalcAffiliates[current.id];
    if (!data) return;

    const links = (data.links || []).filter(l => l.url && l.url !== '#');
    if (!links.length) return;

    const section = document.createElement('section');
    section.className = 'affiliate-box no-print';
    section.setAttribute('aria-label', 'Recommended for you');
    section.innerHTML =
      '<h2 class="affiliate-title">' + data.title + '</h2>' +
      '<div class="affiliate-grid">' +
      links.map(l =>
        '<a class="affiliate-link' + (l.highlight ? ' affiliate-highlight' : '') + '" ' +
        'href="' + l.url + '" target="_blank" rel="sponsored nofollow noopener">' +
        '  <span>' + l.text + '</span>' +
        '  <span class="affiliate-arrow" aria-hidden="true">→</span>' +
        '</a>'
      ).join('') +
      '</div>';

    info.appendChild(section);
  }

  document.addEventListener('DOMContentLoaded', initAffiliateLinks);

  // =====================
  // Ko-fi support button — appears in the footer of every page when
  // KOFI_URL is set above. Zero HTML edits needed.
  // =====================
  function initSupportButton() {
    if (!KOFI_URL) return;
    const bottom = document.querySelector('.footer-bottom');
    if (!bottom) return;

    const btn = document.createElement('a');
    btn.className = 'support-btn no-print';
    btn.href = KOFI_URL;
    btn.target = '_blank';
    btn.rel = 'noopener';
    btn.innerHTML = '<span aria-hidden="true">☕</span> Support GCalc';
    bottom.appendChild(btn);
  }

  document.addEventListener('DOMContentLoaded', initSupportButton);

  window.GCalcShared = {
    calculators,
    copyToClipboard,
    showToast,
    getRecentCalculators
  };
})();
