<script setup lang="ts">
// SectionKeepTelemetry: Chapter 03 & 04 Panoramic Telemetry & Philosophical Choice
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useStoryState } from '~/composables/useStoryState'
import storyData from '~/data/story.json'

const sectionRef = ref<HTMLElement | null>(null)
const headlineRef = ref<HTMLElement | null>(null)
const subheadlineRef = ref<HTMLElement | null>(null)
const droneRef = ref<HTMLElement | null>(null)
const { setChapter, setTheme } = useStoryState()
let ctx: gsap.Context | null = null

onMounted(() => {
  if (!import.meta.client || !sectionRef.value) return

  ctx = gsap.context(() => {
    // Theme and chapter switcher trigger
    ScrollTrigger.create({
      trigger: sectionRef.value,
      start: 'top 40%',
      end: 'bottom 40%',
      onEnter: () => {
        setChapter('keep')
        setTheme('dark')
      },
      onEnterBack: () => {
        setChapter('keep')
        setTheme('dark')
      },
      onLeave: () => {
        setTheme('light')
      },
      onLeaveBack: () => {
        setChapter('project')
        setTheme('light')
      }
    })

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    // PRIMARY: Scroll scrubbed reveal of monumental philosophical headline
    if (headlineRef.value) {
      gsap.fromTo(
        headlineRef.value,
        { opacity: 0.2, y: 50 },
        {
          scrollTrigger: {
            trigger: sectionRef.value,
            start: 'top 60%',
            end: 'center center',
            scrub: 0.8
          },
          opacity: 1,
          y: 0,
          ease: 'power2.out'
        }
      )
    }

    if (subheadlineRef.value) {
      gsap.fromTo(
        subheadlineRef.value,
        { opacity: 0, y: 30 },
        {
          scrollTrigger: {
            trigger: sectionRef.value,
            start: 'center 60%',
            end: 'center 30%',
            scrub: 0.8
          },
          opacity: 0.85,
          y: 0,
          ease: 'power2.out'
        }
      )
    }

    // SECONDARY: High-altitude drone aircraft flight trajectory
    if (droneRef.value) {
      gsap.to(droneRef.value, {
        scrollTrigger: {
          trigger: sectionRef.value,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2
        },
        x: '35vw',
        y: '-30px',
        ease: 'none'
      })
    }

    // TERTIARY: Contour wireframe pulse / sweep
    gsap.to('.contour-path-1', {
      strokeDashoffset: 0,
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 50%',
        scrub: 0.5
      }
    })
  }, sectionRef.value)
})

onUnmounted(() => {
  ctx?.revert()
})
</script>

<template>
  <section
    id="chapter-keep"
    ref="sectionRef"
    class="stage-telemetry"
    aria-label="Chapter 03: The Keep Telemetry"
  >
    <!-- Panoramic Mountain Sunset Painted Vista Background -->
    <div class="telemetry-bg-art" aria-hidden="true">
      <div class="sunset-haze-grad" />
      <!-- Animated High-Altitude Drone Aircraft Vector -->
      <div ref="droneRef" class="drone-aircraft">
        <svg viewBox="0 0 120 40" fill="none" class="drone-svg">
          <path d="M10 20 L50 20 L60 10 L70 20 L110 20" stroke="#C0FB50" stroke-width="1.5" />
          <circle cx="60" cy="10" r="3" fill="#C0FB50" />
          <line x1="0" y1="20" x2="120" y2="20" stroke="rgba(192, 251, 80, 0.2)" stroke-dasharray="4 4" />
        </svg>
      </div>
    </div>

    <div class="telemetry-inner">
      <!-- Top Readout: Chapter Index and Coordinates -->
      <div class="telemetry-top flex justify-between">
        <span class="label-mono telemetry-white">{{ storyData.chapters.keep.index }}</span>
        <div class="telemetry-coords telemetry-mono">
          <span>{{ storyData.chapters.keep.coordinates }}</span>
          <span class="telemetry-alt">{{ storyData.chapters.keep.altitude }}</span>
        </div>
      </div>

      <!-- Center Monumental Philosophical Statement -->
      <div class="telemetry-center">
        <h2 ref="headlineRef" class="display-h1 telemetry-headline">
          {{ storyData.chapters.keep.headline }}
        </h2>
        <p ref="subheadlineRef" class="telemetry-subheadline">
          {{ storyData.chapters.keep.subHeadline }}
        </p>
      </div>

      <!-- Bottom Status Bar and 3D Contour Wireframe Graph -->
      <div class="telemetry-bottom flex justify-between items-center">
        <div class="flex items-center gap-3">
          <span class="telemetry-symbol-dot">•</span>
          <span class="telemetry-mono telemetry-white">{{ storyData.chapters.keep.reticleLabel }}</span>
        </div>

        <!-- 3D Contour Wireframe Graph SVG -->
        <div class="contour-mesh" aria-hidden="true">
          <svg viewBox="0 0 240 80" fill="none" class="contour-svg">
            <path
              d="M0 60 Q60 20, 120 40 T240 30"
              stroke="#8CA6FF"
              stroke-width="1.4"
              class="contour-path-1"
            />
            <path
              d="M0 65 Q60 28, 120 48 T240 38"
              stroke="#8CA6FF"
              stroke-width="1.0"
              stroke-opacity="0.6"
            />
            <path
              d="M0 70 Q60 36, 120 56 T240 46"
              stroke="#8CA6FF"
              stroke-width="1.0"
              stroke-opacity="0.3"
            />
          </svg>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stage-telemetry {
  position: relative;
  min-height: 140vh;
  background: linear-gradient(180deg, #BA7A69 0%, #A26258 50%, #764147 100%);
  color: #FFFFFF;
  padding: 14rem clamp(2rem, 5vw, 6rem) 8rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  transition: background-color var(--transition-theme);
}

.telemetry-bg-art {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.sunset-haze-grad {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 70% 30%, rgba(255, 213, 79, 0.15) 0%, transparent 60%);
}

.drone-aircraft {
  position: absolute;
  top: 18%;
  left: 10%;
  width: 12.0rem;
  height: 4.0rem;
  opacity: 0.75;
}

.drone-svg {
  width: 100%;
  height: 100%;
}

.telemetry-inner {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: var(--content-max-width);
  margin: 0 auto;
  min-height: calc(140vh - 22rem);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8rem;
}

.telemetry-white {
  color: #FFFFFF !important;
}

.telemetry-coords {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.4rem;
  color: #FFFFFF;
}

.telemetry-alt {
  color: var(--color-accent-green);
  font-weight: 600;
}

.telemetry-center {
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  max-width: 96.0rem;
}

.telemetry-headline {
  color: #FFFFFF;
  line-height: 0.94;
  margin: 0;
}

.telemetry-subheadline {
  color: rgba(255, 255, 255, 0.7);
  font-size: clamp(1.4rem, 1.8vw, 2.0rem);
  line-height: 1.5;
  letter-spacing: 0.02em;
  font-weight: 500;
  text-transform: uppercase;
  max-width: 68.0rem;
}

.telemetry-symbol-dot {
  color: var(--color-accent-green);
  font-size: 1.4rem;
}

.contour-mesh {
  width: 22.0rem;
  height: 6.5rem;
}

.contour-svg {
  width: 100%;
  height: 100%;
}

@media (max-width: 768px) {
  .stage-telemetry {
    min-height: 100vh;
    padding-top: 10rem;
  }
  .telemetry-subheadline {
    font-size: 1.6rem;
  }
  .contour-mesh {
    display: none;
  }
}
</style>
