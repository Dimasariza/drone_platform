import collections
import collections.abc
import os

collections.MutableMapping = collections.abc.MutableMapping

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.telemetry.telemetry_service import start_telemetry
from app.api.routes import ws, video, telemetry, drone

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
app.include_router(video.router)
app.include_router(telemetry.router)

@app.get("/")
def root():
    return {
        "message": "Drone Platform API Running"
    }