from pydantic import BaseModel
from typing import Optional


class BatterySchema(BaseModel):
    voltage: Optional[float] = None
    current: Optional[float] = None
    level: Optional[int] = None


class GPSSchema(BaseModel):
    fix_type: Optional[int] = None
    satellites: Optional[int] = None
    hdop: Optional[float] = None


class LocationSchema(BaseModel):
    lat: Optional[float] = None
    lon: Optional[float] = None
    alt: Optional[float] = None
    relative_alt: Optional[float] = None


class HomeLocationSchema(BaseModel):
    lat: Optional[float] = None
    lon: Optional[float] = None
    alt: Optional[float] = None


class AttitudeSchema(BaseModel):
    pitch: Optional[float] = None
    roll: Optional[float] = None
    yaw: Optional[float] = None


class EKFSchema(BaseModel):
    ok: Optional[bool] = None


class RCSignalSchema(BaseModel):
    strength: Optional[int] = None
    connected: Optional[bool] = None


class TelemetrySchema(BaseModel):

    connected: bool = False

    armed: bool = False

    is_armable: bool = False

    mode: str = "UNKNOWN"

    system_status: Optional[str] = None

    heading: Optional[float] = None

    groundspeed: Optional[float] = None

    airspeed: Optional[float] = None

    velocity: Optional[list[float]] = None

    last_heartbeat: Optional[float] = None

    flight_time: Optional[float] = None

    timestamp: Optional[float] = None

    battery: BatterySchema = BatterySchema()

    gps: GPSSchema = GPSSchema()

    location: LocationSchema = LocationSchema()

    home_location: HomeLocationSchema = HomeLocationSchema()

    attitude: AttitudeSchema = AttitudeSchema()

    ekf: EKFSchema = EKFSchema()

    rc_signal: RCSignalSchema = RCSignalSchema()