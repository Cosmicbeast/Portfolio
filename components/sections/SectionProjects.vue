<script setup lang="ts">
// SectionProjects component - showcase grid of high-fidelity developer projects
import DotLabel from '~/components/animation/DotLabel.vue'
import ScrollReveal from '~/components/animation/ScrollReveal.vue'
import ScrambleText from '~/components/animation/ScrambleText.vue'
import ProjectCard from '~/components/ui/ProjectCard.vue'

const projects = [
  {
    id: 'PRJ_01',
    title: 'AETHERIS // 3D VOID ENGINE',
    category: 'WEBGL / THREE.JS',
    description: 'Autonomous procedural universe generator rendering millions of volumetric particles with real-time physics simulations and audio frequency reactivity.',
    tags: ['Three.js', 'GLSL Shaders', 'Web Audio API', 'TypeScript'],
    link: 'https://github.com/Cosmicbeast',
    github: 'https://github.com/Cosmicbeast',
    stat: '60 FPS // 50K PARTICLES'
  },
  {
    id: 'PRJ_02',
    title: 'NEXUS // REALTIME PROTOCOL',
    category: 'DISTRIBUTED SYSTEMS',
    description: 'Ultra-low latency microservices orchestration network and telemetry stream with cryptographic event verification and distributed node consensus.',
    tags: ['Node.js', 'WebSockets', 'Redis', 'Nuxt 3', 'Docker'],
    link: 'https://github.com/Cosmicbeast',
    github: 'https://github.com/Cosmicbeast',
    stat: '< 2MS LATENCY'
  },
  {
    id: 'PRJ_03',
    title: 'CYBERPUNK HUD INTERFACE',
    category: 'CREATIVE FRONTEND',
    description: 'Framer/GSAP motion architecture modeled after military-grade tactical interfaces, featuring interactive scanlines, spatial audio feedback, and glassmorphism.',
    tags: ['Vue 3', 'GSAP', 'Lenis', 'CSS Tokens', 'SVG'],
    link: 'https://github.com/Cosmicbeast',
    github: 'https://github.com/Cosmicbeast',
    stat: '100% LIGHTHOUSE'
  },
  {
    id: 'PRJ_04',
    title: 'SYNAPSE // NEURAL AGENT SDK',
    category: 'APPLIED AI',
    description: 'Self-orchestrating agent toolkit capable of recursive code synthesis, automated integration testing, and autonomous multi-turn debugging pipelines.',
    tags: ['Python', 'TypeScript', 'LLM Chains', 'Vector DB'],
    link: 'https://github.com/Cosmicbeast',
    github: 'https://github.com/Cosmicbeast',
    stat: '99.4% ACCURACY'
  }
]
</script>

<template>
  <section id="projects" class="section-projects section-padding">
    <div class="site-container">
      <!-- Header -->
      <div class="section-header">
        <DotLabel label="02 // PROJECTS" sublabel="FEATURED_WORKS" />
        <h2 class="section-title">
          <ScrambleText text="SYSTEMS & EXPERIMENTS" trigger="mount" />
        </h2>
      </div>

      <!-- Projects Grid -->
      <div class="projects-grid">
        <ScrollReveal
          v-for="(project, index) in projects"
          :key="project.id"
          animation="fade-up"
          :delay="index * 0.12"
        >
          <ProjectCard
            :id="project.id"
            :title="project.title"
            :category="project.category"
            :description="project.description"
            :tags="project.tags"
            :link="project.link"
            :github="project.github"
            :stat="project.stat"
          />
        </ScrollReveal>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-projects {
  position: relative;
  width: 100%;
}

.section-header {
  margin-bottom: 5rem;
}

.section-title {
  margin-top: 1.6rem;
  letter-spacing: -0.03em;
}

.projects-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
}

@media (min-width: 768px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
