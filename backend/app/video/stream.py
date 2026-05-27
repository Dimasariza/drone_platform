import cv2

from app.video.camera import get_frame
from app.video.processor import process_frame


def generate_video_stream():
    while True:
        frame = get_frame()

        if frame is None:
            continue

        frame = process_frame(frame)

        _, buffer = cv2.imencode(".jpg", frame)

        frame_bytes = buffer.tobytes()

        yield (
            b"--frame\r\n"
            b"Content-Type: image/jpeg\r\n\r\n"
            + frame_bytes +
            b"\r\n"
        )