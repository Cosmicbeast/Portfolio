# KPRverse-Inspired Immersive Developer Portfolio

Build a dark, cinematic, immersive portfolio website for a software developer / freelancer, inspired by the techniques and feel of [kprverse.com](https://kprverse.com/).

## User Review Required

> [!IMPORTANT]
> **Scope is large.** This plan covers ~30 components, Three.js 3D, GSAP + Lenis smooth scroll, ambient audio, a preloader, and 6 content pages. It will be built in phases. Please confirm you're comfortable with this scope, or let me know which features to cut or defer.

> [!WARNING]
> **Three.js adds significant complexity.** The 3D hero scene alone can take considerable effort to tune. We can start with a simpler particle/geometry system and evolve it. If you'd prefer to skip Three.js initially and add it later, let me know.

> [!IMPORTANT]
> **Content needed from you.** I'll use placeholder text to start, but eventually you'll need to provide: your name/tagline, about copy, project list (titles, descriptions, images, links), work experience timeline, skill list, and contact details.

## Open Questions

> [!IMPORTANT]
> 1. **Your name / brand identity?** — KPRverse has a strong logo mark. Do you have a personal logo, monogram, or should I design one into the HUD frame?
> 2. **Color accent preference?** — KPRverse uses neon green `#c0fb50`. Do you want to keep that cyberpunk green, or prefer a different accent (electric blue, purple, orange, etc.)?
> 3. **Domain / deployment?** — Planning to deploy on Vercel, Netlify, or something else? This affects the Nuxt config.
> 4. **How many projects to showcase?** — Rough number so I can design the grid/gallery layout appropriately (3–5, 5–10, 10+).

---

## Proposed Changes

### Tech Stack

| Layer | Choice | Rationale |
|---|---|---|
| **Framework** | Nuxt 3 (Vue 3) | Same as KPRverse — SSR, file-based routing, composables |
| **Bundler** | Vite (built-in) | Fast dev, hashed production chunks |
| **3D** | Three.js | Immersive hero scene (particles / geometry) |
| **Smooth Scroll** | Lenis | Open-source, production-ready (KPRverse rolls custom — Lenis is equivalent and battle-tested) |
| **Animation** | GSAP + ScrollTrigger | Industry-standard for scroll-triggered and timeline animations |
| **Fonts** | `Space Grotesk` (headings) + `JetBrains Mono` (mono/UI) via Google Fonts | Modern developer aesthetic — free alternatives to KPRverse's paid fonts |
| **Styling** | Vanilla CSS with CSS custom properties + scoped Vue styles | Matching KPRverse's token-driven scoped CSS architecture |

---

### Architecture Overview

```
Portfolio/
├── nuxt.config.ts              # Nuxt config, meta, fonts, modules
├── app.vue                     # Root app (layout slot, global providers)
├── assets/
│   ├── css/
│   │   ├── reset.css           # CSS reset
│   │   ├── tokens.css          # Design tokens (colors, spacing, z-index)
│   │   ├── typography.css      # Font-face declarations, type scale
│   │   └── utilities.css       # Utility classes (flex, full, etc.)
│   ├── audio/
│   │   └── ambient.mp3         # Background ambient audio
│   └── fonts/                  # Self-hosted font files (if any)
├── components/
│   ├── layout/                 # Shell & layout components
│   ├── nav/                    # Navigation components
│   ├── animation/              # Animation primitive components
│   ├── ui/                     # Buttons, cards, UI primitives
│   ├── three/                  # Three.js scene & objects
│   └── sections/               # Page section components
├── composables/
│   ├── useRaf.ts               # requestAnimationFrame loop
│   ├── useScrollTrigger.ts     # Scroll-triggered animation helper
│   ├── useLenis.ts             # Lenis smooth scroll integration
│   ├── useAudio.ts             # Ambient audio state
│   └── usePreloader.ts         # Preloader state & progress
├── layouts/
│   └── default.vue             # Default layout (frame + smooth scroll + canvas)
├── pages/
│   └── index.vue               # Homepage (all sections)
├── plugins/
│   ├── lenis.client.ts         # Lenis client-only plugin
│   └── gsap.client.ts          # GSAP + ScrollTrigger client-only plugin
├── public/
│   ├── favicon.svg
│   └── og.jpg
└── package.json
```

---

### Component Breakdown (~30 components)

#### Layout / Shell (4 components)

##### [NEW] `components/layout/TheFrame.vue`
- Fixed full-viewport HUD-style border overlay (inspired by KPRverse's `the-frame-layer`)
- Thin border with rounded corners, sits on top of all content
- Houses nav bar at top, logo mark on left sidebar, audio toggle at bottom-left
- Light/dark frame theme that shifts per section via scroll position

##### [NEW] `components/layout/TheFrameProgress.vue`
- Horizontal progress bar in the top nav bar
- Shows scroll depth as a thin animated line (`transform: translateX`)

##### [NEW] `components/layout/SmoothScroll.vue`
- Wrapper component integrating Lenis smooth scroll
- Provides the lerped, buttery scroll feel matching KPRverse

##### [NEW] `components/layout/ThePreloader.vue`
- Full-screen preloader (white bg, black text — inverted from main dark theme)
- Loading progress bar, file name ticker, audio opt-in CTA
- Fades out when all assets (Three.js scene, fonts, images) are loaded

---

#### Navigation (4 components)

##### [NEW] `components/nav/TheNavDesktop.vue`
- Desktop top navigation inside the HUD frame bar
- Section links (About, Projects, Experience, Skills, Contact) with `hacky-text` scramble on hover
- Dot indicator for active section (tracks scroll position)

##### [NEW] `components/nav/TheNavMobile.vue`
- Mobile top bar with burger button + logo
- Fixed position, theme-aware (light/dark border colors)

##### [NEW] `components/nav/TheMenu.vue`
- Full-screen hamburger menu overlay
- Large typography nav items with highlight-on-hover background fill
- Blur + contrast filter for frosted/glitchy edge effect
- Social links + contact info section at bottom

##### [NEW] `components/nav/MenuNavItem.vue`
- Individual menu item with oversized font, hover highlight background, and sound effect

---

#### Animation Primitives (4 components)

##### [NEW] `components/animation/ScrambleText.vue`
- Text scramble / typewriter effect (equivalent to KPRverse's `hacky-text`)
- Props: `text`, `trigger` (hover, scroll, mount), `speed`, `chars` (scramble charset)
- Randomly cycles through characters before resolving to final text

##### [NEW] `components/animation/LinkHover.vue`
- Sliding background fill that sweeps left-to-right on hover
- Wraps any text link/button for consistent hover interaction

##### [NEW] `components/animation/ScrollReveal.vue`
- Generic scroll-triggered reveal wrapper
- Props: `animation` (fade-up, fade-in, slide-left, etc.), `delay`, `duration`
- Uses GSAP + ScrollTrigger under the hood

##### [NEW] `components/animation/DotLabel.vue`
- Small dot indicator + uppercase label — used for section headers (e.g., `● ABOUT ME`)

---

#### UI Primitives (5 components)

##### [NEW] `components/ui/BtnMain.vue`
- Primary CTA button with corner-cut SVG shape (matching KPRverse aesthetic)
- Hover: fills solid, text color inverts
- Props: `theme` (dark/light/accent), `href`, `fill`

##### [NEW] `components/ui/BtnBurger.vue`
- Animated hamburger → X toggle with SVG lines

##### [NEW] `components/ui/BtnAudio.vue`
- 5-bar waveform visualizer toggle for ambient audio
- Bars animate (scale Y) when audio is playing

##### [NEW] `components/ui/ProjectCard.vue`
- Individual project showcase card
- Hover: image scale, overlay info, corner-cut decorative frame
- Click: navigates to project detail or external link

##### [NEW] `components/ui/SkillBadge.vue`
- Monospace-styled skill tag with subtle border and hover glow

---

#### Three.js / Canvas (3 components)

##### [NEW] `components/three/HeroScene.vue`
- Full-viewport Three.js canvas behind the hero section
- **Scene concept**: Floating particle field or geometric wireframe that reacts to mouse movement
- Camera parallax effect on mouse move
- Slow ambient rotation + depth-of-field feel
- Renders into `#canvas-container` (fixed behind all UI)

##### [NEW] `components/three/ParticleField.ts`
- Three.js particle system — thousands of tiny dots floating in 3D space
- Mouse proximity causes particles to scatter/attract
- Subtle color gradient from accent color at center to fade at edges

##### [NEW] `components/three/SceneManager.ts`
- Manages renderer, camera, scene lifecycle
- Handles resize, RAF loop integration, performance throttling
- Clean disposal on unmount

---

#### Content Sections (6 components)

##### [NEW] `components/sections/SectionHero.vue`
- Full-viewport hero with Three.js scene behind
- Large display text: your name + role/tagline with scramble-in animation
- Scroll indicator at bottom
- Dark background, white text, accent color highlights

##### [NEW] `components/sections/SectionAbout.vue`
- Split layout: text block + portrait/avatar image
- Scramble text reveals on scroll
- Brief bio, what you do, your approach
- DotLabel header: `● ABOUT`

##### [NEW] `components/sections/SectionProjects.vue`
- Grid of `ProjectCard` components (2–3 columns on desktop, 1 on mobile)
- Each card has image, title, tech stack tags, and hover overlay
- Staggered scroll-reveal entrance animation
- DotLabel header: `● PROJECTS`

##### [NEW] `components/sections/SectionExperience.vue`
- Vertical timeline layout
- Each entry: company/role, date range, brief description
- Timeline line animates down as user scrolls
- DotLabel header: `● EXPERIENCE`

##### [NEW] `components/sections/SectionSkills.vue`
- Grid of `SkillBadge` components grouped by category (Languages, Frameworks, Tools)
- Staggered reveal on scroll
- DotLabel header: `● SKILLS`

##### [NEW] `components/sections/SectionContact.vue`
- Contact CTA with email link, social links (GitHub, LinkedIn, Twitter)
- Large display text: "Let's work together" with scramble effect
- Corner-cut CTA button for email
- DotLabel header: `● CONTACT`

---

#### Footer (1 component)

##### [NEW] `components/layout/TheFooter.vue`
- Dark footer matching KPRverse's sectioned layout
- Columns: navigation links, social links, contact details
- Monospace typography, uppercase, link-hover effects
- Copyright + version label at bottom

---

### Design System (CSS Tokens)

```css
/* assets/css/tokens.css */
:root {
  /* Colors */
  --cl-bg: #000;
  --cl-text: #fff;
  --cl-accent: #c0fb50;        /* Neon green — update per user preference */
  --cl-accent-blue: #8ca6ff;
  --cl-muted: rgba(255,255,255,0.4);
  --cl-line-light: rgba(255,255,255,0.15);
  --cl-line-dark: rgba(0,0,0,0.15);

  /* Spacing */
  --frame-pad: 1.6rem;
  --frame-radius: 0.8rem;
  --section-gap: 12rem;

  /* Nav / Frame */
  --nav-height: 4.8rem;
  --sidebar-width: 6.4rem;
  --line-thickness: 1px;

  /* Z-index layers */
  --z-canvas: 0;
  --z-content: 1;
  --z-frame: 10;
  --z-menu: 20;
  --z-preloader: 30;

  /* Typography */
  --font-display: 'Space Grotesk', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

---

### Animation Catalog (What We're Implementing)

| # | Animation | KPRverse Equivalent | Implementation |
|---|---|---|---|
| 1 | **Smooth scroll** | `the-smooth-scroll` + `lerp` | Lenis library |
| 2 | **Scroll-triggered reveals** | `useScrollTrigger` | GSAP ScrollTrigger |
| 3 | **Text scramble** | `hacky-text` | Custom `ScrambleText.vue` component |
| 4 | **Link hover fill** | `link-hover` | `LinkHover.vue` with CSS transform |
| 5 | **3D particle hero** | Three.js scene | `HeroScene.vue` + `ParticleField.ts` |
| 6 | **Preloader** | `preloader` | `ThePreloader.vue` with progress tracking |
| 7 | **Page progress bar** | `the-frame-progress` | `TheFrameProgress.vue` |
| 8 | **HUD frame overlay** | `the-frame-layer` | `TheFrame.vue` with scoped CSS |
| 9 | **Menu blur reveal** | `the-menu` filter trick | `TheMenu.vue` with `filter: blur + contrast` |
| 10 | **Audio waveform toggle** | `btn-audio` | `BtnAudio.vue` with RAF-driven bar animation |
| 11 | **Timeline scroll animation** | Frame layer masking | GSAP-driven timeline line draw |
| 12 | **Staggered grid reveal** | Scroll-triggered | GSAP stagger on project cards |
| 13 | **Mouse parallax** | Three.js camera | Mouse-reactive camera position in hero |
| 14 | **Cursor blink** | `the-console` | CSS keyframe on contact section terminal accent |

---

### Phases

#### Phase 1 — Foundation
1. Initialize Nuxt 3 project
2. Set up CSS design tokens, reset, typography
3. Configure Google Fonts (Space Grotesk + JetBrains Mono)
4. Install dependencies: `three`, `lenis`, `gsap`
5. Create Lenis + GSAP client plugins
6. Create `useRaf`, `useLenis` composables
7. Build `default.vue` layout with `SmoothScroll` wrapper

#### Phase 2 — HUD Frame & Navigation
8. Build `TheFrame.vue` (border overlay, sidebar, top bar)
9. Build `TheFrameProgress.vue` (scroll progress)
10. Build `TheNavDesktop.vue` + `TheNavMobile.vue`
11. Build `BtnBurger.vue` + `TheMenu.vue` + `MenuNavItem.vue`

#### Phase 3 — Animation System
12. Build `ScrambleText.vue`
13. Build `LinkHover.vue`
14. Build `ScrollReveal.vue`
15. Build `DotLabel.vue`
16. Create `useScrollTrigger` composable

#### Phase 4 — Three.js Hero
17. Build `SceneManager.ts` (renderer, camera, resize)
18. Build `ParticleField.ts` (particle system)
19. Build `HeroScene.vue` (mount into `#canvas-container`)
20. Add mouse parallax to camera

#### Phase 5 — Content Sections
21. Build `SectionHero.vue`
22. Build `SectionAbout.vue`
23. Build `SectionProjects.vue` + `ProjectCard.vue`
24. Build `SectionExperience.vue` (timeline)
25. Build `SectionSkills.vue` + `SkillBadge.vue`
26. Build `SectionContact.vue`
27. Build `TheFooter.vue`

#### Phase 6 — Polish
28. Build `ThePreloader.vue` + `usePreloader` composable
29. Build `BtnAudio.vue` + `useAudio` composable + ambient audio
30. Fine-tune all scroll animations, timings, easings
31. Mobile responsive pass on all components
32. SEO: meta tags, OG image, structured data
33. Performance: lazy-load Three.js, image optimization, code-splitting review
34. Accessibility: keyboard navigation, focus states, reduced-motion media query

---

## Verification Plan

### Automated Tests
```bash
# Type-check
npx nuxi typecheck

# Build verification (ensures SSR works)
npm run build

# Dev server smoke test
npm run dev
```

### Manual Verification
- Open dev server at `localhost:3000`
- Verify preloader → hero transition
- Scroll through all 6 sections, confirm scroll-reveal animations fire
- Test hamburger menu open/close on both desktop and mobile
- Verify Three.js particle scene renders and responds to mouse
- Test ambient audio toggle
- Resize to mobile breakpoints, confirm responsive layout
- Lighthouse audit for performance and accessibility scores
- Cross-browser test (Chrome, Firefox, Safari)
