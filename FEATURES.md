# Features

Track completed website components here. Add a checkmark and a brief description of how each component works after it is finished.

- [x] Semantic page shell: Defines the full HTML document with header, main content, and footer landmarks for a clear page structure.
- [x] Sticky navigation structure: Adds a primary navigation bar with anchor links to each major page section, ready for sticky styling later.
- [x] Hero section: Introduces Nina's Ice Cream with a headline, short brand message, and menu call-to-action link.
- [x] Featured flavors section: Presents three sample flavor cards using article elements so each flavor can stand alone.
- [x] Menu placeholder: Reserves a semantic section where detailed menu content can be added later.
- [x] Reservation placeholder: Reserves a semantic section where booking or event reservation content can be added later.
- [x] Footer: Provides visit information, an address block, and copyright details.
- [x] Pastel visual system: Defines reusable CSS variables for Nina's pink, cream, blue, chocolate, shadows, radii, fonts, and layout width.
- [x] Cute sticky header styling: Keeps the navigation visible at the top with a soft cream backdrop, rounded brand mark, pastel hover states, and flexible link layout.
- [x] Full-width hero styling: Uses a wide gradient background, centered content, oversized playful heading, and a rounded call-to-action button.
- [x] Rounded card styling: Displays featured flavors as soft rounded cards with pastel gradients, shadows, and gentle lift-on-hover animation.
- [x] Responsive styling: Reflows the header navigation and flavor cards for screens smaller than 768px while tightening spacing and border radii.
- [x] Responsive navigation system: Adds an accessible hamburger button below 768px that opens and closes the sticky navigation menu, closes after section links are selected, smooth-scrolls to page sections, highlights active links, and logs listener activity in the console.
- [x] Dynamic menu section: Stores eight ice cream flavors in a JavaScript array of objects, then renders responsive menu cards with category labels, descriptions, prices, and image placeholders into a CSS Grid layout with hover lift animations.
- [x] Menu category filtering: Dynamically generates filter buttons from menu categories, uses JavaScript array filtering to update cards in place without a page reload, and highlights the active category button.
- [x] Reservation form: Collects guest contact details, date, time, and party size with Flexbox layout, JavaScript validation, inline error messages, console debugging logs, and an in-page success confirmation without refreshing.
- [x] Testimonials carousel: Renders six customer reviews with JavaScript, supports previous and next controls, auto-slides every few seconds, uses smooth CSS transitions, and adapts the playful review cards for mobile screens.
- [x] Dark mode: Adds a navigation toggle that switches between light and dark themes, updates readable section colors with CSS variables and dark overrides, smoothly transitions theme changes, and stores the visitor's preference in localStorage.
- [x] Scroll-triggered animations: Uses Intersection Observer to fade and slide menu cards, testimonial content, and reservation sections into view once, with reduced-motion support for smoother mobile-friendly performance.
- [x] Back-to-top button: Shows a floating button after the visitor scrolls down, then uses modular JavaScript and smooth scrolling to return to the top with responsive positioning and hover animation.
- [x] Jest interaction tests: Adds a jsdom test suite for invalid email validation, menu filtering results, dark mode localStorage updates, back-to-top scroll visibility, and dynamic menu card rendering counts.
- [x] Professional README: Documents the project overview, getting started steps, feature list, tech stack, file structure, tests, and playful ice cream shop vibe.
- [x] Realistic menu images: Displays lazy-loaded realistic ice cream photos on every dynamic flavor card with descriptive alt text and subtle image hover scaling.
- [x] README refresh: Updates the documentation to include the latest realistic menu imagery, local and GitHub Pages viewing guidance, full feature coverage, and current project vibe.
- [x] jQuery live menu search: Adds a search input that uses jQuery keyup handling and selectors to filter dynamic menu cards by flavor name, category, and description while working together with category filters and no-results messaging.
- [x] Menu filter unit test: Adds a readable Jest unit test with a mock menu array to verify the category filtering helper returns only matching ice cream items.
- [x] Pistachio image correction: Updates the dynamic Pistachio Petal menu card to use a consistent green ice cream photo with matching alt text and test coverage.
- [x] Pistachio image verification: Logs when the corrected Pistachio Petal image is rendered in the dynamic menu DOM and verifies the image remains covered by automated tests.
- [x] Menu description Flexbox alignment: Centers the Menu description text through a dedicated parent Flexbox container for clearer layout hierarchy.
- [x] Menu description removal: Removes the introductory Menu description text so the search controls appear directly beneath the Menu heading.
- [x] Final README update: Refreshes the professional README with the latest jQuery search, image, testing, setup, feature, and vibe details.
