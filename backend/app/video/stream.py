import cv2
import time

from app.video.camera import get_frame
from app.video.processor import process_frame

def generate_video_stream():
    while True:
        try:
            frame = get_frame()

            if frame is None:
                time.sleep(0.01)
                continue

            frame = process_frame(frame)

            success, buffer = cv2.imencode(
                ".jpg",
                frame,
                [
                    int(cv2.IMWRITE_JPEG_QUALITY),
                    80
                ]
            )

            if not success:
                continue

            frame_bytes = buffer.tobytes()

            yield (
                b"--frame\r\n"
                b"Content-Type: image/jpeg\r\n\r\n"
                + frame_bytes +
                b"\r\n"
            )

        except Exception as e:
            print(
                "Video stream error:",
                str(e)
            )

            time.sleep(1)