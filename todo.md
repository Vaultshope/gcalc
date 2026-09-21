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

### Monetization prep
- [x] Ad slots hidden by default, with insertion instructions
- [x] Affiliate scaffold (39 entries) retained in `shared.js`

## ⏳ Blocked on external accounts / decisions

- [ ] **GA4 Measurement ID** — paste the gtag.js snippet into the 15 comment placeholders (`<!-- Analytics: paste your Google Analytics 4 (gtag.js) snippet here. -->`)
- [ ] **Ad network approval** (AdSense / Ezoic) — insert code into the 2 ad slots in `index.html`, then remove `style="display:none"`
- [ ] **Affiliate approvals** — replace the 39 `url: '#'` entries and wire them into the standalone calculator pages
- [ ] **Custom domain** (`gcalc.app`) — once bought, canonical / OG / sitemap / robots URLs will match

## 🔜 Next session — Phase D (code quality)

1. [ ] **Decide `shared.js` source of truth**
   - Today: only the BMI page calls `shared.js`'s `calculate()`; `fields` (13) and `affiliate` (13) are unused
   - Option A: strip `shared.js` to grid metadata only (`title`, `description`, `category`, `icon`, `slug`)
   - Option B: move all calculator logic into `shared.js` and have every standalone page call it
   - Recommendation: **Option A** (pages already own richer, tested logic)
2. [ ] **Fix hero stats** in `index.html`
   - "10,000+ Users Served" and "100Million+ Calculations" are fabricated (trust / AdSense risk)
   - "100Million+" is also missing a space
3. [ ] **Dedupe mobile-menu JS** — same block is copy-pasted inline in all 15 pages; move it into `shared.js`
4. [ ] **Add `LICENSE` file** (README references MIT)
5. [ ] **Local browser QA** — open every page, test every form (see testing checklist below)

## 🧪 Manual test checklist (before/after launch)

- [ ] Homepage: all 13 cards navigate to the correct calculator page
- [ ] Homepage: mobile menu opens/closes; hero counters animate
- [ ] Each calculator: valid input → correct result; reset works; edge cases (0, negative, blank)
- [ ] Every page loads `styles.css` + `shared.js` with no console errors
- [ ] Favicon + social preview render (share a URL in a preview tool)
- [ ] `robots.txt` and `sitemap.xml` reachable

## 🚀 Post-launch

- [ ] Submit `sitemap.xml` to Google Search Console
- [ ] Monitor keyword rankings per calculator
- [ ] Add internal links between related calculators as content grows

## Known gaps

- **Light theme only** — no theme switcher
- **Analytics disabled** — no GA4 Measurement ID yet
- **Affiliate links** are placeholders (`#`) and not wired into any page
- **Ad slots** are hidden until an ad network approves the site
- **No `LICENSE` file** yet
- **12 of 13 `calculate()` functions in `shared.js` are unused** — each standalone page has its own logic