import uuid

from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    Text,
    DateTime
)

from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import UUID

from app.database.database import Base


class Detection(Base):
    __tablename__ = "detections"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )

    track_id = Column(Integer, index=True)

    class_name = Column(String(100), index=True)

    confidence = Column(Float)

    latitude = Column(Float, nullable=True)

    longitude = Column(Float, nullable=True)

    snapshot_url = Column(Text)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )