<script setup lang="ts">
// SectionWorldKeepers: Chapter 07 & 08 Brutalist Triptych Stage with giant KEEPERS wordmark
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AssetSlot from '~/components/ui/AssetSlot.vue'
import { useStoryState } from '~/composables/useStoryState'
import storyData from '~/data/story.json'

const sectionRef = ref<HTMLElement | null>(null)
const card1Ref = ref<HTMLElement | null>(null)
const card2Ref = ref<HTMLElement | null>(null)
const card3Ref = ref<HTMLElement | null>(null)
const { setChapter, setTheme } = useStoryState()
let ctx: gsap.Context | null = null

onMounted(() => {
  if (!import.meta.client || !sectionRef.value) return

  ctx = gsap.context(() => {
    ScrollTrigger.create({
      trigger: sectionRef.value,
      start: 'top 50%',
      end: 'bottom 50%',
      onEnter: () => {
        setChapter('world')
        setTheme('light')
      },
      onEnterBack: () => {
        setChapter('world')
        setTheme('light')
      }
    })

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    // Differential Parallax on Triptych Cards
    if (card1Ref.value) {
      gsap.fromTo(
        card1Ref.value,
        { y: 80, rotateZ: -2 },
        {
          scrollTrigger: {
            trigger: sectionRef.value,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8
          },
          y: -40,
          rotateZ: 0,
          ease: 'none'
        }
      )
    }

    if (card2Ref.value) {
      gsap.fromTo(
        card2Ref.value,
        { y: 40, rotateZ: 3 },
        {
          scrollTrigger: {
            trigger: sectionRef.value,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2
          },
          y: -70,
          rotateZ: 0,
          ease: 'none'
        }
      )
    }

    if (card3Ref.value) {
      gsap.fromTo(
        card3Ref.value,
        { y: 110, rotateZ: -1 },
        {
          scrollTrigger: {
            trigger: sectionRef.value,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.0
          },
          y: -20,
          rotateZ: 0,
          ease: 'none'
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
    id="chapter-world"
    ref="sectionRef"
    class="stage-keepers"
    aria-label="Chapter 07: World Keepers"
  >
    <!-- Giant Edge-to-Edge Brutalist KEEPERS Watermark -->
    <div class="keepers-wordmark-wrapper" aria-hidden="true">
      <span class="keepers-wordmark">{{ storyData.chapters.world.wordmark }}</span>
    </div>

    <div class="keepers-inner">
      <!-- Top Prompt and Call to Action -->
      <div class="keepers-header flex justify-between items-start">
        <p class="keepers-prompt font-mono">
          {{ storyData.chapters.world.prompt }}
        </p>

        <a href="#chapter-intro" class="label-mono keepers-action-link">
          {{ storyData.chapters.world.actionLink }}
        </a>
      </div>

      <!-- Floating Triptych Perspective Cards -->
      <div class="keepers-triptych-grid">
        <!-- Card 1: The World -->
        <div ref="card1Ref" class="triptych-card card--world">
          <div class="card-aspect-box">
            <AssetSlot
              asset-id="asset_card_world_spire"
              filename="card-world-spire.jpg"
              aspect-ratio="4 / 5"
              alt="Aerial Spire World"
              loading="lazy"
            >
              <svg viewBox="0 0 320 400" fill="none" class="triptych-svg" aria-label="Aerial Spire World">
                <rect width="320" height="400" fill="#E8E2F5" />
                <circle cx="160" cy="200" r="100" stroke="#8CA6FF" stroke-width="2" stroke-dasharray="6 4" />
                <circle cx="160" cy="200" r="50" fill="#2E2442" />
                <circle cx="160" cy="200" r="8" fill="#C0FB50" />
              </svg>
            </AssetSlot>
          </div>
          <div class="card-caption flex justify-between items-center">
            <span class="label-mono">{{ storyData.chapters.world.cards[0].label }}</span>
            <span class="telemetry-mono">{{ storyData.chapters.world.cards[0].sub }}</span>
          </div>
        </div>

        <!-- Card 2: The Keep Spire -->
        <div ref="card2Ref" class="triptych-card card--keep">
          <div class="card-aspect-box">
            <AssetSlot
              asset-id="asset_card_keep_monolith"
              filename="card-keep-monolith.jpg"
              aspect-ratio="9 / 16"
              alt="Spire Energy Beam"
              loading="lazy"
            >
              <svg viewBox="0 0 260 440" fill="none" class="triptych-svg" aria-label="Spire Energy Beam">
                <rect width="260" height="440" fill="#1C182B" />
                <line x1="130" y1="0" x2="130" y2="440" stroke="#C0FB50" stroke-width="3" />
                <circle cx="130" cy="180" r="60" fill="#8CA6FF" opacity="0.3" />
              </svg>
            </AssetSlot>
          </div>
          <div class="card-caption flex justify-between items-center">
            <span class="label-mono">{{ storyData.chapters.world.cards[1].label }}</span>
            <span class="telemetry-mono">{{ storyData.chapters.world.cards[1].sub }}</span>
          </div>
        </div>

        <!-- Card 3: Faction Ocular -->
        <div ref="card3Ref" class="triptych-card card--faction">
          <div class="card-aspect-box">
            <AssetSlot
              asset-id="asset_card_faction_visor"
              filename="card-faction-visor.jpg"
              aspect-ratio="16 / 10"
              alt="Cyber Eyes Visor"
              loading="lazy"
            >
              <svg viewBox="0 0 360 220" fill="none" class="triptych-svg" aria-label="Cyber Eyes Visor">
                <rect width="360" height="220" fill="#241E34" />
                <!-- Anime Eye Letterbox Crop -->
                <ellipse cx="140" cy="110" rx="35" ry="18" fill="#FFFFFF" />
                <circle cx="140" cy="110" r="14" fill="#8CA6FF" />
                <circle cx="140" cy="110" r="6" fill="#C0FB50" />

                <ellipse cx="220" cy="110" rx="35" ry="18" fill="#FFFFFF" />
                <circle cx="220" cy="110" r="14" fill="#8CA6FF" />
                <circle cx="220" cy="110" r="6" fill="#C0FB50" />
              </svg>
            </AssetSlot>
          </div>
          <div class="card-caption flex justify-between items-center">
            <span class="label-mono">{{ storyData.chapters.world.cards[2].label }}</span>
            <span class="telemetry-mono">{{ storyData.chapters.world.cards[2].sub }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stage-keepers {
  position: relative;
  min-height: 140vh;
  background-color: var(--color-bg-white);
  padding: 14rem clamp(2rem, 5vw, 6rem) 12rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  user-select: none;
  transition: background-color var(--transition-theme);
}

.keepers-wordmark-wrapper {
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  text-align: center;
  pointer-events: none;
  z-index: 0;
}

.keepers-wordmark {
  font-family: var(--font-display);
  font-size: clamp(10.0rem, 21vw, 32.0rem);
  font-weight: 700;
  line-height: 0.8;
  letter-spacing: -0.06em;
  color: rgba(0, 0, 0, 0.06);
  text-transform: uppercase;
  white-space: nowrap;
}

.keepers-inner {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: var(--content-max-width);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 8rem;
}

.keepers-header {
  width: 100%;
  gap: 4rem;
}

.keepers-prompt {
  max-width: 44.0rem;
  font-size: 1.4rem;
  color: var(--theme-text-muted);
  line-height: 1.6;
}

.keepers-action-link {
  color: var(--theme-text);
  font-weight: 700;
  border-bottom: 1.5px solid var(--theme-text);
  padding-bottom: 0.4rem;
  transition: opacity var(--transition-fast);
}

.keepers-action-link:hover {
  opacity: 0.6;
}

/* Floating Triptych Cards */
.keepers-triptych-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 4.8rem;
  align-items: center;
}

@media (min-width: 992px) {
  .keepers-triptych-grid {
    grid-template-columns: 1.1fr 0.9fr 1.2fr;
    gap: 4.0rem;
  }
}

.triptych-card {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  background-color: var(--color-bg-white);
  border-radius: var(--menu-radius);
  overflow: hidden;
  box-shadow: 0 16px 40px rgba(94, 75, 139, 0.14);
  border: 1px solid rgba(0, 0, 0, 0.08);
  transition: transform var(--transition-normal);
}

.triptych-card:hover {
  transform: translateY(-8px) scale(1.02);
}

.card-aspect-box {
  width: 100%;
  height: clamp(26.0rem, 30vw, 38.0rem);
  overflow: hidden;
}

.triptych-svg {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-caption {
  padding: 1.2rem 1.8rem;
  background-color: #FFFFFF;
}

@media (max-width: 768px) {
  .stage-keepers {
    min-height: 100vh;
    padding-top: 10rem;
    padding-bottom: 6rem;
  }
  .keepers-inner {
    gap: 4.8rem;
  }
  .keepers-header {
    flex-direction: column;
    gap: 2.0rem;
  }
  .keepers-wordmark {
    font-size: clamp(6.0rem, 20vw, 16.0rem);
  }
}
</style>
