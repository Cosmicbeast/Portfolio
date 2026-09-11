<script setup lang="ts">
// SectionHero component - cinematic full-viewport hero section with ScrambleText and CTAs
import ScrambleText from '~/components/animation/ScrambleText.vue'
import BtnMain from '~/components/ui/BtnMain.vue'
import { useLenis } from '~/composables/useLenis'

const { scrollTo } = useLenis()
</script>

<template>
  <section id="hero" class="section-hero flex flex-col justify-center items-center">
    <div class="site-container hero-container flex flex-col items-center text-center">
      <!-- Status Badge -->
      <div class="hero-badge label-mono">
        <span class="hero-badge__dot" />
        <ScrambleText text="CORE SYSTEM // ONLINE: READY FOR DEPLOYMENT" :delay="300" />
      </div>

      <!-- Main Headline -->
      <h1 class="hero-title">
        <ScrambleText text="COSMICBEAST" :delay="600" />
      </h1>

      <!-- Subheadline -->
      <p class="hero-subtitle font-mono">
        CREATIVE DEVELOPER & ARCHITECT // BUILDING IMMERSIVE 3D WEB EXPERIENCES
      </p>

      <!-- Description paragraph -->
      <p class="hero-description">
        Crafting next-generation digital interfaces, high-performance WebGL 3D systems,
        and cinematic reactive architectures inspired by futuristic cyberpunk computing.
      </p>

      <!-- CTA Buttons -->
      <div class="hero-actions flex items-center justify-center">
        <BtnMain
          theme="accent"
          size="lg"
          @click="scrollTo('#projects')"
        >
          EXPLORE PROJECTS ↓
        </BtnMain>
        <BtnMain
          theme="outline"
          size="lg"
          @click="scrollTo('#contact')"
        >
          INITIATE CONTACT →
        </BtnMain>
      </div>

      <!-- Scroll down indicator -->
      <div class="hero-scroll-cue flex flex-col items-center">
        <span class="label-mono">DISCOVER DATASTREAM</span>
        <div class="hero-scroll-line" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-hero {
  position: relative;
  min-height: 100vh;
  padding-top: calc(var(--nav-height) + 6rem);
  padding-bottom: 6rem;
  overflow: hidden;
}

.hero-container {
  position: relative;
  z-index: 2;
  max-width: 100rem;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  padding: 0.6rem 1.6rem;
  background: rgba(192, 251, 80, 0.08);
  border: 1px solid rgba(192, 251, 80, 0.3);
  border-radius: 20px;
  color: var(--cl-accent);
  margin-bottom: 3rem;
  backdrop-filter: blur(8px);
}

.hero-badge__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--cl-accent);
  box-shadow: 0 0 8px var(--cl-accent);
}

.hero-title {
  margin-bottom: 1.6rem;
  letter-spacing: -0.04em;
  text-shadow: 0 0 30px rgba(255, 255, 255, 0.2);
}

.hero-subtitle {
  font-size: clamp(1.4rem, 2vw, 2.2rem);
  color: var(--cl-accent);
  letter-spacing: 0.15em;
  margin-bottom: 2.4rem;
}

.hero-description {
  max-width: 64rem;
  margin-bottom: 4rem;
  font-size: clamp(1.6rem, 1.8vw, 1.9rem);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 6rem;
}

.hero-scroll-cue {
  gap: 1rem;
  opacity: 0.7;
  transition: opacity var(--transition-fast);
}

.hero-scroll-cue:hover {
  opacity: 1;
}

.hero-scroll-line {
  width: 1px;
  height: 4rem;
  background: linear-gradient(to bottom, var(--cl-accent), transparent);
  animation: scroll-pulse 2s infinite;
}

@keyframes scroll-pulse {
  0% { transform: scaleY(0); transform-origin: top; }
  50% { transform: scaleY(1); transform-origin: top; }
  50.1% { transform: scaleY(1); transform-origin: bottom; }
  100% { transform: scaleY(0); transform-origin: bottom; }
}
</style>
