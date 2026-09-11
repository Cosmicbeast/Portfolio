<script setup lang="ts">
// Main continuous visual narrative assembly strictly matching refer.mp4 sequence
import SectionHero from '~/components/sections/SectionHero.vue'
import SectionIntroSplit from '~/components/sections/SectionIntroSplit.vue'
import SectionKeepTelemetry from '~/components/sections/SectionKeepTelemetry.vue'
import SectionMatrixWipe from '~/components/sections/SectionMatrixWipe.vue'
import SectionCollectibles from '~/components/sections/SectionCollectibles.vue'
import SectionFactionsCitadel from '~/components/sections/SectionFactionsCitadel.vue'
import SectionFactionsOverlook from '~/components/sections/SectionFactionsOverlook.vue'
import SectionWorldKeepers from '~/components/sections/SectionWorldKeepers.vue'
import TheFooterMonoliths from '~/components/layout/TheFooterMonoliths.vue'
</script>

<template>
  <div class="story-experience">
    <!-- Chapter 01: Hero Genesis Stage -->
    <SectionHero />

    <!-- Chapter 02: Narrative Intro Split (A Familiar World) -->
    <SectionIntroSplit />

    <!-- Chapter 03 & 04: The Keep Telemetry & Philosophical Statement -->
    <SectionKeepTelemetry />

    <!-- Chapter 04 Bridge: Theatrical Vertical Capsule Matrix Wipe -->
    <SectionMatrixWipe />

    <!-- Chapter 05: 10,000 Digital Collectibles Horizontal Showcase -->
    <SectionCollectibles />

    <!-- Chapter 06A: Floating Ring Citadel Metropolis Mask -->
    <SectionFactionsCitadel />

    <!-- Chapter 06B: Balcony Factions Overlook with Click & Hold Reticle -->
    <SectionFactionsOverlook />

    <!-- Chapter 07 & 08: Brutalist KEEPERS Watermark & Triptych Climax -->
    <SectionWorldKeepers />

    <!-- Chapter 09: 3 Black Monolith Columns and ANJISHNU Exit Footer -->
    <TheFooterMonoliths />
  </div>
</template>

<style scoped>
.story-experience {
  position: relative;
  width: 100%;
  overflow-x: hidden;
}
</style>
