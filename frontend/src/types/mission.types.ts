export type MissionStatus =
  | "idle"
  | "running"
  | "paused"
  | "completed"
  | "failed"

export interface MissionWaypoint {
  lat: number
  lon: number
  alt: number
}

export interface MissionData {
  id: string

  name: string

  status: MissionStatus

  started_at?: string

  completed_at?: string

  waypoints: MissionWaypoint[]
}