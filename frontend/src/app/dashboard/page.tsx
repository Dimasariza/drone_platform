"use client"

import StatusBadge from "../components/StatusBadge"
import BatteryBar from "../components/BatteryBar"
import VideoStream from "../components/VideoStream"
import { useTelemetryStore } from "@/store/telemetry.store"
import FlightIndicator from "../components/FlightIndicator"
import { Button } from "@/components/ui/button"
import { land, takeoff } from "@/services/drone/movement.service"
import { AttitudeIndicator } from "@/components/flight/AttitudeIndicator"
import { FlightCompass } from "@/components/flight/Compass"
import dynamic from "next/dynamic"
import PrimaryFlightView from "@/features/PrimaryFlightView"
import MissionStatusPanel from "@/features/MissionStatusPanel"
import NavigationPanel from "@/features/NavigationPanel"
import TelemetryPanel from "@/features/TelemetryPanel"

export default function DashboardPage() {
  const { telemetry, connected } =
    useTelemetryStore()

  return (
    <div className="grid grid-cols-12 gap-3 h-screen p-3 bg-linear-to-br from-black via-zinc-900 to-black">

      <div className="col-span-4">
        <MissionStatusPanel connected={connected} />
      </div>

      <div className="col-span-8">
        <NavigationPanel />
      </div>

      <div className="col-span-4">
        <TelemetryPanel telemetry={telemetry} />
      </div>

      <div className="col-span-8">
        <PrimaryFlightView />
      </div>

      {/* <FlightIndicator
        pitch={telemetry?.attitude?.pitch ?? 0}
        roll={telemetry?.attitude?.roll ?? 0}
        yaw={telemetry?.attitude?.yaw ?? 0}
        altitude={telemetry?.location?.alt ?? 0}
        groundspeed={telemetry?.groundspeed ?? 0}
        climbRate={telemetry?.velocity?.[2] ?? 0}
      /> */}

      {/* <div className="
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
            {telemetry?.altitude ?? 0}
          </p>
        </div>
      </div> */}
    </div>
  )
}