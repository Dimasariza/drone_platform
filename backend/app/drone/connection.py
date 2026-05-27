import os

from dotenv import load_dotenv
from dronekit import connect

from app.state.drone_state import drone_state

load_dotenv()

vehicle = None

def connect_vehicle():
    global vehicle

    if vehicle is None:

        connection_string = os.getenv(
            "DRONE_CONNECTION"
        )

        print(f"Connecting to {connection_string}")

        vehicle = connect(
            connection_string,
            wait_ready=False
        )

        drone_state["connected"] = True

        print("Drone connected!")

    return vehicle