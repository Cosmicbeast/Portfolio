<script setup lang="ts">
// ScrambleText component - inspired by KPRverse hacky-text
// Cycles through glitch/cyber characters and resolves to final text without layout shift

const props = withDefaults(
  defineProps<{
    text: string
    trigger?: 'mount' | 'hover' | 'scroll' | 'manual'
    speed?: number
    chars?: string
    delay?: number
  }>(),
  {
    trigger: 'mount',
    speed: 35,
    chars: '!<>-_\\/[]{}—=+*^?#________010101',
    delay: 0
  }
)

const displayedText = ref(props.text)
const isScrambling = ref(false)
let timer: ReturnType<typeof setTimeout> | null = null

const startScramble = () => {
  if (isScrambling.value) return
  isScrambling.value = true

  let iteration = 0
  const maxIterations = props.text.length

  const interval = setInterval(() => {
    displayedText.value = props.text
      .split('')
      .map((letter, index) => {
        if (letter === ' ') return ' '
        if (index < iteration) {
          return props.text[index]
        }
        return props.chars[Math.floor(Math.random() * props.chars.length)]
      })
      .join('')

    if (iteration >= maxIterations) {
      clearInterval(interval)
      displayedText.value = props.text
      isScrambling.value = false
    }

    iteration += 1 / 3
  }, props.speed)
}

const triggerScramble = () => {
  if (props.delay > 0) {
    timer = setTimeout(() => {
      startScramble()
    }, props.delay)
  } else {
    startScramble()
  }
}

onMounted(() => {
  if (props.trigger === 'mount' || props.trigger === 'scroll') {
    triggerScramble()
  }
})

onUnmounted(() => {
  if (timer) clearTimeout(timer)
})

defineExpose({
  scramble: startScramble
})
</script>

<template>
  <span
    class="scramble-text"
    @mouseenter="trigger === 'hover' ? triggerScramble() : undefined"
  >
    <!-- Spacer layer preserves exact layout dimensions -->
    <span class="scramble-text__spacer" aria-hidden="true">{{ text }}</span>
    <!-- Animated characters layer -->
    <span class="scramble-text__animated">{{ displayedText }}</span>
  </span>
</template>

<style scoped>
.scramble-text {
  position: relative;
  display: inline-block;
  vertical-align: baseline;
}

.scramble-text__spacer {
  visibility: hidden;
  user-select: none;
  pointer-events: none;
}

.scramble-text__animated {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  white-space: pre;
}
</style>
