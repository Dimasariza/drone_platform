import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

export function AppSidebar() {
    const projects = [
        { name: "Test Name", icon: "", url: "TEST URL" }
    ]
    return (
        <Sidebar>
            <SidebarHeader />
            <SidebarContent>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}