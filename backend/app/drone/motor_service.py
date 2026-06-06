# app/drone/motor_service.py

from pymavlink import mavutil

from app.drone.vehicle import get_vehicle


def test_motor(
    motor_number: int,
    throttle_percent: float = 10,
    duration_sec: float = 2,
):
    vehicle = get_vehicle()

    if vehicle is None:
        raise Exception("Drone not connected")

    vehicle.message_factory.command_long_send(
        vehicle._master.target_system,
        vehicle._master.target_component,
        mavutil.mavlink.MAV_CMD_DO_MOTOR_TEST,
        0,
        motor_number,
        0,
        throttle_percent,
        duration_sec,
        0,
        0,
        0,
    )

    return {
        "success": True,
        "motor": motor_number,
        "throttle": throttle_percent,
        "duration": duration_sec,
    }