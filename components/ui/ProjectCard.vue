<script setup lang="ts">
// ProjectCard component - cyber HUD project showcase card with corner brackets
defineProps<{
  id: string
  title: string
  category: string
  description: string
  tags: string[]
  link?: string
  github?: string
  stat?: string
}>()
</script>

<template>
  <article class="project-card">
    <!-- Corner HUD brackets -->
    <div class="project-card__corner project-card__corner--tl" aria-hidden="true" />
    <div class="project-card__corner project-card__corner--tr" aria-hidden="true" />
    <div class="project-card__corner project-card__corner--bl" aria-hidden="true" />
    <div class="project-card__corner project-card__corner--br" aria-hidden="true" />

    <!-- Card Header -->
    <div class="project-card__header flex justify-between items-center">
      <span class="project-card__id label-mono">{{ id }} // {{ category }}</span>
      <span v-if="stat" class="project-card__stat label-mono text-accent">{{ stat }}</span>
    </div>

    <!-- Visual viewport placeholder with holographic scanline effect -->
    <div class="project-card__visual">
      <div class="project-card__grid-bg" />
      <div class="project-card__scanline" />
      <div class="project-card__badge label-mono">SYS_DEPLOY // STABLE</div>
      <div class="project-card__symbol" aria-hidden="true">◈</div>
    </div>

    <!-- Card Body -->
    <div class="project-card__body">
      <h3 class="project-card__title">{{ title }}</h3>
      <p class="project-card__desc">{{ description }}</p>

      <!-- Tech tags -->
      <div class="project-card__tags">
        <span
          v-for="tag in tags"
          :key="tag"
          class="project-card__tag label-mono"
        >
          #{{ tag }}
        </span>
      </div>
    </div>

    <!-- Card Footer / Actions -->
    <div class="project-card__footer flex justify-between items-center">
      <a
        v-if="link"
        :href="link"
        target="_blank"
        rel="noopener noreferrer"
        class="project-card__link label-mono text-accent"
      >
        <span>LAUNCH SYSTEM</span>
        <span aria-hidden="true">↗</span>
      </a>
      <a
        v-if="github"
        :href="github"
        target="_blank"
        rel="noopener noreferrer"
        class="project-card__link label-mono"
      >
        <span>SOURCE</span>
        <span aria-hidden="true">↗</span>
      </a>
    </div>
  </article>
</template>

<style scoped>
.project-card {
  position: relative;
  background: var(--cl-bg-card);
  border: 1px solid var(--cl-line-light);
  border-radius: var(--frame-radius);
  padding: 2.4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: transform var(--transition-normal), border-color var(--transition-normal), box-shadow var(--transition-normal);
  overflow: hidden;
}

.project-card:hover {
  transform: translateY(-6px);
  border-color: var(--cl-accent);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5), 0 0 15px rgba(192, 251, 80, 0.15);
}

/* Corner accents */
.project-card__corner {
  position: absolute;
  width: 8px;
  height: 8px;
  border-color: var(--cl-line-light);
  border-style: solid;
  pointer-events: none;
  transition: border-color var(--transition-fast);
}

.project-card:hover .project-card__corner {
  border-color: var(--cl-accent);
}

.project-card__corner--tl { top: -1px; left: -1px; border-width: 1px 0 0 1px; }
.project-card__corner--tr { top: -1px; right: -1px; border-width: 1px 1px 0 0; }
.project-card__corner--bl { bottom: -1px; left: -1px; border-width: 0 0 1px 1px; }
.project-card__corner--br { bottom: -1px; right: -1px; border-width: 0 1px 1px 0; }

.project-card__header {
  margin-bottom: 2rem;
}

.project-card__id {
  font-size: 1.1rem;
  color: var(--cl-muted);
}

.project-card__stat {
  font-size: 1.1rem;
}

.project-card__visual {
  position: relative;
  width: 100%;
  height: 18rem;
  background: #0d0d0d;
  border: 1px solid var(--cl-line-light);
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2.4rem;
}

.project-card__grid-bg {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
  background-size: 20px 20px;
}

.project-card__scanline {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--cl-accent);
  opacity: 0.3;
  box-shadow: 0 0 10px var(--cl-accent);
  animation: scan 4s linear infinite;
}

@keyframes scan {
  0% { transform: translateY(0); }
  100% { transform: translateY(18rem); }
}

.project-card__badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  font-size: 0.9rem;
  padding: 0.2rem 0.6rem;
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid var(--cl-line-light);
  border-radius: 2px;
  color: var(--cl-text-muted);
}

.project-card__symbol {
  font-size: 4rem;
  color: var(--cl-accent);
  opacity: 0.6;
  transition: transform var(--transition-normal), opacity var(--transition-normal);
}

.project-card:hover .project-card__symbol {
  transform: scale(1.15) rotate(45deg);
  opacity: 0.9;
}

.project-card__body {
  flex: 1;
}

.project-card__title {
  font-size: 2.4rem;
  margin-bottom: 1.2rem;
  color: var(--cl-text);
  letter-spacing: -0.02em;
}

.project-card__desc {
  font-size: 1.4rem;
  color: var(--cl-text-muted);
  line-height: 1.6;
  margin-bottom: 2rem;
}

.project-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 2.4rem;
}

.project-card__tag {
  font-size: 1.1rem;
  padding: 0.3rem 0.8rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 3px;
  color: var(--cl-muted);
}

.project-card__footer {
  padding-top: 1.6rem;
  border-top: 1px dashed var(--cl-line-light);
}

.project-card__link {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 1.2rem;
  font-weight: 600;
  transition: color var(--transition-fast);
}

.project-card__link:hover {
  color: var(--cl-accent);
}
</style>
