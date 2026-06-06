import { useSmoothValue } from '@/hooks/useSmoothValue';
import React from 'react';

// Assuming yawDeg is passed as a prop or available in state
interface CompassProps {
  yawDeg: number;
}

export const FlightCompass: React.FC<CompassProps> = ({ yawDeg }) => {
  // Safe normalization of degrees between 0 and 359.
  const smoothYaw = useSmoothValue(yawDeg, 0.06)

  const normalizedYaw =
  ((smoothYaw % 360) + 360) % 360

  return (
    <div className="flex items-center justify-center">
      {/* OUTER GLASS CARD CONTAINER (From your SVG styles) */}
      <div className="relative flex size-60 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-black/50 p-4 shadow-2xl backdrop-blur-xl">

        {/* COMPASS DIAL RADIAL AREA */}
        <div className="relative h-full w-full rounded-full border border-white/5 bg-linear-to-b from-white/2 to-transparent">

          {/* ROTATING COMPASS CORE */}
          <div
            className="absolute inset-0 transition-transform duration-200 ease-out"
            style={{
              transform: `rotate(${-normalizedYaw}deg)`,
            }}
          >
            {/* COMPASS TICKS (Every 5 degrees) */}
            {[...Array(72)].map((_, i) => {
              const rotation = i * 5;
              const isMajor = i % 6 === 0; // Every 30 degrees (N, 30, 60, E...)
              const isCardinal = i % 18 === 0; // N, E, S, W

              return (
                <div
                  key={i}
                  className="absolute left-1/2 top-0 h-full"
                  style={{
                    transform: `translateX(-50%) rotate(${rotation}deg)`,
                  }}
                >
                  <div
                    className={`mx-auto transition-all ${isCardinal
                      ? "h-4 w-0.5 bg-white"
                      : isMajor
                        ? "h-3 w-[1.5px] bg-white/60"
                        : "h-1.5 w-px bg-white/20"
                      }`}
                  />

                  {/* Subtle numerical degree indicators for a tactical look */}
                  {isMajor && !isCardinal && (
                    <span
                      className="absolute left-1/2 top-5 -translate-x-1/2 text-[9px] font-medium tracking-tight text-white/40"
                      style={{ transform: `translateX(-50%) rotate(${-rotation}deg)` }}
                    >
                      {rotation}
                    </span>
                  )}
                </div>
              );
            })}

            {/* CARDINAL DIRECTION TEXTS */}
            {/* NORTH */}
            <div className="absolute left-1/2 top-4 -translate-x-1/2 text-xl font-bold tracking-tighter text-red-500">
              N
            </div>
            {/* SOUTH */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xl font-medium tracking-tighter text-white/80">
              S
            </div>
            {/* WEST */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-medium tracking-tighter text-white/80">
              W
            </div>
            {/* EAST */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xl font-medium tracking-tighter text-white/80">
              E
            </div>
          </div>

          {/* FIXES BEZEL POINTER (Top Center Index Marker) */}
          <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-0.5">
            <div className="h-0 w-0 border-l-[6px] border-r-[6px] border-t-8 border-l-transparent border-r-transparent border-t-red-500" />
          </div>

          {/* CENTER AIRCRAFT MARKER */}
          <div
            className="
              absolute
              left-1/2
              top-1/2
              z-20
              -translate-x-1/2
              -translate-y-1/2
              pointer-events-none
            "
          >
            {/* OUTER RADAR RING */}
            <div
              className="
                relative
                flex
                items-center
                justify-center
                size-24
                rounded-full
                border
                border-white/10
                bg-black/40
                backdrop-blur-md
                shadow-lg
                shadow-black/40
              "
            >
              {/* INNER RING */}
              <div
                className="
                  absolute
                  size-14
                  rounded-full
                  border
                  border-white/10
                "
              />

              {/* HEADING LINE */}
              <div
                className="
                  absolute
                  w-[2px]
                  h-16
                  bg-white/70
                  rounded-full
                "
              />

              {/* HORIZONTAL STABILIZER LINE */}
              <div
                className="
                  absolute
                  w-12
                  h-[2px]
                  bg-white/40
                  rounded-full
                "
              />

              {/* AIRCRAFT TRIANGLE */}
              <div
                className="
                  absolute
                  flex
                  items-center
                  justify-center
                  -translate-y-1/4
                "
              >
                <div
                  className="
                    w-0
                    h-0
                    border-l-[10px]
                    border-r-[10px]
                    border-b-[18px]
                    border-l-transparent
                    border-r-transparent
                    border-b-white
                    drop-shadow-[0_0_6px_rgba(255,255,255,0.5)]
                  "
                />
              </div>

              {/* CENTER CORE */}
              {/* <div
                className="
                  absolute
                  w-3
                  h-3
                  rounded-full
                  bg-white
                  shadow-[0_0_12px_rgba(255,255,255,0.8)]
                "
              /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};