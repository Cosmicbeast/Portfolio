<script setup lang="ts">
// DotLabel component - section header indicator pattern (e.g., ● ABOUT)
withDefaults(
  defineProps<{
    label: string
    sublabel?: string
    accent?: boolean
    pulse?: boolean
  }>(),
  {
    sublabel: '',
    accent: true,
    pulse: true
  }
)
</script>

<template>
  <div class="dot-label" :class="{ 'is-accent': accent }">
    <span class="dot-label__dot" :class="{ 'is-pulsing': pulse }" aria-hidden="true" />
    <span class="dot-label__text label-mono">{{ label }}</span>
    <span v-if="sublabel" class="dot-label__sub label-mono">{{ sublabel }}</span>
  </div>
</template>

<style scoped>
.dot-label {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  user-select: none;
}

.dot-label__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--cl-text);
  transition: background-color var(--transition-fast);
}

.dot-label.is-accent .dot-label__dot {
  background-color: var(--cl-accent);
  box-shadow: 0 0 8px var(--cl-accent);
}

.dot-label__dot.is-pulsing {
  animation: dot-pulse 2.2s infinite ease-in-out;
}

@keyframes dot-pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(0.7);
    opacity: 0.4;
  }
}

.dot-label__text {
  font-weight: 700;
  font-size: 1.2rem;
  letter-spacing: 0.16em;
  color: var(--cl-text);
}

.dot-label.is-accent .dot-label__text {
  color: var(--cl-accent);
}

.dot-label__sub {
  font-size: 1.1rem;
  color: var(--cl-muted);
  padding-left: 0.4rem;
  border-left: 1px solid var(--cl-line-light);
}
</style>
