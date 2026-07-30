'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const isLight = theme === 'light'

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs sm:text-sm text-muted-foreground">Choisir un thème</span>
      <div className="flex gap-1 bg-muted rounded-full p-1">
        <Button
          variant={isLight ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setTheme('light')}
          className="h-8 w-auto px-3 rounded-full"
          aria-label="Thème clair"
          title="Thème clair"
        >
          <Sun className="h-4 w-4" />
          <span className="ml-1.5">Clair</span>
        </Button>
        <Button
          variant={!isLight ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setTheme('dark')}
          className="h-8 w-auto px-3 rounded-full"
          aria-label="Thème sombre"
          title="Thème sombre"
        >
          <Moon className="h-4 w-4" />
          <span className="ml-1.5">Sombre</span>
        </Button>
      </div>
    </div>
  )
}
