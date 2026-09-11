<script setup lang="ts">
// Custom application error boundary matching HUD cyber aesthetic
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const handleClearError = () => {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="error-page">
    <div class="error-frame" aria-hidden="true" />
    
    <div class="error-content">
      <span class="label-mono error-badge text-accent">
        // PROTOCOL_ERR: {{ error.statusCode || 404 }}
      </span>

      <h1 class="display-h1 error-title">
        {{ error.statusCode === 404 ? 'SECTOR UNCHARTED' : 'SIGNAL COMPROMISED' }}
      </h1>

      <p class="error-message">
        {{ error.message || 'The requested telemetry coordinates do not correspond to an active database sector.' }}
      </p>

      <button
        type="button"
        class="error-cta label-mono"
        @click="handleClearError"
      >
        CLEAR ERROR // RETURN TO BASE
      </button>
    </div>
  </div>
</template>

<style scoped>
.error-page {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #000000;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  overflow: hidden;
  user-select: none;
}

.error-frame {
  position: absolute;
  inset: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 2rem;
  pointer-events: none;
}

.error-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 2.4rem;
  max-width: 58rem;
}

.error-badge {
  font-size: 1.2rem;
  letter-spacing: 0.16em;
}

.error-title {
  margin: 0;
  line-height: 0.94;
  color: #FFFFFF;
}

.error-message {
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.4rem;
  line-height: 1.6;
}

.error-cta {
  margin-top: 1rem;
  padding: 1.2rem 2.8rem;
  background-color: #FFFFFF;
  color: #000000;
  border-radius: 9999px;
  font-weight: 700;
  cursor: pointer;
  transition: transform var(--transition-fast), background-color var(--transition-fast);
}

.error-cta:hover {
  transform: scale(1.04);
  background-color: var(--color-accent-green);
}
</style>
