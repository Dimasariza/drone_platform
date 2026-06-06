"use client"

import MotorTest from "@/features/flight-control/components/MotorTest";

export default function FlightControlPage() {
    return (
        <div className="w-full h-full p-6 flex gap-6">
            Flight Control Page
            <MotorTest />
        </div>
    )
}