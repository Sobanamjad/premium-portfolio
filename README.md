# Premium Developer Portfolio

A modern, animated developer portfolio built with React, Vite, Tailwind CSS, and Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL in your browser.

## Build for production

```bash
npm run build
npm run preview
```

## Editing content

Nothing is hardcoded in the components. All text, links, and data live in `src/data/`:

- `data/roles.js` — rotating hero taglines
- `data/socialLinks.js` — social icons + URLs
- `data/skills.js` — categorized skills with proficiency levels
- `data/services.js` — service offering cards
- `data/projects.js` — portfolio project cards (+ categories used by the filter)
- `data/experience.js` — work experience + education timeline
- `data/certificates.js` — certification cards
- `data/testimonials.js` — testimonial carousel entries
- `data/stats.js` — animated counters in the About section

Update these files with your own information — the UI re-renders automatically via `.map()`.

To swap the resume file, replace `public/resume.pdf` (referenced by the Hero and About download buttons).

## Structure

```
src/
  components/   reusable UI primitives (cards, buttons, cursor, backgrounds...)
  sections/     one file per page section (Hero, About, Skills, Projects...)
  hooks/        custom hooks (typing effect, count-up, scroll progress, Lenis)
  data/         all dynamic content arrays
  utils/        small pure helper functions
```

## Notes

- Smooth scrolling is powered by Lenis and respects `prefers-reduced-motion`.
- Below-the-fold sections are lazy-loaded/code-split for a fast first paint.
- The custom cursor auto-disables on touch devices.
