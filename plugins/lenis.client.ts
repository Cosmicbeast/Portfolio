import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default defineNuxtPlugin(() => {
  if (!import.meta.client) return

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2
  })

  const { setLenis, setProgress, setScrollY } = useLenis()
  setLenis(lenis)

  lenis.on('scroll', (e: { progress: number; scroll: number }) => {
    setProgress(e.progress)
    setScrollY(e.scroll)
    ScrollTrigger.update()
  })

  // Hook Lenis into GSAP ticker for synchronized animation loop
  const tickerUpdate = (time: number) => {
    lenis.raf(time * 1000)
  }

  gsap.ticker.add(tickerUpdate)
  gsap.ticker.lagSmoothing(0)

  return {
    provide: {
      lenis
    }
  }
})
