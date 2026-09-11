<script setup lang="ts">
// HUD Frame Overlay component sitting over the entire viewport
import TheFrameProgress from '~/components/layout/TheFrameProgress.vue'
import TheNavDesktop from '~/components/nav/TheNavDesktop.vue'
import TheNavMobile from '~/components/nav/TheNavMobile.vue'
import BtnBurger from '~/components/ui/BtnBurger.vue'
import BtnAudio from '~/components/ui/BtnAudio.vue'
import TheMenu from '~/components/nav/TheMenu.vue'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<template>
  <div class="the-frame" aria-hidden="false">
    <!-- Top horizontal scroll progress bar -->
    <TheFrameProgress />

    <!-- Corner HUD brackets -->
    <div class="frame-corner frame-corner--tl" aria-hidden="true" />
    <div class="frame-corner frame-corner--tr" aria-hidden="true" />
    <div class="frame-corner frame-corner--bl" aria-hidden="true" />
    <div class="frame-corner frame-corner--br" aria-hidden="true" />

    <!-- Top Header Bar -->
    <header class="frame-header">
      <div class="frame-header__brand">
        <a href="#" class="frame-header__logo" aria-label="Cosmicbeast Portfolio Home">
          <span class="frame-header__mark">◈</span>
          <span class="frame-header__title">COSMICBEAST</span>
        </a>
        <span class="frame-header__badge label-mono">VER: 3.4.0</span>
      </div>

      <!-- Desktop Nav Links -->
      <TheNavDesktop />

      <!-- Action items (Menu burger + audio + status) -->
      <div class="frame-header__actions">
        <BtnAudio />
        <span class="frame-header__status label-mono">
          <span class="status-dot" /> LIVE
        </span>
        <BtnBurger
          class="desktop-burger"
          :is-open="isMenuOpen"
          @toggle="toggleMenu"
        />
      </div>

      <!-- Mobile Top Bar -->
      <TheNavMobile
        :is-menu-open="isMenuOpen"
        @toggle-menu="toggleMenu"
      />
    </header>

    <!-- Left HUD Rail -->
    <aside class="frame-sidebar" aria-hidden="true">
      <div class="frame-sidebar__content">
        <span class="frame-sidebar__text label-mono">KPR // EXPERIMENTAL HUD SYSTEM</span>
        <div class="frame-sidebar__line" />
        <span class="frame-sidebar__coord label-mono">37.7749° N, 122.4194° W</span>
      </div>
    </aside>

    <!-- Bottom HUD Bar -->
    <footer class="frame-bottom" aria-hidden="true">
      <div class="frame-bottom__status label-mono">
        SECURE PROTOCOL // THREE.JS 3D ACTIVE
      </div>
      <div class="frame-bottom__info label-mono">
        SCROLL TO EXPLORE ↓
      </div>
    </footer>

    <!-- Fullscreen Menu Drawer -->
    <TheMenu
      :is-open="isMenuOpen"
      @close="closeMenu"
    />
  </div>
</template>

<style scoped>
.the-frame {
  position: fixed;
  inset: var(--frame-pad);
  z-index: var(--z-frame);
  pointer-events: none;
  border: var(--line-thickness) solid var(--cl-line-light);
  border-radius: var(--frame-radius);
  transition: border-color var(--transition-normal);
}

/* Corner HUD accents */
.frame-corner {
  position: absolute;
  width: 1.2rem;
  height: 1.2rem;
  border-color: var(--cl-accent);
  border-style: solid;
  pointer-events: none;
}

.frame-corner--tl {
  top: -1px;
  left: -1px;
  border-width: 2px 0 0 2px;
  border-top-left-radius: var(--frame-radius);
}

.frame-corner--tr {
  top: -1px;
  right: -1px;
  border-width: 2px 2px 0 0;
  border-top-right-radius: var(--frame-radius);
}

.frame-corner--bl {
  bottom: -1px;
  left: -1px;
  border-width: 0 0 2px 2px;
  border-bottom-left-radius: var(--frame-radius);
}

.frame-corner--br {
  bottom: -1px;
  right: -1px;
  border-width: 0 2px 2px 0;
  border-bottom-right-radius: var(--frame-radius);
}

/* Header bar */
.frame-header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  border-bottom: var(--line-thickness) solid var(--cl-line-light);
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-top-left-radius: var(--frame-radius);
  border-top-right-radius: var(--frame-radius);
}

.frame-header__brand {
  display: none;
  align-items: center;
  gap: 1.6rem;
  pointer-events: auto;
}

@media (min-width: 768px) {
  .frame-header__brand {
    display: flex;
  }
}

.frame-header__logo {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.4rem;
  letter-spacing: 0.1em;
  color: var(--cl-text);
  transition: color var(--transition-fast);
}

.frame-header__logo:hover {
  color: var(--cl-accent);
}

.frame-header__mark {
  color: var(--cl-accent);
}

.frame-header__badge {
  font-size: 1rem;
  padding: 0.2rem 0.6rem;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 4px;
}

.frame-header__actions {
  display: none;
  align-items: center;
  gap: 2rem;
  pointer-events: auto;
}

@media (min-width: 768px) {
  .frame-header__actions {
    display: flex;
  }
}

.frame-header__status {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 1.1rem;
  color: var(--cl-accent);
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--cl-accent);
  box-shadow: 0 0 8px var(--cl-accent);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.85); }
}

/* Sidebar rail */
.frame-sidebar {
  display: none;
  position: absolute;
  top: var(--nav-height);
  bottom: 3.6rem;
  left: 0;
  width: var(--sidebar-width);
  border-right: var(--line-thickness) solid var(--cl-line-light);
  align-items: center;
  justify-content: center;
}

@media (min-width: 1024px) {
  .frame-sidebar {
    display: flex;
  }
}

.frame-sidebar__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  transform: rotate(-90deg);
  white-space: nowrap;
}

.frame-sidebar__line {
  width: 4rem;
  height: 1px;
  background: var(--cl-line-light);
}

.frame-sidebar__text {
  font-size: 0.9rem;
  letter-spacing: 0.2em;
}

.frame-sidebar__coord {
  font-size: 0.9rem;
  color: var(--cl-accent-blue);
  letter-spacing: 0.15em;
}

/* Bottom HUD bar */
.frame-bottom {
  display: none;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3.6rem;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  border-top: var(--line-thickness) solid var(--cl-line-light);
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom-left-radius: var(--frame-radius);
  border-bottom-right-radius: var(--frame-radius);
}

@media (min-width: 768px) {
  .frame-bottom {
    display: flex;
  }
}

.frame-bottom__status {
  font-size: 1rem;
  color: var(--cl-muted);
}

.frame-bottom__info {
  font-size: 1.1rem;
  color: var(--cl-accent);
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(3px); }
}
</style>
