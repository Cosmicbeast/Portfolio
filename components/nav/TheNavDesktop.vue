<script setup lang="ts">
// Desktop navigation inside the HUD frame top bar
import { useLenis } from '~/composables/useLenis'

const { scrollTo } = useLenis()

const navItems = [
  { label: 'ABOUT', target: '#about' },
  { label: 'PROJECTS', target: '#projects' },
  { label: 'EXPERIENCE', target: '#experience' },
  { label: 'SKILLS', target: '#skills' },
  { label: 'CONTACT', target: '#contact' }
]

const activeSection = ref('ABOUT')

const handleNavClick = (target: string, label: string) => {
  activeSection.value = label
  scrollTo(target)
}
</script>

<template>
  <nav class="nav-desktop" aria-label="Main Navigation">
    <ul class="nav-desktop__list">
      <li
        v-for="item in navItems"
        :key="item.label"
        class="nav-desktop__item"
      >
        <button
          type="button"
          class="nav-desktop__link label-mono"
          :class="{ 'is-active': activeSection === item.label }"
          @click="handleNavClick(item.target, item.label)"
        >
          <span class="nav-desktop__dot" />
          <span class="nav-desktop__text">{{ item.label }}</span>
        </button>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.nav-desktop {
  display: none;
  pointer-events: auto;
}

@media (min-width: 768px) {
  .nav-desktop {
    display: block;
  }
}

.nav-desktop__list {
  display: flex;
  align-items: center;
  gap: 2.4rem;
}

.nav-desktop__link {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.6rem 1.2rem;
  color: var(--cl-text-muted);
  font-size: 1.2rem;
  letter-spacing: 0.12em;
  border-radius: calc(var(--frame-radius) / 2);
  transition: color var(--transition-fast), background-color var(--transition-fast);
}

.nav-desktop__dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: transparent;
  transition: background-color var(--transition-fast), box-shadow var(--transition-fast);
}

.nav-desktop__link:hover {
  color: var(--cl-text);
  background: rgba(255, 255, 255, 0.05);
}

.nav-desktop__link.is-active {
  color: var(--cl-text);
}

.nav-desktop__link.is-active .nav-desktop__dot {
  background-color: var(--cl-accent);
  box-shadow: 0 0 8px var(--cl-accent);
}
</style>
