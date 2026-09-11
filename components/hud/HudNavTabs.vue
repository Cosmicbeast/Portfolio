<script setup lang="ts">
// Segmented chapter navigation tabs with dynamic active bullet dot
import { useLenis } from '~/composables/useLenis'

interface NavTab {
  id: string
  label: string
  target: string
  order: number
}

const props = defineProps<{
  tabs: NavTab[]
  activeId?: string
}>()

const emit = defineEmits<{
  (e: 'select', id: string): void
}>()

const { scrollTo } = useLenis()
const currentActive = ref(props.activeId || (props.tabs[0]?.id ?? 'project'))

watch(() => props.activeId, (newVal) => {
  if (newVal) currentActive.value = newVal
})

const handleTabClick = (tab: NavTab) => {
  currentActive.value = tab.id
  emit('select', tab.id)
  scrollTo(tab.target)
}
</script>

<template>
  <nav class="hud-nav-tabs" aria-label="Chapter Navigation">
    <ul class="tab-list">
      <li
        v-for="tab in tabs"
        :key="tab.id"
        class="tab-item"
      >
        <button
          type="button"
          class="tab-btn label-mono"
          :class="{ 'is-active': currentActive === tab.id }"
          @click="handleTabClick(tab)"
        >
          <span class="tab-dot" aria-hidden="true">•</span>
          <span class="tab-label">{{ tab.label }}</span>
        </button>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.hud-nav-tabs {
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
}

.tab-list {
  display: flex;
  align-items: center;
  gap: clamp(1.6rem, 3vw, 3.6rem);
}

.tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  color: var(--theme-text);
  opacity: 0.4;
  cursor: pointer;
  padding: 0.6rem 0.4rem;
  font-size: 1.1rem;
  letter-spacing: 0.08em;
  transition: opacity var(--transition-fast), color var(--transition-theme);
  white-space: nowrap;
}

.tab-dot {
  display: inline-block;
  opacity: 0;
  transform: scale(0.6);
  transition: opacity var(--transition-fast), transform var(--transition-fast);
}

.tab-btn:hover {
  opacity: 0.8;
}

.tab-btn.is-active {
  opacity: 1;
}

.tab-btn.is-active .tab-dot {
  opacity: 1;
  transform: scale(1);
}
</style>
