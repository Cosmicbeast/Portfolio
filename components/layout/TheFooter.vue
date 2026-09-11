<script setup lang="ts">
// TheFooter component - structured cyber footer with quick links and copyright
import LinkHover from '~/components/animation/LinkHover.vue'
import { useLenis } from '~/composables/useLenis'

const { scrollTo } = useLenis()

const navLinks = [
  { label: 'TOP // HOME', target: '#hero' },
  { label: 'ABOUT', target: '#about' },
  { label: 'PROJECTS', target: '#projects' },
  { label: 'EXPERIENCE', target: '#experience' },
  { label: 'SKILLS', target: '#skills' },
  { label: 'CONTACT', target: '#contact' }
]

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="the-footer">
    <div class="site-container">
      <div class="footer-grid">
        <!-- Brand Info -->
        <div class="footer-col footer-col--brand">
          <div class="footer-logo">
            <span class="text-accent font-mono">◈</span>
            <span class="font-display">COSMICBEAST</span>
          </div>
          <p class="footer-tagline">
            Immersive cybernetic computing & creative WebGL systems for the decentralized era.
          </p>
          <div class="footer-node-status label-mono text-accent">
            NODE_OPERATIONAL // VER: 3.4.0
          </div>
        </div>

        <!-- Directory Links -->
        <div class="footer-col">
          <span class="footer-col__title label-mono">DIRECTORY</span>
          <ul class="footer-list">
            <li v-for="link in navLinks" :key="link.label">
              <button
                type="button"
                class="footer-link label-mono"
                @click="scrollTo(link.target)"
              >
                <LinkHover :accent="true">{{ link.label }}</LinkHover>
              </button>
            </li>
          </ul>
        </div>

        <!-- External Channels -->
        <div class="footer-col">
          <span class="footer-col__title label-mono">TRANSMISSIONS</span>
          <ul class="footer-list">
            <li>
              <a
                href="https://github.com/Cosmicbeast"
                target="_blank"
                rel="noopener noreferrer"
                class="footer-link label-mono"
              >
                <LinkHover :accent="true">GITHUB ↗</LinkHover>
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                class="footer-link label-mono"
              >
                <LinkHover :accent="true">LINKEDIN ↗</LinkHover>
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                class="footer-link label-mono"
              >
                <LinkHover :accent="true">TWITTER / X ↗</LinkHover>
              </a>
            </li>
          </ul>
        </div>

        <!-- Tech Spec Metadata -->
        <div class="footer-col">
          <span class="footer-col__title label-mono">ARCHITECTURE</span>
          <p class="footer-spec label-mono">ENGINE: NUXT 3 // VUE 3</p>
          <p class="footer-spec label-mono">3D: THREE.JS WEBGL</p>
          <p class="footer-spec label-mono">PHYSICS: LENIS SMOOTH</p>
          <p class="footer-spec label-mono">MOTION: GSAP SCROLLTRIGGER</p>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="footer-bottom flex justify-between items-center">
        <span class="label-mono">
          © {{ currentYear }} COSMICBEAST. ALL RIGHTS RESERVED.
        </span>
        <button
          type="button"
          class="label-mono back-to-top text-accent"
          @click="scrollTo('#hero')"
        >
          [ BACK TO ORBIT ↑ ]
        </button>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.the-footer {
  position: relative;
  background-color: #050505;
  border-top: 1px solid var(--cl-line-light);
  padding-top: 8rem;
  padding-bottom: 6rem;
  z-index: 1;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 5rem;
  margin-bottom: 6rem;
}

@media (min-width: 768px) {
  .footer-grid {
    grid-template-columns: 1.5fr repeat(3, 1fr);
  }
}

.footer-logo {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  margin-bottom: 1.6rem;
}

.footer-tagline {
  font-size: 1.4rem;
  color: var(--cl-text-muted);
  line-height: 1.6;
  max-width: 32rem;
  margin-bottom: 2rem;
}

.footer-node-status {
  font-size: 1.1rem;
}

.footer-col__title {
  display: block;
  font-size: 1.1rem;
  color: var(--cl-muted);
  margin-bottom: 2rem;
  letter-spacing: 0.16em;
}

.footer-list {
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
}

.footer-link {
  font-size: 1.2rem;
  color: var(--cl-text-muted);
  transition: color var(--transition-fast);
}

.footer-spec {
  font-size: 1.1rem;
  color: var(--cl-text-muted);
  margin-bottom: 1rem;
}

.footer-bottom {
  padding-top: 3rem;
  border-top: 1px dashed var(--cl-line-light);
  flex-wrap: wrap;
  gap: 1.6rem;
}

.back-to-top {
  cursor: pointer;
  transition: opacity var(--transition-fast);
}

.back-to-top:hover {
  opacity: 0.8;
}
</style>
