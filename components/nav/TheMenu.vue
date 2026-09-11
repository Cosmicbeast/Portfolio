<script setup lang="ts">
// Fullscreen menu overlay with cyber blur effect, social links, and keyboard escape support
import MenuNavItem from '~/components/nav/MenuNavItem.vue'
import { useLenis } from '~/composables/useLenis'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const { scrollTo } = useLenis()

const menuItems = [
  { index: '01', label: 'ABOUT', target: '#about' },
  { index: '02', label: 'PROJECTS', target: '#projects' },
  { index: '03', label: 'EXPERIENCE', target: '#experience' },
  { index: '04', label: 'SKILLS', target: '#skills' },
  { index: '05', label: 'CONTACT', target: '#contact' }
]

const handleSelect = (target: string) => {
  emit('close')
  setTimeout(() => {
    scrollTo(target)
  }, 350)
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.isOpen) {
    emit('close')
  }
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', handleKeydown)
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', handleKeydown)
  }
})
</script>

<template>
  <Transition name="menu-fade">
    <div
      v-if="isOpen"
      class="the-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
    >
      <div class="the-menu__backdrop" @click="emit('close')" />

      <div class="the-menu__container">
        <!-- Header status -->
        <div class="the-menu__header flex justify-between items-center">
          <span class="label-mono text-accent">● SYSTEM_NAV // DIRECTORY</span>
          <button
            type="button"
            class="label-mono the-menu__close-btn"
            @click="emit('close')"
          >
            [ ESC / CLOSE ]
          </button>
        </div>

        <!-- Menu items list -->
        <ul class="the-menu__list">
          <MenuNavItem
            v-for="item in menuItems"
            :key="item.index"
            :index="item.index"
            :label="item.label"
            :target="item.target"
            @select="handleSelect"
          />
        </ul>

        <!-- Footer section with status & socials -->
        <div class="the-menu__footer">
          <div class="the-menu__meta">
            <span class="label-mono">LOCATION: GLOBAL / REMOTE</span>
            <span class="label-mono">AVAILABILITY: OPEN FOR CONTRACTS</span>
          </div>
          <div class="the-menu__socials">
            <a
              href="https://github.com/Cosmicbeast"
              target="_blank"
              rel="noopener noreferrer"
              class="label-mono the-menu__social-link"
            >
              GITHUB ↗
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              class="label-mono the-menu__social-link"
            >
              LINKEDIN ↗
            </a>
            <a
              href="mailto:contact@cosmicbeast.dev"
              class="label-mono the-menu__social-link text-accent"
            >
              EMAIL ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.the-menu {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: var(--z-menu);
  display: flex;
  justify-content: flex-end;
  pointer-events: auto;
}

.the-menu__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.the-menu__container {
  position: relative;
  width: 100%;
  max-width: 68rem;
  height: 100%;
  background: rgba(10, 10, 10, 0.95);
  border-left: 1px solid var(--cl-line-light);
  padding: clamp(2.4rem, 5vw, 6rem);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;
  z-index: 1;
}

.the-menu__header {
  padding-bottom: 2rem;
  border-bottom: 1px dashed var(--cl-line-light);
}

.the-menu__close-btn {
  color: var(--cl-text-muted);
  transition: color var(--transition-fast);
}

.the-menu__close-btn:hover {
  color: var(--cl-accent);
}

.the-menu__list {
  display: flex;
  flex-direction: column;
  margin: 3rem 0;
}

.the-menu__footer {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-top: 2.4rem;
  border-top: 1px dashed var(--cl-line-light);
}

.the-menu__meta {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.the-menu__socials {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}

.the-menu__social-link {
  color: var(--cl-text-muted);
  transition: color var(--transition-fast);
}

.the-menu__social-link:hover {
  color: var(--cl-accent);
}

/* Transitions */
.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: opacity 0.35s ease, transform 0.35s var(--ease-out-expo);
}

.menu-fade-enter-from,
.menu-fade-leave-to {
  opacity: 0;
}

.menu-fade-enter-from .the-menu__container,
.menu-fade-leave-to .the-menu__container {
  transform: translateX(100%);
}
</style>
