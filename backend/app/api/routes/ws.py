import asyncio
from fastapi import APIRouter, WebSocket, WebSocketDisconnect

from app.websocket.manager import manager
from app.state.drone_state import drone_state

router = APIRouter()

@router.websocket("/ws/telemetry")
async def websocket_telemetry(websocket: WebSocket):

    await manager.connect(websocket)

    try:
        while True:

            await websocket.send_json(
                drone_state.model_dump()
            )

            await asyncio.sleep(0.3)

    except WebSocketDisconnect:
        manager.disconnect(websocket)