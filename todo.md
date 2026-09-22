# GCalc — Status & Todo

_Last updated: 2026-09-22_

## ✅ Done

### Launch / infra
- [x] Git repo + GitHub remote (`Vaultshope/gcalc`), `main` branch
- [x] GitHub Pages deploy workflow (`.github/workflows/deploy.yml`)
- [x] `robots.txt` with sitemap reference
- [x] `favicon.svg` + `apple-touch-icon.png`, linked on all 15 pages
- [x] `og-image.png` (1200x630) for social sharing
- [x] README rewritten to match the actual project

### SEO
- [x] Homepage calculator cards are real links to all 13 calculator pages
- [x] Modal removed entirely (homepage is link-only now — HTML/JS/CSS)
- [x] Sitemap `lastmod` refreshed to 2026-09-22
- [x] `privacy-policy/index.html` created (12 sections: data collection, cookies, analytics, ads, affiliates, COPPA/GDPR/CCPA)
- [x] Privacy Policy link added to the footer of all 15 pages
- [x] `privacy-policy/` added to `sitemap.xml` and README structure

### Trust / compliance (P0)
- [x] Hero stats replaced with honest figures (13 Free Calculators / 100% Free Forever / 24/7 Always Available)
- [x] Medical disclaimers on BMI + Calorie pages (`.calc-disclaimer` block + CSS)
- [x] Financial disclaimers on Loan + Mortgage + Investment pages
- [x] Fixed `401买的` text corruption in Investment page (JSON-LD + FAQ)

### Monetization prep
- [x] Ad slots hidden by default, with insertion instructions
- [x] Affiliate scaffold (39 entries) moved to standalone `affiliates.js` (not loaded by any page yet)

### Code quality (Phase D)
- [x] `shared.js` stripped to grid metadata + shared helpers (`copyToClipboard`, `showToast`, `initNavMenu`) — Option A
- [x] Mobile-menu JS deduped: single handler in `shared.js`, all 15 inline IIFEs removed (incl. About page)
- [x] Fixed privacy-policy mobile menu (leftover IIFE double-toggled the class → menu appeared broken)
- [x] `app.js` cleaned: only grid render + scroll animations + hero counters
- [x] `LICENSE` file added (MIT, © 2026 GCalc)
- [x] Local browser QA: homepage, BMI (22.9 Normal ✓), privacy-policy, About, tip + all 11 remaining calculator pages — zero console errors; mobile menu verified on 4 pages; favicon renders; hero counters animate to 13 / 100% / 24/7

## ⏳ Blocked on external accounts / decisions

- [ ] **GA4 Measurement ID** — paste the gtag.js snippet into the 15 comment placeholders (`<!-- Analytics: paste your Google Analytics 4 (gtag.js) snippet here. -->`)
- [ ] **Ad network approval** (AdSense / Ezoic) — insert code into the 2 ad slots in `index.html`, then remove `style="display:none"`
- [ ] **Affiliate approvals** — replace the 39 `url: '#'` entries and wire them into the standalone calculator pages
- [ ] **Custom domain** (`gcalc.app`) — once bought, canonical / OG / sitemap / robots URLs will match

## 🔜 Next session — Phase D (code quality)

1. [x] **Decide `shared.js` source of truth** — DONE (Option A: stripped to grid metadata only)
2. [x] **Fix hero stats** in `index.html` — DONE (replaced with honest stats)
3. [x] **Dedupe mobile-menu JS** — DONE (moved into `shared.js` as `initNavMenu`; all inline IIFEs removed)
4. [x] **Add `LICENSE` file** — DONE (MIT, © 2026 GCalc)
5. [x] **Local browser QA** — DONE (see results under Code quality above)

## 🧪 Manual test checklist (before/after launch)

- [x] Homepage: all 13 cards navigate to the correct calculator page
- [x] Homepage: mobile menu opens/closes; hero counters animate
- [ ] Each calculator: valid input → correct result; reset works; edge cases (0, negative, blank) — BMI verified (175cm/70kg → 22.9 Normal); remaining pages load + render, full form edge-case testing still recommended
- [x] Every page loads `styles.css` + `shared.js` with no console errors
- [x] Favicon renders (`favicon.svg`); social preview render still worth checking in a share tool
- [ ] `robots.txt` and `sitemap.xml` reachable — verify after deploy to GitHub Pages

## 🚀 Post-launch

- [ ] Submit `sitemap.xml` to Google Search Console
- [ ] Monitor keyword rankings per calculator
- [ ] Add internal links between related calculators as content grows

## Known gaps

- **Light theme only** — no theme switcher
- **Analytics disabled** — no GA4 Measurement ID yet
- **Affiliate links** are placeholders (`#`) in `affiliates.js` and not wired into any page
- **Ad slots** are hidden until an ad network approves the site
- **Minor (optional)**: logo `href="#"` on homepage, no `404.html`, BMI validation uses `alert()`, no `aria-live` on results