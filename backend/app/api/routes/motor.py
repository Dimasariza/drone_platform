# app/routes/motor.py

from fastapi import APIRouter

from app.drone.motor_service import test_motor

router = APIRouter(prefix="/motor")

@router.post("/{motor_number}")
def spin_motor(
    motor_number: int,
):
    return test_motor(
        motor_number=motor_number,
        throttle_percent=10,
        duration_sec=2,
    )