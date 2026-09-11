import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import parallaxConfig from '~/data/parallax-config.json'

interface ParallaxLayer {
  id: string
  target: string
  type: string
  speed: number
  from?: Record<string, unknown>
  to?: Record<string, unknown>
  y?: number
  yPercent?: number
  scale?: number
  opacity?: number
  start?: string
  end?: string
  scrub?: number | boolean
  stagger?: number
  ease?: string
}

interface ParallaxSection {
  sectionId: string
  trigger: string
  start: string
  end: string
  scrub: number | boolean
  layers: ParallaxLayer[]
}

export function useParallax() {
  const isEnabled = ref(parallaxConfig.parallax.enabled)

  const scaleValue = (val: unknown, factor: number): unknown => {
    if (typeof val === 'number') {
      return Math.round(val * factor * 100) / 100
    }
    if (typeof val === 'string' && val.endsWith('px')) {
      const num = parseFloat(val)
      return `${Math.round(num * factor * 100) / 100}px`
    }
    if (typeof val === 'string' && val.endsWith('vw')) {
      const num = parseFloat(val)
      return `${Math.round(num * factor * 100) / 100}vw`
    }
    return val
  }

  const scaleProps = (props: Record<string, unknown>, factor: number): Record<string, unknown> => {
    const result: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(props)) {
      if (['y', 'x', 'yPercent'].includes(k)) {
        result[k] = scaleValue(v, factor)
      } else {
        result[k] = v
      }
    }
    return result
  }

  const initSectionParallax = (sectionId: string, scopeEl?: HTMLElement | null) => {
    if (!import.meta.client || !isEnabled.value) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const section = parallaxConfig.parallax.sections.find(
      (s: ParallaxSection) => s.sectionId === sectionId
    ) as ParallaxSection | undefined

    if (!section) return

    const triggerTarget = scopeEl || document.querySelector(section.trigger)
    if (!triggerTarget) return

    const isMobile = window.innerWidth <= 768
    const factor = isMobile ? parallaxConfig.parallax.settings.mobileScaleFactor : 1.0

    section.layers.forEach((layer) => {
      const elements = scopeEl
        ? scopeEl.querySelectorAll(layer.target)
        : document.querySelectorAll(layer.target)

      if (!elements || elements.length === 0) return

      const start = layer.start || section.start
      const end = layer.end || section.end
      const scrub = layer.scrub !== undefined ? layer.scrub : section.scrub
      const ease = layer.ease || parallaxConfig.parallax.settings.ease || 'none'

      const scrollTriggerConfig: Record<string, unknown> = {
        trigger: triggerTarget,
        start,
        end,
        scrub
      }

      if (layer.from && layer.to) {
        const fromProps = scaleProps(layer.from, factor)
        const toProps: Record<string, unknown> = {
          ...scaleProps(layer.to, factor),
          scrollTrigger: scrollTriggerConfig,
          ease
        }

        if (layer.stagger) {
          toProps.stagger = layer.stagger
        }

        gsap.fromTo(elements, fromProps, toProps)
      } else if (layer.to) {
        const toProps: Record<string, unknown> = {
          ...scaleProps(layer.to, factor),
          scrollTrigger: scrollTriggerConfig,
          ease
        }

        if (layer.stagger) {
          toProps.stagger = layer.stagger
        }

        gsap.to(elements, toProps)
      }
    })
  }

  return {
    isEnabled,
    initSectionParallax,
    parallaxConfig
  }
}
