from dronekit import VehicleMode
import time

from app.drone.vehicle import get_vehicle


TAKEOFF_ALTITUDE = 1


def arm_and_takeoff(target_altitude: float = TAKEOFF_ALTITUDE):
    vehicle = get_vehicle()

    if vehicle is None:
        raise Exception("Drone not connected")

    print("Checking armable...")
    print("Armable:", vehicle.is_armable)
    print("EKF OK:", vehicle.ekf_ok)
    print("GPS Fix:", vehicle.gps_0.fix_type)
    print("System:", vehicle.system_status.state)

    timeout = 30
    start = time.time()

    while not vehicle.is_armable:
        if time.time() - start > timeout:
            raise Exception("Vehicle not armable after timeout")

        print("Waiting vehicle to become armable...")
        time.sleep(1)

    # print("Setting GUIDED mode...")
    # vehicle.mode = VehicleMode("GUIDED")

    # try:
    #     while True:
    #         print("Waiting GUIDED mode...")
    #         time.sleep(1)
    # except KeyboardInterrupt:
    #     print("Stopping...")
    # finally:
    #     if vehicle:
    #         vehicle.close()

    print("Arming motors...")
    vehicle.armed = True

    while not vehicle.armed:
        print("Waiting for arming...")
        time.sleep(1)

    print(f"Taking off to {target_altitude} meters...")
    vehicle.simple_takeoff(target_altitude)

    drone_take_off=True

    try:
        while True:
            altitude = vehicle.location.global_relative_frame.alt

            print(f"Altitude: {altitude:.2f}")

            if altitude >= target_altitude * 0.95:
                print("Target altitude reached")
                break

            time.sleep(0.5)
    except KeyboardInterrupt:
        drone_take_off=False
        print("Stopping...")
    finally:
        if vehicle:
            vehicle.close()


def land_drone():
    vehicle = get_vehicle()

    if vehicle is None:
        raise Exception("Drone not connected")

    print("Landing...")
    vehicle.mode = VehicleMode("LAND")

    while vehicle.armed:
        print("Waiting landing...")
        time.sleep(1)

    print("Drone landed")