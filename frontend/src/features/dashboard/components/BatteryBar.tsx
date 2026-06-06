import { BatteryData } from "@/types/telemetry.types"

type Props = {
  battery?: BatteryData
}

export default function BatteryBar({
  battery,
}: Props) {
  return (
    <div className="w-full">
      <div className="flex justify-between mb-1 text-white">
        <span>Battery</span>
        <span>{battery?.level ?? 0}%</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className="
            bg-green-600 h-4 rounded-full
            transition-all duration-500
          "
          style={{
            width: `${battery?.level ?? 0}%`
          }}
        />
      </div>
    </div>
  )
}