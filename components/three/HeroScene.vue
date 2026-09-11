<script setup lang="ts">
// HeroScene component mounting Three.js WebGL canvas layer
import { SceneManager } from '~/components/three/SceneManager'
import { useRaf } from '~/composables/useRaf'

const mountRef = ref<HTMLElement | null>(null)
let sceneManager: SceneManager | null = null

const { add: addRaf, remove: removeRaf } = useRaf()

const handlePointerMove = (e: PointerEvent) => {
  if (!sceneManager) return
  // Normalized mouse coords from -1 to 1
  const x = (e.clientX / window.innerWidth) * 2 - 1
  const y = (e.clientY / window.innerHeight) * 2 - 1
  sceneManager.setMouse(x, y)
}

const renderLoop = (time: number) => {
  sceneManager?.render(time)
}

onMounted(() => {
  if (!import.meta.client || !mountRef.value) return

  sceneManager = new SceneManager(mountRef.value)
  addRaf(renderLoop)
  window.addEventListener('pointermove', handlePointerMove, { passive: true })
})

onUnmounted(() => {
  removeRaf(renderLoop)
  if (typeof window !== 'undefined') {
    window.removeEventListener('pointermove', handlePointerMove)
  }
  sceneManager?.dispose()
  sceneManager = null
})
</script>

<template>
  <div ref="mountRef" class="hero-scene" />
</template>

<style scoped>
.hero-scene {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
}
</style>
