const { calculators } = window.GCalcShared;

// =====================
// Initialize
// =====================
document.addEventListener('DOMContentLoaded', init);

function init() {
  renderCalculatorGrid();
  initCalculatorSearch();
  initScrollAnimations();
  initHeroCounters();
}

// =====================
// Live search/filter for the calculator grid
// Matches title, description, category and keyword synonyms.
// =====================
function initCalculatorSearch() {
  const input = document.getElementById('calcSearch');
  const grid = document.getElementById('calculatorsGrid');
  const noResults = document.getElementById('noResults');
  if (!input || !grid) return;

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    let visible = 0;

    grid.querySelectorAll('.calc-card').forEach(card => {
      const haystack = (card.textContent + ' ' + (card.dataset.keywords || '')).toLowerCase();
      const match = !q || haystack.includes(q);
      card.style.display = match ? '' : 'none';
      if (match) visible++;
    });

    if (noResults) noResults.hidden = visible !== 0;
  });
}

// =====================
// Render Calculator Cards
// Each card is a real link to its standalone page (best for SEO and UX).
// =====================
function renderCalculatorGrid() {
  const grid = document.getElementById('calculatorsGrid');
  if (!grid) return;

  grid.innerHTML = calculators.map((calc, i) => `
    <a class="calc-card" href="calculators/${calc.slug}/" data-keywords="${calc.keywords || ''}" data-animate data-delay="${(i % 6) + 1}">
      <div class="calc-card-header">
        <span class="calc-icon" style="font-size:1.5rem">${calc.icon}</span>
        <span class="calc-badge">Free</span>
      </div>
      <h3 class="calc-title">${calc.title}</h3>
      <p class="calc-desc">${calc.description}</p>
      <div class="calc-category">${calc.category}</div>
    </a>
  `).join('');
}

function initScrollAnimations() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('animated'); });
  }, { threshold: 0.1 });

  document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
}

function initHeroCounters() {
  const counters = document.querySelectorAll('.hero-stat-value[data-count]');
  if (!counters.length) return;

  const animate = (el) => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const duration = 1500;
    const start = performance.now();
    const isFloat = String(target).includes('.');

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      const current = target * ease;

      if (isFloat) {
        el.textContent = current.toFixed(1) + suffix;
      } else {
        el.textContent = Math.floor(current).toLocaleString() + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target.toLocaleString() + suffix;
      }
    };

    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animate(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}
