import { AppSidebar } from "@/components/shared/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function MissionPlannerLayout({
    children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <SidebarProvider open={false}>
            <AppSidebar />
            <main className="w-full h-full">
                {children}
            </main>
        </SidebarProvider>
  )
}