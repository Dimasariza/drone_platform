import cv2

camera = None


def initialize_camera():
    global camera

    if camera is None:
        print("Initializing HDZero camera...")

        camera = cv2.VideoCapture(
            1,
            cv2.CAP_DSHOW
        )

        camera.set(
            cv2.CAP_PROP_FRAME_WIDTH,
            1280
        )

        camera.set(
            cv2.CAP_PROP_FRAME_HEIGHT,
            720
        )

        camera.set(
            cv2.CAP_PROP_FPS,
            30
        )

        if not camera.isOpened():
            raise Exception(
                "Failed to open HDZero capture device"
            )

        print("HDZero camera initialized")


def get_frame():
    global camera

    if camera is None:
        initialize_camera()

    success, frame = camera.read()

    if not success:
        print("Failed to capture frame")
        return None

    return frame


def release_camera():
    global camera

    if camera is not None:
        camera.release()
        camera = None

        print("Camera released")