from fastapi import APIRouter

from app.drone.commands import arm_drone, disarm_drone

router = APIRouter()

@router.post("/arm")
def arm():
    return arm_drone()

@router.post("/disarm")
def disarm():
    return disarm_drone()