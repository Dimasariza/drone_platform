from dronekit import VehicleMode
from app.drone.connection import connect_vehicle

def arm_drone():
    vehicle = connect_vehicle()

    # vehicle.mode = VehicleMode("GUIDED")
    vehicle.armed = True

    return {
        "status": "arming"
    }

def disarm_drone():
    vehicle = connect_vehicle()

    vehicle.armed = False

    return {
        "status": "disarming"
    }