// =====================
// Shared Calculator Data & Utilities
// Used by app.js and standalone calculator pages
// =====================
(function() {
  'use strict';

const calculators = [
  // HEALTH
  {
    id: 'bmi',
    slug: 'bmi-calculator',
    title: 'BMI Calculator',
    description: 'Body Mass Index with visual gauge',
    category: 'health',
    icon: '🏥',
    fields: [
      { id: 'weight', label: 'Weight', type: 'number', placeholder: '70', unit: 'kg' },
      { id: 'height', label: 'Height', type: 'number', placeholder: '175', unit: 'cm' }
    ],
    affiliate: {
      title: 'Related to your health journey',
      links: [
        { text: 'Fitbit Charge 6 - Track your fitness', url: '#', highlight: true },
        { text: 'Compare Health Insurance Plans', url: '#', highlight: false },
        { text: 'Nike Running Club - Free app', url: '#', highlight: false }
      ]
    },
    calculate: (v) => {
      const w = parseFloat(v.weight), h = parseFloat(v.height) / 100;
      if (!w || h <= 0) return null;
      const bmi = w / (h * h);
      let cat = bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal' : bmi < 30 ? 'Overweight' : 'Obese';
      return { value: bmi.toFixed(1), secondary: cat, bmi };
    }
  },
  {
    id: 'age',
    slug: 'age-calculator',
    title: 'Age Calculator',
    description: 'Precise age with breakdowns',
    category: 'health',
    icon: '🎂',
    fields: [
      { id: 'birthDate', label: 'Birth Date', type: 'date' }
    ],
    affiliate: {
      title: 'Never miss important dates',
      links: [
        { text: 'Flowrit - Birthday reminder', url: '#', highlight: true },
        { text: 'MetLife Life Insurance', url: '#', highlight: false },
        { text: '1-800-Flowers - Same day', url: '#', highlight: false }
      ]
    },
    calculate: (v) => {
      if (!v.birthDate) return null;
      const birth = new Date(v.birthDate), today = new Date();
      let years = today.getFullYear() - birth.getFullYear();
      let months = today.getMonth() - birth.getMonth();
      let days = today.getDate() - birth.getDate();
      if (days < 0) { months--; days += new Date(today.getFullYear(), today.getMonth(), 0).getDate(); }
      if (months < 0) { years--; months += 12; }
      const totalDays = Math.floor((today - birth) / 86400000);
      return { value: `${years}y ${months}m ${days}d`, secondary: `${totalDays.toLocaleString()} total days` };
    }
  },
  {
    id: 'calorie',
    slug: 'calorie-calculator',
    title: 'Calorie Calculator',
    description: 'Daily calorie needs (BMR & TDEE)',
    category: 'health',
    icon: '🔥',
    fields: [
      { id: 'weight', label: 'Weight', type: 'number', placeholder: '70', unit: 'kg' },
      { id: 'height', label: 'Height', type: 'number', placeholder: '175', unit: 'cm' },
      { id: 'age', label: 'Age', type: 'number', placeholder: '30', unit: 'years' },
      { id: 'gender', label: 'Gender', type: 'select', options: [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' }
      ]},
      { id: 'activity', label: 'Activity', type: 'select', options: [
        { value: 1.2, label: 'Sedentary' },
        { value: 1.375, label: 'Light exercise' },
        { value: 1.55, label: 'Moderate exercise' },
        { value: 1.725, label: 'Heavy exercise' },
        { value: 1.9, label: 'Athlete' }
      ]}
    ],
    affiliate: {
      title: 'Reach your nutrition goals',
      links: [
        { text: 'MyFitnessPal Premium - Track macros', url: '#', highlight: true },
        { text: 'HelloFresh - Meal kit delivery', url: '#', highlight: false },
        { text: 'Treeline - Personalized vitamins', url: '#', highlight: false }
      ]
    },
    calculate: (v) => {
      const w = parseFloat(v.weight), h = parseFloat(v.height), a = parseFloat(v.age);
      if (!w || !h || !a) return null;
      const gender = v.gender;
      const activity = parseFloat(v.activity);
      // Mifflin-St Jeor
      const bmr = gender === 'male'
        ? 10 * w + 6.25 * h - 5 * a + 5
        : 10 * w + 6.25 * h - 5 * a - 161;
      const tdee = bmr * activity;
      return {
        value: Math.round(tdee),
        unit: ' cal/day',
        secondary: `BMR: ${Math.round(bmr)} | Maintain weight: ${Math.round(tdee)} cal | Lose weight: ${Math.round(tdee - 500)} cal`
      };
    }
  },

  // FINANCE
  {
    id: 'tip',
    slug: 'tip-calculator',
    title: 'Tip Calculator',
    description: 'Bill splitting with percentage',
    category: 'finance',
    icon: '💵',
    fields: [
      { id: 'bill', label: 'Bill Amount', type: 'number', placeholder: '100', unit: '$' },
      { id: 'tip', label: 'Tip Percentage', type: 'number', placeholder: '15', unit: '%' },
      { id: 'people', label: 'Split Between', type: 'number', placeholder: '2', unit: 'people' }
    ],
    affiliate: {
      title: 'Save on dining',
      links: [
        { text: 'Chase Sapphire - 3x on dining', url: '#', highlight: true },
        { text: 'OpenTable - Earn rewards', url: '#', highlight: false },
        { text: 'DoorDash Pass - Free delivery', url: '#', highlight: false }
      ]
    },
    calculate: (v) => {
      const bill = parseFloat(v.bill) || 0, tip = parseFloat(v.tip) || 0, people = parseInt(v.people) || 1;
      const total = bill * (1 + tip / 100);
      return { value: (total / people).toFixed(2), unit: '/person', secondary: `Total: $${total.toFixed(2)} | Tip: $${(bill * tip / 100).toFixed(2)}` };
    }
  },
  {
    id: 'loan',
    slug: 'loan-calculator',
    title: 'Loan Calculator',
    description: 'Monthly payment estimation',
    category: 'finance',
    icon: '🏦',
    fields: [
      { id: 'principal', label: 'Loan Amount', type: 'number', placeholder: '250000', unit: '$' },
      { id: 'rate', label: 'Interest Rate', type: 'number', placeholder: '5.5', unit: '%' },
      { id: 'years', label: 'Loan Term', type: 'number', placeholder: '30', unit: 'years' }
    ],
    affiliate: {
      title: 'Explore loan options',
      links: [
        { text: 'LightStream - Low rate loans', url: '#', highlight: true },
        { text: 'SoFi - Student refinancing', url: '#', highlight: false },
        { text: 'Discover Personal Loans', url: '#', highlight: false }
      ]
    },
    calculate: (v) => {
      const p = parseFloat(v.principal), r = parseFloat(v.rate) / 100 / 12, n = parseFloat(v.years) * 12;
      if (!p || !r || !n) return null;
      const payment = p * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
      return { value: payment.toFixed(2), unit: '/month', secondary: `Total: $${(payment * n).toFixed(0)} | Interest: $${(payment * n - p).toFixed(0)}` };
    }
  },
  {
    id: 'mortgage',
    slug: 'mortgage-calculator',
    title: 'Mortgage Calculator',
    description: 'Detailed monthly payment',
    category: 'finance',
    icon: '🏠',
    fields: [
      { id: 'homePrice', label: 'Home Price', type: 'number', placeholder: '400000', unit: '$' },
      { id: 'downPayment', label: 'Down Payment', type: 'number', placeholder: '80000', unit: '$' },
      { id: 'loanTerm', label: 'Loan Term', type: 'number', placeholder: '30', unit: 'years' },
      { id: 'interestRate', label: 'Interest Rate', type: 'number', placeholder: '6.5', unit: '%' },
      { id: 'propertyTax', label: 'Property Tax', type: 'number', placeholder: '4000', unit: '/year' },
      { id: 'insurance', label: 'Insurance', type: 'number', placeholder: '2400', unit: '/year' }
    ],
    affiliate: {
      title: 'Start your home journey',
      links: [
        { text: 'Rocket Mortgage - Quick approval', url: '#', highlight: true },
        { text: 'Zillow - Browse homes', url: '#', highlight: false },
        { text: 'Lemonade Insurance', url: '#', highlight: false }
      ]
    },
    calculate: (v) => {
      const price = parseFloat(v.homePrice), down = parseFloat(v.downPayment), term = parseFloat(v.loanTerm);
      const rate = parseFloat(v.interestRate) / 100 / 12, tax = parseFloat(v.propertyTax) / 12, ins = parseFloat(v.insurance) / 12;
      const principal = price - down;
      const n = term * 12;
      const pi = principal * rate * Math.pow(1 + rate, n) / (Math.pow(1 + rate, n) - 1);
      return { value: (pi + tax + ins).toFixed(0), unit: '/month', secondary: `P&I: $${pi.toFixed(0)} | Tax: $${tax.toFixed(0)} | Ins: $${ins.toFixed(0)}` };
    }
  },
  {
    id: 'investment',
    slug: 'investment-calculator',
    title: 'Investment Calculator',
    description: 'Compound interest growth',
    category: 'finance',
    icon: '📈',
    fields: [
      { id: 'initial', label: 'Initial Investment', type: 'number', placeholder: '10000', unit: '$' },
      { id: 'monthly', label: 'Monthly Contribution', type: 'number', placeholder: '500', unit: '$' },
      { id: 'years', label: 'Time Period', type: 'number', placeholder: '20', unit: 'years' },
      { id: 'rate', label: 'Expected Return', type: 'number', placeholder: '7', unit: '%' }
    ],
    affiliate: {
      title: 'Start investing today',
      links: [
        { text: 'Fidelity - No minimum to start', url: '#', highlight: true },
        { text: 'M1 Finance - Auto investing', url: '#', highlight: false },
        { text: 'Webull - Free stocks', url: '#', highlight: false }
      ]
    },
    calculate: (v) => {
      const initial = parseFloat(v.initial), monthly = parseFloat(v.monthly), years = parseFloat(v.years), rate = parseFloat(v.rate) / 100;
      if (years <= 0) return null;
      const n = 12, t = years;
      const lumpSum = initial * Math.pow(1 + rate / n, n * t);
      const annuity = monthly * ((Math.pow(1 + rate / n, n * t) - 1) / (rate / n));
      const fv = lumpSum + annuity, contributed = initial + monthly * n * t;
      return { value: fv.toFixed(0), unit: '', secondary: `Contributed: $${contributed.toLocaleString()} | Growth: $${(fv - contributed).toLocaleString()}` };
    }
  },

  // UTILITY
  {
    id: 'unit',
    slug: 'unit-converter',
    title: 'Unit Converter',
    description: 'Length, weight, temperature',
    category: 'utility',
    icon: '🔄',
    fields: [
      { id: 'value', label: 'Value', type: 'number', placeholder: '100' },
      { id: 'from', label: 'From', type: 'select', options: [
        { value: 'm', label: 'Meters' }, { value: 'cm', label: 'Centimeters' },
        { value: 'km', label: 'Kilometers' }, { value: 'in', label: 'Inches' },
        { value: 'ft', label: 'Feet' }, { value: 'mi', label: 'Miles' },
        { value: 'kg', label: 'Kilograms' }, { value: 'lb', label: 'Pounds' },
        { value: 'c', label: 'Celsius' }, { value: 'f', label: 'Fahrenheit' }
      ]},
      { id: 'to', label: 'To', type: 'select', options: [
        { value: 'm', label: 'Meters' }, { value: 'cm', label: 'Centimeters' },
        { value: 'km', label: 'Kilometers' }, { value: 'in', label: 'Inches' },
        { value: 'ft', label: 'Feet' }, { value: 'mi', label: 'Miles' },
        { value: 'kg', label: 'Kilograms' }, { value: 'lb', label: 'Pounds' },
        { value: 'c', label: 'Celsius' }, { value: 'f', label: 'Fahrenheit' }
      ]}
    ],
    affiliate: {
      title: 'Perfect for your travels',
      links: [
        { text: 'Airbnb - Book unique stays', url: '#', highlight: true },
        { text: 'Skyscanner - Cheap flights', url: '#', highlight: false },
        { text: 'Revolut - Low fee exchange', url: '#', highlight: false }
      ]
    },
    calculate: (v) => {
      const val = parseFloat(v.value), from = v.from, to = v.to;
      if (isNaN(val)) return null;

      // Length to meters
      const toM = { m: 1, cm: 0.01, km: 1000, in: 0.0254, ft: 0.3048, mi: 1609.344 };
      // Weight to kg
      const toKg = { kg: 1, lb: 0.453592 };

      // Temperature
      if ((from === 'c' || from === 'f') && (to === 'c' || to === 'f')) {
        let c = from === 'c' ? val : (val - 32) * 5 / 9;
        let r = to === 'c' ? c : c * 9 / 5 + 32;
        return { value: r.toFixed(2), unit: `°${to.toUpperCase()}` };
      }

      if (toM[from] && toM[to]) {
        let m = val * toM[from];
        return { value: (m / toM[to]).toFixed(4).replace(/\.?0+$/, ''), unit: to };
      }
      if (toKg[from] && toKg[to]) {
        let kg = val * toKg[from];
        return { value: (kg / toKg[to]).toFixed(4).replace(/\.?0+$/, ''), unit: to };
      }
      return null;
    }
  },
  {
    id: 'percentage',
    slug: 'percentage-calculator',
    title: 'Percentage Calculator',
    description: 'Percent of, increase/decrease',
    category: 'utility',
    icon: '%',
    fields: [
      { id: 'value', label: 'Value', type: 'number', placeholder: '50' },
      { id: 'percent', label: 'Percentage', type: 'number', placeholder: '20', unit: '%' }
    ],
    affiliate: {
      title: 'Financial tools',
      links: [
        { text: 'Mint - Free budget tracker', url: '#', highlight: true },
        { text: 'YNAB Budgeting App', url: '#', highlight: false },
        { text: 'Credit Karma - Free score', url: '#', highlight: false }
      ]
    },
    calculate: (v) => {
      const val = parseFloat(v.value), pct = parseFloat(v.percent);
      if (isNaN(val) || isNaN(pct)) return null;
      const result = val * pct / 100;
      return { value: result.toFixed(2), secondary: `${pct}% of ${val} = ${result}` };
    }
  },
  {
    id: 'date',
    slug: 'date-calculator',
    title: 'Date Calculator',
    description: 'Days between dates',
    category: 'utility',
    icon: '📅',
    fields: [
      { id: 'start', label: 'Start Date', type: 'date' },
      { id: 'end', label: 'End Date', type: 'date' }
    ],
    affiliate: {
      title: 'Stay organized',
      links: [
        { text: 'Google Calendar Premium', url: '#', highlight: true },
        { text: 'Notion - All-in-one workspace', url: '#', highlight: false },
        { text: 'Todoist - Task management', url: '#', highlight: false }
      ]
    },
    calculate: (v) => {
      if (!v.start || !v.end) return null;
      const days = Math.ceil(Math.abs(new Date(v.end) - new Date(v.start)) / 86400000);
      return { value: days, unit: ' days', secondary: `${Math.floor(days/7)} weeks | ${Math.floor(days/30)} months approx` };
    }
  },
  {
    id: 'fuel',
    slug: 'fuel-calculator',
    title: 'Fuel Calculator',
    description: 'Trip fuel cost estimation',
    category: 'utility',
    icon: '⛽',
    fields: [
      { id: 'distance', label: 'Distance', type: 'number', placeholder: '500', unit: 'miles' },
      { id: 'mpg', label: 'Vehicle MPG', type: 'number', placeholder: '30' },
      { id: 'fuelPrice', label: 'Fuel Price', type: 'number', placeholder: '3.50', unit: '/gal' }
    ],
    affiliate: {
      title: 'Save on fuel',
      links: [
        { text: 'GasBuddy - Find cheap gas', url: '#', highlight: true },
        { text: 'Chase Freedom - 5% gas', url: '#', highlight: false },
        { text: 'GEICO Insurance', url: '#', highlight: false }
      ]
    },
    calculate: (v) => {
      const dist = parseFloat(v.distance), mpg = parseFloat(v.mpg), price = parseFloat(v.fuelPrice);
      if (!dist || !mpg || !price) return null;
      const gal = dist / mpg, cost = gal * price;
      return { value: cost.toFixed(2), unit: ' total', secondary: `${gal.toFixed(1)} gal | $${(cost/dist*100).toFixed(2)}/100mi` };
    }
  },

  // SCIENCE
  {
    id: 'scientific',
    slug: 'scientific-calculator',
    title: 'Scientific Calculator',
    description: 'Advanced math functions',
    category: 'science',
    icon: '🔬',
    isScientific: true,
    affiliate: {
      title: 'Continue exploring math',
      links: [
        { text: 'Wolfram Alpha - Computational engine', url: '#', highlight: true },
        { text: 'Desmos Graphing Calculator', url: '#', highlight: false },
        { text: 'Photomath - Solve equations', url: '#', highlight: false }
      ]
    },
    calculate: () => null
  },
  {
    id: 'grade',
    slug: 'grade-calculator',
    title: 'Grade Calculator',
    description: 'GPA and weighted grades',
    category: 'science',
    icon: '🎓',
    fields: [
      { id: 'currentGpa', label: 'Current GPA', type: 'number', placeholder: '3.5' },
      { id: 'credits', label: 'Earned Credits', type: 'number', placeholder: '60' },
      { id: 'targetGpa', label: 'Target GPA', type: 'number', placeholder: '3.8' },
      { id: 'semCredits', label: 'Semester Credits', type: 'number', placeholder: '15' }
    ],
    affiliate: {
      title: 'Ace your studies',
      links: [
        { text: 'Chegg - Textbook rentals', url: '#', highlight: true },
        { text: 'Khan Academy - Free courses', url: '#', highlight: false },
        { text: 'Grammarly - Better writing', url: '#', highlight: false }
      ]
    },
    calculate: (v) => {
      const curr = parseFloat(v.currentGpa), credits = parseFloat(v.credits), target = parseFloat(v.targetGpa), sem = parseFloat(v.semCredits);
      if (!curr || !credits || !sem || target < 0 || target > 4) return null;
      const totalPoints = curr * credits;
      const needed = target * (credits + sem) - totalPoints;
      const reqGpa = needed / sem;
      const letter = reqGpa >= 4 ? 'A' : reqGpa >= 3.7 ? 'A-' : reqGpa >= 3.3 ? 'B+' : reqGpa >= 3 ? 'B' : 'Need higher';
      return { value: reqGpa <= 4 ? reqGpa.toFixed(2) : 'N/A', unit: reqGpa <= 4 ? ` (${letter})` : '', secondary: `Need ${reqGpa.toFixed(2)} this semester to reach ${target}` };
    }
  }
];

// =====================
// Helpers
// =====================
function debounce(fn, d) { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), d); }; }
function encodeHTML(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

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

  window.GCalcShared = {
    calculators,
    debounce,
    encodeHTML,
    copyToClipboard,
    showToast
  };
})();
