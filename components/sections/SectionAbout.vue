<script setup lang="ts">
// SectionAbout component - split bio layout with telemetry cards and DotLabel
import DotLabel from '~/components/animation/DotLabel.vue'
import ScrollReveal from '~/components/animation/ScrollReveal.vue'
import ScrambleText from '~/components/animation/ScrambleText.vue'
</script>

<template>
  <section id="about" class="section-about section-padding">
    <div class="site-container">
      <!-- Section Header -->
      <div class="section-header">
        <DotLabel label="01 // ABOUT" sublabel="SYS_PROFILE" />
        <h2 class="section-title">
          <ScrambleText text="HUMAN_INTERFACE // IDENTITY" trigger="mount" />
        </h2>
      </div>

      <div class="about-grid">
        <!-- Left: Bio Story -->
        <ScrollReveal animation="fade-up" :delay="0.1">
          <div class="about-story">
            <p class="about-lead">
              I am a creative technologist and full-stack software engineer obsessed with bridging
              the frontier between computational architecture and sensory digital art.
            </p>
            <p>
              Drawing inspiration from futuristic interfaces, brutalist grid layouts, and high-fidelity
              3D environments, I engineer immersive digital spaces that push the web platform to its absolute
              outer limits without compromising performance or accessibility.
            </p>
            <p>
              Whether orchestrating complex real-time WebGL shaders in Three.js, building microsecond-responsive
              backend systems, or sculpting fluid motion choreographies with GSAP, my focus is always on
              engineering unforgettable user experiences.
            </p>

            <div class="about-credentials">
              <div class="credential-item">
                <span class="label-mono">DISCIPLINE</span>
                <span class="font-mono text-accent">FULL-STACK & CREATIVE 3D</span>
              </div>
              <div class="credential-item">
                <span class="label-mono">ENGINEERING STACK</span>
                <span class="font-mono text-accent-blue">VUE / NUXT / THREE.JS / TS</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <!-- Right: Telemetry & Terminal Spec Card -->
        <ScrollReveal animation="scale-up" :delay="0.2">
          <div class="about-telemetry">
            <div class="telemetry-box">
              <div class="telemetry-box__header flex justify-between items-center">
                <span class="label-mono text-accent">◈ TELEMETRY_MATRIX</span>
                <span class="label-mono">DIAGNOSTIC // OK</span>
              </div>

              <div class="telemetry-stats">
                <div class="stat-card">
                  <span class="stat-card__val">05+</span>
                  <span class="stat-card__lbl label-mono">YEARS IN PRODUCTION</span>
                </div>
                <div class="stat-card">
                  <span class="stat-card__val">30+</span>
                  <span class="stat-card__lbl label-mono">SYSTEMS DEPLOYED</span>
                </div>
                <div class="stat-card">
                  <span class="stat-card__val">60 FPS</span>
                  <span class="stat-card__lbl label-mono">RENDER TARGET</span>
                </div>
                <div class="stat-card">
                  <span class="stat-card__val">100%</span>
                  <span class="stat-card__lbl label-mono">SSR & TS COMPLIANT</span>
                </div>
              </div>

              <!-- Terminal log stream -->
              <div class="telemetry-terminal font-mono">
                <p><span class="text-accent">></span> system.init(Kernel.ACTIVE)</p>
                <p><span class="text-accent">></span> loading modules: [Three.WebGL, Lenis.Smooth, GSAP.Core]</p>
                <p><span class="text-accent">></span> memory footprint: 18.4MB (nominal)</p>
                <p><span class="text-accent">></span> status: OPERATIONAL <span class="terminal-blink">_</span></p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-about {
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

.about-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
  align-items: start;
}

@media (min-width: 992px) {
  .about-grid {
    grid-template-columns: 1.2fr 1fr;
    gap: 6rem;
  }
}

.about-story {
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
}

.about-lead {
  font-size: clamp(2rem, 2.5vw, 2.8rem);
  color: var(--cl-text);
  line-height: 1.4;
  font-weight: 500;
}

.about-credentials {
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
  padding-top: 2rem;
  border-top: 1px dashed var(--cl-line-light);
}

.credential-item {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.credential-item .label-mono {
  font-size: 1.1rem;
}

.credential-item .font-mono {
  font-size: 1.4rem;
  font-weight: 600;
}

/* Telemetry box */
.telemetry-box {
  background: var(--cl-bg-card);
  border: 1px solid var(--cl-line-light);
  border-radius: var(--frame-radius);
  padding: 3rem;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.telemetry-box__header {
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--cl-line-light);
  margin-bottom: 2.4rem;
}

.telemetry-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2.4rem;
}

.stat-card {
  padding: 1.6rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.stat-card__val {
  display: block;
  font-family: var(--font-display);
  font-size: clamp(2.4rem, 4vw, 3.6rem);
  font-weight: 700;
  color: var(--cl-accent);
  line-height: 1;
  margin-bottom: 0.6rem;
}

.stat-card__lbl {
  font-size: 1rem;
  color: var(--cl-muted);
}

.telemetry-terminal {
  padding: 1.6rem;
  background: #080808;
  border: 1px solid var(--cl-line-light);
  border-radius: 4px;
  font-size: 1.2rem;
  color: var(--cl-text-muted);
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.terminal-blink {
  color: var(--cl-accent);
  animation: cursor-blink 1s steps(2) infinite;
}

@keyframes cursor-blink {
  0% { visibility: hidden; }
}
</style>
