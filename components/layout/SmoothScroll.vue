<script setup lang="ts">
// SmoothScroll wrapper component providing Lenis scroller container
</script>

<template>
  <div id="smooth-wrapper" class="smooth-wrapper">
    <div id="smooth-content" class="smooth-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.smooth-wrapper {
  position: relative;
  width: 100%;
  min-height: 100vh;
}

.smooth-content {
  position: relative;
  width: 100%;
  min-height: 100vh;
}
</style>
