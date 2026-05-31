import { AttitudeIndicator } from "@/components/flight/AttitudeIndicator";
import { FlightCompass } from "@/components/flight/Compass";
import { TelemetryData } from "@/types/telemetry.types";

interface TelemetryPanelProps {
	telemetry: TelemetryData | null
}

export default function TelemetryPanel({
	telemetry,
}: TelemetryPanelProps) {
  return (
    <div className="w-full h-full rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-md flex flex-col gap-4">
      <AttitudeIndicator
            pitch={telemetry?.attitude?.pitch ?? 0}
            roll={telemetry?.attitude?.roll ?? 0}
        />

			<FlightCompass yawDeg={telemetry?.attitude?.yaw ?? 0} />
    </div>
  )
}