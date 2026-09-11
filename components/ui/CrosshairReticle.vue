<script setup lang="ts">
// Decorative 4-point crosshair star reticle along the left HUD rail
</script>

<template>
  <div class="crosshair-reticle" aria-hidden="true">
    <svg viewBox="0 0 40 40" fill="none" class="crosshair-svg">
      <!-- Axis lines -->
      <line x1="20" y1="0" x2="20" y2="40" stroke="currentColor" stroke-width="1" />
      <line x1="0" y1="20" x2="40" y2="20" stroke="currentColor" stroke-width="1" />
      <!-- Center Diamond Starburst -->
      <path
        d="M20 10 L22.5 17.5 L30 20 L22.5 22.5 L20 30 L17.5 22.5 L10 20 L17.5 17.5 Z"
        fill="none"
        stroke="currentColor"
        stroke-width="1.2"
      />
      <!-- Center Dot -->
      <circle cx="20" cy="20" r="1.5" fill="currentColor" />
    </svg>
  </div>
</template>

<style scoped>
.crosshair-reticle {
  width: 3.2rem;
  height: 3.2rem;
  color: var(--theme-text);
  opacity: 0.85;
  user-select: none;
  pointer-events: none;
  transition: color var(--transition-theme), opacity var(--transition-fast);
}

.crosshair-svg {
  width: 100%;
  height: 100%;
}
</style>
