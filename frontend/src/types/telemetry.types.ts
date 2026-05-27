export interface BatteryData {
  voltage: number
  current: number
  level: number
}

export interface GPSData {
  fix_type: number
  satellites_visible: number
}

export interface PositionData {
  lat: number
  lon: number
  alt: number
}

export interface VelocityData {
  x: number
  y: number
  z: number
}

export interface TelemetryData {
  connected: boolean

  mode: string

  armed: boolean

  battery: BatteryData

  gps: GPSData

  position: PositionData

  heading: number

  velocity: VelocityData

  timestamp: string
}