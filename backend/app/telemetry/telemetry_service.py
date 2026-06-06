import threading
import time

from app.drone.connection import connect_vehicle
from app.state.drone_state import drone_state
from app.drone.vehicle import set_vehicle

vehicle_instance = None

HEARTBEAT_TIMEOUT = 3

boot_time = time.time()


def telemetry_loop():
    global vehicle_instance

    while True:
        try:

            # =====================================
            # RECONNECT
            # =====================================

            if vehicle_instance is None:

                print("Connecting to drone...")

                vehicle_instance = connect_vehicle()

                if vehicle_instance:
                    set_vehicle(vehicle_instance)

                print("Drone connected!")

            vehicle = vehicle_instance

            # =====================================
            # CONNECTION HEALTH
            # =====================================

            heartbeat = vehicle.last_heartbeat

            drone_state.connected = (
                heartbeat is not None
                and heartbeat < HEARTBEAT_TIMEOUT
            )

            drone_state.last_heartbeat = heartbeat

            drone_state.timestamp = time.time()

            # =====================================
            # BASIC STATE
            # =====================================

            drone_state.mode = vehicle.mode.name

            drone_state.armed = vehicle.armed

            drone_state.is_armable = vehicle.is_armable

            # =====================================
            # SYSTEM STATUS
            # =====================================

            drone_state.system_status = (
                vehicle.system_status.state
            )

            # =====================================
            # FLIGHT TIME
            # =====================================

            if vehicle.armed:
                drone_state.flight_time = (
                    time.time() - boot_time
                )
            else:
                drone_state.flight_time = 0

            # =====================================
            # BATTERY
            # =====================================

            if vehicle.battery:

                drone_state.battery.voltage = (
                    vehicle.battery.voltage
                )

                drone_state.battery.current = (
                    vehicle.battery.current
                )

                drone_state.battery.level = (
                    vehicle.battery.level
                )

            # =====================================
            # GPS
            # =====================================

            if vehicle.gps_0:

                drone_state.gps.fix_type = (
                    vehicle.gps_0.fix_type
                )

                drone_state.gps.satellites = (
                    vehicle.gps_0.satellites_visible
                )

                drone_state.gps.hdop = getattr(
                    vehicle.gps_0,
                    "eph",
                    None
                )

            # =====================================
            # LOCATION
            # =====================================

            location = vehicle.location.global_frame
            relative_location = (
                vehicle.location.global_relative_frame
            )

            if location:

                drone_state.location.lat = location.lat
                drone_state.location.lon = location.lon
                drone_state.location.alt = location.alt

            if relative_location:

                drone_state.location.relative_alt = (
                    relative_location.alt
                )

            # =====================================
            # HOME LOCATION
            # =====================================

            if vehicle.home_location:

                drone_state.home_location.lat = (
                    vehicle.home_location.lat
                )

                drone_state.home_location.lon = (
                    vehicle.home_location.lon
                )

                drone_state.home_location.alt = (
                    vehicle.home_location.alt
                )

            # =====================================
            # VELOCITY
            # =====================================

            drone_state.velocity = vehicle.velocity

            drone_state.groundspeed = (
                vehicle.groundspeed
            )

            drone_state.airspeed = (
                vehicle.airspeed
            )

            # =====================================
            # ATTITUDE
            # =====================================

            if vehicle.attitude:

                drone_state.attitude.pitch = (
                    vehicle.attitude.pitch
                )

                drone_state.attitude.roll = (
                    vehicle.attitude.roll
                )

                drone_state.attitude.yaw = (
                    vehicle.attitude.yaw
                )

            # =====================================
            # HEADING
            # =====================================

            drone_state.heading = vehicle.heading

            # =====================================
            # EKF STATUS
            # =====================================

            drone_state.ekf.ok = (
                vehicle.ekf_ok
            )

            # =====================================
            # RC SIGNAL
            # =====================================

            try:
                rc_channels = vehicle.channels

                drone_state.rc_signal.connected = (
                    rc_channels is not None
                )

                drone_state.rc_signal.strength = (
                    4 if rc_channels else 0
                )

            except:
                drone_state.rc_signal.connected = False
                drone_state.rc_signal.strength = 0

        except Exception as e:

            print("Telemetry Error:", e)

            drone_state.connected = False

            vehicle_instance = None

        time.sleep(0.1)



# -------------------------
# start thread
# -------------------------

def start_telemetry():
    thread = threading.Thread(
        target=telemetry_loop
    )

    thread.daemon = True

    thread.start()