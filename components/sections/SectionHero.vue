<script setup lang="ts">
// SectionHero: Chapter 01 Hero Genesis stage matching refer.mp4 reference recording
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import FolderTabCard from '~/components/cards/FolderTabCard.vue'
import { useParallax } from '~/composables/useParallax'

const heroStageRef = ref<HTMLElement | null>(null)
const bgLayerRef = ref<HTMLElement | null>(null)
const centerpieceRef = ref<HTMLElement | null>(null)
const { initSectionParallax } = useParallax()
let ctx: gsap.Context | null = null

onMounted(() => {
  if (!import.meta.client) return

  ctx = gsap.context(() => {
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' }
    })

    // Layer 1: Global HUD Viewport Frame & Outer Border
    tl.fromTo(
      '.hud-outer-border',
      { opacity: 0, scale: 0.985 },
      { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' },
      0
    )

    // Layer 2: Header Divider Line and Progress Track
    tl.fromTo(
      '.hud-header',
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
      0.15
    )

    tl.fromTo(
      '.hud-progress-track',
      { scaleX: 0, transformOrigin: 'left center' },
      { scaleX: 1, duration: 0.8, ease: 'power3.inOut' },
      0.25
    )

    // Layer 3: Top Navigation Items & Hamburger Icon
    tl.fromTo(
      '.hud-burger-btn',
      { opacity: 0, x: -16 },
      { opacity: 1, x: 0, duration: 0.5 },
      0.3
    )

    tl.fromTo(
      '.tab-item',
      { opacity: 0, y: -12 },
      { opacity: 1, y: 0, stagger: 0.06, duration: 0.5 },
      0.35
    )

    tl.fromTo(
      '.btn-signin',
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)' },
      0.4
    )

    // Layer 4: Left HUD Rail (Crosshair Reticle & Audio Indicator)
    tl.fromTo(
      '.hud-left-rail__reticle',
      { opacity: 0, scale: 0.4, rotation: -90 },
      { opacity: 0.85, scale: 1, rotation: 0, duration: 0.8, ease: 'back.out(1.4)' },
      0.45
    )

    tl.fromTo(
      '.hud-left-rail__bottom',
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.6 },
      0.55
    )

    // Layer 5: Hero Atmosphere Background Layer
    if (bgLayerRef.value) {
      tl.fromTo(
        bgLayerRef.value,
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 1.4, ease: 'power2.out' },
        0.2
      )
    }

    // Layer 6: Centerpiece Badge and Protagonist Folder-Tab Card
    tl.fromTo(
      '.stage-hero .card-badge',
      { opacity: 0, y: -14 },
      { opacity: 0.85, y: 0, duration: 0.6 },
      0.6
    )

    tl.fromTo(
      '.stage-hero .card-shape-wrapper',
      { opacity: 0, y: 70, scale: 0.94 },
      { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: 'power3.out' },
      0.65
    )

    tl.fromTo(
      '.stage-hero .card-hero-image',
      { scale: 1.12 },
      { scale: 1.0, duration: 1.3, ease: 'power2.out' },
      0.65
    )

    // Layered Parallax System driven by parallax-config.json
    initSectionParallax('chapter-project', heroStageRef.value)
  }, heroStageRef.value ?? undefined)
})

onUnmounted(() => {
  ctx?.revert()
})
</script>

<template>
  <section
    id="chapter-project"
    ref="heroStageRef"
    class="stage-hero"
    aria-label="Chapter 01: Hero Genesis Stage"
  >
    <!-- Atmospheric Painted Lavender Sky & Distant Mountain Horizon -->
    <div
      ref="bgLayerRef"
      class="hero-bg-layer"
      aria-hidden="true"
    >
      <div class="hero-bg-gradient" />
      <img
        src="/images/bg-lavender-sky.jpg"
        alt=""
        class="hero-bg-image"
        loading="eager"
      />
      <!-- Subtle Atmospheric Mist Overlay -->
      <div class="hero-bg-mist" />
    </div>

    <!-- Centered Hero Centerpiece Stage -->
    <div ref="centerpieceRef" class="stage-hero__centerpiece">
      <FolderTabCard
        badge="• DECIMAL CARD"
        image="/images/hero-protagonist.jpg"
        alt="Anjishnu Protagonist with Cyan Visor and Holographic Wolf Spirit"
        :interactive="true"
      />
    </div>
  </section>
</template>

<style scoped>
.stage-hero {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 64.0rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: calc(var(--menu-height) + 2rem) 2rem 4rem;
  background-color: var(--color-bg-lavender);
  overflow: hidden;
  user-select: none;
}

/* Background Atmosphere System */
.hero-bg-layer {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
}

.hero-bg-gradient {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at 50% 40%,
    rgba(234, 230, 248, 0.4) 0%,
    rgba(221, 216, 245, 0.85) 70%,
    rgba(206, 199, 238, 0.95) 100%
  );
  z-index: 1;
}

.hero-bg-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center bottom;
  opacity: 0.55;
  filter: saturate(0.9) contrast(1.05);
}

.hero-bg-mist {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 28vh;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(234, 230, 248, 0.65) 60%,
    rgba(234, 230, 248, 0.95) 100%
  );
  z-index: 2;
}

/* Centerpiece Container */
.stage-hero__centerpiece {
  position: relative;
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .stage-hero {
    height: 100vh;
    padding-top: calc(var(--menu-height) + 1.6rem);
    padding-bottom: 3rem;
  }

  .hero-bottom-cue {
    display: none;
  }
}
</style>
