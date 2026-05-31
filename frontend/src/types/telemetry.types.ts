export interface BatteryData {
  voltage: number
  current: number
  level: number
}

export interface GPSData {
  fix_type: number
  satellites: number
}

export interface LocationData {
  lat: number
  lon: number
  alt: number
}

export interface AttitudeData {
  pitch: number
  roll: number
  yaw: number
}

export interface TelemetryData {
  connected: boolean

  armed: boolean

  is_armable: boolean

  mode: string

  system_status: string

  heading: number

  groundspeed: number

  airspeed: number

  velocity: number[]

  battery: BatteryData

  gps: GPSData

  location: LocationData

  attitude: AttitudeData
}