<script setup lang="ts">
// SkillBadge component - cyber monospace badge with glowing border on hover
defineProps<{
  name: string
  category?: string
  level?: string
}>()
</script>

<template>
  <div class="skill-badge">
    <span class="skill-badge__dot" aria-hidden="true" />
    <span class="skill-badge__name font-mono">{{ name }}</span>
    <span v-if="level" class="skill-badge__level label-mono">{{ level }}</span>
  </div>
</template>

<style scoped>
.skill-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem 1.6rem;
  background: rgba(18, 18, 18, 0.6);
  border: 1px solid var(--cl-line-light);
  border-radius: calc(var(--frame-radius) / 2);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  transition: border-color var(--transition-fast), transform var(--transition-fast), box-shadow var(--transition-fast);
  cursor: default;
}

.skill-badge:hover {
  border-color: var(--cl-accent);
  box-shadow: 0 0 12px rgba(192, 251, 80, 0.25);
  transform: translateY(-2px);
}

.skill-badge__dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: var(--cl-accent);
}

.skill-badge__name {
  font-size: 1.3rem;
  font-weight: 500;
  color: var(--cl-text);
  letter-spacing: 0.05em;
}

.skill-badge__level {
  font-size: 1rem;
  color: var(--cl-muted);
}
</style>
