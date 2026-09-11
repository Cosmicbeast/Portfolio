<script setup lang="ts">
// SectionMatrixWipe: Theatrical vertical capsule matrix wipe transition
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sectionRef = ref<HTMLElement | null>(null)
let ctx: gsap.Context | null = null

onMounted(() => {
  if (!import.meta.client || !sectionRef.value) return

  ctx = gsap.context(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    // Staggered vertical capsule curtain wipe scrub
    gsap.utils.toArray<HTMLElement>('.matrix-col-even').forEach((col) => {
      gsap.fromTo(
        col,
        { yPercent: 100 },
        {
          scrollTrigger: {
            trigger: sectionRef.value,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6
          },
          yPercent: -100,
          ease: 'power1.inOut'
        }
      )
    })

    gsap.utils.toArray<HTMLElement>('.matrix-col-odd').forEach((col) => {
      gsap.fromTo(
        col,
        { yPercent: -100 },
        {
          scrollTrigger: {
            trigger: sectionRef.value,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6
          },
          yPercent: 100,
          ease: 'power1.inOut'
        }
      )
    })
  }, sectionRef.value)
})

onUnmounted(() => {
  ctx?.revert()
})
</script>

<template>
  <div
    ref="sectionRef"
    class="section-matrix-wipe"
    aria-hidden="true"
  >
    <div class="matrix-grid">
      <div
        v-for="i in 8"
        :key="i"
        class="matrix-col"
        :class="[i % 2 === 0 ? 'matrix-col-even' : 'matrix-col-odd']"
      >
        <div class="matrix-capsule" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.section-matrix-wipe {
  position: relative;
  width: 100%;
  height: 60vh;
  overflow: hidden;
  pointer-events: none;
  z-index: var(--z-overlays);
  background-color: var(--color-bg-lavender);
}

.matrix-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 1.6rem;
  width: 100%;
  height: 100%;
  padding: 0 2rem;
  align-items: center;
}

.matrix-col {
  display: flex;
  justify-content: center;
  height: 100%;
}

.matrix-capsule {
  width: clamp(3.2rem, 5vw, 6.4rem);
  height: clamp(20.0rem, 32vh, 38.0rem);
  background: linear-gradient(180deg, #DDD8F5 0%, #C4B8E6 100%);
  border-radius: 9999px;
  box-shadow: 0 12px 36px rgba(94, 75, 139, 0.16);
  border: 1px solid rgba(255, 255, 255, 0.5);
}

@media (max-width: 768px) {
  .section-matrix-wipe {
    height: 45vh;
  }
  .matrix-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
