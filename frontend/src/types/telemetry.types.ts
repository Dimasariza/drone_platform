export interface BatteryData {
  voltage: number | null
  current: number | null
  level: number | null
}

export interface GPSData {
  fix_type: number | null
  satellites: number | null
}

export interface LocationData {
  lat: number | null
  lon: number | null
  alt: number | null
}

export interface AttitudeData {
  pitch: number | null
  roll: number | null
  yaw: number | null
}

export interface EKFData {
  ok: boolean
}

export interface RCData {
  signal_strength: number | null
  channels: number[]
}

export interface TelemetryData {
  // -------------------------
  // connection
  // -------------------------

  connected: boolean

  heartbeat: number | null

  // -------------------------
  // vehicle state
  // -------------------------

  armed: boolean

  is_armable: boolean

  mode: string

  system_status: string | null

  // -------------------------
  // navigation
  // -------------------------

  heading: number | null

  groundspeed: number | null

  airspeed: number | null

  velocity: number[] | null

  // -------------------------
  // battery
  // -------------------------

  battery: BatteryData

  // -------------------------
  // gps
  // -------------------------

  gps: GPSData

  location: LocationData

  // -------------------------
  // attitude
  // -------------------------

  attitude: AttitudeData

  // -------------------------
  // ekf
  // -------------------------

  ekf: EKFData

  // -------------------------
  // rc telemetry
  // -------------------------

  rc: RCData

  // -------------------------
  // flight statistics
  // -------------------------

  flight_time: number | null

  boot_time: number | null

  last_update: number | null
}