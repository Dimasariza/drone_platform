import asyncio
import os
import threading
import time

from mavsdk import System

from app.state.mavsdk_state import mavsdk_state


async def mavsdk_telemetry_loop():
    print("Starting connection to MAVSDK telemetry loop...")

    drone = System(
        mavsdk_server_address="localhost",
        port=50051,
    )

    connection_string = os.getenv( "MAVSDK_CONNECTION", "udp://:14550" )
    print(f"Connecting to MAVSDK at {connection_string}...")
    await drone.connect()

    print("Waiting for MAVSDK connection...")

    async for state in drone.core.connection_state():

        if state.is_connected:
            print("MAVSDK Connected")
            break

    async def battery_task():

        async for battery in drone.telemetry.battery():

            mavsdk_state.battery.voltage = (
                battery.voltage_v
            )

            mavsdk_state.battery.level = int(
                battery.remaining_percent * 100
            )

    async def gps_task():

        async for gps in drone.telemetry.gps_info():

            mavsdk_state.gps.fix_type = (
                gps.fix_type
            )

            mavsdk_state.gps.satellites = (
                gps.num_satellites
            )

    async def position_task():

        async for position in drone.telemetry.position():

            mavsdk_state.location.lat = (
                position.latitude_deg
            )

            mavsdk_state.location.lon = (
                position.longitude_deg
            )

            mavsdk_state.location.alt = (
                position.absolute_altitude_m
            )

            mavsdk_state.location.relative_alt = (
                position.relative_altitude_m
            )

    async def attitude_task():

        async for attitude in drone.telemetry.attitude_euler():

            mavsdk_state.attitude.roll = (
                attitude.roll_deg
            )

            mavsdk_state.attitude.pitch = (
                attitude.pitch_deg
            )

            mavsdk_state.attitude.yaw = (
                attitude.yaw_deg
            )

    async def velocity_task():

        async for velocity in drone.telemetry.velocity_ned():

            mavsdk_state.velocity = [
                velocity.north_m_s,
                velocity.east_m_s,
                velocity.down_m_s,
            ]

    async def heading_task():

        async for heading in drone.telemetry.heading():

            mavsdk_state.heading = (
                heading.heading_deg
            )

    async def health_task():

        async for health in drone.telemetry.health():

            mavsdk_state.ekf.ok = (
                health.is_global_position_ok
            )

    async def armed_task():

        async for armed in drone.telemetry.armed():

            mavsdk_state.armed = armed

    await asyncio.gather(
        battery_task(),
        gps_task(),
        position_task(),
        attitude_task(),
        velocity_task(),
        heading_task(),
        health_task(),
        armed_task(),
    )


def run_mavsdk_loop():

    asyncio.run(
        mavsdk_telemetry_loop()
    )


def start_mavsdk_telemetry():
    thread = threading.Thread(
        target=run_mavsdk_loop,
        daemon=True,
    )

    thread.start()