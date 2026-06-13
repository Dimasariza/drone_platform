import asyncio
import json

from fastapi import APIRouter
from fastapi import WebSocket

from app.state.mavsdk_state import mavsdk_state

router = APIRouter()

@router.websocket("/ws_mav/telemetry")
async def mavsdk_telemetry_ws(
    websocket: WebSocket
):

    await websocket.accept()

    try:

        while True:

            await websocket.send_json(
                mavsdk_state.model_dump()
            )

            await asyncio.sleep(0.1)

    except Exception:

        await websocket.close()