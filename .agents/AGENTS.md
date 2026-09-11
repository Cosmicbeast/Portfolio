# Portfolio — Agent Project Guide

> This file gives you (the agent) full context on what this project is, how it's built, and where everything lives. Read this before touching any code.

---

## What This Project Is

An immersive, dark-themed, cinematic developer portfolio website inspired by [kprverse.com](https://kprverse.com/). Single-page scrolling experience with 6 content sections, Three.js 3D hero, smooth scroll, scroll-triggered animations, ambient audio, HUD-style frame overlay, and a full-screen hamburger menu.

---

## Tech Stack (Non-Negotiable)

| Layer | Choice |
|---|---|
| **Framework** | Nuxt 3 (Vue 3, Composition API, `<script setup>`) |
| **Bundler** | Vite (Nuxt default) |
| **3D** | Three.js |
| **Smooth Scroll** | Lenis |
| **Animation** | GSAP + ScrollTrigger |
| **Fonts** | Space Grotesk (display) + JetBrains Mono (mono) via Google Fonts |
| **Styling** | Vanilla CSS with CSS custom properties + Vue scoped styles |
| **Language** | TypeScript everywhere (`.ts`, `<script setup lang="ts">`) |

### Key Dependencies (package.json)
```
three, @types/three
lenis
gsap (with ScrollTrigger plugin)
```

Do NOT introduce Tailwind, SCSS, Pinia, or any other dependency not listed above without explicit user approval.

---

## Architecture — Directory Map

```
Portfolio/
├── nuxt.config.ts
├── app.vue
├── assets/
│   ├── css/
│   │   ├── reset.css
│   │   ├── tokens.css          # Design tokens (colors, spacing, z-layers)
│   │   ├── typography.css      # @font-face, type scale
│   │   └── utilities.css       # Utility classes
│   └── audio/
│       └── ambient.mp3
├── components/
│   ├── layout/                 # TheFrame, TheFrameProgress, SmoothScroll, ThePreloader, TheFooter
│   ├── nav/                    # TheNavDesktop, TheNavMobile, TheMenu, MenuNavItem
│   ├── animation/              # ScrambleText, LinkHover, ScrollReveal, DotLabel
│   ├── ui/                     # BtnMain, BtnBurger, BtnAudio, ProjectCard, SkillBadge
│   ├── three/                  # HeroScene, ParticleField, SceneManager
│   └── sections/               # SectionHero, SectionAbout, SectionProjects, SectionExperience, SectionSkills, SectionContact
├── composables/
│   ├── useRaf.ts
│   ├── useScrollTrigger.ts
│   ├── useLenis.ts
│   ├── useAudio.ts
│   └── usePreloader.ts
├── layouts/
│   └── default.vue
├── pages/
│   └── index.vue
├── plugins/
│   ├── lenis.client.ts
│   └── gsap.client.ts
└── public/
    ├── favicon.svg
    └── og.jpg
```

---

## Design Tokens (Source of Truth)

```css
:root {
  --cl-bg: #000;
  --cl-text: #fff;
  --cl-accent: #c0fb50;
  --cl-accent-blue: #8ca6ff;
  --cl-muted: rgba(255,255,255,0.4);
  --cl-line-light: rgba(255,255,255,0.15);
  --cl-line-dark: rgba(0,0,0,0.15);

  --frame-pad: 1.6rem;
  --frame-radius: 0.8rem;
  --section-gap: 12rem;

  --nav-height: 4.8rem;
  --sidebar-width: 6.4rem;
  --line-thickness: 1px;

  --z-canvas: 0;
  --z-content: 1;
  --z-frame: 10;
  --z-menu: 20;
  --z-preloader: 30;

  --font-display: 'Space Grotesk', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

Always use these tokens. Never hardcode colors, spacing, or z-index values.

---

## Build Phases (Execution Order)

The project is built in 6 sequential phases. **Do not skip ahead.** Each phase depends on the previous one.

### Phase 1 — Foundation
Initialize Nuxt 3, CSS tokens/reset/typography, Google Fonts, install deps (`three`, `lenis`, `gsap`), create client plugins, create `useRaf` + `useLenis` composables, build `default.vue` layout with `SmoothScroll`.

### Phase 2 — HUD Frame & Navigation
`TheFrame.vue`, `TheFrameProgress.vue`, `TheNavDesktop.vue`, `TheNavMobile.vue`, `BtnBurger.vue`, `TheMenu.vue`, `MenuNavItem.vue`.

### Phase 3 — Animation System
`ScrambleText.vue`, `LinkHover.vue`, `ScrollReveal.vue`, `DotLabel.vue`, `useScrollTrigger` composable.

### Phase 4 — Three.js Hero
`SceneManager.ts`, `ParticleField.ts`, `HeroScene.vue`, mouse parallax camera.

### Phase 5 — Content Sections
`SectionHero.vue`, `SectionAbout.vue`, `SectionProjects.vue` + `ProjectCard.vue`, `SectionExperience.vue`, `SectionSkills.vue` + `SkillBadge.vue`, `SectionContact.vue`, `TheFooter.vue`.

### Phase 6 — Polish
`ThePreloader.vue` + `usePreloader`, `BtnAudio.vue` + `useAudio`, animation tuning, mobile responsive pass, SEO, performance optimization, accessibility.

---

## Coding Conventions

### Vue Components
- Always use `<script setup lang="ts">` — no Options API
- Props: use `defineProps<{}>()` with TypeScript interfaces
- Emits: use `defineEmits<{}>()` with TypeScript
- Template refs: use `useTemplateRef()` or `ref<HTMLElement | null>(null)`
- All CSS scoped per component: `<style scoped>`
- CSS custom properties from `tokens.css` for all design values

### Composables
- File name: `use<Name>.ts` (e.g., `useRaf.ts`)
- Return reactive refs and functions
- Clean up side effects in `onUnmounted`
- SSR-safe: guard browser APIs with `import.meta.client` or `onMounted`

### Three.js
- All Three.js code must be client-only (use `.client.vue` suffix or `<ClientOnly>` wrapper)
- Dispose geometries, materials, textures in `onUnmounted`
- Use `useRaf` composable for render loop — do not create separate RAF loops

### GSAP
- Register ScrollTrigger in `gsap.client.ts` plugin
- Kill all ScrollTrigger instances and GSAP tweens in `onUnmounted`
- Use `gsap.context()` for scoped cleanup

### File Naming
- Vue components: PascalCase (`TheFrame.vue`, `BtnMain.vue`)
- Composables: camelCase with `use` prefix (`useRaf.ts`)
- CSS files: kebab-case (`tokens.css`)
- TypeScript utilities: camelCase (`SceneManager.ts`)

---

## Component Reference (Quick Lookup)

| Component | Path | Purpose |
|---|---|---|
| `TheFrame` | `components/layout/TheFrame.vue` | Fixed HUD border overlay |
| `TheFrameProgress` | `components/layout/TheFrameProgress.vue` | Scroll progress bar |
| `SmoothScroll` | `components/layout/SmoothScroll.vue` | Lenis smooth scroll wrapper |
| `ThePreloader` | `components/layout/ThePreloader.vue` | Full-screen loading screen |
| `TheFooter` | `components/layout/TheFooter.vue` | Site footer |
| `TheNavDesktop` | `components/nav/TheNavDesktop.vue` | Desktop navigation |
| `TheNavMobile` | `components/nav/TheNavMobile.vue` | Mobile navigation |
| `TheMenu` | `components/nav/TheMenu.vue` | Full-screen hamburger menu |
| `MenuNavItem` | `components/nav/MenuNavItem.vue` | Menu link item |
| `ScrambleText` | `components/animation/ScrambleText.vue` | Text scramble effect |
| `LinkHover` | `components/animation/LinkHover.vue` | Sliding hover fill |
| `ScrollReveal` | `components/animation/ScrollReveal.vue` | Scroll-triggered reveal |
| `DotLabel` | `components/animation/DotLabel.vue` | Dot + label header |
| `BtnMain` | `components/ui/BtnMain.vue` | Primary CTA button |
| `BtnBurger` | `components/ui/BtnBurger.vue` | Hamburger toggle |
| `BtnAudio` | `components/ui/BtnAudio.vue` | Audio waveform toggle |
| `ProjectCard` | `components/ui/ProjectCard.vue` | Project showcase card |
| `SkillBadge` | `components/ui/SkillBadge.vue` | Skill tag badge |
| `HeroScene` | `components/three/HeroScene.vue` | Three.js hero canvas |
| `ParticleField` | `components/three/ParticleField.ts` | Particle system class |
| `SceneManager` | `components/three/SceneManager.ts` | Three.js lifecycle manager |
| `SectionHero` | `components/sections/SectionHero.vue` | Hero section |
| `SectionAbout` | `components/sections/SectionAbout.vue` | About section |
| `SectionProjects` | `components/sections/SectionProjects.vue` | Projects grid |
| `SectionExperience` | `components/sections/SectionExperience.vue` | Timeline section |
| `SectionSkills` | `components/sections/SectionSkills.vue` | Skills grid |
| `SectionContact` | `components/sections/SectionContact.vue` | Contact CTA |
