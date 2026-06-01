import FlightInformation from "@/app/components/FlightInformation";
import { AttitudeIndicator } from "@/components/flight/AttitudeIndicator";
import { FlightCompass } from "@/components/flight/Compass";
import { TelemetryData } from "@/types/telemetry.types";

interface TelemetryPanelProps {
  telemetry: TelemetryData | null
}

export default function TelemetryPanel({
  telemetry,
}: TelemetryPanelProps) {
  const pitch = telemetry?.attitude?.pitch;
  const roll = telemetry?.attitude?.roll;
  return (
    <div className="w-full h-full rounded-xl border border-white/10 bg-black/40 p-6 backdrop-blur-md flex gap-2 justify-center">
      <div className="flex flex-col gap-4">
        <AttitudeIndicator
          pitch={pitch ?? 0}
          roll={roll ?? 0}
        />

        <FlightInformation
          label="Pitch"
          value={`${pitch?.toFixed(1) ?? 0}°`}
        />
        <FlightInformation
          label="Roll"
          value={`${roll?.toFixed(1) ?? 0}°`}
        />
      </div>

      <div>
        <FlightCompass yawDeg={telemetry?.attitude?.yaw ?? 0} />
      </div>
    </div>
  )
}