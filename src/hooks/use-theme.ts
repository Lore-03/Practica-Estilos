import { useCallback, useEffect, useMemo, useState } from "react"

type Theme = "light" | "dark" | "system"

const THEME_STORAGE_KEY = "theme"

function getSystemPrefersDark(): boolean {
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-color-scheme: dark)").matches
}

function applyThemeClass(isDark: boolean) {
  if (typeof document === "undefined") return
  const root = document.documentElement
  if (isDark) {
    root.classList.add("dark")
  } else {
    root.classList.remove("dark")
  }
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = (typeof localStorage !== "undefined" && localStorage.getItem(THEME_STORAGE_KEY)) as Theme | null
    return saved ?? "system"
  })

  const isDarkMode = useMemo(() => {
    if (theme === "system") return getSystemPrefersDark()
    return theme === "dark"
  }, [theme])

  // Sync DOM class and storage
  useEffect(() => {
    applyThemeClass(isDarkMode)
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme)
    } catch {}
  }, [isDarkMode, theme])

  // React to system theme changes when on system mode
  useEffect(() => {
    if (theme !== "system") return
    const mql = window.matchMedia("(prefers-color-scheme: dark)")
    const listener = () => applyThemeClass(mql.matches)
    mql.addEventListener("change", listener)
    return () => mql.removeEventListener("change", listener)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"))
  }, [])

  const setExplicitTheme = useCallback((next: Theme) => {
    setTheme(next)
  }, [])

  return { theme, isDarkMode, toggleTheme, setTheme: setExplicitTheme }
}


