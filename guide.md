# KPRverse.com — Technical Site Guide

> A deep-dive breakdown of how [kprverse.com](https://kprverse.com/) is built, what animations it uses, and what components power the experience.

---

## 🧱 How the Site Is Made

### Framework & Bundler
| Layer | Technology |
|---|---|
| **Framework** | **Nuxt.js** (Vue 3) — evidenced by `/_nuxt/entry.*.js`, `/_nuxt/default.*.js`, and `#__nuxt` root div |
| **Bundler** | **Vite** (Nuxt 3 default) — hashed chunk filenames like `entry.9cfb39b7.js` are a Vite build signature |
| **Routing** | Nuxt file-based routing — routes include `/`, `/journal`, `/media`, `/gallery`, `/about`, `/[...slug]` |
| **Rendering** | SSR (Server-Side Rendered) — full HTML is delivered on first load |
| **CMS / Data** | **Storyblok** — `Storyblok.9cdc9e39.js` chunk and `useStory` composable are present |

### Styling
| Layer | Technology |
|---|---|
| **CSS Architecture** | Scoped CSS per Vue component (`[data-v-xxxxxxxx]` attribute selectors) |
| **Design Tokens** | CSS custom properties (`--menu-height`, `--menu-pad`, `--menu-radius`, `--z-frame`, `--cl-green`, `--cl-lavender`, `--line-light`, `--line-dark`) |
| **Responsive System** | Custom scale system with two breakpoints: **mobile** (320px base, 375px design) and **desktop** (768px base, 1600px design) |
| **Typography** | `ABCWhytePlus` (display/headings), `IBMPlexMono` (UI/monospace labels), `Noto Sans SC` (CJK fallback) |
| **Color Palette** | Black `#000`, White `#fff`, Neon Green `#c0fb50`, Blue `#8ca6ff` (console accent), Lavender (`--cl-lavender`) |

### Blockchain / Web3
- **Wallet Connect** — MetaMask and WalletConnect integration via dedicated JS chunks
- **OpenSea** — `btn-opensea` component with marketplace linking
- **NFT Minting** — `layout-mint` and `mint-popup-error` suggest a mint flow exists on the site
- **Citizen/Gallery stores** — Vuex/Pinia stores for NFT citizen & gallery state management

### Audio
- Background ambient audio with a dedicated **`btn-audio`** toggle button (animated waveform bars)
- Audio is opt-in via the preloader CTA ring (`loading-audio-cta-ring.svg`)

---

## 🎬 Animations

The site is highly animated. Here is a complete taxonomy of all animation types found:

### 1. Custom RAF Loop (`useRaf`)
- A **requestAnimationFrame** composable drives all real-time animations
- Powers smooth scroll, 3D scenes, and UI interpolations frame-by-frame

### 2. Smooth Scroll (`the-smooth-scroll`)
- Custom virtual scroll engine — `smooth-wrapper` + `smooth-content` DOM structure
- Scroll position is lerped (linear-interpolated) using the `lerp.a6fc2763.js` utility for silky motion

### 3. Scroll-Triggered Animations (`useScrollTrigger`)
- Dedicated composable for triggering animations based on scroll depth
- Elements animate in/out as they enter/exit the viewport

### 4. WebGL / Three.js Scene
- **Three.js** is bundled (`three.module.c9112413.js`) for a full 3D canvas layer
- `#canvas-container` sits behind `#ui-container` at a fixed position
- Three.js utilities: `three-object`, `camera`, `custom-material`, `MathUtils`, `loader-globals`, `LoaderMixin`
- A **3D object viewer** and possibly a **particle or environment system** powers the homepage hero

### 5. HackyText Animation (`hacky-text`)
- A custom scramble/typewriter text effect component
- Used throughout navigation, footer, and body copy
- Has a `.spacer` (invisible placeholder) and `.animation` (absolutely positioned animated layer) pattern

### 6. Link Hover Fill (`link-hover`)
- Sliding background fill that sweeps across text on hover
- Uses `transform: translate(-101%)` to `translate(0%)` CSS transition
- Applied to every nav item, footer link, and CTA

### 7. Hover Sound Effects (`hover-sfx`)
- Audio feedback on UI element hover interactions

### 8. Frame Progress Bar (`the-frame-progress`)
- A horizontal progress indicator in the nav bar
- Animates via `transform: translateX(-100%)` to `translateX(0%)` using `will-change: transform`

### 9. Preloader Animation
- Full-screen white preloader with:
  - **Loading progress bar** (transforms from left)
  - **File name ticker** (shows asset names as they load)
  - **Animated audio CTA ring** (SVG ring animation: `loading-audio-cta-ring.svg`)
  - **Loading triangles** spinner (`loading-triangles.svg`)

### 10. Page Transition Wipe (`transition-wipe`)
- Between-page wipe transition using Vue's `<Transition>` with `wipe-enter` / `wipe-leave` classes
- Fades opacity and uses `translateZ(0)` GPU compositing

### 11. Menu Reveal (`the-menu`)
- Full-screen hamburger menu slides in with blur + contrast filter trick for a glitchy/frosted effect:
  ```css
  filter: blur(5px) contrast(2000%);
  ```
- `white-blocks` elements create an organic blob edge effect

### 12. Frame Layer Masking (`the-frame-layer`)
- Three stacked mask divs (`mask-top-outer`, `mask-bottom-outer`, `mask-bottom-inner`) each independently transform
- Creates parallax-like layer reveals as user scrolls or navigates

### 13. Cursor Blink (`the-console`)
- Terminal-style blinking caret animation:
  ```css
  @keyframes cursor-blink { 0% { visibility: hidden } }
  animation: cursor-blink 1s steps(2) infinite;
  ```

### 14. Audio Waveform Bars (`btn-audio`)
- 5 vertical bars that animate scale on the `transform-origin: center` axis
- Simulates a real-time audio waveform visualizer

### 15. Corner-Cut SVG Morphing (`corner-cut-svg`, `svg-points`)
- Dynamic SVG paths calculated via `get-corner-cut-points.ec30f92c.js`
- Buttons and cards have animated corner-cut polygon shapes

### 16. 3D Object Rotation (`rotate`, `simple-three`)
- Dedicated rotation utility and a simplified Three.js scene wrapper
- Used for rotating 3D NFT/character objects

### 17. Gallery Popup (`the-popup-gallery`)
- Modal slide-in with overlay backdrop and content animation

### 18. Video Overlay (`video-overlay`)
- Video playback layer with touch support (`useTouch`) and pause control

---

## 🧩 Components

The site is broken into **~55 distinct Vue components**. They fall into these categories:

### Layout / Shell (6 components)
| Component | Role |
|---|---|
| `layout-default` | Root page wrapper with canvas + UI containers |
| `the-smooth-scroll` | Virtual scroll wrapper |
| `the-frame` | Fixed HUD border frame overlay |
| `the-frame-layer` | Animated layered frame mask (light/dark themes) |
| `widescreen-warning` | Overlay shown when screen is too wide |
| `landscape-warning` | Overlay shown on landscape mobile |

### Navigation (8 components)
| Component | Role |
|---|---|
| `the-frame-submenu` | Desktop top nav submenu bar |
| `the-frame-submenu-nav` | Nav section of submenu |
| `the-frame-submenu-protocol` | Protocol section of submenu |
| `the-frame-submenu-citizen` | Citizen/wallet section of submenu |
| `the-nav-mobile` | Mobile top navigation bar |
| `the-subnav-mobile` | Mobile bottom sub-navigation |
| `the-menu` | Full-screen hamburger menu |
| `menu-nav-item` | Individual nav item with large hover animation |

### UI Primitives (10 components)
| Component | Role |
|---|---|
| `btn-main` | Primary CTA button with corner-cut SVG shape |
| `btn-burger` | Hamburger icon button |
| `btn-close` | Close/dismiss button |
| `btn-audio` | Audio toggle with waveform bars |
| `btn-console` | Console panel toggle |
| `btn-opensea` | OpenSea marketplace link button |
| `btn-wallet-connect` | Web3 wallet connection button |
| `btn-region` | Region/language switcher button |
| `btn-round` | Round icon button |
| `button-base` | Base button primitive |

### Animation Primitives (5 components)
| Component | Role |
|---|---|
| `hacky-text` | Text scramble/typewriter effect |
| `link-hover` | Sliding background hover fill |
| `dot-caption` | Dot + label UI pattern |
| `dot` | Standalone dot indicator |
| `hover-sfx` | Sound-on-hover wrapper |

### Loading / Transitions (4 components)
| Component | Role |
|---|---|
| `preloader` | Full-screen loading screen |
| `loading-inner-page` | In-page section loader |
| `transition-wipe` | Page transition overlay |
| `the-frame-progress` | Nav progress bar |

### Web3 / Wallet (5 components)
| Component | Role |
|---|---|
| `wallet-connect` | Wallet connection flow |
| `wallet-info` | Connected wallet info display |
| `disconnect` | Wallet disconnect button |
| `mint-popup-error` | Minting error modal |
| `wallet-errors` | Wallet error state handler |

### Content (5 components)
| Component | Role |
|---|---|
| `content-home` | Homepage content wrapper |
| `the-footer` | Site-wide footer |
| `footer-link` | Individual footer link item |
| `the-popup` | Generic popup/modal |
| `the-popup-gallery` | NFT gallery popup |

### 3D / Canvas (6 components)
| Component | Role |
|---|---|
| `three-object` | Generic Three.js object wrapper |
| `simple-three` | Lightweight Three.js scene |
| `create-canvas` | Canvas DOM setup utility |
| `dom-component` | DOM-integrated canvas element |
| `achievement` | 3D achievement display |
| `video-overlay` | Video player overlay |

### System / Utilities (6 components)
| Component | Role |
|---|---|
| `the-console` | In-site developer console panel |
| `console-window` | Console UI window |
| `the-console-loading` | Console loading state |
| `console-bg` | Console background SVG |
| `language-select` | Locale switcher |
| `live-counter` | Live user/NFT counter |

### SVG / Icons (5 components)
| Component | Role |
|---|---|
| `svg-points` | Dynamic SVG polygon points |
| `corner-cut-svg` | Corner-cut shape generator |
| `icon-mark` | KPR logo mark SVG |
| `logo-kpr` | Full KPR wordmark |
| `detail-corner` | Decorative corner detail |

---

## 🗂️ Site Routes

| Path | Section |
|---|---|
| `/` | Homepage — Story / Main Experience |
| `/journal` | Journal / Blog |
| `/media` | Media gallery |
| `/gallery` | NFT gallery |
| `/about` | About page |
| `/[...slug]` | Dynamic Storyblok CMS pages |

---

## 📊 Summary at a Glance

| Metric | Count / Value |
|---|---|
| **Framework** | Nuxt 3 (Vue 3) |
| **Bundler** | Vite |
| **CMS** | Storyblok |
| **3D Library** | Three.js |
| **Total JS Chunks** | ~60+ code-split modules |
| **Total Components** | ~55 distinct Vue components |
| **Animation Types** | ~18 distinct animation patterns |
| **Web3 Features** | MetaMask, WalletConnect, OpenSea, NFT Minting |
| **Fonts** | ABCWhytePlus, IBMPlexMono, Noto Sans SC |
| **Breakpoints** | Mobile (375px design) / Desktop (1600px design) |
| **Audio** | Ambient audio with animated toggle |
