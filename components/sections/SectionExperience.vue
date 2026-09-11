<script setup lang="ts">
// SectionExperience component - vertical timeline of software engineering roles & contracts
import DotLabel from '~/components/animation/DotLabel.vue'
import ScrollReveal from '~/components/animation/ScrollReveal.vue'
import ScrambleText from '~/components/animation/ScrambleText.vue'

const timeline = [
  {
    period: '2024 — PRESENT',
    role: 'STAFF CREATIVE ARCHITECT',
    company: 'INDEPENDENT / LABS',
    description: 'Leading the technical design and deployment of bespoke 3D WebGL interfaces, real-time audio systems, and high-performance Vue/Nuxt platforms for global clients.',
    skills: ['Nuxt 3', 'Three.js', 'Vite', 'WebAudio', 'Distributed Node']
  },
  {
    period: '2022 — 2024',
    role: 'SENIOR FULL-STACK ENGINEER',
    company: 'CYBERPULSE SYSTEMS',
    description: 'Architected scalable frontend micro-frontends and WebSocket data visualization dashboards handling 100k+ concurrent events per second with sub-10ms UI renders.',
    skills: ['TypeScript', 'Vue 3', 'GSAP', 'Docker', 'Redis Streams']
  },
  {
    period: '2020 — 2022',
    role: 'INTERACTIVE FRONTEND DEVELOPER',
    company: 'NEXUS STUDIOS',
    description: 'Engineered award-winning interactive landing pages, generative Canvas visualizers, and responsive e-commerce web applications with strict accessibility compliance.',
    skills: ['JavaScript ES6+', 'WebGL', 'CSS Architecture', 'SSR']
  }
]
</script>

<template>
  <section id="experience" class="section-experience section-padding">
    <div class="site-container">
      <!-- Header -->
      <div class="section-header">
        <DotLabel label="03 // EXPERIENCE" sublabel="TIMELINE_LOG" />
        <h2 class="section-title">
          <ScrambleText text="CAREER & DEPLOYMENTS" trigger="mount" />
        </h2>
      </div>

      <!-- Timeline Container -->
      <div class="timeline">
        <div class="timeline__line" aria-hidden="true" />

        <div class="timeline__items">
          <ScrollReveal
            v-for="(item, index) in timeline"
            :key="item.period"
            animation="fade-up"
            :delay="index * 0.15"
          >
            <div class="timeline-card">
              <!-- Timeline node indicator -->
              <div class="timeline-node" aria-hidden="true">
                <div class="timeline-node__inner" />
              </div>

              <!-- Content -->
              <div class="timeline-content">
                <div class="timeline-meta flex justify-between items-center">
                  <span class="timeline-period label-mono text-accent">{{ item.period }}</span>
                  <span class="timeline-company label-mono">{{ item.company }}</span>
                </div>

                <h3 class="timeline-role">{{ item.role }}</h3>
                <p class="timeline-desc">{{ item.description }}</p>

                <div class="timeline-tags">
                  <span
                    v-for="s in item.skills"
                    :key="s"
                    class="timeline-tag label-mono"
                  >
                    {{ s }}
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-experience {
  position: relative;
  width: 100%;
}

.section-header {
  margin-bottom: 6rem;
}

.section-title {
  margin-top: 1.6rem;
  letter-spacing: -0.03em;
}

.timeline {
  position: relative;
  max-width: 90rem;
  margin: 0 auto;
}

.timeline__line {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 1.5rem;
  width: 1px;
  background: linear-gradient(
    to bottom,
    var(--cl-accent),
    rgba(255, 255, 255, 0.1) 80%,
    transparent
  );
}

@media (min-width: 768px) {
  .timeline__line {
    left: 2rem;
  }
}

.timeline__items {
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

.timeline-card {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 3rem;
  padding-left: 4.5rem;
}

@media (min-width: 768px) {
  .timeline-card {
    padding-left: 6rem;
  }
}

.timeline-node {
  position: absolute;
  left: 0.9rem;
  top: 0.6rem;
  width: 1.3rem;
  height: 1.3rem;
  border-radius: 50%;
  background: #000000;
  border: 2px solid var(--cl-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 10px rgba(192, 251, 80, 0.4);
}

@media (min-width: 768px) {
  .timeline-node {
    left: 1.4rem;
  }
}

.timeline-node__inner {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: var(--cl-accent);
}

.timeline-content {
  background: var(--cl-bg-card);
  border: 1px solid var(--cl-line-light);
  border-radius: var(--frame-radius);
  padding: 3rem;
  width: 100%;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: border-color var(--transition-fast), transform var(--transition-fast);
}

.timeline-content:hover {
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateX(4px);
}

.timeline-meta {
  margin-bottom: 1.4rem;
}

.timeline-period {
  font-size: 1.2rem;
  font-weight: 700;
}

.timeline-company {
  font-size: 1.1rem;
  color: var(--cl-muted);
}

.timeline-role {
  font-size: clamp(2rem, 3vw, 2.6rem);
  margin-bottom: 1.4rem;
  letter-spacing: -0.02em;
}

.timeline-desc {
  font-size: 1.5rem;
  color: var(--cl-text-muted);
  line-height: 1.6;
  margin-bottom: 2rem;
}

.timeline-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.timeline-tag {
  font-size: 1.1rem;
  padding: 0.3rem 0.8rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 3px;
  color: var(--cl-muted);
}
</style>
