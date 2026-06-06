"use client"

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import DroneMap from "@/components/shared/DroneMap";
import { useState } from "react";
import { useMissionStore } from "@/features/mission-planner/store/mission-store";

export default function MissionPlannerPage() {

    const [mapLayer, setMapLayer] =
        useState("google")

    const {
        startPoint,
        destinationPoint,
        getMissionDistance
    } = useMissionStore()

    return (
        <div className="w-full h-screen p-6 flex gap-6">
            <div className="w-full h-full">
                <DroneMap 
                    latitude={0} 
                    longitude={0} 
                    mapLayer={mapLayer}
                />
            </div>
            
            <Select onValueChange={(value) => setMapLayer(value)} value={mapLayer}>
                <SelectTrigger className="w-full max-w-48">
                    <SelectValue placeholder="Select Map Layer" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Map Layers</SelectLabel>
                        <SelectItem value="google">Google Maps</SelectItem>
                        <SelectItem value="osm">OpenStreetMap</SelectItem>
                        <SelectItem value="satellite">Satellite</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>

            <div className="w-80">
                <div>
                    Start:
                    {startPoint
                    ? `${startPoint.lat.toFixed(6)},
                        ${startPoint.lng.toFixed(6)}`
                    : "Not selected"}
                </div>

                <div>
                    Destination:
                    {destinationPoint
                    ? `${destinationPoint.lat.toFixed(6)},
                        ${destinationPoint.lng.toFixed(6)}`
                    : "Not selected"}
                </div>

                <div>
                    Distance: {getMissionDistance().toFixed(2)} meters
                </div>
            </div>
        </div>
    )
}