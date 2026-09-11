<script setup lang="ts">
// Bottom-left audio indicator [01] with animated visualizer bars
defineProps<{
  code?: string
}>()

const isPlaying = ref(false)

const toggle = () => {
  isPlaying.value = !isPlaying.value
}
</script>

<template>
  <button
    type="button"
    class="audio-indicator"
    :class="{ 'is-active': isPlaying }"
    aria-label="Toggle Ambient Audio"
    @click="toggle"
  >
    <span class="audio-bars" aria-hidden="true">
      <span class="bar bar-1" />
      <span class="bar bar-2" />
      <span class="bar bar-3" />
      <span class="bar bar-4" />
      <span class="bar bar-5" />
    </span>
    <span class="audio-code label-mono">{{ code || '[01]' }}</span>
  </button>
</template>

<style scoped>
.audio-indicator {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.4rem 0.8rem;
  color: var(--theme-text-muted);
  cursor: pointer;
  pointer-events: auto;
  transition: color var(--transition-fast);
}

.audio-indicator:hover {
  color: var(--theme-text);
}

.audio-bars {
  display: flex;
  align-items: center;
  gap: 2px;
  height: 1.2rem;
}

.bar {
  display: block;
  width: 1px;
  height: 100%;
  background-color: currentColor;
  transform-origin: center;
  transform: scaleY(0.3);
  transition: transform var(--transition-fast);
}

.audio-indicator.is-active .bar-1 { animation: wave 1s ease-in-out infinite alternate; }
.audio-indicator.is-active .bar-2 { animation: wave 0.8s ease-in-out 0.2s infinite alternate; }
.audio-indicator.is-active .bar-3 { animation: wave 1.2s ease-in-out 0.4s infinite alternate; }
.audio-indicator.is-active .bar-4 { animation: wave 0.7s ease-in-out 0.1s infinite alternate; }
.audio-indicator.is-active .bar-5 { animation: wave 1.1s ease-in-out 0.3s infinite alternate; }

@keyframes wave {
  0% { transform: scaleY(0.2); }
  100% { transform: scaleY(1); }
}

.audio-code {
  font-size: 1.0rem;
  letter-spacing: 0.1em;
}
</style>
