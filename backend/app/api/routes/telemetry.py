from fastapi import APIRouter

from app.state.drone_state import drone_state

router = APIRouter()

@router.get("/telemetry")
def get_telemetry():
    return drone_state