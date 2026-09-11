<script setup lang="ts">
// Visual foundation and page shell matching refer.mp4 reference recording
import FolderTabCard from '~/components/cards/FolderTabCard.vue'
</script>

<template>
  <div class="story-experience">
    <!-- Chapter 01: Hero Genesis Stage -->
    <section id="chapter-project" class="stage-hero">
      <div class="stage-hero__centerpiece">
        <FolderTabCard badge="• DECIMAL CARD" />
      </div>
    </section>

    <!-- Chapter 02: Narrative Intro Split (A Familiar World) -->
    <section id="chapter-intro" class="stage-intro">
      <div class="intro-grid">
        <!-- Left Column: Story Lore & Video Pill -->
        <div class="intro-col intro-col--story">
          <span class="label-mono intro-index">• 001</span>
          <h1 class="display-h1 intro-headline">
            A FAMILIAR WORLD... SET ON A DIFFERENT PATH.
          </h1>
          <div class="intro-media-pill">
            <div class="pill-scanlines" />
            <div class="pill-runner-figure" />
          </div>
          <p class="intro-copy">
            Isolated within the New Eden safe zone, you witness humanity struggling to avoid descending into chaos.
          </p>
        </div>

        <!-- Center Column: Secondary Card View -->
        <div class="intro-col intro-col--center">
          <FolderTabCard badge="• DECIMAL CARD" />
        </div>

        <!-- Right Column: Tall Spire Guardian Perspective -->
        <div class="intro-col intro-col--guardian">
          <div class="spire-warrior-card">
            <div class="spire-warrior-inner">
              <svg viewBox="0 0 300 500" fill="none" class="spire-warrior-svg">
                <defs>
                  <linearGradient id="spireBeam" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#C0FB50" stop-opacity="0.9" />
                    <stop offset="50%" stop-color="#8CA6FF" stop-opacity="0.6" />
                    <stop offset="100%" stop-color="#5E4B8B" stop-opacity="0.2" />
                  </linearGradient>
                </defs>
                <!-- Cathedral Energy Spire in background -->
                <rect x="90" y="20" width="120" height="480" fill="url(#spireBeam)" opacity="0.4" />
                <line x1="150" y1="0" x2="150" y2="500" stroke="#C0FB50" stroke-width="2" />
                <!-- Armored warrior silhouette holding energy broadsword -->
                <path d="M120 220 L180 220 L200 320 L100 320 Z" fill="#181524" />
                <circle cx="150" cy="180" r="28" fill="#241D35" />
                <!-- Glowing Energy Broadsword -->
                <rect x="195" y="140" width="12" height="240" rx="3" fill="#8CA6FF" />
                <line x1="201" y1="130" x2="201" y2="390" stroke="#FFFFFF" stroke-width="2" />
              </svg>
            </div>
            <span class="label-mono spire-card-caption">• THE KEEP // GUARDIAN</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Chapter 03: The Keep Mountain Vista & Telemetry Preview -->
    <section id="chapter-keep" class="stage-telemetry">
      <div class="telemetry-inner">
        <div class="telemetry-top flex justify-between">
          <span class="label-mono telemetry-white">• 002</span>
          <div class="telemetry-coords telemetry-mono">
            <span>N 38°31' 14" / E 120°15' 08"</span>
            <span class="telemetry-alt">ALT 3510 M</span>
          </div>
        </div>

        <div class="telemetry-center">
          <h2 class="display-h1 telemetry-headline">
            YOU ARE A KEEPER: AN AGENT OF POWER AND CHANGE IN THIS WORLD.
          </h2>
        </div>

        <div class="telemetry-bottom flex justify-between items-center">
          <span class="telemetry-mono telemetry-white">• KEEPERS SYMBOL</span>
          <!-- 3D Contour Wireframe Graph SVG -->
          <div class="contour-mesh" aria-hidden="true">
            <svg viewBox="0 0 240 80" fill="none" class="contour-svg">
              <path d="M0 60 Q60 20, 120 40 T240 30" stroke="#8CA6FF" stroke-width="1.2" fill="none" />
              <path d="M0 65 Q60 28, 120 48 T240 38" stroke="#8CA6FF" stroke-width="1" stroke-opacity="0.6" fill="none" />
              <path d="M0 70 Q60 36, 120 56 T240 46" stroke="#8CA6FF" stroke-width="1" stroke-opacity="0.3" fill="none" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.story-experience {
  position: relative;
  width: 100%;
}

/* Chapter 01: Hero Genesis */
.stage-hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: calc(var(--menu-height) + 4rem) 2rem 6rem;
  background-color: var(--color-bg-lavender);
}

.stage-hero__centerpiece {
  display: flex;
  justify-content: center;
  width: 100%;
}

/* Chapter 02: Narrative Split */
.stage-intro {
  position: relative;
  min-height: 100vh;
  background-color: var(--color-bg-white);
  padding: 12rem clamp(2rem, 5vw, 6rem);
  display: flex;
  align-items: center;
}

.intro-grid {
  width: 100%;
  max-width: var(--content-max-width);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 6rem;
  align-items: center;
}

@media (min-width: 992px) {
  .intro-grid {
    grid-template-columns: 1.2fr 1fr 1fr;
    gap: 5rem;
  }
}

.intro-col--story {
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
}

.intro-index {
  color: var(--theme-text);
  font-size: 1.1rem;
}

.intro-headline {
  margin: 0;
  max-width: 44rem;
}

.intro-media-pill {
  position: relative;
  width: 16.0rem;
  height: 9.6rem;
  background-color: #2D263B;
  border-radius: var(--menu-radius);
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.pill-scanlines {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    rgba(255, 255, 255, 0.05) 0px,
    rgba(255, 255, 255, 0.05) 1px,
    transparent 1px,
    transparent 4px
  );
}

.pill-runner-figure {
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  width: 2rem;
  height: 3.5rem;
  background-color: #EAE6F8;
  clip-path: polygon(40% 0, 60% 0, 80% 40%, 60% 100%, 30% 100%, 20% 50%);
  filter: drop-shadow(0 0 6px rgba(192, 251, 80, 0.6));
}

.intro-copy {
  max-width: 32rem;
  color: var(--theme-text-muted);
}

.intro-col--center {
  display: flex;
  justify-content: center;
}

.intro-col--guardian {
  display: flex;
  justify-content: center;
}

.spire-warrior-card {
  position: relative;
  width: 100%;
  max-width: 34.0rem;
  height: 56.0rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.spire-warrior-inner {
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 50% 30%, #DED7F2 0%, #BDB2DC 100%);
  border-radius: var(--menu-radius);
  overflow: hidden;
  box-shadow: 0 16px 40px rgba(94, 75, 139, 0.16);
  transform: perspective(1000px) rotateY(-4deg) rotateX(2deg);
  transition: transform var(--transition-normal);
}

.spire-warrior-inner:hover {
  transform: perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1.02);
}

.spire-warrior-svg {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.spire-card-caption {
  font-size: 1.1rem;
}

/* Chapter 03: Telemetry Panoramic */
.stage-telemetry {
  position: relative;
  min-height: 120vh;
  background: linear-gradient(180deg, #BA7A69 0%, #A26258 50%, #764147 100%);
  color: #FFFFFF;
  padding: 10rem clamp(2rem, 5vw, 6rem);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.telemetry-inner {
  width: 100%;
  max-width: var(--content-max-width);
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8rem;
}

.telemetry-white {
  color: #FFFFFF !important;
}

.telemetry-coords {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.4rem;
  color: #FFFFFF;
}

.telemetry-alt {
  color: var(--color-accent-green);
  font-weight: 600;
}

.telemetry-headline {
  max-width: 86.0rem;
  color: #FFFFFF;
  line-height: 0.96;
}

.contour-mesh {
  width: 20.0rem;
  height: 6.0rem;
}

.contour-svg {
  width: 100%;
  height: 100%;
}
</style>
