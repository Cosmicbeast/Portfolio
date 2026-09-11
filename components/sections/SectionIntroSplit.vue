<script setup lang="ts">
// SectionIntroSplit: Chapter 02 3-Column Asymmetric Narrative Split
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import FolderTabCard from '~/components/cards/FolderTabCard.vue'
import AssetSlot from '~/components/ui/AssetSlot.vue'
import { useStoryState } from '~/composables/useStoryState'
import { useParallax } from '~/composables/useParallax'
import storyData from '~/data/story.json'

const sectionRef = ref<HTMLElement | null>(null)
const storyColRef = ref<HTMLElement | null>(null)
const guardianColRef = ref<HTMLElement | null>(null)
const videoPillRef = ref<HTMLElement | null>(null)
const { setChapter, setTheme } = useStoryState()
const { initSectionParallax } = useParallax()
let ctx: gsap.Context | null = null

onMounted(() => {
  if (!import.meta.client || !sectionRef.value) return

  ctx = gsap.context(() => {
    // Chapter marker trigger
    ScrollTrigger.create({
      trigger: sectionRef.value,
      start: 'top center',
      end: 'bottom center',
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

    // PRIMARY: Staggered reveal of narrative column
    gsap.fromTo(
      '.intro-col--story > *',
      { opacity: 0, y: 36 },
      {
        scrollTrigger: {
          trigger: sectionRef.value,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        },
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out'
      }
    )

    // Layered Parallax System driven by parallax-config.json
    initSectionParallax('chapter-intro', sectionRef.value)
  }, sectionRef.value)
})

onUnmounted(() => {
  ctx?.revert()
})
</script>

<template>
  <section
    id="chapter-intro"
    ref="sectionRef"
    class="stage-intro"
    aria-label="Chapter 02: Narrative Split"
  >
    <div class="intro-grid">
      <!-- Left Column: Story Lore & Video Pill -->
      <div ref="storyColRef" class="intro-col intro-col--story">
        <span class="label-mono intro-index">{{ storyData.chapters.project.index }}</span>
        <h2 class="display-h1 intro-headline">
          {{ storyData.chapters.project.headline }}
        </h2>
        
        <!-- Surveillance Media Pill -->
        <div ref="videoPillRef" class="intro-media-pill">
          <div class="pill-scanlines" />
          <div class="pill-runner-figure" />
          <span class="pill-label telemetry-mono">{{ storyData.chapters.project.videoLabel }}</span>
        </div>

        <p class="intro-copy">
          {{ storyData.chapters.project.description }}
        </p>
      </div>

      <!-- Center Column: Secondary Card View -->
      <div class="intro-col intro-col--center">
        <FolderTabCard
          badge="• DECIMAL CARD"
          image="/images/hero-protagonist.jpg"
          alt="Decimal Protagonist Card"
          :interactive="true"
        />
      </div>

      <!-- Right Column: Tall Spire Guardian Perspective -->
      <div ref="guardianColRef" class="intro-col intro-col--guardian">
        <div class="spire-warrior-card">
          <div class="spire-warrior-inner">
            <AssetSlot
              asset-id="asset_card_spire_warrior"
              filename="card-spire-warrior.jpg"
              aspect-ratio="9 / 16"
              alt="Cathedral Spire Guardian Warrior"
              loading="lazy"
            >
              <svg viewBox="0 0 300 500" fill="none" class="spire-warrior-svg" aria-label="Cathedral Spire Guardian">
                <defs>
                  <linearGradient id="spireBeamGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#C0FB50" stop-opacity="0.95" />
                    <stop offset="50%" stop-color="#8CA6FF" stop-opacity="0.65" />
                    <stop offset="100%" stop-color="#5E4B8B" stop-opacity="0.2" />
                  </linearGradient>
                  <radialGradient id="guardianAura" cx="50%" cy="40%" r="50%">
                    <stop offset="0%" stop-color="#8CA6FF" stop-opacity="0.4" />
                    <stop offset="100%" stop-color="#241D35" stop-opacity="0" />
                  </radialGradient>
                </defs>
                <!-- Cathedral Energy Spire in background -->
                <rect x="90" y="20" width="120" height="480" fill="url(#spireBeamGrad)" opacity="0.4" />
                <line x1="150" y1="0" x2="150" y2="500" stroke="#C0FB50" stroke-width="2" />
                <circle cx="150" cy="180" r="80" fill="url(#guardianAura)" />
                <!-- Armored warrior silhouette holding energy broadsword -->
                <path d="M120 220 L180 220 L200 320 L100 320 Z" fill="#181524" />
                <circle cx="150" cy="180" r="28" fill="#241D35" />
                <!-- Glowing Energy Broadsword -->
                <rect x="195" y="140" width="12" height="240" rx="3" fill="#8CA6FF" />
                <line x1="201" y1="130" x2="201" y2="390" stroke="#FFFFFF" stroke-width="2" />
              </svg>
            </AssetSlot>
          </div>
          <span class="label-mono spire-card-caption">{{ storyData.chapters.project.guardianLabel }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stage-intro {
  position: relative;
  min-height: 100vh;
  background-color: var(--color-bg-white);
  padding: 14rem clamp(2rem, 5vw, 6rem);
  display: flex;
  align-items: center;
  transition: background-color var(--transition-theme);
}

.intro-grid {
  width: 100%;
  max-width: var(--content-max-width);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 6rem;
  align-items: center;
}

@media (min-width: 992px) {
  .intro-grid {
    grid-template-columns: 1.2fr 1fr 1fr;
    gap: 5rem;
  }
}

.intro-col--story {
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
}

.intro-index {
  color: var(--theme-text);
  font-size: 1.1rem;
}

.intro-headline {
  margin: 0;
  max-width: 54.0rem;
  line-height: 0.94;
}

.intro-media-pill {
  position: relative;
  width: 16.0rem;
  height: 9.6rem;
  background-color: #2D263B;
  border-radius: var(--menu-radius);
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  display: flex;
  align-items: flex-end;
  padding: 0.8rem 1.2rem;
}

.pill-scanlines {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    rgba(255, 255, 255, 0.06) 0px,
    rgba(255, 255, 255, 0.06) 1px,
    transparent 1px,
    transparent 4px
  );
}

.pill-runner-figure {
  position: absolute;
  bottom: 1.6rem;
  left: 50%;
  transform: translateX(-50%);
  width: 2rem;
  height: 3.5rem;
  background-color: #EAE6F8;
  clip-path: polygon(40% 0, 60% 0, 80% 40%, 60% 100%, 30% 100%, 20% 50%);
  filter: drop-shadow(0 0 6px rgba(192, 251, 80, 0.7));
  animation: runner-bob 1.4s ease-in-out infinite alternate;
}

@keyframes runner-bob {
  0% { transform: translateX(-50%) translateY(0); }
  100% { transform: translateX(-50%) translateY(-4px); }
}

.pill-label {
  position: relative;
  z-index: 2;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.8rem;
}

.intro-copy {
  max-width: 34rem;
  color: var(--theme-text-muted);
  line-height: 1.6;
}

.intro-col--center {
  display: flex;
  justify-content: center;
}

.intro-col--guardian {
  display: flex;
  justify-content: center;
}

.spire-warrior-card {
  position: relative;
  width: 100%;
  max-width: 34.0rem;
  height: clamp(44.0rem, 50vw, 64.0rem);
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

@media (min-width: 992px) {
  .spire-warrior-card {
    height: 64.0rem;
  }
}

.spire-warrior-inner {
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 50% 30%, #DED7F2 0%, #BDB2DC 100%);
  border-radius: var(--menu-radius);
  overflow: hidden;
  box-shadow: 0 16px 40px rgba(94, 75, 139, 0.16);
  transform: perspective(1000px) rotateY(-4deg) rotateX(2deg);
  transition: transform var(--transition-normal);
}

.spire-warrior-inner:hover {
  transform: perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1.02);
}

.spire-warrior-svg {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.spire-card-caption {
  font-size: 1.1rem;
}
</style>
