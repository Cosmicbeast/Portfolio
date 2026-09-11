// useAudio composable - Web Audio API ambient drone synthesizer
const isPlaying = ref(false)
let audioCtx: AudioContext | null = null
let oscillator1: OscillatorNode | null = null
let oscillator2: OscillatorNode | null = null
let filterNode: BiquadFilterNode | null = null
let gainNode: GainNode | null = null

export function useAudio() {
  const initAudio = () => {
    if (!import.meta.client) return
    if (audioCtx) return

    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      audioCtx = new AudioCtxClass()

      // Create ambient drone oscillators (55Hz A1 root drone + 110Hz sub harmonic)
      oscillator1 = audioCtx.createOscillator()
      oscillator1.type = 'sawtooth'
      oscillator1.frequency.setValueAtTime(55, audioCtx.currentTime)

      oscillator2 = audioCtx.createOscillator()
      oscillator2.type = 'sine'
      oscillator2.frequency.setValueAtTime(110, audioCtx.currentTime)

      // Lowpass filter for deep space cinematic feel
      filterNode = audioCtx.createBiquadFilter()
      filterNode.type = 'lowpass'
      filterNode.frequency.setValueAtTime(280, audioCtx.currentTime)

      // Gain master
      gainNode = audioCtx.createGain()
      gainNode.gain.setValueAtTime(0, audioCtx.currentTime)

      // Connect nodes
      oscillator1.connect(filterNode)
      oscillator2.connect(filterNode)
      filterNode.connect(gainNode)
      gainNode.connect(audioCtx.destination)

      oscillator1.start()
      oscillator2.start()
    } catch (err) {
      console.warn('[useAudio] Web Audio initialization deferred:', err)
    }
  }

  const toggleAudio = () => {
    if (!import.meta.client) return
    if (!audioCtx) initAudio()

    if (!audioCtx || !gainNode) return

    if (audioCtx.state === 'suspended') {
      audioCtx.resume()
    }

    if (!isPlaying.value) {
      // Fade in smoothly
      gainNode.gain.linearRampToValueAtTime(0.12, audioCtx.currentTime + 1.5)
      isPlaying.value = true
    } else {
      // Fade out smoothly
      gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 1)
      setTimeout(() => {
        isPlaying.value = false
      }, 1000)
    }
  }

  return {
    isPlaying: readonly(isPlaying),
    toggleAudio
  }
}
