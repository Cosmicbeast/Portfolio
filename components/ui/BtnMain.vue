<script setup lang="ts">
// BtnMain component - primary CTA button with corner-cut cyber polygon shape
withDefaults(
  defineProps<{
    tag?: string
    href?: string
    theme?: 'accent' | 'outline' | 'dark'
    size?: 'sm' | 'md' | 'lg'
  }>(),
  {
    tag: 'button',
    href: undefined,
    theme: 'accent',
    size: 'md'
  }
)

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()
</script>

<template>
  <component
    :is="href ? 'a' : tag"
    :href="href"
    class="btn-main"
    :class="[`btn-main--${theme}`, `btn-main--${size}`]"
    @click="emit('click', $event)"
  >
    <span class="btn-main__bg" aria-hidden="true" />
    <span class="btn-main__content label-mono">
      <slot />
    </span>
    <!-- Cyber bracket cut accent -->
    <span class="btn-main__cut" aria-hidden="true" />
  </component>
</template>

<style scoped>
.btn-main {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
  user-select: none;
  text-decoration: none;
  border: none;
  font-weight: 700;
  letter-spacing: 0.14em;
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
  clip-path: polygon(
    0 0,
    calc(100% - 10px) 0,
    100% 10px,
    100% 100%,
    10px 100%,
    0 calc(100% - 10px)
  );
}

.btn-main:active {
  transform: scale(0.97);
}

/* Sizes */
.btn-main--sm {
  padding: 0.8rem 1.6rem;
  font-size: 1.1rem;
}

.btn-main--md {
  padding: 1.2rem 2.6rem;
  font-size: 1.3rem;
}

.btn-main--lg {
  padding: 1.6rem 3.6rem;
  font-size: 1.5rem;
}

/* Themes */
.btn-main--accent {
  background-color: var(--cl-accent);
  color: #000000;
}

.btn-main--accent:hover {
  box-shadow: 0 0 20px rgba(192, 251, 80, 0.5);
  transform: translateY(-2px);
}

.btn-main--outline {
  background: transparent;
  color: var(--cl-text);
  border: 1px solid var(--cl-line-light);
}

.btn-main--outline:hover {
  border-color: var(--cl-accent);
  color: var(--cl-accent);
  box-shadow: 0 0 15px rgba(192, 251, 80, 0.2);
}

.btn-main--dark {
  background: #111111;
  color: var(--cl-text);
  border: 1px solid var(--cl-line-light);
}

.btn-main--dark:hover {
  background: #181818;
  color: var(--cl-accent);
}

.btn-main__content {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
}
</style>
