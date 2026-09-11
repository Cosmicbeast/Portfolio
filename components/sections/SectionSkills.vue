<script setup lang="ts">
// SectionSkills component - organized technical competencies categorized with SkillBadges
import DotLabel from '~/components/animation/DotLabel.vue'
import ScrollReveal from '~/components/animation/ScrollReveal.vue'
import ScrambleText from '~/components/animation/ScrambleText.vue'
import SkillBadge from '~/components/ui/SkillBadge.vue'

const skillGroups = [
  {
    category: 'CREATIVE & FRONTEND',
    skills: [
      { name: 'Three.js / WebGL', level: 'ADVANCED' },
      { name: 'Vue 3 / Nuxt 3', level: 'EXPERT' },
      { name: 'TypeScript', level: 'EXPERT' },
      { name: 'GSAP / ScrollTrigger', level: 'ADVANCED' },
      { name: 'Lenis Smooth Scroll', level: 'PROFICIENT' },
      { name: 'GLSL Shaders', level: 'INTERMEDIATE' },
      { name: 'Web Audio API', level: 'PROFICIENT' },
      { name: 'CSS Architecture / Tokens', level: 'EXPERT' }
    ]
  },
  {
    category: 'BACKEND & CLOUD SYSTEMS',
    skills: [
      { name: 'Node.js / Express', level: 'ADVANCED' },
      { name: 'Nitro Engine / SSR', level: 'ADVANCED' },
      { name: 'REST & GraphQL APIs', level: 'ADVANCED' },
      { name: 'Redis / In-Memory Store', level: 'PROFICIENT' },
      { name: 'PostgreSQL / Prisma', level: 'ADVANCED' },
      { name: 'Docker / Containers', level: 'PROFICIENT' },
      { name: 'WebSockets / Realtime', level: 'ADVANCED' }
    ]
  },
  {
    category: 'TOOLING, WORKFLOW & STANDARDS',
    skills: [
      { name: 'Vite / Rollup', level: 'EXPERT' },
      { name: 'Git / CI/CD Workflows', level: 'EXPERT' },
      { name: 'Performance Optimization', level: 'EXPERT' },
      { name: 'WCAG Accessibility', level: 'ADVANCED' },
      { name: 'Lighthouse 100 Standards', level: 'EXPERT' },
      { name: 'Linux / Shell Scripting', level: 'ADVANCED' }
    ]
  }
]
</script>

<template>
  <section id="skills" class="section-skills section-padding">
    <div class="site-container">
      <!-- Header -->
      <div class="section-header">
        <DotLabel label="04 // SKILLS" sublabel="TECHNICAL_ARSENAL" />
        <h2 class="section-title">
          <ScrambleText text="CAPABILITIES & STACK" trigger="mount" />
        </h2>
      </div>

      <div class="skills-categories">
        <ScrollReveal
          v-for="(group, gIndex) in skillGroups"
          :key="group.category"
          animation="fade-up"
          :delay="gIndex * 0.15"
        >
          <div class="skill-group">
            <div class="skill-group__header flex justify-between items-center">
              <span class="label-mono text-accent">◈ {{ group.category }}</span>
              <span class="label-mono">{{ group.skills.length }} MODULES</span>
            </div>

            <div class="skill-group__badges">
              <SkillBadge
                v-for="skill in group.skills"
                :key="skill.name"
                :name="skill.name"
                :level="skill.level"
              />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-skills {
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

.skills-categories {
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

.skill-group {
  background: var(--cl-bg-card);
  border: 1px solid var(--cl-line-light);
  border-radius: var(--frame-radius);
  padding: 3rem;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.skill-group__header {
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--cl-line-light);
  margin-bottom: 2.4rem;
}

.skill-group__badges {
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
}
</style>
