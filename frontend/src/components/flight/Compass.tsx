import React from 'react';

// Assuming yawDeg is passed as a prop or available in state
interface CompassProps {
  yawDeg: number;
}

export const FlightCompass: React.FC<CompassProps> = ({ yawDeg }) => {
  // Safe normalization of degrees between 0 and 359.
  const normalizedYaw = ((yawDeg % 360) + 360) % 360;

  return (
    <div className="flex items-center justify-center p-2">
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

          {/* CENTER DISPLAY GLASS BOX (Digital HUD) */}
          <div className="absolute left-1/2 top-1/2 z-10 flex h-14 w-18 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-2xl border border-white/10 bg-zinc-950/80 shadow-lg shadow-black/40 backdrop-blur-md">
            <span className="text-md font-bold font-mono tracking-tight text-white">
              {Math.round(normalizedYaw).toString().padStart(3, '0')}°
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
              {normalizedYaw >= 337.5 || normalizedYaw < 22.5 ? 'North' :
                normalizedYaw >= 22.5 && normalizedYaw < 67.5 ? 'NE' :
                  normalizedYaw >= 67.5 && normalizedYaw < 112.5 ? 'East' :
                    normalizedYaw >= 112.5 && normalizedYaw < 157.5 ? 'SE' :
                      normalizedYaw >= 157.5 && normalizedYaw < 202.5 ? 'South' :
                        normalizedYaw >= 202.5 && normalizedYaw < 247.5 ? 'SW' :
                          normalizedYaw >= 247.5 && normalizedYaw < 292.5 ? 'West' : 'NW'}
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};