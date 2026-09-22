// =====================
// Shared Site Utilities & Calculator Metadata
// Used by app.js (homepage grid) and standalone calculator pages.
// Each calculator's logic lives in its own page's inline <script>
// (calculators/<slug>/index.html) — this file only provides grid
// metadata and shared UI helpers.
// =====================
(function() {
  'use strict';

  // Grid metadata only — rendered by app.js on the homepage.
  const calculators = [
    // HEALTH
    { id: 'bmi', slug: 'bmi-calculator', title: 'BMI Calculator', description: 'Body Mass Index with visual gauge', category: 'health', icon: '🏥' },
    { id: 'age', slug: 'age-calculator', title: 'Age Calculator', description: 'Precise age with breakdowns', category: 'health', icon: '🎂' },
    { id: 'calorie', slug: 'calorie-calculator', title: 'Calorie Calculator', description: 'Daily calorie needs (BMR & TDEE)', category: 'health', icon: '🔥' },

    // FINANCE
    { id: 'tip', slug: 'tip-calculator', title: 'Tip Calculator', description: 'Bill splitting with percentage', category: 'finance', icon: '💵' },
    { id: 'loan', slug: 'loan-calculator', title: 'Loan Calculator', description: 'Monthly payment estimation', category: 'finance', icon: '🏦' },
    { id: 'mortgage', slug: 'mortgage-calculator', title: 'Mortgage Calculator', description: 'Detailed monthly payment', category: 'finance', icon: '🏠' },
    { id: 'investment', slug: 'investment-calculator', title: 'Investment Calculator', description: 'Compound interest growth', category: 'finance', icon: '📈' },

    // UTILITY
    { id: 'unit', slug: 'unit-converter', title: 'Unit Converter', description: 'Length, weight, temperature', category: 'utility', icon: '🔄' },
    { id: 'percentage', slug: 'percentage-calculator', title: 'Percentage Calculator', description: 'Percent of, increase/decrease', category: 'utility', icon: '%' },
    { id: 'date', slug: 'date-calculator', title: 'Date Calculator', description: 'Days between dates', category: 'utility', icon: '📅' },
    { id: 'fuel', slug: 'fuel-calculator', title: 'Fuel Calculator', description: 'Trip fuel cost estimation', category: 'utility', icon: '⛽' },

    // SCIENCE
    { id: 'scientific', slug: 'scientific-calculator', title: 'Scientific Calculator', description: 'Advanced math functions', category: 'science', icon: '🔬' },
    { id: 'grade', slug: 'grade-calculator', title: 'Grade Calculator', description: 'GPA and weighted grades', category: 'science', icon: '🎓' }
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

  window.GCalcShared = {
    calculators,
    copyToClipboard,
    showToast
  };
})();
