# Nina's Ice Cream Website

A playful, modern ice cream shop website built with semantic HTML, responsive CSS, vanilla JavaScript, and Jest interaction tests.

Nina's Ice Cream is a polished static storefront experience where visitors can explore featured flavors, browse a dynamic photo-rich menu, filter by category, submit a reservation request, read customer testimonials, switch between light and dark themes, and navigate comfortably across desktop and mobile screens.

## Getting Started

This project is a static website. You do not need a build step to view it in a browser.

### Open the website locally

1. Clone or download the repository.
2. Open the project folder.
3. Open `index.html` directly in your browser.

You can usually do this by double-clicking `index.html`, or by right-clicking the file and choosing your preferred browser.

### Open from GitHub Pages

If GitHub Pages is enabled for the repository, open the published Pages URL. GitHub will serve `index.html` automatically as the homepage.

### Optional: run tests

The project includes Jest tests for the core JavaScript interactions.

```bash
npm install
npm test
```

## Features

- **Semantic page structure**: Uses clear HTML landmarks for the header, navigation, main content sections, and footer.
- **Sticky responsive navigation**: Keeps navigation available while scrolling and includes section links for featured flavors, menu, reservations, reviews, and visit information.
- **Mobile hamburger menu**: Opens and closes the navigation on smaller screens with JavaScript event listeners and accessible state updates.
- **Smooth section scrolling**: Navigation links move visitors smoothly to page sections while accounting for the sticky header.
- **Pastel visual system**: Uses CSS variables for a cohesive palette of pastel pink, cream, light blue, chocolate tones, rounded corners, shadows, and typography.
- **Full-width hero section**: Presents the shop name, tagline, and menu call-to-action with centered, playful styling.
- **Featured flavors section**: Highlights signature scoops in rounded cards with gentle hover lift effects.
- **Dynamic menu rendering**: Stores menu items in a JavaScript array and renders flavor cards into the page with DOM manipulation.
- **Realistic flavor photos**: Displays lazy-loaded ice cream images on every menu card with descriptive alt text and subtle hover zoom.
- **Menu category filtering**: Generates filter buttons dynamically and uses JavaScript array filtering to show categories such as Classic, Fruit, Chocolate, and Seasonal.
- **Reservation form**: Collects name, email, phone number, reservation date, time, and party size.
- **Form validation**: Shows inline error messages below invalid fields and displays a successful confirmation without refreshing the page.
- **Testimonials carousel**: Renders six customer testimonials with previous/next controls, dot indicators, automatic sliding, and smooth transitions.
- **Dark mode toggle**: Switches between light and dark themes using CSS variables and saves the visitor's preference in `localStorage`.
- **Scroll-triggered animations**: Uses the Intersection Observer API to reveal menu cards, testimonials, and reservation content with one-time fade-in and slide-up animations.
- **Back-to-top button**: Appears after scrolling down and smoothly returns visitors to the top of the page.
- **Responsive design**: Adapts layouts, navigation, filters, cards, forms, carousel controls, and floating controls for screens below 768px.
- **Interaction tests**: Includes Jest and jsdom tests for validation, filtering, theme persistence, scroll visibility, and dynamic rendering.

## Project Vibe

The site has a cheerful boutique ice cream parlor vibe: pastel, polished, friendly, and gently interactive. Pastel pink, cream, and light blue create a soft dessert-inspired palette, while realistic ice cream photos make the menu feel appetizing and tangible. Rounded cards, pill-shaped buttons, smooth motion, and playful typography keep the experience warm, modern, and easy to use.

The overall vibe is:

- Sweet and cheerful
- Modern but cozy
- Family-friendly and neighborhood-focused
- Soft, pastel, and dessert-inspired
- Photo-forward and appetizing
- Interactive without feeling overwhelming

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Jest
- jsdom

## Project Files

- `index.html` - Main website structure.
- `style.css` - Visual styling, responsive layout, animations, and theme support.
- `script.js` - Dynamic rendering, navigation behavior, form validation, carousel, dark mode, scroll animations, and back-to-top logic.
- `tests/website.test.js` - Jest tests for key interactions.
- `PROMPT_LOG.md` - Running log of prompts and completed work.
- `FEATURES.md` - Checklist of completed website components.
