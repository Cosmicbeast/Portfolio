<script setup lang="ts">
// SectionContact component - terminal contact CTA with cyber form links
import DotLabel from '~/components/animation/DotLabel.vue'
import ScrollReveal from '~/components/animation/ScrollReveal.vue'
import ScrambleText from '~/components/animation/ScrambleText.vue'
import BtnMain from '~/components/ui/BtnMain.vue'
</script>

<template>
  <section id="contact" class="section-contact section-padding">
    <div class="site-container">
      <ScrollReveal animation="fade-up">
        <div class="contact-card">
          <!-- Header -->
          <div class="contact-card__header flex justify-between items-center">
            <DotLabel label="05 // CONTACT" sublabel="TRANSMISSION_UPLINK" />
            <span class="label-mono text-accent">STATUS: READY TO TRANSMIT</span>
          </div>

          <!-- Main Call to Action -->
          <div class="contact-card__body">
            <h2 class="contact-title">
              <ScrambleText text="LET'S BUILD SOMETHING EXTRAORDINARY" trigger="mount" />
            </h2>
            <p class="contact-desc">
              Have an ambitious vision, a 3D WebGL experience to craft, or need a full-stack architect
              to engineer resilient software? My transmission channels are open worldwide.
            </p>

            <!-- Actions -->
            <div class="contact-actions flex items-center">
              <BtnMain
                theme="accent"
                size="lg"
                href="mailto:cosmicbeast.dev@gmail.com"
              >
                OPEN TRANSMISSION (EMAIL) ↗
              </BtnMain>
              <BtnMain
                theme="outline"
                size="lg"
                href="https://github.com/Cosmicbeast"
                target="_blank"
              >
                GITHUB PROFILE ↗
              </BtnMain>
            </div>

            <!-- Terminal status box -->
            <div class="contact-terminal font-mono">
              <span class="text-accent">></span>
              <span>uplink.route(node: "cosmicbeast.dev", security: "TLS_AES_256_GCM_SHA384")</span>
              <span class="terminal-cursor">_</span>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
</template>

<style scoped>
.section-contact {
  position: relative;
  width: 100%;
}

.contact-card {
  position: relative;
  background: var(--cl-bg-card);
  border: 1px solid var(--cl-line-light);
  border-radius: var(--frame-radius);
  padding: clamp(3rem, 6vw, 8rem);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  overflow: hidden;
}

.contact-card__header {
  padding-bottom: 2.4rem;
  border-bottom: 1px solid var(--cl-line-light);
  margin-bottom: 4rem;
}

.contact-title {
  font-size: clamp(3.2rem, 6vw, 7.2rem);
  line-height: 1.05;
  letter-spacing: -0.04em;
  margin-bottom: 2.4rem;
}

.contact-desc {
  max-width: 68rem;
  font-size: clamp(1.6rem, 2vw, 2rem);
  line-height: 1.6;
  margin-bottom: 4rem;
}

.contact-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 4rem;
}

.contact-terminal {
  padding: 1.6rem 2rem;
  background: #060606;
  border: 1px solid var(--cl-line-light);
  border-radius: 4px;
  font-size: 1.2rem;
  color: var(--cl-text-muted);
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  max-width: 100%;
  overflow-x: auto;
}

.terminal-cursor {
  color: var(--cl-accent);
  animation: cursor-blink 1s steps(2) infinite;
}

@keyframes cursor-blink {
  0% { visibility: hidden; }
}
</style>
