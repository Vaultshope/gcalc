# GCalc Project — Status Tracker

## Phase 1: Content Expansion ✅ COMPLETE
- All 13 calculators expanded with deep content (~2,000+ words each)

## Phase 2: Technical SEO ✅ COMPLETE
- Structured data (JSON-LD WebPage, SoftwareApplication, FAQPage) on all pages
- Canonical links on all pages
- Meta descriptions and keywords on all pages
- Google Analytics 4 tag on all 14 pages

## Phase 3: Calculator Functionality Fixes ✅ COMPLETE (2026-07-05)

### Bug Fixes Applied
| # | Page | Bug | Resolution |
|---|------|-----|------------|
| 1 | Scientific Calculator | `Math.factorial()` is undefined | Removed `Math.` prefix — `factorial()` is standalone |
| 2 | Loan Calculator | `resetLoan()` blanks term `<select>` to `''` | Resets to `'30'` |
| 3 | Mortgage Calculator | `resetMortgage()` misses the term `<select>` | Added `mh-term.value = '30'` |
| 4 | Tip Calculator | `resetTip()` only clears bill input | Also clears percent and people inputs |
| 5 | Calorie Calculator | `resetCal()` doesn't reset `<select>`s | Resets gender to `'male'`, activity to `'1.55'` |
| 6 | Fuel Calculator | No reset function or button | Added `resetFuel()` + buttons on both imperial/metric forms |
| 7 | styles.css | `.hidden` class missing | Added `.hidden { display: none !important; }` |
| 8 | Sitemap | Missing `about/` entry | Added `https://gcalc.app/about/` |
| 9 | shared.js | Unit converter typo: `cancell: true` | Fixed to `value: 'kg'` |

---

## Remaining Tasks — Prioritized for Next Session

### 🔴 1. CSS Variable Fixes ✅ COMPLETE (2026-07-10)
- [x] Defined `--text-muted: #737373` in styles.css
- [x] Defined `--accent-subtle: #E6F0FF` in styles.css
- [x] Defined `--accent-border: rgba(0, 102, 255, 0.25)` in styles.css

### 🟡 2. CSS Deduplication ✅ COMPLETE (2026-07-10)
- [x] Added shared `.calc-page`, `.calc-form-panel`, `.calc-info-panel h2/h3/p/ul/li`, `.other-calc-links`, `.other-calc-links a` + hover, and `@media (max-width: 900px)` to `styles.css`
- [x] Removed duplicates from: **age-calculator**, **investment-calculator**, **loan-calculator**, **mortgage-calculator** (4 of 13)
- [x] Removed duplicates from: **bmi-calc**, **calorie-calc**, **date-calc**, **fuel-calc**, **grade-calc**, **percentage-calc**, **scientific-calc**, **tip-calc**, **unit-converter** (9 of 13)
- [x] Mixed media queries preserved: calorie (`.cal-targets`, `.cal-breakdown`), percentage (`.pct-results`), scientific (`.sci-keys` + `@media 500px`)

### 🟡 3. Remaining Calculator QA ✅ COMPLETE (2026-07-10)
- [x] Age Calculator — all edge cases handled (future DOB blocked, as-of defaults to today, Feb 29 handled gracefully)
- [x] Date Calculator — tab switching, date diff, add/subtract verified; fixed "Months (approx." → "Months (approx.)" label bug
- [x] Investment Calculator — compound interest + annuity FV formulas verified correct
- [x] Percentage Calculator — all 4 modes compute correctly, reset clears all outputs
- [x] Tip Calculator — re-verified after fix, all inputs cleared, per-person math correct

### 🟡 4. Two divergent scientific calculator implementations ✅ DECIDED (2026-07-10)
- [x] Decision: Keep both implementations — they serve different purposes
  - Modal (app.js): Quick-access simple calculator, 4-col grid, 6 functions, uses `safeEvalMath()`
  - Standalone page: Full-featured, 5-col grid, 14 functions, DEG/RAD toggle, keyboard support
- [x] Both use client-side evaluation only (no server risk). Modal's `safeEvalMath` is the safer implementation with token whitelisting. Standalone's `new Function()` approach is acceptable for client-side-only use.

### 🟢 5. Pre-Launch — IN PROGRESS (2026-07-10)
- [ ] Rename `G-XXXXXXXXXX` to real GA4 Measurement ID (28 occurrences across 14 files) — **needs user's real ID**
- [x] Code-level sanity pass:
  - [x] All 15 files reference `styles.css` and `shared.js` with correct relative paths
  - [x] All nav links consistent: calculators use `../../`, `../../#calculators`, `../../about/`; about uses `../`, `../#calculators`, `./`
  - [x] All 15 files have `menuToggle` mobile nav JS
  - [x] All Google Fonts URLs verified correct
  - [x] All `other-calc-links` point to existing calculator pages
- [ ] Browser testing — open every page, test all forms — **needs user to run locally**
- [ ] Create GitHub repository and push — **needs user decision**

### 🟢 6. Post-Launch
- [ ] Submit sitemap to Google Search Console
- [ ] Set up GSC property for `https://gcalc.app/`
- [ ] Monitor keyword rankings per calculator
- [x] Add Open Graph tags for social sharing ✅ COMPLETE (2026-07-10)
  - All 15 pages have OG/Twitter tags: og:title, og:description, og:url, og:image, og:type, og:site_name, twitter:card etc.
  - Each page uses its own title/description/canonical URL; shared og:image = https://gcalc.app/og-image.png

---

## ✅ Calculator Testing & Bug Fixes (2026-07-10)

### Testing Methodology
All 13 calculators + modal scientific tested via code review: formulas traced with sample inputs, edge cases checked, DOM/event behavior verified.

### Critical Bugs Fixed (4)
| # | Calculator | Bug | Fix |
|---|-----------|-----|-----|
| 1 | Scientific (standalone) | `sciFn` no-op ternary — ALL function buttons broken from `'0'` (produced `0Math.sin(...`) | Replaced `(sciInput==='0'?'':'')` no-op with proper `sciInput=''` reset |
| 2 | Scientific (standalone) | `sciConstant` always prepends `*` — `sin(` became `sin(*Math.PI` | Check last char — skip `*` after `(` or `,` |
| 3 | Scientific (standalone) | Factorial button appended instead of wrapping — `5factorial(` syntax error | Factorial now wraps: `factorial(5` instead of `5factorial(` |
| 4 | Modal Scientific | `− × ÷ %` button labels are Unicode (U+2212 etc.) not in ASCII whitelist — arithmetic grid non-functional | Added `opMap` to convert Unicode→ASCII on click; added `%` to whitelist |

### Moderate Bugs Fixed (22)
| # | Calculator | Bug | Fix |
|---|-----------|-----|-----|
| 5 | Age | `asOf.max = today` blocked future dates, contradicting marketing | Removed max restriction |
| 6 | Calorie | Negative values passed validation | Changed to `isNaN \|\| <= 0` guards |
| 7 | Calorie | TDEE−500 could go negative | Clamped to `Math.max(0, ...)` |
| 8-10 | Fuel | Falsy check rejected 0, no negative check, alert-spam on keystroke | `isNaN`+sign guards, silent hide instead of alert |
| 11-13 | Date | Inconsistent remainder divisors (30 vs 30.44), parseInt truncation, invalid offset→0 | Proper remainders, parseFloat+round, isNaN alert |
| 14-15 | Grade | No row removal, no reset function | Added `removeCourseRow()`, `resetGrade()` |
| 16-17 | Percentage | 4th formula wasn't "find the whole", label swapped | Formula→`value/(percent/100)`, label→"Value is P% of What" |
| 18 | Scientific (standalone) | Division by zero returned `Infinity` not "Error" | Added `isFinite && !isNaN` check |
| 19 | Investment | Info text said "beginning of period" but formula is ordinary annuity | Changed to "end of each compounding period" |
| 20 | Loan | Falsy check blocked 0% interest loans | Changed to `isNaN` + sign guards |
| 21-23 | Mortgage | Negative down allowed, NaN rate→$NaN, Math.round lost cents | Validation fixes + `.toFixed(2)` |

### Not Fixed (Feature Gaps / Minor)
| # | Calculator | Issue | Reason |
|---|-----------|-------|--------|
| — | BMI | No imperial toggle (lbs/inches) | Feature addition |
| — | Percentage | No percent-change mode | Needs different inputs |
| — | Scientific (standalone) | Display shows raw internals | UX improvement |
| — | Unit Converter | Missing Volume, Area, Speed, Time | Feature addition |
| — | Modal Scientific | No `^` button | Minor |

### Tip Calculator — Zero bugs found ✅

---

## ✅ Completed (2026-07-10 session)

### Navigation & Link Audit ✅
- [x] Replaced broken nav on all 13 calculator pages — now consistent: Home / Calculators / About
- [x] Added `id="navMenu"` to all nav elements
- [x] Fixed logo on all calculator pages — now uses `.logo-icon` + text (was undefined `.logo-text`)
- [x] Added `menu-toggle` hamburger button + mobile nav JS to all 13 calculator pages
- [x] Verified footer links — all `../../#calculators`, `../../about/`, `../<calc>/` correct
- [x] Verified `other-calc-links` — all `../<calc>/` paths correct and all page references exist

### Asset Path Verification ✅
- [x] Confirmed `../../styles.css` and `../../shared.js` resolve correctly for all 13 calculator pages
- [x] Fixed age-calculator corrupted Google Fonts URL (font families had `..Fam..` placeholder text)
- [x] Added JetBrains Mono 700 weight to all 13 calculators + about page (was missing, needed for `.logo-icon` and `.result-value`)