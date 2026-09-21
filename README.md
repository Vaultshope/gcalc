# GCalc — Free Smart Calculators

A fast, no-build collection of **13 free calculators**, built as a static site and monetized with ads. No sign-up, no backend — every calculation runs in the browser.

## Live URL

`https://gcalc.app/`

(Update this if you deploy under a different domain or a `github.io/<repo>/` path.)

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
index.html                     # Landing page (calculator grid + modal)
shared.js                      # Calculator data, formulas, shared utilities
app.js                         # Landing page UI: grid, modal, form handling
styles.css                     # Design system (CSS custom properties)
about/index.html               # About page
calculators/<name>/index.html  # 13 standalone SEO calculator pages
sitemap.xml                    # XML sitemap
robots.txt                     # Crawler rules + sitemap reference
favicon.svg                    # Favicon
apple-touch-icon.png           # iOS home-screen icon
og-image.png                   # Social share image (1200x630)
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

Each calculator has a **standalone page** under `calculators/` for SEO. Most are also reachable from the landing-page modal.

## Features

- **13 calculators** across Health, Finance, Utility, and Science
- **Real-time results** where applicable (others calculate on submit)
- **Mobile responsive** — works on phones, tablets, and desktops
- **Privacy first** — all calculations happen in the browser; no data is collected or stored
- **Ad ready** — two placeholder slots in `index.html`
- **SEO ready** — canonical links, meta descriptions/keywords, Open Graph + Twitter cards, and JSON-LD (`WebPage`, `SoftwareApplication`, `FAQPage`) on every page

## Deploy (GitHub Pages)

The repo ships with a GitHub Actions workflow that publishes the site on every push to `main`.

### Step 1: Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/new-project.git
git push -u origin main
```

Or, with the GitHub CLI:

```bash
gh repo create new-project --public --source=. --remote=origin --push
```

### Step 2: Enable GitHub Pages

1. Go to **Repository Settings > Pages**
2. Under **Build and deployment**, set **Source** to **GitHub Actions**
3. The workflow deploys automatically; the site goes live after ~1 minute

## Configuration

### Analytics (GA4)

Analytics is currently **disabled**. Each of the 15 HTML pages has this comment in the `<head>`:

```html
<!-- Analytics: paste your Google Analytics 4 (gtag.js) snippet here. -->
```

Once you have a Measurement ID, replace that comment with your gtag.js snippet.

### Ads

Replace the two `.ad-placeholder` divs in `index.html` (top and bottom banners) with your ad network's script tags.

### Affiliate Links

Affiliate links live in `shared.js`, inside each calculator's `affiliate.links` array. All 39 entries are currently placeholders (`url: '#'`) and should be replaced with real URLs — or remove the `affiliate` blocks until you are approved for a program.

### Change the Primary Color

In `styles.css`, update the accent token in `:root`:

```css
:root {
  --accent: #0066FF; /* change to your brand color */
}
```

### Add a Calculator

1. Add an object to the `calculators` array in `shared.js`:

```javascript
{
  id: 'your-calc',
  title: 'Your Calculator',
  description: 'Brief description',
  category: 'health', // health | finance | utility | science
  icon: '🔧',
  fields: [
    { id: 'input1', label: 'Input 1', type: 'number', placeholder: '0' }
  ],
  calculate: (v) => {
    // Return { value, unit, secondary } or null
  }
}
```

2. (Optional) Create `calculators/your-calc/index.html` for a standalone SEO page.
3. Add the new URL to `sitemap.xml`.

## Tech Stack

- **HTML5** — semantic markup
- **CSS3** — custom properties for theming (no frameworks)
- **Vanilla JavaScript** — ES6+ (no build step)
- **Google Fonts** — Outfit, DM Sans, JetBrains Mono
- **GitHub Pages** — free hosting

## Known Gaps

- **Light theme only** — there is currently no theme switcher.
- **Analytics disabled** — no GA4 Measurement ID configured yet.
- **Affiliate links are placeholders** (`#`) and need real URLs.
- **No `LICENSE` file** — add one if you intend to license the project.

---

Made with ❤️ for the community.