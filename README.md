# GCalc — Free Smart Calculators

A fast, no-build collection of **13 free calculators**, built as a static site and monetized with ads. No sign-up, no backend — every calculation runs in the browser.

## Live URL

`https://vaultshope.github.io/gcalc/`

The site is live via GitHub Pages (auto-deploys on every push to `main`). A custom domain (`gcalc.app`) can be attached later — all URLs are relative, so nothing needs to change.

## Quick Start

There is **no build step and no dependencies**. Just open `index.html`, or serve the folder locally:

```bash
# Python (any machine with Python installed)
python -m http.server 8000
# then visit http://localhost:8000/

# Node
npx serve .
```

## Project Structure

```
index.html                     # Landing page (calculator grid)
shared.js                      # Shared UI: nav, theme, consent, GA4, related calcs, affiliates
affiliates.js                  # Affiliate link data (window.GCalcAffiliates)
app.js                         # Landing page UI: grid rendering, animations, mobile nav
styles.css                     # Design system (CSS custom properties, light + dark)
about/index.html               # About page
privacy-policy/index.html      # Privacy policy page
calculators/<name>/index.html  # 13 standalone SEO calculator pages
manifest.json + sw.js          # PWA manifest + service worker (offline precache)
404.html                       # Custom 404 page
sitemap.xml                    # XML sitemap
robots.txt                     # Crawler rules + sitemap reference
favicon.svg                    # Favicon
apple-touch-icon.png           # iOS home-screen icon
og-image.png                   # Social share image (1200x630)
LICENSE                        # MIT license
.github/workflows/deploy.yml   # GitHub Pages auto-deploy
todo.md                        # Project status / changelog
```

## Calculators (13)

### Health
- BMI Calculator
- Age Calculator
- Calorie Calculator (BMR & TDEE)

### Finance
- Tip Calculator
- Loan Calculator
- Mortgage Calculator
- Investment Calculator

### Utility
- Unit Converter (length, weight, temperature)
- Percentage Calculator
- Date Calculator
- Fuel Calculator

### Science
- Scientific Calculator
- Grade Calculator (GPA)

Each calculator has a **standalone page** under `calculators/` for SEO, and every homepage card links directly to it.

## Features

- **13 calculators** across Health, Finance, Utility, and Science
- **Real-time results** where applicable (others calculate on submit)
- **Dark mode** — toggle in the header, remembers your choice, follows system preference by default
- **PWA** — installable, works offline (service worker precaches every page)
- **Recently used** — the homepage shows your last 5 calculators
- **Shareable results** — calculators serialize their inputs into the URL, so results can be linked and re-run
- **Print / Save PDF** — clean print stylesheet on every calculator
- **Related calculators** — each calculator page links to 4 others (same category first) to keep visitors browsing
- **Mobile responsive** — works on phones, tablets, and desktops
- **Privacy first** — all calculations happen in the browser; analytics and ad cookies load only after consent
- **Monetization ready** — hidden ad slots on every page, affiliate card renderer, GA4 + Ko-fi one-line config (see below)
- **SEO ready** — canonical links, meta descriptions/keywords, Open Graph + Twitter cards, and JSON-LD (`WebPage`, `SoftwareApplication`, `FAQPage`) on every page

## Deploy (GitHub Pages)

The site is **already live** from [`Vaultshope/gcalc`](https://github.com/Vaultshope/gcalc) — every push to `main` auto-deploys to `https://vaultshope.github.io/gcalc/` in about a minute.

The workflow (`.github/workflows/deploy.yml`) also strips `todo.md`, `.github/`, and `.claude/` from the published artifact so only site files are served.

## Configuration

### Analytics (GA4)

Analytics is currently **disabled** and loads **only after the visitor accepts cookies** (GDPR/ePrivacy friendly). To turn it on, set one constant at the top of `shared.js`:

```javascript
const GA4_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // your GA4 Measurement ID
```

That's it — `shared.js` injects the gtag.js script on every page. No HTML edits needed. Visitors who choose "Essential only" are never tracked.

### Ads

Every page (homepage + all 13 calculators) has two ad slots — `#adBannerTop` and `#adBannerBottom`. They are **hidden by default** (`style="display:none"`) so visitors never see an empty placeholder. When your ad network approves the site:

1. Remove `style="display:none"` from the slot(s)
2. Paste the ad code inside the `.ad-container` div

The `.ad-banner` styling (label, border, spacing) is already in `styles.css`.

### Affiliate Links

Curated recommendations live in `affiliates.js` (`window.GCalcAffiliates`), keyed by calculator id. All entries are placeholders (`url: '#'`) and are **not rendered** while the URL is `#`. Once you have real affiliate/tracking URLs, just replace the `#` — each calculator page automatically renders a "Recommended for you" card box under the calculator (links get `rel="sponsored nofollow noopener"` for Google compliance). No HTML edits needed.

### Support Button (Ko-fi)

Set one constant in `shared.js` and a "☕ Support GCalc" button appears in the footer on every page:

```javascript
const KOFI_URL = 'https://ko-fi.com/yourname';
```

### Change the Primary Color

In `styles.css`, update the accent token in `:root`:

```css
:root {
  --accent: #0066FF; /* change to your brand color */
}
```

### Add a Calculator

1. Add an object to the `calculators` array in `shared.js` (this drives the homepage grid, related-calculator cards, and recently-used chips):

```javascript
{
  id: 'your-calc',
  slug: 'your-calc',           // matches the calculators/your-calc/ folder
  title: 'Your Calculator',
  description: 'Brief description',
  category: 'health',          // health | finance | utility | science
  icon: '🔧',
  keywords: ['your calc', 'calc keyword']
}
```

2. Create `calculators/your-calc/index.html` for the standalone SEO page (copy an existing calculator page as a template — it already includes the ad slots, consent banner, related-calcs and affiliate hooks).
3. Add the new URL to `sitemap.xml` and the service worker's `PRECACHE` list in `sw.js` (and bump `VERSION`).

## Tech Stack

- **HTML5** — semantic markup
- **CSS3** — custom properties for theming (no frameworks)
- **Vanilla JavaScript** — ES6+ (no build step)
- **Google Fonts** — Outfit, DM Sans, JetBrains Mono
- **GitHub Pages** — free hosting

## Known Gaps

- **Analytics disabled** — no GA4 Measurement ID configured yet (one-line activation in `shared.js`).
- **Affiliate URLs are placeholders** (`#`) — the card box renders automatically once real URLs are added.
- **Ad slots hidden** — waiting on ad network approval.
- **Custom domain** — `gcalc.app` not purchased yet; site lives at `vaultshope.github.io/gcalc/`.

---

Made with ❤️ for the community.