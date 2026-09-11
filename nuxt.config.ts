// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },

  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],

  app: {
    head: {
      title: 'Cosmicbeast — Creative Developer & System Architect',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=5' },
        {
          name: 'description',
          content: 'Immersive developer portfolio inspired by futuristic HUD aesthetics, Three.js 3D WebGL scenes, smooth scroll physics, and cinematic UI experiences.'
        },
        { name: 'theme-color', content: '#000000' },
        { property: 'og:title', content: 'Cosmicbeast — Creative Developer & System Architect' },
        {
          property: 'og:description',
          content: 'Immersive developer portfolio with Three.js 3D interactive hero, smooth physics scrolling, and cinematic cyber HUD architecture.'
        },
        { property: 'og:type', content: 'website' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap' },
        { rel: 'preload', as: 'image', href: '/images/hero-protagonist.jpg' },
        { rel: 'preload', as: 'image', href: '/images/bg-lavender-sky.jpg' }
      ]
    }
  },

  css: [
    '~/assets/css/reset.css',
    '~/assets/css/tokens.css',
    '~/assets/css/typography.css',
    '~/assets/css/utilities.css'
  ],

  build: {
    transpile: ['three', 'gsap', 'lenis']
  },

  typescript: {
    strict: true
  }
})
