from fastapi import APIRouter

from app.drone.movement import (
    arm_and_takeoff,
    land_drone
)

router = APIRouter()


@router.post("/takeoff")
def takeoff():
    arm_and_takeoff(1)

    return {
        "success": True,
        "message": "Takeoff initiated"
    }


@router.post("/land")
def land():
    land_drone()

    return {
        "success": True,
        "message": "Landing initiated"
    }