"use client"

import { bootstrapAI } from "@/bootstraps/ai.bootstrap"
import { bootstrapTelemetry } from "@/bootstraps/telemetry.bootstrap"
import { useEffect } from "react"

export default function AppProvider({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    bootstrapTelemetry()
    bootstrapAI()
  }, [])

  return <>{children}</>
}