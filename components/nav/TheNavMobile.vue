<script setup lang="ts">
// Mobile top navigation bar
import BtnBurger from '~/components/ui/BtnBurger.vue'

defineProps<{
  isMenuOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle-menu'): void
}>()
</script>

<template>
  <div class="nav-mobile">
    <div class="nav-mobile__logo">
      <span class="nav-mobile__mark">◈</span>
      <span class="label-mono nav-mobile__title">CB // SYSTEM</span>
    </div>
    <BtnBurger
      :is-open="isMenuOpen"
      @toggle="emit('toggle-menu')"
    />
  </div>
</template>

<style scoped>
.nav-mobile {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  pointer-events: auto;
}

@media (min-width: 768px) {
  .nav-mobile {
    display: none;
  }
}

.nav-mobile__logo {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.nav-mobile__mark {
  color: var(--cl-accent);
  font-size: 1.6rem;
  line-height: 1;
}

.nav-mobile__title {
  font-weight: 700;
  color: var(--cl-text);
  font-size: 1.2rem;
}
</style>
