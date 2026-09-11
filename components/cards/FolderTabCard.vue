<script setup lang="ts">
// FolderTabCard component with asymmetrical folder notch silhouette matching refer.mp4
const props = withDefaults(
  defineProps<{
    badge?: string
    image?: string
    alt?: string
    interactive?: boolean
  }>(),
  {
    badge: '• DECIMAL CARD',
    image: '/images/hero-protagonist.jpg',
    alt: 'Cyberpunk Protagonist with Cyan Visor and Celestial Holographic Aura',
    interactive: true
  }
)

const cardRef = ref<HTMLElement | null>(null)
const rotateX = ref(0)
const rotateY = ref(0)
const isHovered = ref(false)

const handleMouseMove = (e: MouseEvent) => {
  if (!props.interactive || !cardRef.value) return
  const rect = cardRef.value.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width // 0 to 1
  const y = (e.clientY - rect.top) / rect.height // 0 to 1

  // Tilt within subtle range (-6deg to +6deg)
  rotateY.value = (x - 0.5) * 12
  rotateX.value = (0.5 - y) * 10
}

const handleMouseEnter = () => {
  if (!props.interactive) return
  isHovered.value = true
}

const handleMouseLeave = () => {
  if (!props.interactive) return
  isHovered.value = false
  rotateX.value = 0
  rotateY.value = 0
}
</script>

<template>
  <div
    ref="cardRef"
    class="folder-tab-card"
    :class="{ 'is-hovered': isHovered }"
    @mousemove="handleMouseMove"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- Top badge label -->
    <div v-if="badge" class="card-badge label-mono">
      {{ badge }}
    </div>

    <!-- 3D Perspective Tilt Container -->
    <div
      class="card-tilt-container"
      :style="{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
      }"
    >
      <!-- Outer card container with folder-tab shape -->
      <div class="card-shape-wrapper">
        <!-- Main Artwork Media Surface -->
        <div class="card-media-surface">
          <slot>
            <img
              v-if="image"
              :src="image"
              :alt="alt"
              class="card-hero-image"
              loading="eager"
            />
            <!-- Fallback vector if image fails -->
            <div v-else class="protagonist-illustration" aria-hidden="true">
              <div class="celestial-aura" />
              <div class="character-silhouette" />
            </div>
          </slot>
        </div>

        <!-- Subtle Inner Highlight Rim -->
        <div class="card-inner-rim" aria-hidden="true" />
      </div>

      <!-- Outer 1px Silhouette Border SVG Overlay -->
      <svg class="card-border-svg" viewBox="0 0 480 600" fill="none" preserveAspectRatio="none" aria-hidden="true">
        <!-- Exact polygon path matching clip-path:
             Start at top-left (0,0), top-right (480,0),
             right notch corner (480, 568) to (448, 600),
             bottom-left notch (36, 600) to (0, 564), close to (0,0) -->
        <path
          d="M 1 1 
             L 479 1 
             L 479 568 
             L 448 599 
             L 36 599 
             L 1 564 
             Z"
          stroke="rgba(0, 0, 0, 0.14)"
          stroke-width="1.5"
          vector-effect="non-scaling-stroke"
          fill="none"
        />
      </svg>
    </div>
  </div>
</template>

<style scoped>
.folder-tab-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: min(42.0rem, 54vh);
  user-select: none;
}

.card-badge {
  margin-bottom: 1.0rem;
  color: var(--theme-text);
  font-weight: 600;
  font-size: 1.1rem;
  letter-spacing: 0.12em;
  opacity: 0.85;
  transition: opacity var(--transition-fast);
}

.card-tilt-container {
  position: relative;
  width: 100%;
  transform-style: preserve-3d;
  transition: transform 0.18s cubic-bezier(0.16, 1, 0.3, 1);
}

.card-shape-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 5;
  background-color: #D6CEEB;
  /* Asymmetrical Folder-Tab Clip Path matching reference recording */
  clip-path: polygon(
    0 0,
    100% 0,
    100% calc(100% - 3.2rem),
    calc(100% - 3.2rem) 100%,
    3.6rem 100%,
    0 calc(100% - 3.6rem)
  );
  border-radius: 1.8rem;
  overflow: hidden;
  box-shadow: 
    0 24px 60px rgba(94, 75, 139, 0.18),
    0 4px 16px rgba(0, 0, 0, 0.06);
  transform: translateZ(0);
}

.card-media-surface {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at 50% 35%, #E3DBF7 0%, #C4B9E5 100%);
}

.card-hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 20%;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.folder-tab-card.is-hovered .card-hero-image {
  transform: scale(1.03);
}

.card-inner-rim {
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: inherit;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.35) 0%,
    transparent 20%,
    transparent 80%,
    rgba(0, 0, 0, 0.15) 100%
  );
}

/* Crisp 1px outline contour */
.card-border-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2;
}

/* Fallback vector illustration */
.protagonist-illustration {
  position: relative;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 60% 30%, #E3DBF7 0%, #C4B9E5 100%);
}

@media (max-width: 768px) {
  .folder-tab-card {
    max-width: 86vw;
  }
}
</style>
