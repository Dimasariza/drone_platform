"use client"

import { AttitudeIndicator } from "@/components/flight/AttitudeIndicator"
import { FlightCompass } from "@/components/flight/Compass"

interface FlightIndicatorProps {
  pitch: number
  roll: number
  yaw: number
  altitude?: number
  groundspeed?: number
  climbRate?: number
}

export default function FlightIndicator({
  pitch,
  roll,
  yaw,
  altitude = 0,
  groundspeed = 0,
  climbRate = 0,
}: FlightIndicatorProps) {
  const pitchDeg = (pitch * 180) / Math.PI
  const rollDeg = (roll * 180) / Math.PI
  const yawDeg = (yaw * 180) / Math.PI

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-md">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* ATTITUDE */}
        <AttitudeIndicator
            pitch={pitch ?? 0}
            roll={roll ?? 0}
        />

        <div className="flex items-center justify-center">
          <div className="relative h-[320px] w-[320px] overflow-hidden rounded-full border-[6px] border-white shadow-2xl">
            {/* SKY + GROUND */}
            <div
              className="absolute inset-0 transition-transform duration-100"
              style={{
                transform: `
                  rotate(${rollDeg}deg)
                  translateY(${pitchDeg * 3}px)
                `,
              }}
            >
              {/* SKY */}
              <div className="h-1/2 w-full bg-gradient-to-b from-blue-400 to-blue-600" />

              {/* HORIZON */}
              <div className="h-[4px] w-full bg-yellow-400" />

              {/* GROUND */}
              <div className="h-1/2 w-full bg-green-600" />
            </div>

            {/* CENTER FIXED LINES */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative flex items-center justify-center">
                <div className="h-[3px] w-28 bg-yellow-300" />
                <div className="absolute h-[3px] w-8 bg-white" />
              </div>
            </div>

            {/* PITCH LINES */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative h-full w-full">
                {[...Array(9)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute left-1/2 h-[2px] bg-white/70"
                    style={{
                      width: i % 2 === 0 ? "80px" : "40px",
                      top: `${20 + i * 30}px`,
                      transform: "translateX(-50%)",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* TOP RED MARK */}
            <div className="absolute left-1/2 top-0 h-8 w-[4px] -translate-x-1/2 bg-red-500" />
          </div>
        </div>

        {/* COMPASS */}
        <FlightCompass yawDeg={yawDeg} />
      </div>

      {/* DATA PANEL */}
      <div className="mt-8 rounded-2xl border border-white/10 bg-black/30 p-6">
        <div className="grid grid-cols-3 gap-6 border-b border-white/10 pb-6 text-center">
          <div>
            <p className="text-lg text-white/60">Alt (Rel)</p>
            <p className="mt-2 text-5xl font-light text-white">
              {altitude.toFixed(1)}
            </p>
            <p className="text-white/60">m</p>
          </div>

          <div>
            <p className="text-lg text-white/60">Ground Speed</p>
            <p className="mt-2 text-5xl font-light text-white">
              {groundspeed.toFixed(1)}
            </p>
            <p className="text-white/60">m/s</p>
          </div>

          <div>
            <p className="text-lg text-white/60">Heading</p>
            <p className="mt-2 text-5xl font-light text-white">
              {Math.round(yawDeg)}
            </p>
            <p className="text-white/60">deg</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-8 text-center">
          <div className="space-y-6">
            <div>
              <p className="text-white/60">Pitch</p>
              <p className="text-4xl font-light text-white">
                {pitchDeg.toFixed(1)}
              </p>
              <p className="text-white/60">deg</p>
            </div>

            <div>
              <p className="text-white/60">Climb Rate</p>
              <p className="text-4xl font-light text-white">
                {climbRate.toFixed(1)}
              </p>
              <p className="text-white/60">m/s</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-white/60">Roll</p>
              <p className="text-4xl font-light text-white">
                {rollDeg.toFixed(1)}
              </p>
              <p className="text-white/60">deg</p>
            </div>

            <div>
              <p className="text-white/60">Yaw</p>
              <p className="text-4xl font-light text-white">
                {yawDeg.toFixed(1)}
              </p>
              <p className="text-white/60">deg</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}