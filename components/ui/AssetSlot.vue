<script setup lang="ts">
// AssetSlot component: Production-ready asset container with CLS prevention and technical fallback annotations
const props = withDefaults(
  defineProps<{
    assetId: string
    filename?: string
    aspectRatio?: string
    alt?: string
    loading?: 'lazy' | 'eager'
    objectFit?: 'cover' | 'contain'
    objectPosition?: string
    showSlotTag?: boolean
  }>(),
  {
    filename: '',
    aspectRatio: '16 / 9',
    alt: 'Visual Narrative Asset',
    loading: 'lazy',
    objectFit: 'cover',
    objectPosition: 'center',
    showSlotTag: false
  }
)

const imageLoaded = ref(false)
const imageFailed = ref(false)

const handleLoad = () => {
  imageLoaded.value = true
}

const handleError = () => {
  imageFailed.value = true
}

const resolvedSrc = computed(() => {
  if (!props.filename) return ''
  return props.filename.startsWith('/') ? props.filename : `/images/${props.filename}`
})
</script>

<template>
  <div
    class="asset-slot-container"
    :style="{ aspectRatio: aspectRatio }"
    :data-asset-id="assetId"
  >
    <!-- Actual Image if Available and Not Errored -->
    <img
      v-if="resolvedSrc && !imageFailed"
      :src="resolvedSrc"
      :alt="alt"
      :loading="loading"
      decoding="async"
      class="asset-image"
      :style="{ objectFit: objectFit, objectPosition: objectPosition }"
      @load="handleLoad"
      @error="handleError"
    />

    <!-- Fallback Slot Content (Vector/Silhouette Composition) -->
    <div
      v-show="!resolvedSrc || imageFailed"
      class="asset-fallback-surface"
    >
      <slot />

      <!-- Optional Technical Slot Marker Annotation -->
      <div v-if="showSlotTag" class="asset-slot-tag telemetry-mono" aria-hidden="true">
        <span>ASSET REQ // {{ assetId }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.asset-slot-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  contain: layout paint;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
}

.asset-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
}

.asset-fallback-surface {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.asset-slot-tag {
  position: absolute;
  bottom: 0.8rem;
  left: 1.0rem;
  z-index: 5;
  background: rgba(0, 0, 0, 0.65);
  color: var(--color-accent-green);
  padding: 0.3rem 0.8rem;
  border-radius: 0.4rem;
  font-size: 0.75rem;
  letter-spacing: 0.14em;
  backdrop-filter: blur(4px);
  pointer-events: none;
}
</style>
