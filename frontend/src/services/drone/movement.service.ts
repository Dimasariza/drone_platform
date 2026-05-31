import { api } from "../api/api"

export async function takeoff() {
  return api.post("/takeoff")
}

export async function land() {
  return api.post("/land")
}