import time

from pymavlink import mavutil
from dronekit import VehicleMode

from app.drone.vehicle import get_vehicle


def send_throttle(vehicle, pwm=1000):

    msg = vehicle.message_factory.rc_channels_override_encode(
        0,
        0,

        65535,
        65535,
        pwm,       # CH3 = throttle
        65535,
        65535,
        65535,
        65535,
        65535
    )

    vehicle.send_mavlink(msg)
    vehicle.flush()


def clear_override(vehicle):

    msg = vehicle.message_factory.rc_channels_override_encode(
        0,
        0,

        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
    )

    vehicle.send_mavlink(msg)
    vehicle.flush()


def arm_and_throttle_increase_test():

    vehicle = get_vehicle()

    if vehicle is None:
        raise Exception("Drone not connected")

    print("=== UNSAFE BENCH MOTOR TEST ===")
    print("REMOVE ALL PROPELLERS")

    # -----------------------------
    # STABILIZE MODE
    # -----------------------------

    print("Setting STABILIZE mode...")
    vehicle.mode = VehicleMode("STABILIZE")

    time.sleep(2)

    # -----------------------------
    # ARM
    # -----------------------------

    print("Arming motors...")
    vehicle.armed = True

    timeout = time.time() + 10

    while not vehicle.armed:

        if time.time() > timeout:
            raise Exception("Failed to arm")

        print("Waiting arming...")
        time.sleep(1)

    print("ARMED")

    # -----------------------------
    # THROTTLE TEST
    # -----------------------------

    try:

        throttle_values = [
            1000,
            1100,
            1200,
        ]

        for pwm in throttle_values:

            print(f"Throttle PWM: {pwm}")

            start = time.time()

            while time.time() - start < 5:

                send_throttle(vehicle, pwm)

                time.sleep(0.1)

        print("Test completed")

    except KeyboardInterrupt:

        print("Interrupted")

    finally:

        print("Throttle down")

        for _ in range(20):

            send_throttle(vehicle, 800)

            time.sleep(0.1)

        clear_override(vehicle)

        vehicle.armed = False

        print("DISARMED")