import type Lenis from 'lenis'

const lenisInstance = ref<Lenis | null>(null)
const scrollProgress = ref(0)
const scrollY = ref(0)

export function useLenis() {
  const setLenis = (instance: Lenis | null) => {
    lenisInstance.value = instance
  }

  const setProgress = (progress: number) => {
    scrollProgress.value = progress
  }

  const setScrollY = (y: number) => {
    scrollY.value = y
  }

  const scrollTo = (target: string | number | HTMLElement, options?: Record<string, unknown>) => {
    if (lenisInstance.value) {
      lenisInstance.value.scrollTo(target, options)
    } else if (typeof window !== 'undefined') {
      if (typeof target === 'string') {
        const el = document.querySelector(target)
        el?.scrollIntoView({ behavior: 'smooth' })
      } else if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: 'smooth' })
      } else if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return {
    lenis: lenisInstance,
    progress: readonly(scrollProgress),
    scrollY: readonly(scrollY),
    setLenis,
    setProgress,
    setScrollY,
    scrollTo
  }
}
