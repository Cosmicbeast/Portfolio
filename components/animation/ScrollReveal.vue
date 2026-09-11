<script setup lang="ts">
// ScrollReveal wrapper component using GSAP ScrollTrigger
import gsap from 'gsap'

const props = withDefaults(
  defineProps<{
    animation?: 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale-up'
    delay?: number
    duration?: number
    threshold?: number
  }>(),
  {
    animation: 'fade-up',
    delay: 0,
    duration: 0.8,
    threshold: 0.15
  }
)

const targetRef = ref<HTMLElement | null>(null)
let ctx: gsap.Context | null = null

onMounted(() => {
  if (!import.meta.client || !targetRef.value) return

  ctx = gsap.context(() => {
    let initialVars: gsap.TweenVars = { opacity: 0 }

    switch (props.animation) {
      case 'fade-up':
        initialVars = { opacity: 0, y: 40 }
        break
      case 'fade-in':
        initialVars = { opacity: 0 }
        break
      case 'slide-left':
        initialVars = { opacity: 0, x: -50 }
        break
      case 'slide-right':
        initialVars = { opacity: 0, x: 50 }
        break
      case 'scale-up':
        initialVars = { opacity: 0, scale: 0.92 }
        break
    }

    gsap.fromTo(
      targetRef.value,
      initialVars,
      {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration: props.duration,
        delay: props.delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: targetRef.value,
          start: `top bottom-=${props.threshold * 100}%`,
          toggleActions: 'play none none none',
          once: true
        }
      }
    )
  }, targetRef.value)
})

onUnmounted(() => {
  if (ctx) {
    ctx.revert()
    ctx = null
  }
})
</script>

<template>
  <div ref="targetRef" class="scroll-reveal">
    <slot />
  </div>
</template>

<style scoped>
.scroll-reveal {
  width: 100%;
  will-change: transform, opacity;
}
</style>
