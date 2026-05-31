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
    <div className="w-full h-full rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-md flex gap-4">
      <DroneMap />

      <div className="w-1/3 flex flex-col gap-4">
				<FlightInformation />
				<FlightInformation />
				<FlightInformation />
			</div>

			<Separator orientation="vertical" className="bg-black/90 border-2" />
    </div>
  )
}