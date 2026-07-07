# Sanjaykumar S — Portfolio

A premium, cinematic personal portfolio built with **only HTML5, CSS3, and vanilla JavaScript** — no frameworks, no animation libraries. Every project, internship, certification, achievement, and leadership role from the original portfolio content has been preserved; only the presentation has been redesigned.

## Structure

```
index.html          Full site markup (hero + all content sections)
style.css            All styling, palette, layout, animation, responsive rules
script.js             Nav behavior, video controls, particle field, parallax, scroll reveal
assets/
  video/hero.mp4               Talking-head video (foreground + ambient bloom duplicate)
  SanjaykumarS_Resume.pdf       Resume served by the "Download Resume" buttons
  images/                       Reserved for future project screenshots
  icons/                        Reserved (all current icons are inline SVG)
  fonts/                        Reserved if you switch to self-hosted fonts
README.md
```

## Sections (in order)

1. **Hero** — name, role, intro, tagline, CTAs, social icons, glass video stage
2. **About** — introduction, about me, education/location/focus facts, My Mission, What I Do
3. **Technical Expertise** — Programming Languages, Tools & Platforms, AI & Productivity Tools
4. **Featured Projects** — all 6 projects (CGPA Calculator, PrimeFit, Facial Expression Recognition, Dual Authentication Attendance System, Smart Fire Alert System, Mini CV Projects) with features, tech tags, and GitHub links
5. **Professional Experience & Internships** — timeline (NPCIL, Zeekers ×2)
6. **Certifications** — 4 certifications with grades
7. **Achievements** — 4 achievement cards
8. **Leadership** — timeline of Department Secretary, Class Representative, Yoga Student Coordinator
9. **Development Philosophy**
10. **Let's Connect** — contact card, email/phone/location, socials, closing thank-you
11. **Footer**

## Design notes

- **Palette**: `#05070A` background, blue accent system (`#4F8CFF → #7CC8FF → #8EC5FF → #5DA9FF`) — no orange, per the brief.
- **Type**: Space Grotesk (display) + Manrope (body), loaded from Google Fonts.
- **Video stage**: the same clip renders twice — sharp in the glass frame, blurred 40px / 20% opacity / 110% scale behind it — for ambient lighting without a second file.
- **Particles**: a `<canvas>` field of 40–70 soft blue/white dots with mouse parallax, paused automatically via `IntersectionObserver` once the hero scrolls out of view (performance).
- **Scroll reveal**: every section and card uses a shared `[data-animate]` class, revealed once via `IntersectionObserver` with a light stagger on grids and timelines.
- **Navigation**: transparent over the hero, gains a glass background on scroll; collapses to a slide-down menu with scroll-spy active states on mobile.
- **Accessibility**: semantic landmarks, ARIA labels on all interactive controls, visible focus rings, and a full `prefers-reduced-motion` fallback (disables particles and all decorative motion, reveals content immediately).

## Customizing

- Swap `assets/video/hero.mp4` for a new clip — the bloom-blur duplicate adapts to any video automatically.
- Replace `assets/SanjaykumarS_Resume.pdf` to update the résumé served by the download buttons.
- Edit copy directly in `index.html` — each section is clearly commented.
- Add real project screenshots by dropping images into `assets/images/` and swapping the `.project-card__glyph` icon block for an `<img>`.

## Running locally

No build step required.

```bash
npx serve .
```

or open `index.html` directly (video autoplay is more reliable served over `http://` than `file://`).
