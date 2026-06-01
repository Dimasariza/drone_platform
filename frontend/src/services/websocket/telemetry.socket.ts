import { useTelemetryStore } from "@/store/telemetry.store"
import { toast } from "sonner"

export const createTelemetrySocket = () => {
  const socket = new WebSocket(
    process.env.NEXT_PUBLIC_WS_URL!
  )

  const {
    setTelemetry,
    setConnected,
  } = useTelemetryStore.getState()

  socket.onopen = () => {
    console.log("Telemetry WebSocket Connected")
    toast.success("Telemetry Data Received")

    setConnected(true)
  }

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data)

    setTelemetry(data)
  }

  socket.onclose = () => {
    console.log("Telemetry WebSocket Closed")
    toast.info("Telemetry Disconnected")
    setConnected(false)
  }

  socket.onerror = (error) => {
    toast.error("Telemetry Error")
    setConnected(false)
  }
}