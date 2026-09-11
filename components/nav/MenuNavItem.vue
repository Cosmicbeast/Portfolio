<script setup lang="ts">
// Fullscreen menu link item with numeric index and hover effects
defineProps<{
  index: string
  label: string
  target: string
}>()

const emit = defineEmits<{
  (e: 'select', target: string): void
}>()
</script>

<template>
  <li class="menu-item">
    <button
      type="button"
      class="menu-item__btn"
      @click="emit('select', target)"
    >
      <span class="menu-item__index label-mono">{{ index }}</span>
      <span class="menu-item__label">{{ label }}</span>
      <span class="menu-item__arrow label-mono" aria-hidden="true">→</span>
    </button>
  </li>
</template>

<style scoped>
.menu-item {
  width: 100%;
}

.menu-item__btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1.6rem 0;
  border-bottom: 1px solid var(--cl-line-light);
  color: var(--cl-text);
  text-align: left;
  transition: padding-left var(--transition-fast), color var(--transition-fast);
}

.menu-item__btn:hover {
  color: var(--cl-accent);
  padding-left: 1.2rem;
}

.menu-item__index {
  font-size: 1.3rem;
  color: var(--cl-muted);
  min-width: 4rem;
}

.menu-item__label {
  flex: 1;
  font-family: var(--font-display);
  font-size: clamp(2.8rem, 6vw, 6rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

.menu-item__arrow {
  font-size: 2.4rem;
  opacity: 0;
  transform: translateX(-1rem);
  transition: opacity var(--transition-fast), transform var(--transition-fast);
}

.menu-item__btn:hover .menu-item__arrow {
  opacity: 1;
  transform: translateX(0);
}
</style>
