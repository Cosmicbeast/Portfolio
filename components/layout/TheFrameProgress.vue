<script setup lang="ts">
// Top horizontal scroll progress bar driven by Lenis scroll progress
import { useLenis } from '~/composables/useLenis'

const { progress } = useLenis()

// Reactive scaleX transform based on scrollProgress (0 to 1)
const progressTransform = computed(() => {
  return `scaleX(${progress.value})`
})
</script>

<template>
  <div class="frame-progress" aria-hidden="true">
    <div
      class="frame-progress__bar"
      :style="{ transform: progressTransform }"
    />
  </div>
</template>

<style scoped>
.frame-progress {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: rgba(255, 255, 255, 0.05);
  overflow: hidden;
  pointer-events: none;
  z-index: calc(var(--z-frame) + 1);
}

.frame-progress__bar {
  width: 100%;
  height: 100%;
  background: var(--cl-accent);
  box-shadow: 0 0 10px var(--cl-accent);
  transform-origin: left center;
  transform: scaleX(0);
  will-change: transform;
  transition: transform 0.05s linear;
}
</style>
