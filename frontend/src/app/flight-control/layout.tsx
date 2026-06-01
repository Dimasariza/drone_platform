import { AppSidebar } from "@/components/shared/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
    children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <SidebarProvider open={false}>
            <AppSidebar />
            <main>
                {children}
            </main>
        </SidebarProvider>
  )
}