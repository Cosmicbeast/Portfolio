<script setup lang="ts">
// FolderTabCard component with asymmetrical tab cut silhouette matching the reference hero card
defineProps<{
  badge?: string
  alt?: string
}>()
</script>

<template>
  <div class="folder-tab-card">
    <!-- Top badge label -->
    <div v-if="badge" class="card-badge label-mono">
      {{ badge }}
    </div>

    <!-- Outer card container with folder-tab shape -->
    <div class="card-shape-wrapper">
      <div class="card-media-surface">
        <slot>
          <!-- Stylized Cyberpunk Protagonist Artwork Vector / Canvas placeholder -->
          <div class="protagonist-illustration" aria-label="Cyberpunk protagonist with glowing cybernetic eye and celestial creature aura">
            <div class="celestial-aura" />
            <div class="character-silhouette">
              <!-- Digital art styling representing the anime protagonist in refer.mp4 -->
              <svg viewBox="0 0 400 500" fill="none" class="character-svg">
                <defs>
                  <linearGradient id="cyberHolo" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#8CA6FF" stop-opacity="0.8" />
                    <stop offset="100%" stop-color="#C0FB50" stop-opacity="0.9" />
                  </linearGradient>
                  <linearGradient id="hairGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#5E4B8B" />
                    <stop offset="100%" stop-color="#2D1F47" />
                  </linearGradient>
                  <radialGradient id="auraGlow" cx="65%" cy="30%" r="50%">
                    <stop offset="0%" stop-color="#C5E4F8" stop-opacity="0.85" />
                    <stop offset="60%" stop-color="#8CA6FF" stop-opacity="0.3" />
                    <stop offset="100%" stop-color="#8CA6FF" stop-opacity="0" />
                  </radialGradient>
                </defs>

                <!-- Holographic fox/creature skull aura -->
                <circle cx="280" cy="160" r="90" fill="url(#auraGlow)" />
                <path
                  d="M230 150 C260 90, 340 100, 320 180 C310 220, 240 210, 230 150 Z"
                  fill="rgba(220, 240, 255, 0.75)"
                  filter="blur(1px)"
                />
                <circle cx="270" cy="150" r="8" fill="#5E4B8B" />

                <!-- Character head and face silhouette -->
                <path
                  d="M140 220 C140 160, 220 150, 240 210 C250 240, 240 290, 210 320 L195 360 L180 320 C150 310, 140 260, 140 220 Z"
                  fill="#F5DECE"
                />
                <!-- Cyberpunk hair cut -->
                <path
                  d="M120 200 C110 130, 200 90, 260 130 C250 170, 220 190, 200 190 C180 190, 160 170, 140 210 Z"
                  fill="url(#hairGrad)"
                />
                <!-- Cyber eye visor / ocular implant -->
                <circle cx="225" cy="225" r="7" fill="#8CA6FF" />
                <circle cx="225" cy="225" r="3" fill="#C0FB50" />
                <rect x="235" y="222" width="25" height="4" rx="2" fill="url(#cyberHolo)" />

                <!-- Neck collar cybernetics -->
                <path d="M180 340 L215 340 L220 380 L175 380 Z" fill="#1C1826" />
                <path d="M190 350 L205 350" stroke="#C0FB50" stroke-width="2" />

                <!-- Tactical Jacket -->
                <path
                  d="M130 380 C150 370, 240 370, 270 380 L290 500 L110 500 Z"
                  fill="#2A233A"
                />
                <path d="M185 380 L185 500" stroke="#8CA6FF" stroke-width="2" stroke-dasharray="8 4" />
              </svg>
            </div>
          </div>
        </slot>
      </div>
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
  max-width: 48.0rem;
  user-select: none;
}

.card-badge {
  margin-bottom: 0.8rem;
  color: var(--theme-text);
  font-weight: 600;
  font-size: 1.1rem;
  letter-spacing: 0.12em;
}

.card-shape-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 5;
  background-color: #D6CEEB;
  /* Asymmetrical Folder-Tab Clip Path matching reference */
  clip-path: polygon(
    0 0,
    100% 0,
    100% calc(100% - 3.2rem),
    calc(100% - 3.2rem) 100%,
    4.0rem 100%,
    0 calc(100% - 4.0rem)
  );
  border-radius: var(--menu-radius);
  overflow: hidden;
  box-shadow: 0 20px 48px rgba(94, 75, 139, 0.15);
  transition: transform var(--transition-normal);
}

.card-media-surface {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.protagonist-illustration {
  position: relative;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 60% 30%, #E3DBF7 0%, #C4B9E5 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.character-svg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: translateY(2rem) scale(1.1);
  transform-origin: center bottom;
}
</style>
