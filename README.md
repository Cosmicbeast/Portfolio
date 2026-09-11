# Cosmicbeast — Cinematic Storytelling & Developer Portfolio

An immersive, cinematic single-page developer portfolio and storytelling web experience built with **Nuxt 3**, **Three.js**, **GSAP**, and **Lenis**. Inspired by futuristic HUD interfaces, cyberpunk aesthetics, and editorial digital storytelling.

---

## ✨ Features

- **Futuristic HUD Frame Overlay**: Full-viewport fixed border frame with responsive telemetry data, real-time scroll progress indicator, ambient audio toggle, and chapter navigation tabs.
- **Cinematic Scroll-Triggered Parallax**: Centralized declarative configuration system (`data/parallax-config.json`) driving multi-layered depth planes (backgrounds, atmosphere, character artwork, floating geometry, and typography) with zero layout shift.
- **Dynamic Chapter & Theme Engine**: Real-time theme transitions (`dark` ↔ `light`) and active chapter tracking (`useStoryState.ts`) synchronized to viewport scroll position.
- **Interactive Micro-Experiences**:
  - **Click & Hold Dossier Reticle**: Interactive SVG countdown ring with smooth easing, tactile feedback, and full keyboard navigation (Enter / Space).
  - **Interactive 3D WebGL Canvas**: Three.js particle field with mouse-tracking parallax camera and performance-optimized render loop.
  - **Collectible Cards Showcase**: Fan-out staggered reveal with interactive inspection modal.
- **Procedural Ambient Audio**: Synthesized ambient sci-fi drone powered by the Web Audio API with zero external audio assets required.
- **Smooth Physics Scrolling**: Integrated Lenis smooth-scroller synchronized with the GSAP ticker.
- **Strict Accessibility & Mobile-First**: Skip navigation link, full keyboard accessibility, ARIA role markup, `:focus-visible` styling, and native `prefers-reduced-motion` compliance.

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | [Nuxt 3](https://nuxt.com/) (Vue 3, Composition API) | Server-side rendering, routing, auto-imports |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Type safety across composables, configs, and components |
| **3D & WebGL** | [Three.js](https://threejs.org/) | Interactive 3D hero particle scene |
| **Animation** | [GSAP 3](https://gsap.com/) + [ScrollTrigger](https://gsap.com/scrolltrigger/) | Scroll-driven choreography, timeline reveals, scrubbing |
| **Smooth Scroll** | [Lenis](https://lenis.darkroom.engineering/) | Inertial smooth scroll synchronized with GSAP |
| **Audio** | Web Audio API | Client-side procedural ambient sound generator |
| **Styling** | Vanilla CSS + CSS Custom Properties | Token-based theming with scoped component styles |
| **Typography** | Space Grotesk & JetBrains Mono | Display headlines and monospace telemetry via Google Fonts |

---

## 📁 Architecture & Project Structure

```
Portfolio/
├── app.vue                     # Root application wrapper
├── error.vue                   # Dedicated production error boundary
├── nuxt.config.ts              # Nuxt configuration, fonts, metadata
├── package.json
│
├── assets/
│   └── css/
│       ├── reset.css           # Global box-sizing, focus-visible reset
│       ├── tokens.css          # Design tokens (colors, spacing, z-index, themes)
│       ├── typography.css      # Type scale, font families, letter-spacing
│       └── utilities.css       # Layout flex/grid utilities
│
├── components/
│   ├── layout/                 # Structural overlays & navigation
│   │   ├── TheHudFrame.vue     # Fixed HUD border with telemetry & controls
│   │   ├── HudProgressBar.vue  # Real-time scroll progress line
│   │   ├── HudNavTabs.vue      # Chapter jump tabs
│   │   ├── TheMenu.vue         # Fullscreen navigation drawer
│   │   ├── MenuNavItem.vue     # Animated sliding hover menu links
│   │   ├── SmoothScroll.vue    # Lenis wrapper
│   │   └── TheFooterMonoliths.vue # Rising monolith columns and exit footer
│   │
│   ├── sections/               # Narrative story chapters
│   │   ├── SectionHero.vue     # Chapter 01: Hero opening scene & centerpiece
│   │   ├── SectionIntroSplit.vue # Chapter 02: Editorial split narrative
│   │   ├── SectionKeepTelemetry.vue # Chapter 04: Telemetry stream & aerial flight
│   │   ├── SectionCollectibles.vue  # Chapter 05: Collectible cards showcase
│   │   ├── SectionFactionsCitadel.vue # Chapter 06A: Architectural portal
│   │   ├── SectionFactionsOverlook.vue # Chapter 06B: Balcony overlook & reticle
│   │   ├── SectionWorldKeepers.vue  # Chapter 07 & 08: Brutalist triptych stage
│   │   └── SectionMatrixWipe.vue    # Matrix scanline visual divider
│   │
│   ├── three/                  # WebGL 3D systems
│   │   ├── HeroScene.vue       # Client-only canvas wrapper
│   │   ├── SceneManager.ts     # Three.js lifecycle manager
│   │   └── ParticleField.ts    # Procedural floating particle geometry
│   │
│   └── ui/                     # Reusable UI controls
│       ├── AudioIndicator.vue  # Animated audio waveform button
│       ├── AssetSlot.vue       # Robust image/SVG fallback slot with aspect ratio
│       ├── FolderTabCard.vue   # Tabbed telemetry data card
│       ├── BtnMain.vue         # Cyberpunk-angled CTA button
│       └── BtnBurger.vue       # HUD menu trigger toggle
│
├── composables/
│   ├── useParallax.ts          # Central configuration-driven parallax engine
│   ├── useStoryState.ts        # Global chapter, theme, and progress reactive store
│   ├── useAudio.ts             # Web Audio API ambient drone synthesizer
│   ├── useLenis.ts             # Lenis smooth scroll provider
│   ├── useRaf.ts               # Centralized requestAnimationFrame manager
│   └── useScrollTrigger.ts     # GSAP ScrollTrigger lifecycle wrapper
│
├── data/
│   ├── story.json              # Story text, chapter metadata, footer links
│   ├── parallax-config.json    # Declarative parallax motion schema
│   └── asset-manifest.json     # Visual asset register with fallback states
│
└── public/
    ├── favicon.svg             # Cyberpunk monogram icon
    └── images/                 # Optimized raster photography and textures
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher

### Installation
Clone the repository and install dependencies:

```bash
git clone https://github.com/Cosmicbeast/Portfolio.git
cd Portfolio
npm install
```

### Development Server
Start the local Vite development server:

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
Compile and bundle the application with Nuxt Nitro:

```bash
npm run build
```

### Preview Production Build
Locally preview the built server:

```bash
npm run preview
# or
node .output/server/index.mjs
```

---

## 📐 Parallax & Motion System

The parallax system is driven entirely by [`data/parallax-config.json`](file:///data/parallax-config.json) through [`composables/useParallax.ts`](file:///composables/useParallax.ts):

- **Declarative**: All motion values, start/end trigger bounds, and scrub timings are stored in JSON.
- **Selective Depth**: Parallax is applied strictly to background artwork, midground character illustrations, floating decorative geometry, and oversized typographic watermarks.
- **Grounded Controls**: Interactive buttons, navigation bars, body text, and forms retain natural scroll behavior.
- **Zero Layout Shifts**: Powered strictly by CSS `transform: translate3d()` and `opacity`.

### Example Parallax Configuration
```json
{
  "sectionId": "chapter-keep",
  "trigger": "#chapter-keep",
  "start": "top bottom",
  "end": "bottom top",
  "scrub": 1.0,
  "layers": [
    {
      "id": "keep-sunset-haze",
      "target": ".sunset-haze-grad",
      "type": "background",
      "speed": 0.05,
      "from": { "yPercent": -6 },
      "to": { "yPercent": 6 }
    }
  ]
}
```

---

## 🎨 Customizing the Content & Branding

1. **Story & Text**: Edit [`data/story.json`](file:///data/story.json) to customize all chapter headlines, paragraphs, button labels, social links, and footer columns.
2. **Design Tokens & Theme**: Edit [`assets/css/tokens.css`](file:///assets/css/tokens.css) to modify color variables (`--color-accent-green`, `--color-bg-dark`, etc.), spacing scales, and border radii.
3. **Typography**: Fonts can be updated in [`nuxt.config.ts`](file:///nuxt.config.ts) and [`assets/css/typography.css`](file:///assets/css/typography.css).
4. **Imagery**: Add artwork to [`public/images/`](file:///public/images/) and update [`data/asset-manifest.json`](file:///data/asset-manifest.json).

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.