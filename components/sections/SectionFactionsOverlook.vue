<script setup lang="ts">
// SectionFactionsOverlook: Chapter 06B Balcony Overlook with interactive Click & Hold reticle
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useStoryState } from '~/composables/useStoryState'
import { useParallax } from '~/composables/useParallax'
import storyData from '~/data/story.json'

const sectionRef = ref<HTMLElement | null>(null)
const holdProgress = ref(0)
const isHolding = ref(false)
const holdUnlocked = ref(false)
let holdTimer: ReturnType<typeof setInterval> | null = null
const { setChapter, setTheme } = useStoryState()
const { initSectionParallax } = useParallax()
let ctx: gsap.Context | null = null

const startHold = () => {
  if (holdUnlocked.value) return
  isHolding.value = true
  holdProgress.value = 0
  const interval = 25 // 25ms ticks
  const total = 1200 // 1.2s hold duration
  holdTimer = setInterval(() => {
    holdProgress.value += (interval / total) * 100
    if (holdProgress.value >= 100) {
      clearInterval(holdTimer!)
      holdProgress.value = 100
      isHolding.value = false
      holdUnlocked.value = true
    }
  }, interval)
}

const cancelHold = () => {
  if (holdUnlocked.value) return
  isHolding.value = false
  if (holdTimer) clearInterval(holdTimer)
  holdProgress.value = 0
}

onMounted(() => {
  if (!import.meta.client || !sectionRef.value) return

  ctx = gsap.context(() => {
    ScrollTrigger.create({
      trigger: sectionRef.value,
      start: 'top 50%',
      end: 'bottom 50%',
      onEnter: () => {
        setChapter('factions')
        setTheme('dark')
      },
      onEnterBack: () => {
        setChapter('factions')
        setTheme('dark')
      },
      onLeave: () => {
        setTheme('light')
      },
      onLeaveBack: () => {
        setTheme('light')
      }
    })

    // Cinematic scroll-triggered depth parallax driven by central config
    initSectionParallax('chapter-factions-overlook', sectionRef.value)
  }, sectionRef.value)
})

onUnmounted(() => {
  if (holdTimer) clearInterval(holdTimer)
  ctx?.revert()
})
</script>

<template>
  <section
    id="chapter-factions-overlook"
    ref="sectionRef"
    class="stage-overlook"
    aria-label="Chapter 06B: Factions Balcony Overlook"
  >
    <div class="overlook-inner">
      <!-- Header Info -->
      <div class="overlook-header text-center">
        <span class="label-mono text-white">{{ storyData.chapters.factions.overlookIndex }}</span>
        <h2 class="display-h2 overlook-title text-white">
          {{ storyData.chapters.factions.overlookTagline }}
        </h2>
      </div>

      <!-- Center Balcony Artwork Showcase with Depth Layers -->
      <div class="overlook-stage-canvas">
        <!-- Midground Character -->
        <div class="overlook-character-bg">
          <svg viewBox="0 0 240 360" fill="none" class="char-bg-svg" aria-label="Silver Warrior">
            <circle cx="120" cy="110" r="40" fill="#E8E2F2" />
            <path d="M80 180 L160 180 L180 360 L60 360 Z" fill="#241E34" />
            <!-- Giant staff -->
            <line x1="170" y1="40" x2="170" y2="360" stroke="#8CA6FF" stroke-width="3" />
            <circle cx="170" cy="40" r="8" fill="#C0FB50" />
          </svg>
        </div>

        <!-- Foreground Character -->
        <div class="overlook-character-fg">
          <svg viewBox="0 0 280 400" fill="none" class="char-fg-svg" aria-label="Faction Leader">
            <defs>
              <linearGradient id="pinkLeaderHair" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#FF7597" />
                <stop offset="100%" stop-color="#B23B68" />
              </linearGradient>
            </defs>
            <circle cx="140" cy="120" r="45" fill="#F8E5D8" />
            <!-- Spiky Pink Hair -->
            <path d="M100 110 C90 60, 180 40, 190 100 C170 110, 110 120, 100 110 Z" fill="url(#pinkLeaderHair)" />
            <path d="M90 190 L190 190 L210 400 L70 400 Z" fill="#181522" />
            <!-- Glowing Collar -->
            <rect x="120" y="175" width="40" height="8" rx="4" fill="#C0FB50" />
          </svg>
        </div>

        <!-- Interactive Click & Hold Reticle Center -->
        <div class="reticle-anchor">
          <button
            type="button"
            class="click-hold-reticle"
            :class="{ 'is-holding': isHolding, 'is-unlocked': holdUnlocked }"
            aria-label="Click and hold to unlock faction dossier"
            @mousedown="startHold"
            @mouseup="cancelHold"
            @mouseleave="cancelHold"
            @touchstart.passive="startHold"
            @touchend="cancelHold"
            @keydown.space.prevent="startHold"
            @keyup.space="cancelHold"
            @keydown.enter.prevent="startHold"
            @keyup.enter="cancelHold"
          >
            <!-- Circular Progress SVG Ring -->
            <svg viewBox="0 0 100 100" class="reticle-svg" aria-hidden="true">
              <circle
                cx="50"
                cy="50"
                r="44"
                stroke="rgba(255, 255, 255, 0.25)"
                stroke-width="1.5"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="44"
                stroke="#C0FB50"
                stroke-width="2.5"
                fill="none"
                stroke-dasharray="276.46"
                :stroke-dashoffset="276.46 - (276.46 * holdProgress) / 100"
                transform="rotate(-90 50 50)"
              />
              <circle cx="50" cy="50" r="3" fill="#FFFFFF" />
            </svg>

            <!-- Monospace Prompt -->
            <span class="reticle-prompt label-mono">
              {{ holdUnlocked ? 'DOSSIER UNLOCKED' : (isHolding ? 'HOLDING...' : storyData.chapters.factions.prompt) }}
            </span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stage-overlook {
  position: relative;
  min-height: 120vh;
  background: linear-gradient(180deg, #EAA899 0%, #C87B75 50%, #683642 100%);
  color: #FFFFFF;
  padding: 14rem clamp(2rem, 5vw, 6rem) 10rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  user-select: none;
  transition: background-color var(--transition-theme);
}

.overlook-inner {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: var(--content-max-width);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6.4rem;
}

.overlook-header {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  max-width: 64.0rem;
}

.overlook-title {
  line-height: 1.1;
  margin: 0;
}

.overlook-stage-canvas {
  position: relative;
  width: 100%;
  max-width: 80.0rem;
  height: 54.0rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.overlook-character-bg {
  position: absolute;
  left: 12%;
  bottom: 0;
  width: 24.0rem;
  height: 36.0rem;
  z-index: 1;
}

.overlook-character-fg {
  position: absolute;
  right: 12%;
  bottom: 0;
  width: 28.0rem;
  height: 40.0rem;
  z-index: 2;
}

.char-bg-svg,
.char-fg-svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 12px 32px rgba(0, 0, 0, 0.25));
}

/* Click and Hold Reticle */
.reticle-anchor {
  position: relative;
  z-index: 5;
}

.click-hold-reticle {
  position: relative;
  width: 12.0rem;
  height: 12.0rem;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  color: #FFFFFF;
  cursor: pointer;
  backdrop-filter: blur(12px);
  transition: transform var(--transition-fast), border-color var(--transition-fast);
}

.click-hold-reticle:hover {
  transform: scale(1.05);
  border-color: rgba(255, 255, 255, 0.5);
}

.click-hold-reticle.is-holding {
  transform: scale(0.96);
  border-color: var(--color-accent-green);
}

.click-hold-reticle.is-unlocked {
  background: rgba(192, 251, 80, 0.2);
  border-color: var(--color-accent-green);
}

.reticle-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.reticle-prompt {
  font-size: 0.95rem;
  letter-spacing: 0.14em;
  color: #FFFFFF;
  text-align: center;
  padding: 0 0.8rem;
}

@media (max-width: 768px) {
  .stage-overlook {
    min-height: 100vh;
    padding-top: 10rem;
    padding-bottom: 6rem;
  }
  .overlook-inner {
    gap: 4.0rem;
  }
  .overlook-stage-canvas {
    height: 38.0rem;
  }
  .overlook-character-bg {
    width: 15.0rem;
    height: 22.0rem;
    left: 0;
    opacity: 0.65;
  }
  .overlook-character-fg {
    width: 17.0rem;
    height: 24.0rem;
    right: 0;
  }
  .click-hold-reticle {
    width: 10.0rem;
    height: 10.0rem;
  }
  .reticle-prompt {
    font-size: 0.85rem;
  }
}
</style>
