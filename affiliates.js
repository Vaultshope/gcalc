// =====================
// Affiliate Link Scaffold (NOT loaded by any page yet)
// =====================
// Reserved for Phase P2 (monetization). When your affiliate accounts are
// approved and you have real tracking URLs, replace each `url: '#'` with
// your link, then load this file from the calculator pages that should
// render the recommendations, e.g.:
//
//   <script src="../../affiliates.js"></script>
//
// and render `GCalcAffiliates[calcId]` inside the page. All links below are
// placeholders — do not ship them as-is.
// =====================
(function() {
  'use strict';

  window.GCalcAffiliates = {
    bmi: {
      title: 'Related to your health journey',
      links: [
        { text: 'Fitbit Charge 6 - Track your fitness', url: '#', highlight: true },
        { text: 'Compare Health Insurance Plans', url: '#', highlight: false },
        { text: 'Nike Running Club - Free app', url: '#', highlight: false }
      ]
    },
    age: {
      title: 'Never miss important dates',
      links: [
        { text: 'Flowrit - Birthday reminder', url: '#', highlight: true },
        { text: 'MetLife Life Insurance', url: '#', highlight: false },
        { text: '1-800-Flowers - Same day', url: '#', highlight: false }
      ]
    },
    calorie: {
      title: 'Reach your nutrition goals',
      links: [
        { text: 'MyFitnessPal Premium - Track macros', url: '#', highlight: true },
        { text: 'HelloFresh - Meal kit delivery', url: '#', highlight: false },
        { text: 'Treeline - Personalized vitamins', url: '#', highlight: false }
      ]
    },
    tip: {
      title: 'Save on dining',
      links: [
        { text: 'Chase Sapphire - 3x on dining', url: '#', highlight: true },
        { text: 'OpenTable - Earn rewards', url: '#', highlight: false },
        { text: 'DoorDash Pass - Free delivery', url: '#', highlight: false }
      ]
    },
    loan: {
      title: 'Explore loan options',
      links: [
        { text: 'LightStream - Low rate loans', url: '#', highlight: true },
        { text: 'SoFi - Student refinancing', url: '#', highlight: false },
        { text: 'Discover Personal Loans', url: '#', highlight: false }
      ]
    },
    mortgage: {
      title: 'Start your home journey',
      links: [
        { text: 'Rocket Mortgage - Quick approval', url: '#', highlight: true },
        { text: 'Zillow - Browse homes', url: '#', highlight: false },
        { text: 'Lemonade Insurance', url: '#', highlight: false }
      ]
    },
    investment: {
      title: 'Start investing today',
      links: [
        { text: 'Fidelity - No minimum to start', url: '#', highlight: true },
        { text: 'M1 Finance - Auto investing', url: '#', highlight: false },
        { text: 'Webull - Free stocks', url: '#', highlight: false }
      ]
    },
    unit: {
      title: 'Perfect for your travels',
      links: [
        { text: 'Airbnb - Book unique stays', url: '#', highlight: true },
        { text: 'Skyscanner - Cheap flights', url: '#', highlight: false },
        { text: 'Revolut - Low fee exchange', url: '#', highlight: false }
      ]
    },
    percentage: {
      title: 'Financial tools',
      links: [
        { text: 'Mint - Free budget tracker', url: '#', highlight: true },
        { text: 'YNAB Budgeting App', url: '#', highlight: false },
        { text: 'Credit Karma - Free score', url: '#', highlight: false }
      ]
    },
    date: {
      title: 'Stay organized',
      links: [
        { text: 'Google Calendar Premium', url: '#', highlight: true },
        { text: 'Notion - All-in-one workspace', url: '#', highlight: false },
        { text: 'Todoist - Task management', url: '#', highlight: false }
      ]
    },
    fuel: {
      title: 'Save on fuel',
      links: [
        { text: 'GasBuddy - Find cheap gas', url: '#', highlight: true },
        { text: 'Chase Freedom - 5% gas', url: '#', highlight: false },
        { text: 'GEICO Insurance', url: '#', highlight: false }
      ]
    },
    scientific: {
      title: 'Continue exploring math',
      links: [
        { text: 'Wolfram Alpha - Computational engine', url: '#', highlight: true },
        { text: 'Desmos Graphing Calculator', url: '#', highlight: false },
        { text: 'Photomath - Solve equations', url: '#', highlight: false }
      ]
    },
    grade: {
      title: 'Ace your studies',
      links: [
        { text: 'Chegg - Textbook rentals', url: '#', highlight: true },
        { text: 'Khan Academy - Free courses', url: '#', highlight: false },
        { text: 'Grammarly - Better writing', url: '#', highlight: false }
      ]
    }
  };
})();
