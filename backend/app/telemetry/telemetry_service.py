import threading
import time

from app.drone.connection import connect_vehicle
from app.state.drone_state import drone_state
from app.drone.vehicle import set_vehicle

vehicle_instance = None

HEARTBEAT_TIMEOUT = 3


def telemetry_loop():
    global vehicle_instance

    while True:
        try:
            # reconnect
            if vehicle_instance is None:

                print("Connecting to drone...")

                vehicle_instance = connect_vehicle()

                if vehicle_instance:
                    set_vehicle(vehicle_instance)

                print("Drone connected!")

            vehicle = vehicle_instance

            # -------------------------
            # connection health
            # -------------------------

            heartbeat = vehicle.last_heartbeat

            drone_state.connected = (
                heartbeat is not None
                and heartbeat < HEARTBEAT_TIMEOUT
            )

            # -------------------------
            # basic state
            # -------------------------

            drone_state.mode = vehicle.mode.name
            drone_state.armed = vehicle.armed
            drone_state.is_armable = vehicle.is_armable

            # -------------------------
            # system status
            # -------------------------

            drone_state.system_status = (
                vehicle.system_status.state
            )

            # -------------------------
            # battery
            # -------------------------

            if vehicle.battery:

                drone_state.battery = {
                    "voltage": vehicle.battery.voltage,
                    "current": vehicle.battery.current,
                    "level": vehicle.battery.level,
                }

            # -------------------------
            # gps
            # -------------------------

            if vehicle.gps_0:

                drone_state.gps = {
                    "fix_type": vehicle.gps_0.fix_type,
                    "satellites": vehicle.gps_0.satellites_visible,
                }

            # -------------------------
            # location
            # -------------------------

            location = vehicle.location.global_relative_frame

            if location:

                drone_state.location = {
                    "lat": location.lat,
                    "lon": location.lon,
                    "alt": location.alt,
                }

            # -------------------------
            # velocity
            # -------------------------

            drone_state.velocity = vehicle.velocity

            drone_state.groundspeed = vehicle.groundspeed

            drone_state.airspeed = vehicle.airspeed

            # -------------------------
            # attitude
            # -------------------------

            if vehicle.attitude:

                drone_state.attitude = {
                    "pitch": vehicle.attitude.pitch,
                    "roll": vehicle.attitude.roll,
                    "yaw": vehicle.attitude.yaw,
                }

            # -------------------------
            # heading
            # -------------------------

            drone_state.heading = vehicle.heading

        except Exception as e:

            print("Telemetry Error:", e)

            drone_state.connected = False

            vehicle_instance = None

        time.sleep(1)


def start_telemetry():
    thread = threading.Thread(target=telemetry_loop)
    thread.daemon = True
    thread.start()