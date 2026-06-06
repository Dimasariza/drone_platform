from dronekit import VehicleMode

from app.drone.vehicle import get_vehicle


def arm_drone():

    vehicle = get_vehicle()

    if vehicle is None:
        return {
            "success": False,
            "message": "Drone not connected"
        }

    vehicle.armed = True

    return {
        "success": True,
        "message": "Drone armed"
    }


def disarm_drone():

    vehicle = get_vehicle()

    if vehicle is None:
        return {
            "success": False,
            "message": "Drone not connected"
        }

    vehicle.armed = False

    return {
        "success": True,
        "message": "Drone disarmed"
    }