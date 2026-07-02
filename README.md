# Sharon Make Up Lounge — Premium Boutique Landing Page

A premium, high-contrast light storefront landing page built for **Sharon Make Up Lounge** — a luxury cosmetics and beauty brand based in Ahmedabad, India. 

Designed for Gen Z and millennial beauty audiences, this single-page static site focuses on visual excellence, rich micro-interactions, and direct messaging conversions.

---

## ✨ Features & Enhancements

*   **Premium Boutique White Theme:** Clean, luxury-grade aesthetic using alabaster white (`#ffffff`), soft warm light-grey backgrounds (`#faf9f6`), and deep warm charcoal text (`#2d2d2d`) for WCAG AAA contrast accessibility.
*   **Logo-Matching Brand Accents:** Brand accents feature elegant **Gold** (`#e2ba28`) and **Lime Green** (`#9cc534`) accents pulled directly from the brand logo (all fuchsia/pink accents have been removed).
*   **WhatsApp Lead Generation Forms:**
    *   **Inquiry Form:** Replaced default email inputs with a client **WhatsApp Number** collector. Submitting launches a formatted message template directly to the storefront WhatsApp chat (`+91 99250 27523`).
    *   **Newsletter Form:** Replaced default email signup with WhatsApp number collection to initiate direct user updates via chat.
*   **Storefront Google Map Embed:** Integrated live location mapping pointing directly to the Nehrunagar, Ambawadi, Ahmedabad location.
*   **Dynamic Product Filters:** Fully interactive product showcase with category filters (All, Makeup, Hair, Nails, Skincare) rendering item cards in real-time.
*   **Vertical Reels Video Showcase:** Auto-plays muted vertical video previews on hover, clicking card opens popup video modal focusing on client transformation clips.
*   **Dynamic Testimonials (Real Google Reviews):** Displays 5 actual Google Reviews complete with 5-star gold ratings and local guide badges.
*   **Mobile-First Responsive Layout:** Adapts elements seamlessly across viewports (mobile, tablet, desktop) with scroll-triggered fade-in reveals.

---

## 📂 File Structure

```text
├── index.html         # Main semantic markup structure (7 sections)
├── styles.css         # Custom CSS variables, responsive grids, and transitions
├── script.js          # Nav controls, banner slider, grid filters, & WhatsApp forms
├── README.md          # Project setup and features documentation
└── assets/            # Optimized logo and media assets
    ├── logo.png       # Brand header logo image
    ├── hero_bg.png    # Hero banner high-key cosmetic shots
    ├── about_interior.png # Bright salon vanity background
    └── prod_*.png     # High-res placeholder assets for category covers
```

---

## 🚀 How to Run Locally

Since the project is built entirely on static web files (HTML5, Vanilla CSS, and JavaScript), it runs directly in the browser without any bundlers or frameworks.

1.  **Clone / Download** this directory.
2.  Open **`index.html`** in any web browser.
3.  *(Optional)* For the best experience (smooth scroll paths and local assets), use the **VS Code Live Server extension** or any local development server.

---

## ☁️ Deployment

To put the landing page online, simply drop the root files into any static web host:
*   [Netlify](https://www.netlify.com/) (Drag-and-drop the directory)
*   [Vercel](https://vercel.com/) (Simple static deployment)
*   [GitHub Pages](https://pages.github.com/) (Free repository hosting)
