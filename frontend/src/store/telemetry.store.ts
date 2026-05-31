import { TelemetryData } from "@/types/telemetry.types"
import { create } from "zustand"

interface TelemetryState {
  telemetry: TelemetryData | null
  connected: boolean

  setTelemetry: (data: TelemetryData) => void
  setConnected: (value: boolean) => void
}

export const useTelemetryStore =
  create<TelemetryState>((set) => ({
    telemetry: null,
    connected: false,

    setTelemetry: (data) =>
      set({
        telemetry: data,
      }),

    setConnected: (value) =>
      set({
        connected: value,
      }),
  }))