export type DroneMode =
  | "STABILIZE"
  | "GUIDED"
  | "LOITER"
  | "RTL"
  | "AUTO"
  | "LAND"

export interface ArmResponse {
  success: boolean

  message: string
}

export interface DroneConnectionState {
  connected: boolean

  last_heartbeat?: string

  vehicle_id?: string
}