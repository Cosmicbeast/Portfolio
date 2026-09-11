<script setup lang="ts">
// Hamburger toggle button with animated transformation
defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle'): void
}>()
</script>

<template>
  <button
    type="button"
    class="btn-burger"
    :class="{ 'is-open': isOpen }"
    :aria-expanded="isOpen"
    aria-label="Toggle Navigation Menu"
    @click="emit('toggle')"
  >
    <span class="btn-burger__box">
      <span class="btn-burger__line btn-burger__line--top" />
      <span class="btn-burger__line btn-burger__line--middle" />
      <span class="btn-burger__line btn-burger__line--bottom" />
    </span>
    <span class="btn-burger__text label-mono">
      {{ isOpen ? 'CLOSE' : 'MENU' }}
    </span>
  </button>
</template>

<style scoped>
.btn-burger {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem 1.4rem;
  background: rgba(10, 10, 10, 0.7);
  border: var(--line-thickness) solid var(--cl-line-light);
  border-radius: var(--frame-radius);
  color: var(--cl-text);
  pointer-events: auto;
  transition: border-color var(--transition-fast), background var(--transition-fast);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.btn-burger:hover {
  border-color: var(--cl-accent);
  color: var(--cl-accent);
}

.btn-burger__box {
  position: relative;
  width: 1.8rem;
  height: 1.4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.btn-burger__line {
  display: block;
  width: 100%;
  height: 1.5px;
  background-color: currentColor;
  transition: transform var(--transition-normal), opacity var(--transition-fast);
  transform-origin: center;
}

.btn-burger.is-open .btn-burger__line--top {
  transform: translateY(6px) rotate(45deg);
}

.btn-burger.is-open .btn-burger__line--middle {
  opacity: 0;
  transform: scaleX(0);
}

.btn-burger.is-open .btn-burger__line--bottom {
  transform: translateY(-6px) rotate(-45deg);
}

.btn-burger__text {
  font-size: 1.1rem;
  letter-spacing: 0.14em;
  font-weight: 500;
}
</style>
