import os

import cv2

# camera = cv2.VideoCapture(0)

# def generate_frames():

#     while True:

#         success, frame = camera.read()

#         if not success:
#             break

#         _, buffer = cv2.imencode(".jpg", frame)

#         frame_bytes = buffer.tobytes()

#         yield (
#             b"--frame\r\n"
#             b"Content-Type: image/jpeg\r\n\r\n"
#             + frame_bytes +
#             b"\r\n"
#         )

# ==========================================================================
import cv2
import threading
import time
import os

class BackgroundCamera:
    def __init__(self):
        # Auto-detect correct index out of /dev/video0 or /dev/video1
        self.device_index = 1 if os.path.exists('/dev/video1') else 0
        
        # Explicitly use the V4L2 backend driver for Linux containers
        self.cap = cv2.VideoCapture(self.device_index, cv2.CAP_V4L2)
        
        # Optimize frame format for generic USB capture cards (YUYV/MJPEG)
        self.cap.set(cv2.CAP_PROP_FOURCC, cv2.VideoWriter_fourcc(*'MJPG'))
        self.cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
        self.cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)
        
        self.ret = False
        self.frame = None
        self.is_running = True
        
        # Start the hardware polling loop thread
        self.thread = threading.Thread(target=self._update_loop, daemon=True)
        self.thread.start()
        print(f"Background camera thread spawned using index {self.device_index}", flush=True)

    def _update_loop(self):
        while self.is_running:
            if self.cap.isOpened():
                self.ret, img = self.cap.read()
                if self.ret:
                    self.frame = img
            else:
                time.sleep(0.5)
            # Avoid CPU melting by yielding slight processing cycles
            time.sleep(0.01)

    def get_encoded_frame(self):
        if self.frame is None:
            return None
        success, buffer = cv2.imencode(".jpg", self.frame)
        if not success:
            return None
        return buffer.tobytes()

# Initialize the single background controller instance
cam_worker = BackgroundCamera()

def generate_frames():
    while True:
        frame_bytes = cam_worker.get_encoded_frame()
        
        if frame_bytes is None:
            # Non-blocking placeholder check to prevent loop drops
            time.sleep(0.03)
            continue

        yield (
            b"--frame\r\n"
            b"Content-Type: image/jpeg\r\n\r\n"
            + frame_bytes +
            b"\r\n"
        )
        # Match standard 30 FPS playback timing interval
        time.sleep(0.03)