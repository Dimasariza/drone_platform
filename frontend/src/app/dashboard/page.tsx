"use client"

import StatusBadge from "../components/StatusBadge"
import BatteryBar from "../components/BatteryBar"
import DroneActions from "../components/DroneActions"
import VideoStream from "../components/VideoStream"
import { useTelemetryStore } from "@/store/telemetry.store"

export default function DashboardPage() {
  const { telemetry, connected } =
    useTelemetryStore()

  return (
    <div className="p-10 space-y-8">
      <div className="flex justify-between items-center">
        <div>

          <h1 className="text-4xl font-bold">
            Autonomous UAV Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Maritime AI Surveillance Platform
          </p>

        </div>

        <StatusBadge connected={connected ?? false} />
      </div>

      <DroneActions />

      <div className="border rounded-2xl p-6">
        <BatteryBar value={telemetry?.battery.level ?? 0} />
      </div>

      <div className="
        grid grid-cols-1 md:grid-cols-3 gap-5
      ">

        <div className="border rounded-xl p-5">
          <h2 className="font-semibold">
            Flight Mode
          </h2>

          <p className="text-3xl mt-3">
            {telemetry?.mode ?? "N/A"}
          </p>
        </div>

        <div className="border rounded-xl p-5">
          <h2 className="font-semibold">
            Armed
          </h2>

          <p className="text-3xl mt-3">
            {String(telemetry?.armed ?? false)}
          </p>
        </div>

        <div className="border rounded-xl p-5">
          <h2 className="font-semibold">
            Altitude
          </h2>

          <p className="text-3xl mt-3">
            {/* {telemetry?.altitude ?? 0} */}
          </p>
        </div>

      </div>
      
      <VideoStream />
    </div>
  )
}