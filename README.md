# GCalc - Free Smart Calculators

A fast, beautiful collection of 12+ free calculators. No sign-up. No limits. Built for speed and monetized via ads.

## Live URL (after deploy)

`https://<your-username>.github.io/new-project/`

## Quick Start

```bash
# Clone or open this repo
cd new-project

# Open in browser
open index.html  # Mac
start index.html # Windows
```

## File Structure

```
├── index.html          # Main landing page
├── app.js              # All calculator logic & UI handlers
├── styles.css          # Professional SaaS design system
├── sitemap.xml         # SEO sitemap
├── README.md           # This file
└── .github/workflows/
    └── deploy.yml      # GitHub Pages auto-deploy
```

## Features

- **12 Calculators** across Health, Finance, Utility, and Science categories
- **6 Theme Options** - Midnight, Ocean, Forest, Sunset, Nordic, Candy
- **Real-time Results** - No submit buttons needed
- **Mobile Responsive** - Works on all devices
- **Privacy First** - All calculations happen in browser
- **Ad Ready** - Placeholder slots for AdSense/Ezoic

## Calculators Included

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

## Setup & Deploy

### Step 1: Initialize Git (if not already)

```bash
git init
git add .
git commit -m "Initial commit - GCalc launch"
```

### Step 2: Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/new-project.git
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to **Repository Settings > Pages**
2. Under **Build and deployment**, select **GitHub Actions**
3. The workflow will auto-deploy on every push to `main`
4. After ~2 minutes, your site will be live

### Step 4: Add Your Ad Code

Once approved for AdSense/Ezoic:

1. Open `index.html`
2. Replace the `.ad-placeholder` divs with your ad script tags
3. Push changes - workflow will auto-deploy

### Step 5: Add Affiliate Links (Optional)

In `app.js`, find the `affiliate.links` arrays and replace `'#'` with your actual affiliate URLs.

## Monetization Strategy

1. **Ad Banners** - Top and bottom of calculator section (AdSense, Ezoic)
2. **Affiliate Links** - Contextual recommendations after each calculation
3. **Domain Purchase** - Buy `gcalc.app` or similar for credibility

### Affiliate Program Recommendations

| Calculator | Program | How to Join |
|------------|---------|-------------|
| BMI, Age, Calorie | Amazon Associates | [Sign up](https://affiliate-program.amazon.com) |
| Tip, Loan, Mortgage | Bankrate, SoFi | [Bankrate Partners](https://www.bankrate.com/partners/) |
| Investment | Fidelity, M1 Finance | [Fidelity](https://www.fidelity.com) |
| Fuel | GasBuddy | [GasBuddy Partner](https://www.gasbuddy.com) |
| Grade | Chegg, Grammarly | [Grammarly Affiliates](https://www.grammarly.com/affiliates) |

## Customization

### Change Primary Color

In `styles.css`, update the `:root` variables:

```css
:root {
  --accent: #3b82f6;  /* Change to your brand color */
}
```

### Add More Calculators

In `app.js`, add a new object to the `calculators` array:

```javascript
{
  id: 'your-calc',
  title: 'Your Calculator',
  description: 'Brief description',
  category: 'health', // or 'finance', 'utility', 'science'
  icon: '🔥',
  fields: [
    { id: 'input1', label: 'Input 1', type: 'number', placeholder: '0' }
  ],
  calculate: (v) => {
    // Return { value: result, secondary: 'details' }
  }
}
```

## Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom properties for theming (no frameworks)
- **Vanilla JavaScript** - ES6+ (no build step)
- **Google Fonts** - Outfit, DM Sans, JetBrains Mono
- **GitHub Pages** - Free hosting

## License

MIT License - Free to use and modify.

---

Made with ❤️ for the community.