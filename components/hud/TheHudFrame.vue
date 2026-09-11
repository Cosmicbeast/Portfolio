<script setup lang="ts">
// Persistent HUD Frame overlay adhering strictly to the reference recording
import HudNavTabs from '~/components/hud/HudNavTabs.vue'
import HudProgressBar from '~/components/hud/HudProgressBar.vue'
import BtnSignIn from '~/components/ui/BtnSignIn.vue'
import CrosshairReticle from '~/components/ui/CrosshairReticle.vue'
import AudioIndicator from '~/components/ui/AudioIndicator.vue'
import TheMenu from '~/components/nav/TheMenu.vue'
import navData from '~/data/navigation.json'
import { useStoryState } from '~/composables/useStoryState'

const props = defineProps<{
  activeTab?: string
}>()

const { activeChapter, currentTheme } = useStoryState()
const effectiveTab = computed(() => props.activeTab || activeChapter.value)
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <div
    class="the-hud-frame"
    :class="[currentTheme === 'dark' ? 'theme-dark' : 'theme-light']"
    aria-hidden="false"
  >
    <!-- Accessible Skip to Main Content Link for Screen Readers & Keyboard Nav -->
    <a href="#main-content" class="hud-skip-link label-mono">
      SKIP TO CONTENT ↓
    </a>

    <!-- Outer perimeter HUD border line -->
    <div class="hud-outer-border" aria-hidden="true" />

    <!-- Top Persistent Header Bar -->
    <header class="hud-header">
      <!-- Left: Minimalist 2-line hamburger toggle -->
      <div class="hud-header__left">
        <button
          type="button"
          class="hud-burger-btn"
          :class="{ 'is-open': isMenuOpen }"
          aria-label="Toggle Navigation"
          :aria-expanded="isMenuOpen"
          aria-controls="nav-drawer"
          @click="toggleMenu"
        >
          <span class="burger-line line-1" />
          <span class="burger-line line-2" />
        </button>
      </div>

      <!-- Center: Chapter Segmented Navigation -->
      <div class="hud-header__center">
        <HudNavTabs
          :tabs="navData.tabs"
          :active-id="effectiveTab"
        />
      </div>

      <!-- Right: Persistent Sign In Pill -->
      <div class="hud-header__right">
        <BtnSignIn :label="navData.auth.label" />
      </div>

      <!-- Bottom Horizontal Scroll Progress Bar -->
      <HudProgressBar />
    </header>

    <!-- Left HUD Rail -->
    <aside class="hud-left-rail">
      <!-- Centered 4-Point Starburst Reticle -->
      <div class="hud-left-rail__reticle">
        <CrosshairReticle />
      </div>

      <!-- Bottom-Left Audio [01] Indicator -->
      <div class="hud-left-rail__bottom">
        <AudioIndicator :code="navData.hud.audioCode" />
      </div>
    </aside>

    <!-- Fullscreen Mobile Navigation Drawer -->
    <TheMenu :is-open="isMenuOpen" @close="isMenuOpen = false" />
  </div>
</template>

<style scoped>
.the-hud-frame {
  position: fixed;
  inset: var(--menu-pad);
  z-index: var(--z-hud-frame);
  pointer-events: none;
  transition: var(--transition-theme);
}

.hud-skip-link {
  position: absolute;
  top: -6rem;
  left: 2rem;
  padding: 0.8rem 1.6rem;
  background-color: var(--color-accent-green);
  color: #000000;
  font-weight: 700;
  border-radius: 9999px;
  z-index: 1000;
  pointer-events: auto;
  transition: top var(--transition-fast);
}

.hud-skip-link:focus {
  top: 1.2rem;
}

/* 1px outer frame rounded border */
.hud-outer-border {
  position: absolute;
  inset: 0;
  border: var(--line-thickness) solid var(--theme-line-outer);
  border-radius: var(--menu-radius);
  pointer-events: none;
  transition: border-color var(--transition-theme);
}

/* Header container */
.hud-header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: var(--menu-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top-left-radius: var(--menu-radius);
  border-top-right-radius: var(--menu-radius);
  border-bottom: var(--line-thickness) solid var(--theme-lines);
  pointer-events: none;
  transition: border-color var(--transition-theme);
}

.hud-header__left {
  width: var(--menu-width);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: var(--line-thickness) solid var(--theme-lines);
  pointer-events: auto;
  transition: border-color var(--transition-theme);
}

.hud-burger-btn {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  cursor: pointer;
  color: var(--theme-text);
  transition: opacity var(--transition-fast), color var(--transition-theme);
}

.hud-burger-btn:hover {
  opacity: 0.7;
}

.burger-line {
  display: block;
  width: 2.2rem;
  height: 1.5px;
  background-color: currentColor;
  transition: transform var(--transition-normal), width var(--transition-fast);
}

.hud-burger-btn.is-open .line-1 {
  transform: translateY(3.25px) rotate(45deg);
}

.hud-burger-btn.is-open .line-2 {
  transform: translateY(-3.25px) rotate(-45deg);
}

.hud-header__center {
  flex: 1;
  display: flex;
  justify-content: center;
  pointer-events: none;
}

.hud-header__right {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 2rem;
  pointer-events: auto;
}

/* Left Rail elements */
.hud-left-rail {
  position: absolute;
  top: var(--menu-height);
  bottom: 0;
  left: 0;
  width: var(--menu-width);
  pointer-events: none;
}

.hud-left-rail__reticle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.hud-left-rail__bottom {
  position: absolute;
  bottom: 1.6rem;
  left: 1.2rem;
  pointer-events: auto;
}

/* Responsive Hide Rules */
@media (max-width: 768px) {
  .the-hud-frame {
    inset: 1.2rem;
  }
  .hud-header__center {
    display: none;
  }
  .hud-left-rail {
    display: none;
  }
  .hud-header__left {
    width: 5rem;
  }
}
</style>
