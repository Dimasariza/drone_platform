import os

from dotenv import load_dotenv
from dronekit import connect

from app.state.drone_state import drone_state

load_dotenv()

def connect_vehicle():
    try:
        connection_string = os.getenv("DRONE_CONNECTION")

        print(f"Connecting to {connection_string}")

        vehicle = connect(
            connection_string,
            wait_ready=False,
            heartbeat_timeout=10,
            timeout=15
        )

        drone_state.connected = True

        print("Drone connected!")

        return vehicle

    except Exception as e:
        print("Connection Error:", e)
        drone_state.connected = False
        return None