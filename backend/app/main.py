import collections
import collections.abc
import os
import logging

import collections.abc
import collections
collections.MutableMapping = collections.abc.MutableMapping # type: ignore

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# from app.database.database import engine
# from app.database.models import Base

from app.telemetry.telemetry_service import start_telemetry
from app.api.routes import ws, video, drone, movement, telemetry, maps
# from app.api.routes.test import motor, test

# suppress dronekit logging
# logging.getLogger("dronekit").setLevel(logging.CRITICAL)
# logging.getLogger("dronekit.mavlink").setLevel(logging.CRITICAL)

app = FastAPI(
    title="Drone Platform API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_URL", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup_event():
    start_telemetry()
    # Base.metadata.create_all(bind=engine)
    pass

app.include_router(drone.router)
app.include_router(ws.router)
app.include_router(movement.router)
# app.include_router(test.router)
app.include_router(video.router)
app.include_router(telemetry.router)
# app.include_router(motor.router)
app.include_router(maps.router)

@app.get("/")
def root():
    return {
        "message": "Drone Platform API Running"
    }