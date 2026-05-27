import { getSocket } from "./websocket.manager"

import { createTelemetrySocket } from "@/services/websocket/telemetry.socket"

export function bootstrapTelemetry() {
  const existing = getSocket("telemetry")

  if (existing) {
    return
  }

  createTelemetrySocket()
}