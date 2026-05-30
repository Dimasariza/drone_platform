import collections
import collections.abc
import os
import logging

collections.MutableMapping = collections.abc.MutableMapping

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.telemetry.telemetry_service import start_telemetry
from app.api.routes import ws, video, drone, movement, test, telemetry

# suppress dronekit logging
# logging.getLogger("dronekit").setLevel(logging.CRITICAL)
# logging.getLogger("dronekit.mavlink").setLevel(logging.CRITICAL)

app = FastAPI(
    title="Drone Platform API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_URL")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup_event():
    start_telemetry()

app.include_router(drone.router)
app.include_router(ws.router)
app.include_router(movement.router)
app.include_router(test.router)
# app.include_router(video.router)
app.include_router(telemetry.router)

@app.get("/")
def root():
    return {
        "message": "Drone Platform API Running"
    }