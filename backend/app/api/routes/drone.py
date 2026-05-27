from fastapi import APIRouter

from app.drone.commands import arm_drone, disarm_drone
from app.state.drone_state import drone_state

router = APIRouter()

@router.post("/arm")
def arm():
    return arm_drone()

@router.post("/disarm")
def disarm():
    return disarm_drone()