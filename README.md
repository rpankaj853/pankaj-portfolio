# Pankaj Rana — Portfolio

A modern, responsive personal portfolio website built with React, Tailwind CSS, and Framer Motion. Features a dark purple theme with smooth animations throughout.

**Live:** [pankaj-portfolio](https://github.com/rpankaj853/pankaj-portfolio)

---

## Tech Stack

- **React 18** + **Vite** — fast dev/build tooling
- **Tailwind CSS** — utility-first styling with custom theme tokens
- **Framer Motion** — page animations and scroll-triggered transitions
- **React Scroll** — smooth in-page navigation
- **React Icons** — icon library

---

## Sections

| Section | Description |
|---------|-------------|
| **Hero** | Intro with typewriter role animation and floating profile image |
| **About** | Bio, stats (years, projects, AI projects), background illustration |
| **Skills** | 16 themed SVG skill icons with category filter tabs |
| **Projects** | 15 projects with gallery carousel modal and "View All" overlay |
| **Experience** | Scrollable timeline with animated glow dots |
| **Certificates** | Auto-playing marquee carousel with full-screen modal |
| **Contact** | Social links, email, location, and resume download |

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

Dev server runs at `http://localhost:5173`

---

## Project Structure

```
portfolio/
├── public/
│   └── assets/
│       ├── icons/svg/       # Themed SVG skill icons
│       ├── images/          # Hero, about, experience bg images
│       │   ├── projects/    # Project thumbnails + gallery
│       │   └── certificates/
│       └── resume.pdf
├── src/
│   ├── components/          # One file per section
│   ├── data/
│   │   └── portfolio.js     # All content data (skills, projects, experience, etc.)
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css            # Global styles + Tailwind directives
├── tailwind.config.js       # Custom theme tokens
└── vite.config.js
```

---

## Customization

All content lives in `src/data/portfolio.js` — update skills, projects, experience, certificates, and social links there without touching any component files.

Custom theme tokens are in `tailwind.config.js`:

```js
bg: '#05050f'          // page background
bg-card: '#0d0d1a'     // card background
accent: '#7c3aed'      // primary purple
accent-light: '#a78bfa' // lighter purple
border: '#1e1b4b'      // subtle border
```

---

## Contact

- **Email:** prfounder43@gmail.com
- **LinkedIn:** [pankaj-rana](https://www.linkedin.com/in/pankaj-rana-a09276141/)
- **GitHub:** [rpankaj853](https://github.com/rpankaj853)
