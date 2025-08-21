import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { Header } from "@/components/header"
import { cn } from "@/lib/utils"

type AppLayoutProps = {
  className?: string
  children: React.ReactNode
}

export function AppLayout({ className, children }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className={cn("bg-background", className)}>
        <Header />
        <div className="p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default AppLayout


