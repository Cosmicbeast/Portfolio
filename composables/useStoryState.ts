// Global reactive story state coordinating active chapter, themes, and scroll motion
export const useStoryState = () => {
  const activeChapter = useState<string>('story_active_chapter', () => 'project')
  const currentTheme = useState<'light' | 'dark'>('story_current_theme', () => 'light')

  const setChapter = (id: string) => {
    if (activeChapter.value !== id) {
      activeChapter.value = id
    }
  }

  const setTheme = (theme: 'light' | 'dark') => {
    if (currentTheme.value !== theme) {
      currentTheme.value = theme
    }
  }

  return {
    activeChapter,
    currentTheme,
    setChapter,
    setTheme
  }
}
