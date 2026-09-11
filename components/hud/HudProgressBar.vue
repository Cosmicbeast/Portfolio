<script setup lang="ts">
// Top horizontal scroll progress line tracking page scrub depth
import { useLenis } from '~/composables/useLenis'

const { progress } = useLenis()

const barTransform = computed(() => {
  return `scaleX(${progress.value})`
})
</script>

<template>
  <div class="hud-progress-track" aria-hidden="true">
    <div
      class="hud-progress-fill"
      :style="{ transform: barTransform }"
    />
  </div>
</template>

<style scoped>
.hud-progress-track {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: var(--theme-lines);
  overflow: hidden;
  pointer-events: none;
}

.hud-progress-fill {
  width: 100%;
  height: 100%;
  background-color: var(--theme-text);
  transform-origin: left center;
  transform: scaleX(0);
  will-change: transform;
  transition: transform 0.05s linear;
}
</style>
