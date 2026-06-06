import cv2

for i in range(10):
    print(f"Testing camera {i}")

    cap = cv2.VideoCapture(
        i,
        cv2.CAP_DSHOW
    )

    if cap.isOpened():
        print(f"[OK] Camera {i} opened")

        ret, frame = cap.read()

        if ret:
            print(
                f"[OK] Camera {i} frame received"
            )

            cv2.imshow(
                f"Camera {i}",
                frame
            )

            cv2.waitKey(3000)

        else:
            print(
                f"[FAIL] Camera {i} no frame"
            )

        cap.release()

cv2.destroyAllWindows()