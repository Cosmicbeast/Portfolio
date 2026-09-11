import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function useScrollTrigger() {
  let ctx: gsap.Context | null = null

  const createScrollTrigger = (
    callback: (context: gsap.Context) => void,
    scope?: Ref<HTMLElement | null> | HTMLElement
  ) => {
    if (!import.meta.client) return

    onMounted(() => {
      const scopeEl = scope && 'value' in scope ? scope.value : scope
      ctx = gsap.context((self) => {
        callback(self)
      }, scopeEl || undefined)
    })

    onUnmounted(() => {
      if (ctx) {
        ctx.revert()
        ctx = null
      }
    })
  }

  return {
    createScrollTrigger,
    ScrollTrigger,
    gsap
  }
}
