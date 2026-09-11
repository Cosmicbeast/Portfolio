<script setup lang="ts">
// TheFooterMonoliths: Chapter 09 Rising Monolithic Exit Footer with Monumental KPR Wordmark
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useStoryState } from '~/composables/useStoryState'
import storyData from '~/data/story.json'

const footerRef = ref<HTMLElement | null>(null)
const monolith1Ref = ref<HTMLElement | null>(null)
const monolith2Ref = ref<HTMLElement | null>(null)
const monolith3Ref = ref<HTMLElement | null>(null)
const { setChapter, setTheme } = useStoryState()
let ctx: gsap.Context | null = null

const footer = storyData.chapters.footer

onMounted(() => {
  if (!import.meta.client || !footerRef.value) return

  ctx = gsap.context(() => {
    ScrollTrigger.create({
      trigger: footerRef.value,
      start: 'top 60%',
      onEnter: () => {
        setTheme('dark')
        setChapter('world')
      },
      onEnterBack: () => {
        setTheme('dark')
        setChapter('world')
      }
    })

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    // PRIMARY: Rising Monolith Columns scrub
    gsap.fromTo(
      '.monolith-column',
      { y: 60, opacity: 0 },
      {
        scrollTrigger: {
          trigger: footerRef.value,
          start: 'top 80%',
          end: 'top 30%',
          scrub: 0.8
        },
        y: 0,
        opacity: 1,
        stagger: 0.15,
        ease: 'power2.out'
      }
    )
  }, footerRef.value)
})

onUnmounted(() => {
  ctx?.revert()
})
</script>

<template>
  <footer
    id="site-footer"
    ref="footerRef"
    class="stage-footer-monoliths theme-dark"
    aria-label="Chapter 09: Exit Footer"
  >
    <div class="footer-container">
      <!-- Top Telemetry Stream -->
      <div class="footer-telemetry-bar flex justify-between items-center">
        <span class="telemetry-mono text-muted whitespace-pre-line">
          {{ footer.sidebarTelemetry }}
        </span>
        <span class="telemetry-mono text-accent">[ SYSTEM SECURE // 2026 ]</span>
      </div>

      <!-- 3 Rising Black Monolithic Columns -->
      <div class="monolith-grid">
        <!-- Column 1: Discover More -->
        <div ref="monolith1Ref" class="monolith-column">
          <h3 class="label-mono monolith-title">{{ footer.columns[0].title }}</h3>
          <ul class="monolith-list">
            <li v-for="link in footer.columns[0].links" :key="link.label">
              <a :href="link.href" class="monolith-link">
                <span class="link-label">{{ link.label }}</span>
                <span class="link-fill" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>

        <!-- Column 2: Join Conversation -->
        <div ref="monolith2Ref" class="monolith-column">
          <h3 class="label-mono monolith-title">{{ footer.columns[1].title }}</h3>
          <ul class="monolith-list">
            <li v-for="link in footer.columns[1].links" :key="link.label">
              <a :href="link.href" target="_blank" rel="noopener noreferrer" class="monolith-link">
                <span class="link-label">{{ link.label }} ↗</span>
                <span class="link-fill" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>

        <!-- Column 3: Contact & Dossier CTA -->
        <div ref="monolith3Ref" class="monolith-column monolith-column--details">
          <h3 class="label-mono monolith-title">{{ footer.columns[2].title }}</h3>
          <a :href="`mailto:${footer.columns[2].contactEmail}`" class="footer-email label-mono">
            {{ footer.columns[2].contactEmail }}
          </a>
          <button type="button" class="btn-dossier label-mono" aria-label="Download Project Dossier">
            {{ footer.columns[2].ctaButton }}
          </button>
        </div>
      </div>

      <!-- Monumental Brutalist KPR Wordmark -->
      <div class="footer-wordmark-wrapper" aria-hidden="true">
        <span class="footer-wordmark">{{ footer.wordmark }}</span>
      </div>

      <!-- Bottom Copyright & Legal -->
      <div class="footer-bottom-bar flex justify-between items-center">
        <span class="telemetry-mono">{{ footer.copyright }}</span>
        <div class="legal-links flex gap-4">
          <span class="telemetry-mono">PRIVACY POLICY</span>
          <span class="telemetry-mono">TERMS OF SERVICE</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.stage-footer-monoliths {
  position: relative;
  min-height: 100vh;
  background-color: #000000;
  color: #FFFFFF;
  padding: 12rem clamp(2rem, 5vw, 6rem) 4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  user-select: none;
}

.footer-container {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: var(--content-max-width);
  margin: 0 auto;
  min-height: calc(100vh - 16rem);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 6.4rem;
}

.footer-telemetry-bar {
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  padding-bottom: 2rem;
}

.text-muted {
  color: rgba(255, 255, 255, 0.45);
}

.text-accent {
  color: var(--color-accent-green);
}

/* 3 Monolith Columns */
.monolith-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 4.8rem;
}

@media (min-width: 992px) {
  .monolith-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 4.0rem;
  }
}

.monolith-column {
  background-color: #0D0D12;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--menu-radius);
  padding: 3.2rem 2.8rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  min-height: 32.0rem;
  transition: border-color var(--transition-fast), transform var(--transition-normal);
}

.monolith-column:hover {
  border-color: rgba(255, 255, 255, 0.25);
  transform: translateY(-4px);
}

.monolith-title {
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.1rem;
}

.monolith-list {
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
}

.monolith-link {
  position: relative;
  display: inline-block;
  color: #FFFFFF;
  font-family: var(--font-mono);
  font-size: 1.3rem;
  letter-spacing: 0.08em;
  padding: 0.4rem 0.6rem;
  overflow: hidden;
  transition: color var(--transition-fast);
}

.link-fill {
  position: absolute;
  inset: 0;
  background-color: var(--color-accent-green);
  z-index: -1;
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.monolith-link:hover {
  color: #000000;
}

.monolith-link:hover .link-fill {
  transform: scaleX(1);
}

.monolith-column--details {
  justify-content: space-between;
}

.footer-email {
  font-size: 1.4rem;
  color: #FFFFFF;
  letter-spacing: 0.1em;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  padding-bottom: 0.6rem;
}

.btn-dossier {
  padding: 1.2rem 2.4rem;
  background-color: #FFFFFF;
  color: #000000;
  border-radius: 9999px;
  font-weight: 700;
  cursor: pointer;
  transition: transform var(--transition-fast), background-color var(--transition-fast);
}

.btn-dossier:hover {
  transform: scale(1.03);
  background-color: var(--color-accent-green);
}

/* Monumental KPR Wordmark */
.footer-wordmark-wrapper {
  width: 100%;
  text-align: center;
  overflow: hidden;
}

.footer-wordmark {
  font-family: var(--font-display);
  font-size: clamp(12.0rem, 28vw, 44.0rem);
  font-weight: 700;
  line-height: 0.75;
  letter-spacing: -0.06em;
  color: #FFFFFF;
  text-transform: uppercase;
}

.footer-bottom-bar {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 2rem;
  color: rgba(255, 255, 255, 0.45);
}

@media (max-width: 768px) {
  .stage-footer-monoliths {
    padding-top: 8rem;
    padding-bottom: 3rem;
  }
  .footer-container {
    gap: 4.8rem;
  }
  .footer-telemetry-bar {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.2rem;
  }
  .footer-bottom-bar {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.4rem;
  }
}
</style>
