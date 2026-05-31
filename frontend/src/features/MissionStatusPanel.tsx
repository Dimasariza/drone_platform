import BatteryBar from "@/app/components/BatteryBar";
import DroneActions from "@/app/components/DroneActions";
import StatusBadge from "@/app/components/StatusBadge";
import { Separator } from "@/components/ui/separator";

export default function MissionStatusPanel({
    connected = false
}) {
  return (
    <>
        <div className="w-full h-full rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-md">
			<div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-white">
                    Autonomous UAV Dashboard
                </h1>

                <StatusBadge connected={connected} />
			</div>

			<p className="text-gray-500 mt-2">
				Maritime AI Surveillance Platform
			</p>

			{/* Horizontal Divider */}
            <Separator className="my-4 bg-white/10" />

			<BatteryBar />

            <Separator className="my-4 bg-white/10" />

            <DroneActions />
		</div>
    </>
  )
}