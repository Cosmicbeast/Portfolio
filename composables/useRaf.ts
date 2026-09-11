type RafCallback = (time: number, delta: number) => void

const callbacks = new Set<RafCallback>()
let rafId: number | null = null
let lastTime = 0

function loop(currentTime: number) {
  if (!lastTime) lastTime = currentTime
  const delta = Math.min(currentTime - lastTime, 100) // cap max delta to avoid huge jumps
  lastTime = currentTime

  callbacks.forEach((cb) => {
    try {
      cb(currentTime, delta)
    } catch (err) {
      console.error('[useRaf] Callback error:', err)
    }
  })

  if (callbacks.size > 0 && typeof window !== 'undefined') {
    rafId = window.requestAnimationFrame(loop)
  } else {
    rafId = null
    lastTime = 0
  }
}

function startLoop() {
  if (rafId === null && typeof window !== 'undefined' && callbacks.size > 0) {
    lastTime = 0
    rafId = window.requestAnimationFrame(loop)
  }
}

export function useRaf(callback?: RafCallback) {
  const add = (cb: RafCallback) => {
    callbacks.add(cb)
    startLoop()
  }

  const remove = (cb: RafCallback) => {
    callbacks.delete(cb)
    if (callbacks.size === 0 && rafId !== null && typeof window !== 'undefined') {
      window.cancelAnimationFrame(rafId)
      rafId = null
      lastTime = 0
    }
  }

  if (callback) {
    onMounted(() => {
      add(callback)
    })

    onUnmounted(() => {
      remove(callback)
    })
  }

  return {
    add,
    remove
  }
}
