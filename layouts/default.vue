<script setup lang="ts">
// Default layout housing the persistent HUD Frame and smooth-scrolling content
import TheHudFrame from '~/components/hud/TheHudFrame.vue'
import SmoothScroll from '~/components/layout/SmoothScroll.vue'

const activeChapter = ref('project')

const setActiveChapter = (id: string) => {
  activeChapter.value = id
}
</script>

<template>
  <div class="layout-hud-default">
    <!-- Persistent Viewport HUD Frame -->
    <TheHudFrame :active-tab="activeChapter" />

    <!-- Main Scrollable Story Canvas -->
    <div id="story-viewport" class="story-viewport">
      <SmoothScroll>
        <main id="main-content" class="main-content">
          <slot />
        </main>
      </SmoothScroll>
    </div>
  </div>
</template>

<style scoped>
.layout-hud-default {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: var(--theme-bg);
  color: var(--theme-text);
  overflow-x: hidden;
  transition: var(--transition-theme);
}

.story-viewport {
  position: relative;
  width: 100%;
  min-height: 100vh;
  z-index: var(--z-content);
}

.main-content {
  position: relative;
  width: 100%;
}
</style>
