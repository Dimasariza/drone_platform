import FlightInformation from "@/app/components/FlightInformation"
import { Separator } from "@/components/ui/separator"
import dynamic from "next/dynamic"

const DroneMap = dynamic(
  () => import("@/app/components/DroneMap"),
  {
    ssr: false,
  }
)

export default function NavigationPanel() {
  return (
    <div className="w-full h-full rounded-xl border border-white/10 bg-black/40 p-6 backdrop-blur-md flex gap-4">
      <DroneMap />

      <div className="flex justify-between w-250">
        <div className="w-1/3 flex flex-col gap-4">
          <FlightInformation
            label="Speed"
            value="15 m/s"
          />
          <FlightInformation
            label="Speed"
            value="15 m/s"
          />
          <FlightInformation
            label="Speed"
            value="15 m/s"
          />
        </div>

        <Separator orientation="vertical" className="bg-white/90 border-px" />

        <div className="w-1/3 flex flex-col gap-4">
          <FlightInformation
            label="Speed"
            value="15 m/s"
          />
          <FlightInformation
            label="Speed"
            value="15 m/s"
          />
          <FlightInformation
            label="Speed"
            value="15 m/s"
          />
        </div>
      </div>
    </div>
  )
}