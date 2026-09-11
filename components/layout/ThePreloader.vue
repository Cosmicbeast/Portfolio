<script setup lang="ts">
// ThePreloader component - high-contrast inverted full-screen preloader matching KPRverse
import { usePreloader } from '~/composables/usePreloader'

const { isLoading, progress, currentAsset, startPreloader } = usePreloader()

onMounted(() => {
  startPreloader()
})
</script>

<template>
  <Transition name="preloader-fade">
    <div
      v-if="isLoading"
      class="the-preloader flex flex-col justify-between"
      role="status"
      aria-label="System Initializing"
    >
      <!-- Top status -->
      <div class="preloader-header flex justify-between items-center">
        <span class="label-mono preloader-dark">SYSTEM INITIALIZATION // KPR-CORE</span>
        <span class="label-mono preloader-dark">{{ progress }}%</span>
      </div>

      <!-- Center Logo & Spinner -->
      <div class="preloader-center flex flex-col items-center">
        <div class="preloader-mark">
          <svg viewBox="0 0 64 64" fill="none" class="preloader-svg" aria-hidden="true">
            <polygon
              points="32,8 56,48 8,48"
              stroke="#000000"
              stroke-width="2.5"
              fill="none"
              class="preloader-poly"
            />
            <circle cx="32" cy="35" r="4" fill="#000000" />
          </svg>
        </div>
        <h2 class="preloader-title font-display">COSMICBEAST</h2>
        <p class="preloader-ticker label-mono preloader-dark">
          {{ currentAsset }}
        </p>
      </div>

      <!-- Bottom Progress Track -->
      <div class="preloader-footer">
        <div class="preloader-bar" aria-hidden="true">
          <div
            class="preloader-bar__fill"
            :style="{ transform: `scaleX(${progress / 100})` }"
          />
        </div>
        <div class="flex justify-between items-center preloader-meta">
          <span class="label-mono preloader-dark">STATUS: COMPILING WEBGL ASSETS</span>
          <span class="label-mono preloader-dark">BUFFER: NOMINAL</span>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.the-preloader {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background-color: #ffffff;
  color: #000000;
  z-index: var(--z-preloader);
  padding: clamp(2rem, 5vw, 6rem);
  pointer-events: all;
}

.preloader-dark {
  color: rgba(0, 0, 0, 0.65) !important;
}

.preloader-header {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 2rem;
}

.preloader-center {
  gap: 2rem;
}

.preloader-mark {
  width: 8rem;
  height: 8rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preloader-svg {
  width: 100%;
  height: 100%;
}

.preloader-poly {
  animation: spin 6s linear infinite;
  transform-origin: center;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.preloader-title {
  color: #000000;
  font-size: clamp(3rem, 6vw, 6.4rem);
  font-weight: 700;
  letter-spacing: -0.04em;
}

.preloader-ticker {
  font-size: 1.2rem;
  letter-spacing: 0.15em;
}

.preloader-footer {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}

.preloader-bar {
  position: relative;
  width: 100%;
  height: 2px;
  background-color: rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.preloader-bar__fill {
  width: 100%;
  height: 100%;
  background-color: #000000;
  transform-origin: left;
  transition: transform 0.1s linear;
}

.preloader-meta {
  padding-top: 0.8rem;
}

/* Exit transition */
.preloader-fade-leave-active {
  transition: opacity 0.55s var(--ease-out-expo), transform 0.55s var(--ease-out-expo);
}

.preloader-fade-leave-to {
  opacity: 0;
  transform: scale(1.02);
}
</style>
