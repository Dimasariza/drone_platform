from pydantic import BaseModel
from datetime import datetime
from uuid import UUID


class DetectionCreate(BaseModel):
    track_id: int
    class_name: str
    confidence: float
    snapshot_url: str | None = None
    latitude: float | None = None
    longitude: float | None = None


class DetectionResponse(BaseModel):
    id: UUID
    track_id: int
    class_name: str
    confidence: float
    snapshot_url: str | None
    latitude: float | None
    longitude: float | None
    created_at: datetime

    class Config:
        from_attributes = True