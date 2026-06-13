"use client"

import { useTelemetryStore } from "@/store/telemetry.store"
import PrimaryFlightView from "@/features/dashboard/panel/PrimaryFlightView"
import MissionStatusPanel from "@/features/dashboard/panel/MissionStatusPanel"
import NavigationPanel from "@/features/dashboard/panel/NavigationPanel"
import TelemetryPanel from "@/features/dashboard/panel/TelemetryPanel"

export default function DashboardPage() {
  const { telemetry, connected } =
    useTelemetryStore()

  return (
    <div className="grid grid-cols-12 gap-3 h-screen p-3 bg-linear-to-br from-black via-zinc-900 to-black">

      <div className="col-span-4">
        <MissionStatusPanel 
          connected={connected} 
          battery={telemetry?.battery} 
          rc={telemetry?.rc}
        />
      </div>

      <div className="col-span-8">
        <NavigationPanel telemetry={telemetry} />
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