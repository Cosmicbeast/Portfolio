// usePreloader composable - manages initial asset loading state and progress simulation
const isLoading = ref(true)
const progress = ref(0)
const currentAsset = ref('INITIALIZING_KERNEL...')

export function usePreloader() {
  const assets = [
    'core/three.module.js',
    'shaders/particle.vert.glsl',
    'shaders/particle.frag.glsl',
    'physics/lenis.engine.wasm',
    'motion/gsap.scrolltrigger.js',
    'hud/frame.overlay.matrix',
    'audio/ambient.synthesizer.node',
    'system/kernel.ready'
  ]

  const startPreloader = () => {
    if (!import.meta.client) return

    let currentIdx = 0
    progress.value = 0

    const interval = setInterval(() => {
      progress.value += Math.floor(Math.random() * 12) + 8

      if (currentIdx < assets.length - 1 && Math.random() > 0.3) {
        currentIdx++
        currentAsset.value = assets[currentIdx]
      }

      if (progress.value >= 100) {
        progress.value = 100
        currentAsset.value = 'SYS_READY // ALL CHUNKS COMPILED'
        clearInterval(interval)

        setTimeout(() => {
          isLoading.value = false
        }, 450)
      }
    }, 90)
  }

  return {
    isLoading: readonly(isLoading),
    progress: readonly(progress),
    currentAsset: readonly(currentAsset),
    startPreloader
  }
}
