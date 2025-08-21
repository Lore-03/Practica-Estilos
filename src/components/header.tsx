// importación de sidebarTrigger en la carpeta de UI sidebar para traer el componente sidebarTrigger
// importación de switch en la carpeta de UI switch para traer el componente switch
// importación de useTheme para traer el tema
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "@/hooks/use-theme"

// función para crear el header
export function Header() {
  // useTheme para traer el tema
  const { isDarkMode, toggleTheme } = useTheme()
  // return para crear el header
  return (
    <header className="flex h-14 items-center gap-4 border-b px-4">
      <SidebarTrigger />
      <div className="ml-auto flex items-center gap-2">
        <span className="text-sm text-gray-700 dark:text-gray-300">Modo Oscuro</span>
        <Switch checked={isDarkMode} onCheckedChange={toggleTheme} />
      </div>
    </header>
  )
}

export default Header
