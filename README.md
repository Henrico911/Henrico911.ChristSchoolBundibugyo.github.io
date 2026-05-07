# Christ School Bundibugyo — Website Project

**BIT 1204: Fundamentals of Website Development**  
Mountains of the Moon University — Semester One Examinations 2025/2026  
Examiner: Mr. Mwanje Derrick

---

## Student Details
- **Course:** BIT 1204 — Fundamentals of Website Development
- **Organisation:** Christ School Bundibugyo (christschoolbundi.org)
- **Year of Study:** One

---

## Organisation
**Christ School Bundibugyo (CSB)** is a real Christian, co-educational secondary boarding school located in Bundibugyo District, western Uganda. The school serves students from Senior 1 through Senior 6 (O-Level and A-Level) and has been operating since 2002.

---

## How to Open the Website Locally

1. **Download / unzip** the project folder to your computer.
2. Open the folder — you will see these files:
   ```
   index.html       ← Homepage
   about.html       ← About Us
   services.html    ← Programmes
   portfolio.html   ← Success Stories
   gallery.html     ← Gallery
   contact.html     ← Contact Us
   css/styles.css   ← All styles
   js/main.js       ← All JavaScript
   README.md        ← This file
   concept-paper.md ← Part A concept document
   ```
3. **Double-click `index.html`** to open the homepage in your browser.
4. Navigate between pages using the navigation bar at the top.
5. No server or installation required — this is a pure static website.

> **Note:** Images are loaded from Unsplash CDN. An internet connection is required to view all images. The Google Map on the Contact page also requires internet access.

---

## Pages

| Page | File | Description |
|------|------|-------------|
| Homepage | `index.html` | Hero slider, about preview, programmes, testimonials, CTA |
| About Us | `about.html` | School background, mission/vision, culture, team gallery |
| Programmes | `services.html` | All 6 educational services with cards and tags |
| Success Stories | `portfolio.html` | Portfolio grid of 9 projects + featured alumni story |
| Gallery | `gallery.html` | Masonry photo gallery with filters and lightbox |
| Contact Us | `contact.html` | Contact form with JS validation + Google Map |

---

## Special Features Implemented

### 🖼️ Hero Image Slider (Homepage)
- 3 auto-transitioning slides using JavaScript (`setInterval`)
- Clickable dot indicators to manually navigate slides
- Smooth opacity transition between slides

### 🖼️ Gallery Page
- **Masonry-style column layout** using CSS `columns` property
- **Filter buttons** by category: All, Campus, Students, Events, Sports, Team
- **Lightbox/modal popup** — click any image to view it fullscreen
- **Hover effects** — overlay with image title on hover, zoom effect
- **Keyboard accessible** — press Escape to close lightbox

### 📬 Contact Page
- **Full JavaScript form validation** with real-time field checking
  - Required field validation
  - Email format validation (regex)
  - Phone number format validation
  - Visual error states with red borders and error messages
  - Success message shown on valid submission
- **Google Map** embedded showing Bundibugyo District, Uganda
- **Social media icons** with hover effects
- **Animated contact icons** on hover

### ✨ Additional Technical Features
- **Animated number counters** (stats strip) — counts up when scrolled into view
- **Scroll-triggered animations** — elements fade in from below as you scroll
- **Sticky navbar** — transparent on load, dark background on scroll
- **Responsive hamburger menu** — full-screen mobile navigation overlay
- **CSS hover effects** — team cards reveal bio text, program cards lift
- **Google Fonts** — Playfair Display + DM Sans + Cormorant Garamond

### 📱 Responsiveness
Fully responsive across:
- **Desktop** (1200px+) — full multi-column layouts
- **Tablet** (768–1024px) — adjusted grid columns, stacked where needed
- **Mobile** (< 768px) — single column, hamburger menu, stacked cards

---

## Technologies Used
- **HTML5** — semantic markup throughout
- **CSS3** — custom properties, grid, flexbox, animations, media queries
- **Vanilla JavaScript** — slider, lightbox, filters, form validation, scroll animations

> No frameworks (Bootstrap, React, Vue, etc.) used — pure HTML, CSS, and JavaScript as required.

---

## Code Organisation
```
css/styles.css  — Organised with labelled sections using comments
js/main.js      — Modular functions with clear comments per feature
*.html          — Consistent structure, reusable navbar and footer
```

All code is cleanly indented, well-commented, and consistently organised.
