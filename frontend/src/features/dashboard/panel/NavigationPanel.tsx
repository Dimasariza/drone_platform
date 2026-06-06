import FlightInformation from "@/features/dashboard/components/FlightInformation"
import { Separator } from "@/components/ui/separator"
import dynamic from "next/dynamic"
import { TelemetryData } from "@/types/telemetry.types"

const DroneMap = dynamic(
  () => import("@/components/shared/DroneMap"),
  {
    ssr: false,
  }
)

type NavigationPanelProps = {
  telemetry: TelemetryData | null
}

export default function NavigationPanel({
  telemetry,
}: NavigationPanelProps) {
  return (
    <div className="w-full h-full rounded-xl border border-white/10 bg-black/40 p-6 backdrop-blur-md flex gap-4">
      <DroneMap 
        latitude={telemetry?.location?.lat ?? 0}
        longitude={telemetry?.location?.lon ?? 0}
      />

      <div className="flex justify-between w-250">
        <div className="w-1/3 flex flex-col gap-4">
          <FlightInformation
            label="Speed"
            value={telemetry?.groundspeed ? `${telemetry.groundspeed.toFixed(1)} m/s` : "N/A"}
          />

          <FlightInformation
            label="Height"
            value={telemetry?.location?.alt ? `${telemetry.location.alt.toFixed(1)} m` : "N/A"}
          />

          <FlightInformation
            label="Flight Time"
            value={telemetry?.flight_time ? `${telemetry.flight_time.toFixed(1)} s` : "N/A"}
          />
        </div>

        <Separator orientation="vertical" className="bg-white/90 border-px" />

        <div className="w-1/3 flex flex-col gap-4">
          <FlightInformation
            label="MODE"
            value={telemetry?.mode ?? "N/A"}
          />

          <FlightInformation
            label="GPS"
            value={telemetry?.gps?.satellites?.toString() ?? "N/A"}
          />

          <FlightInformation
            label="EKF"
            value={telemetry?.ekf?.ok?.toString() ?? "N/A"}
          />
        </div>
      </div>
    </div>
  )
}