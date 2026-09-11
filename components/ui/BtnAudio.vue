<script setup lang="ts">
// BtnAudio component - 5-bar animated audio waveform toggle
import { useAudio } from '~/composables/useAudio'

const { isPlaying, toggleAudio } = useAudio()
</script>

<template>
  <button
    type="button"
    class="btn-audio"
    :class="{ 'is-playing': isPlaying }"
    :aria-pressed="isPlaying"
    aria-label="Toggle Ambient Audio"
    @click="toggleAudio"
  >
    <div class="btn-audio__bars" aria-hidden="true">
      <span class="btn-audio__bar bar-1" />
      <span class="btn-audio__bar bar-2" />
      <span class="btn-audio__bar bar-3" />
      <span class="btn-audio__bar bar-4" />
      <span class="btn-audio__bar bar-5" />
    </div>
    <span class="btn-audio__label label-mono">
      {{ isPlaying ? 'AUDIO: ON' : 'AUDIO: OFF' }}
    </span>
  </button>
</template>

<style scoped>
.btn-audio {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  padding: 0.6rem 1.2rem;
  background: rgba(14, 14, 14, 0.75);
  border: 1px solid var(--cl-line-light);
  border-radius: var(--frame-radius);
  color: var(--cl-text-muted);
  cursor: pointer;
  pointer-events: auto;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  transition: border-color var(--transition-fast), color var(--transition-fast);
}

.btn-audio:hover {
  border-color: var(--cl-accent);
  color: var(--cl-text);
}

.btn-audio.is-playing {
  border-color: rgba(192, 251, 80, 0.5);
  color: var(--cl-accent);
}

.btn-audio__bars {
  display: flex;
  align-items: center;
  gap: 3px;
  height: 1.4rem;
}

.btn-audio__bar {
  display: block;
  width: 2px;
  height: 100%;
  background-color: currentColor;
  transform-origin: center;
  transform: scaleY(0.2);
  transition: transform var(--transition-fast);
}

.btn-audio.is-playing .bar-1 { animation: sound-wave 1s ease-in-out infinite alternate; }
.btn-audio.is-playing .bar-2 { animation: sound-wave 0.8s ease-in-out 0.2s infinite alternate; }
.btn-audio.is-playing .bar-3 { animation: sound-wave 1.2s ease-in-out 0.4s infinite alternate; }
.btn-audio.is-playing .bar-4 { animation: sound-wave 0.7s ease-in-out 0.1s infinite alternate; }
.btn-audio.is-playing .bar-5 { animation: sound-wave 1.1s ease-in-out 0.3s infinite alternate; }

@keyframes sound-wave {
  0% { transform: scaleY(0.2); }
  100% { transform: scaleY(1); }
}

.btn-audio__label {
  font-size: 1.1rem;
  letter-spacing: 0.12em;
}
</style>
