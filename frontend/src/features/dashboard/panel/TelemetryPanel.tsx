import FlightInformation from "@/features/dashboard/components/FlightInformation";
import { AttitudeIndicator } from "@/features/dashboard/components/AttitudeIndicator";
import { FlightCompass } from "@/features/dashboard/components/Compass";
import { TelemetryData } from "@/types/telemetry.types";

interface TelemetryPanelProps {
  telemetry: TelemetryData | null
}

export default function TelemetryPanel({
  telemetry,
}: TelemetryPanelProps) {
  const RAD_TO_DEG = 180 / Math.PI

  const pitch =
    (telemetry?.attitude?.pitch ?? 0)
    * RAD_TO_DEG

  const roll =
    (telemetry?.attitude?.roll ?? 0)
    * RAD_TO_DEG

  const yaw =
    (telemetry?.attitude?.yaw ?? 0)
    * RAD_TO_DEG

  return (
    <div className="w-full h-full rounded-xl border border-white/10 bg-black/40 p-6 backdrop-blur-md flex gap-2 justify-center">
      <div className="flex flex-col gap-4">
        <AttitudeIndicator
          pitch={pitch ?? 0}
          roll={roll ?? 0}
        />

        <div className="flex gap-8 justify-center p-5">  
          <FlightInformation
            label="Pitch"
            className={{
              value: roll !== undefined && Math.abs(roll) > 45 ? "text-center text-red-500" : "text-center",
            }}
            value={`${pitch?.toFixed(1) ?? 0}°`}
          />
          <FlightInformation
            label="Roll"
            className={{
              value: roll !== undefined && Math.abs(roll) > 45 ? "text-center text-red-500" : "text-center",
            }}
            value={`${roll?.toFixed(1) ?? 0}°`}
          />
        </div>
        </div>

      <div>
        <FlightCompass yawDeg={yaw} />
      </div>
    </div>
  )
}