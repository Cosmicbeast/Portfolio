<script setup lang="ts">
// SectionCollectibles: Chapter 05 10,000 Digital Collectibles Horizontal Showcase
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useStoryState } from '~/composables/useStoryState'
import { useParallax } from '~/composables/useParallax'
import storyData from '~/data/story.json'

const sectionRef = ref<HTMLElement | null>(null)
const deckRef = ref<HTMLElement | null>(null)
const activeIndex = ref(0)
const { setChapter, setTheme } = useStoryState()
const { initSectionParallax } = useParallax()
let ctx: gsap.Context | null = null

const cards = storyData.chapters.collectibles.cards

const nextCard = () => {
  if (activeIndex.value < cards.length - 1) activeIndex.value++
}

const prevCard = () => {
  if (activeIndex.value > 0) activeIndex.value--
}

onMounted(() => {
  if (!import.meta.client || !sectionRef.value) return

  ctx = gsap.context(() => {
    ScrollTrigger.create({
      trigger: sectionRef.value,
      start: 'top 50%',
      end: 'bottom 50%',
      onEnter: () => {
        setChapter('project')
        setTheme('light')
      },
      onEnterBack: () => {
        setChapter('project')
        setTheme('light')
      }
    })

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    // Layered Parallax System driven by parallax-config.json
    initSectionParallax('chapter-collectibles', sectionRef.value)
  }, sectionRef.value)
})

onUnmounted(() => {
  ctx?.revert()
})
</script>

<template>
  <section
    id="chapter-collectibles"
    ref="sectionRef"
    class="stage-collectibles"
    aria-label="Chapter 05: Digital Collectibles"
  >
    <!-- Giant Brutalist 10K Watermark Layer -->
    <div class="collectibles-watermark-wrapper" aria-hidden="true">
      <span class="collectibles-watermark">{{ storyData.chapters.collectibles.watermark }}</span>
    </div>

    <div class="collectibles-inner">
      <!-- Section Header Info -->
      <div class="collectibles-header">
        <div class="flex justify-between items-center w-full">
          <span class="label-mono">{{ storyData.chapters.collectibles.index }}</span>
          <span class="label-mono">{{ storyData.chapters.collectibles.category }}</span>
        </div>

        <h2 class="display-h2 collectibles-headline">
          {{ storyData.chapters.collectibles.headline }}
        </h2>

        <p class="collectibles-desc">
          {{ storyData.chapters.collectibles.description }}
        </p>
      </div>

      <!-- Fanned Horizontal Collectible Cards Deck -->
      <div ref="deckRef" class="collectibles-deck">
        <div
          v-for="(card, i) in cards"
          :key="card.id"
          role="button"
          tabindex="0"
          :aria-selected="activeIndex === i"
          :aria-label="`Select collectible ${card.name} #${card.id}`"
          class="collectible-card-item"
          :class="{ 'is-selected': activeIndex === i }"
          @click="activeIndex = i"
          @keydown.enter="activeIndex = i"
          @keydown.space.prevent="activeIndex = i"
        >
          <div class="card-inner">
            <!-- Stylized Collectible Avatar Art Slot -->
            <div class="avatar-art-slot">
              <svg viewBox="0 0 200 240" fill="none" class="avatar-svg" aria-label="Collectible Avatar">
                <defs>
                  <linearGradient :id="`cardGrad-${i}`" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" :stop-color="i % 2 === 0 ? '#C0FB50' : '#8CA6FF'" stop-opacity="0.8" />
                    <stop offset="100%" :stop-color="i % 2 === 0 ? '#5E4B8B' : '#2D1F47'" />
                  </linearGradient>
                </defs>
                <rect x="0" y="0" width="200" height="240" :fill="`url(#cardGrad-${i})`" opacity="0.3" />
                <circle cx="100" cy="90" r="45" fill="#EAE6F8" />
                <rect x="70" y="80" width="60" height="12" rx="3" fill="#181524" />
                <circle cx="90" cy="86" r="3" fill="#C0FB50" />
                <path d="M60 180 C70 140, 130 140, 140 180 L160 240 L40 240 Z" fill="#181524" />
              </svg>
            </div>

            <!-- Card Bottom Metadata -->
            <div class="card-meta">
              <div class="flex justify-between items-center">
                <span class="label-mono card-name">{{ card.name }}</span>
                <span class="telemetry-mono card-id">#{{ card.id }}</span>
              </div>
              <span class="telemetry-mono card-role">{{ card.role }} // {{ card.attr }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Chevron Deck Navigation -->
      <div class="deck-nav-controls">
        <button
          type="button"
          class="chevron-btn"
          aria-label="Previous Collectible"
          :disabled="activeIndex === 0"
          @click="prevCard"
        >
          ◄
        </button>
        <span class="label-mono deck-counter">0{{ activeIndex + 1 }} / 0{{ cards.length }}</span>
        <button
          type="button"
          class="chevron-btn"
          aria-label="Next Collectible"
          :disabled="activeIndex === cards.length - 1"
          @click="nextCard"
        >
          ►
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stage-collectibles {
  position: relative;
  min-height: 120vh;
  background-color: #DDD8F5;
  padding: 14rem clamp(2rem, 5vw, 6rem) 10rem;
  overflow: hidden;
  user-select: none;
  transition: background-color var(--transition-theme);
}

.collectibles-watermark-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 0;
  width: 100%;
  text-align: center;
}

.collectibles-watermark {
  font-family: var(--font-display);
  font-size: clamp(14.0rem, 36vw, 48.0rem);
  font-weight: 700;
  line-height: 0.8;
  letter-spacing: -0.06em;
  color: rgba(0, 0, 0, 0.08);
  text-transform: uppercase;
}

.collectibles-inner {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: var(--content-max-width);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 6.4rem;
}

.collectibles-header {
  display: flex;
  flex-direction: column;
  gap: 2.0rem;
  max-width: 68.0rem;
}

.collectibles-headline {
  margin: 0;
  line-height: 0.96;
}

.collectibles-desc {
  max-width: 58.0rem;
  color: var(--theme-text-muted);
  line-height: 1.6;
}

/* Horizontal Fanned Cards Deck */
.collectibles-deck {
  display: flex;
  gap: 2.4rem;
  overflow-x: auto;
  padding: 2rem 0.4rem 4rem;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
}

.collectibles-deck::-webkit-scrollbar {
  display: none;
}

.collectible-card-item {
  flex: 0 0 clamp(24.0rem, 76vw, 32.0rem);
  height: clamp(34.0rem, 42vw, 44.0rem);
  background-color: var(--color-bg-white);
  border-radius: var(--menu-radius);
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 16px 40px rgba(94, 75, 139, 0.12);
  cursor: pointer;
  scroll-snap-align: center;
  transition: transform 0.3s var(--ease-cinematic), box-shadow 0.3s ease;
}

@media (min-width: 992px) {
  .collectible-card-item {
    flex: 0 0 clamp(24.0rem, 26vw, 32.0rem);
  }
}

.collectible-card-item:hover,
.collectible-card-item.is-selected {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 24px 56px rgba(94, 75, 139, 0.2);
}

.card-inner {
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: inherit;
  overflow: hidden;
}

.avatar-art-slot {
  flex: 1;
  background-color: #ECE7FA;
  overflow: hidden;
}

.avatar-svg {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-meta {
  padding: 1.6rem 2.0rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  background-color: #FFFFFF;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
}

.card-name {
  font-weight: 700;
  color: var(--theme-text);
  font-size: 1.2rem;
}

.card-id {
  color: var(--theme-text-muted);
}

.card-role {
  font-size: 0.85rem;
  color: var(--theme-text-muted);
}

/* Controls */
.deck-nav-controls {
  display: flex;
  align-items: center;
  gap: 2.0rem;
}

.chevron-btn {
  width: 4.4rem;
  height: 4.4rem;
  border-radius: 50%;
  border: 1px solid var(--theme-lines);
  background-color: var(--color-bg-white);
  color: var(--theme-text);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform var(--transition-fast), background-color var(--transition-fast);
}

.chevron-btn:hover:not(:disabled) {
  transform: scale(1.08);
  background-color: var(--theme-btn-bg);
  color: var(--theme-btn-text);
}

.chevron-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.deck-counter {
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .stage-collectibles {
    padding-top: 10rem;
    padding-bottom: 6rem;
  }
  .collectibles-watermark {
    font-size: clamp(8.0rem, 24vw, 18.0rem);
  }
  .deck-nav-controls {
    justify-content: center;
  }
}
</style>
