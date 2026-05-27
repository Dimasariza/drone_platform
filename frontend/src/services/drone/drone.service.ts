import { api } from "@/services/api/api"

export async function armDrone() {
  return api.post("/arm")
}

export async function disarmDrone() {
  return api.post("/disarm")
}

export async function getTelemetry() {
  return api.get("/telemetry")
}