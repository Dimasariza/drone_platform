import BatteryBar from "@/features/dashboard/components/BatteryBar";
import DroneActions from "@/features/dashboard/components/DroneActions";
import StatusBadge from "@/features/dashboard/components/StatusBadge";
import { Separator } from "@/components/ui/separator";
import { BatteryData, RCData } from "@/types/telemetry.types";

interface MissionStatusPanelProps {
    connected: boolean;
    battery?: BatteryData;
    rc?: RCData;
}

export default function MissionStatusPanel({
    connected = false,
    battery,
    rc,
}: MissionStatusPanelProps) {
    return (
        <>
            <div className="w-full h-full rounded-xl border border-white/10 bg-black/40 p-6 backdrop-blur-md">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-white">
                        Autonomous UAV Dashboard
                    </h1>

                    <StatusBadge connected={connected} signalStrength={rc?.signal_strength ?? 4} />
                </div>

                <p className="text-gray-500 mt-2">
                    Maritime AI Surveillance Platform
                </p>

                {/* Horizontal Divider */}
                <Separator className="my-4 bg-white/10" />

                <BatteryBar battery={battery} />

                <Separator className="my-4 bg-white/10" />

                <DroneActions />
            </div>
        </>
    )
}