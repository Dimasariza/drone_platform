from fastapi import APIRouter
from fastapi.responses import StreamingResponse

from app.video.stream import generate_video_stream

router = APIRouter()


@router.get("/video")
def video_feed():
    return StreamingResponse(
        generate_video_stream(),
        media_type="multipart/x-mixed-replace; boundary=frame"
    )