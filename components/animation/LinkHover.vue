<script setup lang="ts">
// LinkHover component - sliding background fill sweeping across text on hover
withDefaults(
  defineProps<{
    tag?: string
    accent?: boolean
  }>(),
  {
    tag: 'span',
    accent: false
  }
)
</script>

<template>
  <component
    :is="tag"
    class="link-hover"
    :class="{ 'is-accent': accent }"
  >
    <span class="link-hover__fill" aria-hidden="true" />
    <span class="link-hover__content">
      <slot />
    </span>
  </component>
</template>

<style scoped>
.link-hover {
  position: relative;
  display: inline-block;
  overflow: hidden;
  vertical-align: baseline;
  cursor: pointer;
}

.link-hover__fill {
  position: absolute;
  inset: 0;
  background-color: var(--cl-text);
  transform: translateX(-101%);
  transition: transform var(--transition-normal);
  z-index: 0;
  pointer-events: none;
}

.link-hover.is-accent .link-hover__fill {
  background-color: var(--cl-accent);
}

.link-hover__content {
  position: relative;
  z-index: 1;
  transition: color var(--transition-fast);
}

.link-hover:hover .link-hover__fill {
  transform: translateX(0);
}

.link-hover:hover .link-hover__content {
  color: var(--cl-bg);
}

.link-hover.is-accent:hover .link-hover__content {
  color: var(--cl-bg);
}
</style>
