export interface BoundingBox {
  x1: number
  y1: number
  x2: number
  y2: number
}

export interface Detection {
  class_id: number

  class_name: string

  confidence: number

  bbox: BoundingBox
}

export interface AIFrameResult {
  detections: Detection[]

  inference_time: number

  frame_width: number

  frame_height: number

  timestamp: string
}