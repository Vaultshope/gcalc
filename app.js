const { calculators, debounce, encodeHTML, copyToClipboard, showToast } = window.GCalcShared;

// =====================
// State
// =====================
let currentCalc = null;
let formValues = {};


// =====================
// Initialize
// =====================
document.addEventListener('DOMContentLoaded', init);

function init() {
  renderCalculatorGrid();
  initScrollAnimations();
  setupEventListeners();
  initHeroCounters();
}

// =====================
// Render Calculator Cards
// =====================
function renderCalculatorGrid() {
  const grid = document.getElementById('calculatorsGrid');
  if (!grid) return;

  grid.innerHTML = calculators.map((calc, i) => `
    <div class="calc-card" data-calc-id="${calc.id}" data-animate data-delay="${(i % 6) + 1}">
      <div class="calc-card-header">
        <span class="calc-icon" style="font-size:1.5rem">${calc.icon}</span>
        <span class="calc-badge">Free</span>
      </div>
      <h3 class="calc-title"><a class="calc-title-link" href="calculators/${calc.slug}/">${calc.title}</a></h3>
      <p class="calc-desc">${calc.description}</p>
      <div class="calc-category">${calc.category}</div>
    </div>
  `).join('');
}

// =====================
// Modal Handling
// =====================
function openCalculatorModal(calcId) {
  const calc = calculators.find(c => c.id === calcId);
  if (!calc) return;

  currentCalc = calc;
  formValues = {};

  const title = document.getElementById('modalTitle');
  const body = document.getElementById('modalBody');
  const overlay = document.getElementById('calculatorModal');

  title.innerHTML = `<span style="font-size:1.5rem;margin-right:0.5rem">${calc.icon}</span>${calc.title}`;

  const fullLink = `<a class="modal-full-link" href="calculators/${calc.slug}/">View full page &rarr;</a>`;
  if (calc.isScientific) {
    body.innerHTML = fullLink + renderScientificCalculator();
  } else {
    body.innerHTML = fullLink + renderCalcForm(calc);
  }

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';

  if (!calc.isScientific) {
    setupCalcFormListeners();
  }
}

function closeModal() {
  const overlay = document.getElementById('calculatorModal');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

// =====================
// Form Rendering
// =====================
function renderCalcForm(calc) {
  const fields = calc.fields.map(f => {
    if (f.type === 'select') {
      const opts = f.options.map(o => `<option value="${o.value}">${o.label}</option>`).join('');
      return `
        <div class="form-group">
          <label class="form-label" for="${f.id}">${f.label}</label>
          <select class="form-select" id="${f.id}" data-field="${f.id}">${opts}</select>
        </div>
      `;
    }
    return `
      <div class="form-group">
        <label class="form-label" for="${f.id}">${f.label}</label>
        <div style="position:relative">
          <input type="${f.type}" class="form-input" id="${f.id}" data-field="${f.id}" placeholder="${f.placeholder}" style="${f.unit ? 'padding-right:3rem' : ''}">
          ${f.unit ? `<span style="position:absolute;right:1rem;top:50%;transform:translateY(-50%);color:var(--text-muted)">${f.unit}</span>` : ''}
        </div>
      </div>
    `;
  }).join('');

  return `
    <form class="calc-form" id="calcForm">
      ${fields}
      <div class="form-actions">
        <button type="button" class="btn btn-secondary" onclick="document.getElementById('calcForm').reset()">Reset</button>
        <button type="submit" class="btn btn-primary">Calculate</button>
      </div>
    </form>
    <div class="calc-result" id="calcResult"></div>
    <div class="calc-affiliate" id="calcAffiliate"></div>
  `;
}

// =====================
// Scientific Calculator
// =====================
function renderScientificCalculator() {
  return `
    <div class="scientific-calc">
      <div id="sciDisplay" style="background:var(--bg);border:1px solid var(--border);border-radius:var(--radius-md);padding:1.5rem;text-align:right;font-family:var(--font-mono);font-size:2rem;margin-bottom:1rem">0</div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:0.5rem">
        ${[
          ['AC','⌫','%','÷'],['7','8','9','×'],['4','5','6','−'],
          ['1','2','3','+'],['0','.','√','=']
        ].flat().map(b => {
          const opMap = { '−': '-', '×': '*', '÷': '/', '%': '%' };
          const cls = ['AC','⌫','%','÷','×','−','+','='].includes(b) ? 'btn-primary' : '';
          const onClick = b === 'AC' ? 'sciClear()' : b === '⌫' ? 'sciBackspace()' : b === '=' ? 'sciEquals()' : b === '√' ? 'sciFn("sqrt")' : `sciAppend('${opMap[b] || b}')`;
          return `<button class="btn ${cls}" onclick="${onClick}" style="padding:1rem;font-size:1.25rem;height:60px">${b}</button>`;
        }).join('')}
        ${['sin','cos','tan','log','sqrt','pi'].map(fn =>
          `<button class="btn btn-secondary" onclick="sciFn('${fn}')" style="height:50px;font-size:0.8rem">${fn}</button>`
        ).join('')}
      </div>
    </div>
  `;
}

let sciInput = '0';
function sciAppend(v) { if (sciInput === '0') sciInput = v; else sciInput += v; updateSciDisplay(); }
function sciClear() { sciInput = '0'; updateSciDisplay(); }
function sciBackspace() { sciInput = sciInput.length > 1 ? sciInput.slice(0,-1) : '0'; updateSciDisplay(); }

function safeEvalMath(expr) {
  // Replace ^ with **
  expr = expr.replace(/\^/g, '**');

  // Tokenize: only allow numbers, operators, parens, Math.fn calls, and PI
  const tokenRegex = /(?:Math\.(?:sin|cos|tan|log|sqrt|PI))|\*\*|\d+\.?\d*|[-+*/()]|\S/g;
  const tokens = expr.match(tokenRegex);

  if (!tokens) return NaN;

  // Reconstruct expression safely
  let safeExpr = '';
  for (let t of tokens) {
    if (/^Math\.(?:sin|cos|tan|log|sqrt|PI)$/.test(t) || /^\d+\.?\d*$/.test(t) || /^[\+\-\*\/\(\)\%]$/.test(t) || t === '**') {
      safeExpr += t;
    } else {
      return NaN;
    }
  }

  // Stack-based postfix evaluation
  const precedence = { '+': 1, '-': 1, '*': 2, '/': 2, '**': 3 };
  const applyOp = (/*JS-C type*/ a, op, b) => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': return b === 0 ? NaN : a / b;
      case '**': return Math.pow(a, b);
      default: return NaN;
    }
  };

  // If the whole expression is a Math.fn(...) call, we need to evaluate it
  // We'll use a simpler approach: create a limited Function with only Math in scope
  try {
    const fn = new Function('Math', '"use strict"; return (' + safeExpr + ')');
    return fn(Math);
  } catch (e) {
    return NaN;
  }
}

function sciEquals() {
  try {
    const result = safeEvalMath(sciInput);
    sciInput = String(isFinite(result) ? result : 'Error');
  } catch {
    sciInput = 'Error';
  }
  updateSciDisplay();
}
function sciFn(fn) {
  if (fn === 'pi') {
    sciInput = sciInput === '0' ? Math.PI.toFixed(8) : sciInput + '*' + Math.PI.toFixed(8);
  } else {
    sciInput = `Math.${fn}(${sciInput})`;
  }
  updateSciDisplay();
}
function updateSciDisplay() { document.getElementById('sciDisplay').textContent = sciInput; }

// =====================
// Form Listeners
// =====================
function setupCalcFormListeners() {
  const form = document.getElementById('calcForm');
  if (!form) return;

  const inputs = form.querySelectorAll('input, select');
  inputs.forEach(inp => {
    inp.addEventListener('input', debounce(() => {
      inputs.forEach(i => formValues[i.dataset.field] = i.value);
      calculateResult();
    }, 150));
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    inputs.forEach(i => formValues[i.dataset.field] = i.value);
    calculateResult();
  });
}

function calculateResult() {
  if (!currentCalc || !currentCalc.calculate) return;

  const result = currentCalc.calculate(formValues);
  const resultEl = document.getElementById('calcResult');
  const affiliateEl = document.getElementById('calcAffiliate');

  if (!resultEl || !result) {
    if (resultEl) resultEl.style.display = 'none';
    return;
  }

  resultEl.innerHTML = `
    <div class="result-label">Result</div>
    <div class="result-value">${encodeHTML(result.value)}<span style="font-size:1rem">${result.unit || ''}</span></div>
    ${result.secondary ? `<div class="result-secondary">${encodeHTML(result.secondary)}</div>` : ''}
    <button class="btn btn-secondary" data-copy-btn style="margin-top:1rem" data-copy="${encodeHTML(result.value)}">Copy Result</button>
  `;
  resultEl.style.display = 'block';

  // Show affiliate links
  if (affiliateEl && currentCalc.affiliate) {
    affiliateEl.innerHTML = `
      <div class="affiliate-title">${currentCalc.affiliate.title}</div>
      <div class="affiliate-links">
        ${currentCalc.affiliate.links.map(l => `
          <a href="${l.url}" target="_blank" class="affiliate-link ${l.highlight ? 'highlight' : ''}">
            ${l.text} <span style="margin-left:auto">→</span>
          </a>
        `).join('')}
      </div>
    `;
    affiliateEl.classList.add('visible');
  }
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

function setupEventListeners() {
  // Calculator cards
  document.getElementById('calculatorsGrid')?.addEventListener('click', e => {
    if (e.target.closest('a')) return; // let real links navigate
    const card = e.target.closest('.calc-card');
    if (card) openCalculatorModal(card.dataset.calcId);
  });

  // Modal close
  document.querySelectorAll('[data-action="close-modal"]').forEach(btn => {
    btn.addEventListener('click', closeModal);
  });

  document.getElementById('calculatorModal')?.addEventListener('click', e => {
    if (e.target.id === 'calculatorModal') closeModal();
  });

  // Escape key
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
  // Copy button delegation
  document.getElementById('calcResult')?.addEventListener('click', e => {
    var btn = e.target.closest('[data-copy-btn]');
    if (btn) copyToClipboard(btn.dataset.copy || btn.textContent.replace('Copy ', ''));
  });

  // Mobile menu toggle
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  if (menuToggle && navMenu) {
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
}
