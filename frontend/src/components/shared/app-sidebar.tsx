"use client"

import Link from "next/link"

import { usePathname } from "next/navigation"

import {
  LayoutDashboard,
  Plane,
  Map,
  Radio,
  Camera,
  Compass,
  Settings,
  Activity,
  Cpu,
  Shield,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useTelemetryStore } from "@/store/telemetry.store"

const menus = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },

  {
    title: "Flight Control",
    url: "/flight-control",
    icon: Plane,
  },

  {
    title: "Mission Planner",
    url: "/mission-planner",
    icon: Map,
  },

  {
    title: "Telemetry",
    url: "/telemetry",
    icon: Activity,
  },

  {
    title: "Navigation",
    url: "/navigation",
    icon: Compass,
  },

  {
    title: "Camera",
    url: "/camera",
    icon: Camera,
  },

  {
    title: "Communication",
    url: "/communication",
    icon: Radio,
  },

  {
    title: "AI System",
    url: "/ai",
    icon: Cpu,
  },

  {
    title: "Safety",
    url: "/safety",
    icon: Shield,
  },

  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  const pathname = usePathname()

    const { connected } =
      useTelemetryStore()

  return (
    <Sidebar
      collapsible="none"
      className="
        w-20
        h-screen
        border-r
        border-white/10
        bg-black
      "
    >
      <SidebarHeader
        className="
          flex
          items-center
          justify-center
          py-6
          border-b
          border-white/10
        "
      >
        <Plane
          className="
            w-7
            h-7
            text-white
          "
        />
      </SidebarHeader>

      <SidebarContent
        className="
          flex
          flex-col
          items-center
          py-4
        "
      >
        <SidebarMenu className="space-y-3 p-2">
          {menus.map((menu) => {
            const isActive =
              pathname === menu.url

            return (
              <SidebarMenuItem key={menu.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={menu.title}
                  className={`
                    h-14
                    rounded-xl
                    flex
                    items-center
                    justify-center
                    transition-all

                    ${
                      isActive
                        ? `
                          bg-white
                          text-black
                          shadow-lg
                        `
                        : `
                          text-zinc-400
                          hover:text-white
                          hover:bg-zinc-900
                        `
                    }
                  `}
                >
                  <Link href={menu.url}>
                    <menu.icon className="w-5 h-5" />
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter
        className="
          flex
          items-center
          justify-center
          py-4
          border-t
          border-white/10
        "
      >
        <div
          className={`
            ${connected ? "bg-green-500" : "bg-red-500"}
            w-3
            h-3
            rounded-full
            animate-pulse
          `}
        />
      </SidebarFooter>
    </Sidebar>
  )
}