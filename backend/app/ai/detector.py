from ultralytics import YOLO

model = YOLO("yolov8l.pt")

def detect(frame):
    results = model(frame)

    detections = []

    for r in results:
        for box in r.boxes:
            cls_id = int(box.cls[0])

            detections.append({
                "class_id": cls_id,
                "class_name": model.names[cls_id],
                "confidence": float(box.conf[0]),
                "bbox": box.xyxy[0].tolist()
            })

    return detections