vehicle_instance = None


def set_vehicle(vehicle):
    global vehicle_instance
    vehicle_instance = vehicle


def get_vehicle():
    return vehicle_instance


def clear_vehicle():
    global vehicle_instance
    vehicle_instance = None