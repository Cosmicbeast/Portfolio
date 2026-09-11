<script setup lang="ts">
// SectionFactionsCitadel: Chapter 06A Expanding Folder-Tab Citadel Mask
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AssetSlot from '~/components/ui/AssetSlot.vue'
import { useStoryState } from '~/composables/useStoryState'
import storyData from '~/data/story.json'

const sectionRef = ref<HTMLElement | null>(null)
const maskRef = ref<HTMLElement | null>(null)
const { setChapter, setTheme } = useStoryState()
let ctx: gsap.Context | null = null

onMounted(() => {
  if (!import.meta.client || !sectionRef.value) return

  ctx = gsap.context(() => {
    ScrollTrigger.create({
      trigger: sectionRef.value,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => {
        setChapter('factions')
        setTheme('light')
      },
      onEnterBack: () => {
        setChapter('factions')
        setTheme('light')
      }
    })

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    // PRIMARY: Folder-tab window mask scale expansion on scroll scrub
    if (maskRef.value) {
      gsap.fromTo(
        maskRef.value,
        { scale: 0.84, borderRadius: '4rem' },
        {
          scrollTrigger: {
            trigger: sectionRef.value,
            start: 'top 70%',
            end: 'center center',
            scrub: 0.8
          },
          scale: 1.0,
          borderRadius: '2rem',
          ease: 'power2.out'
        }
      )
    }
  }, sectionRef.value)
})

onUnmounted(() => {
  ctx?.revert()
})
</script>

<template>
  <section
    id="chapter-factions"
    ref="sectionRef"
    class="stage-citadel"
    aria-label="Chapter 06A: The Citadel Metropolis"
  >
    <div class="citadel-container">
      <div class="citadel-header">
        <span class="label-mono">{{ storyData.chapters.factions.citadelBadge }}</span>
        <h2 class="display-h2">{{ storyData.chapters.factions.citadelTitle }}</h2>
      </div>

      <!-- Expanding Folder-Tab Masked Window -->
      <div ref="maskRef" class="citadel-mask-window">
        <AssetSlot
          asset-id="asset_citadel_ring_metropolis"
          filename="citadel-ring-metropolis.jpg"
          aspect-ratio="16 / 9"
          alt="Floating Ring Citadel Metropolis"
          loading="lazy"
        >
          <!-- Stylized Metropolis Illustration Canvas Slot -->
          <svg viewBox="0 0 1200 680" fill="none" class="citadel-svg" aria-label="Ring Citadel Metropolis">
            <defs>
              <linearGradient id="citadelSky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#E8E1F5" />
                <stop offset="60%" stop-color="#D5CCE8" />
                <stop offset="100%" stop-color="#9C8BB8" />
              </linearGradient>
              <radialGradient id="ringCore" cx="50%" cy="45%" r="40%">
                <stop offset="0%" stop-color="#C0FB50" stop-opacity="0.9" />
                <stop offset="40%" stop-color="#8CA6FF" stop-opacity="0.6" />
                <stop offset="100%" stop-color="#8CA6FF" stop-opacity="0" />
              </radialGradient>
            </defs>
            <rect x="0" y="0" width="1200" height="680" fill="url(#citadelSky)" />
            <!-- Giant Celestial Ring Citadel -->
            <circle cx="600" cy="300" r="240" stroke="#8CA6FF" stroke-width="8" stroke-dasharray="16 8" opacity="0.6" />
            <circle cx="600" cy="300" r="200" stroke="#FFFFFF" stroke-width="2" opacity="0.8" />
            <circle cx="600" cy="300" r="140" fill="url(#ringCore)" />
            <!-- Central Energy Conduit Beam -->
            <rect x="596" y="0" width="8" height="680" fill="#C0FB50" />
            <line x1="600" y1="0" x2="600" y2="680" stroke="#FFFFFF" stroke-width="2" />
            <!-- Floating Megastructure Spires -->
            <path d="M420 540 L440 280 L480 280 L500 540 Z" fill="#241D35" />
            <path d="M700 540 L720 240 L760 240 L780 540 Z" fill="#1C172B" />
            <path d="M200 680 L260 480 L320 480 L360 680 Z" fill="#2F2742" />
            <path d="M840 680 L880 440 L940 440 L980 680 Z" fill="#2A223B" />
          </svg>
        </AssetSlot>

        <div class="mask-caption">
          <span class="telemetry-mono">• SECTOR 07 // HIGH CITADEL CONDUIT</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stage-citadel {
  position: relative;
  min-height: 100vh;
  background-color: #E5DDF0;
  padding: 12rem clamp(2rem, 5vw, 6rem);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: background-color var(--transition-theme);
}

.citadel-container {
  width: 100%;
  max-width: var(--content-max-width);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

.citadel-header {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.citadel-mask-window {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  max-height: 68.0rem;
  overflow: hidden;
  box-shadow: 0 24px 64px rgba(94, 75, 139, 0.2);
  /* Asymmetric folder tab silhouette mask */
  clip-path: polygon(
    0 0,
    100% 0,
    100% calc(100% - 4.0rem),
    calc(100% - 4.0rem) 100%,
    4.0rem 100%,
    0 calc(100% - 4.0rem)
  );
}

.citadel-svg {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mask-caption {
  position: absolute;
  bottom: 2.4rem;
  left: 3.2rem;
  z-index: 2;
  color: #FFFFFF;
  background: rgba(0, 0, 0, 0.4);
  padding: 0.6rem 1.4rem;
  border-radius: 9999px;
  backdrop-filter: blur(8px);
}
</style>
