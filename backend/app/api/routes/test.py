from fastapi import APIRouter

from app.drone.tests.motor_test import arm_and_throttle_increase_test

router = APIRouter(
    prefix="/test",
    tags=["Test"]
)


@router.post("/motor")
def motor_test():
    arm_and_throttle_increase_test()

    return {
        "status": "motor test started"
    }