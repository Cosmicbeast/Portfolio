<script setup lang="ts">
// Persistent SIGN IN button matching the reference top-right pill design
defineProps<{
  label?: string
}>()
</script>

<template>
  <button
    type="button"
    class="btn-signin label-mono"
    aria-label="Sign In"
  >
    {{ label || 'SIGN IN' }}
  </button>
</template>

<style scoped>
.btn-signin {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 2.4rem;
  background-color: var(--theme-btn-bg);
  color: var(--theme-btn-text);
  border: 1px solid var(--theme-line-outer);
  border-radius: 9999px;
  font-weight: 700;
  font-size: 1.1rem;
  letter-spacing: 0.12em;
  cursor: pointer;
  pointer-events: auto;
  transition: transform var(--transition-fast), background-color var(--transition-fast), color var(--transition-fast), box-shadow var(--transition-fast);
}

.btn-signin:hover {
  transform: scale(1.03);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

.btn-signin:active {
  transform: scale(0.97);
}

@media (max-width: 768px) {
  .btn-signin {
    padding: 0.6rem 1.6rem;
    font-size: 1.0rem;
    letter-spacing: 0.08em;
  }
}
</style>
