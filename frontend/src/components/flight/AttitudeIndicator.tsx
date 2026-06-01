import React from 'react';

interface AttitudeIndicatorProps {
  pitch: number; // Pitch in degrees (e.g., +15 for nose up, -10 for nose down)
  roll: number;  // Roll in degrees (e.g., +30 for bank right, -30 for bank left)
}

export const AttitudeIndicator: React.FC<AttitudeIndicatorProps> = ({ pitch, roll }) => {
  // 1 degree of pitch equals roughly 4 pixels of vertical translation
  const pitchTranslation = pitch * 4;

  return (
    <div className="flex items-center justify-center p-2">
      {/* OUTER GLASS CARD CONTAINER (Matches your Compass Style) */}
      <div className="relative flex size-60 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-black/50 p-4 shadow-2xl backdrop-blur-xl">

        {/* MASKED INSTRUMENT DIAL (Ensures the moving horizon stays circular) */}
        <div className="relative h-full w-full overflow-hidden rounded-full border border-zinc-700 bg-zinc-950">

          {/* ========================================================= */}
          {/* 1. DYNAMIC HORIZON BALL (Responds to both Pitch and Roll) */}
          {/* ========================================================= */}
          <div
            className="absolute inset-0 h-full w-full transition-transform duration-100 ease-out"
            style={{
              transform: `rotate(${-roll}deg) translateY(${pitchTranslation}px)`,
              transformOrigin: "center center",
            }}
          >
            {/* Sky (Blue) */}
            <div className="absolute inset-x-[-50%] top-[-50%] h-full w-[200%] bg-[#38bdf8]" />

            {/* Ground (Brown) */}
            <div className="absolute inset-x-[-50%] top-[50%] h-full w-[200%] bg-[#a16207]" />

            {/* Horizon Center Line */}
            <div className="absolute top-1/2 left-[-50%] h-px w-[200%] -translate-y-1/2 bg-white" />

            {/* PITCH LADDER LADDER LINES & NUMBERS */}
            <div className="absolute inset-0 flex flex-col items-center justify-center font-sans font-bold text-white text-[11px]">
              {/* Pitch +30 */}
              <div className="absolute flex items-center justify-between w-24 -translate-y-15">
                <span>30</span>
                <div className="h-0.5 w-20 bg-white" />
                <span>30</span>
              </div>

              {/* Pitch +20 */}
              <div className="absolute flex items-center justify-between w-21 -translate-y-10">
                <span>20</span>
                <div className="h-0.5 w-14 bg-white" />
                <span>20</span>
              </div>

              {/* Pitch +10 */}
              <div className="absolute flex items-center justify-between w-15 -translate-y-5">
                <span>10</span>
                <div className="h-0.5 w-8 bg-white" />
                <span>10</span>
              </div>

              {/* Pitch -10 */}
              <div className="absolute flex items-center justify-between w-15 translate-y-5">
                <span>-10</span>
                <div className="h-0.5 w-8 bg-white" />
                <span>-10</span>
              </div>

              {/* Pitch -20 */}
              <div className="absolute flex items-center justify-between w-21 translate-y-10">
                <span>-20</span>
                <div className="h-0.5 w-14 bg-white" />
                <span>-20</span>
              </div>

              {/* Pitch -30 */}
              <div className="absolute flex items-center justify-between w-24 translate-y-15">
                <span>-30</span>
                <div className="h-0.5 w-20 bg-white" />
                <span>-30</span>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* 2. STATIC FOREGROUND ELEMENTS (Do not track pitch/roll) */}
          {/* ========================================================= */}

          {/* ROLL TICK MARKS (Outer Bank Angle Markings) */}
          <div className="absolute inset-0 pointer-events-none">
            {[0, 10, 20, 30, 45, 60, -10, -20, -30, -45, -60].map((angle) => {
              // Thick white ticks at key intervals matching your gauge image
              const isMajor = angle === 0 || Math.abs(angle) === 30 || Math.abs(angle) === 60;
              return (
                <div
                  key={angle}
                  className="absolute left-1/2 top-0 h-1/2 origin-bottom -translate-x-1/2"
                  style={{ transform: `translateX(-50%) rotate(${angle}deg)` }}
                >
                  <div
                    className={`mx-auto bg-white ${isMajor ? "h-3 w-0.5" : "h-2 w-px"
                      }`}
                  />
                </div>
              );
            })}
          </div>

          {/* FIXED ROLL POINTER (The Yellow Triangle at the Top) */}
          <div className="absolute top-4 left-1/2 z-20 -translate-x-1/2">
            <svg width="16" height="12" viewBox="0 0 24 20" fill="none">
              <path
                d="M12 2L22 18H2L12 2Z"
                stroke="#facc15"
                strokeWidth="3"
                fill="none"
              />
            </svg>
          </div>

          {/* FIXED AIRCRAFT SYMBOL (The Thick Yellow "W" Wing Bars in Center) */}
          <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
            <svg width="180" height="40" viewBox="0 0 180 40" fill="none">
              {/* Left Wing Bar */}
              <path
                d="M20 20H60L70 30L80 20"
                stroke="#facc15"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Center Spec Node */}
              <circle cx="90" cy="20" r="3" fill="#facc15" />
              {/* Right Wing Bar */}
              <path
                d="M100 20L110 30L120 20H160"
                stroke="#facc15"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* DIGITAL DATA DISPLAY HUD (Matches your Compass Style) */}
          {/* <div className="absolute bottom-4 left-1/2 z-30 flex h-14 w-40 -translate-x-1/2 items-center justify-around rounded-xl border border-white/10 bg-zinc-950/80 px-2 text-center shadow-lg backdrop-blur-md font-mono">
            <div className="flex flex-col">
              <span className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold">Pitch</span>
              <span className="text-sm font-bold text-white">{pitch.toFixed(1)}°</span>
            </div>
            <div className="h-6 w-px bg-white/10" />
            <div className="flex flex-col">
              <span className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold">Roll</span>
              <span className="text-sm font-bold text-white">{roll.toFixed(1)}°</span>
            </div>
          </div> */}

        </div>
      </div>
    </div>
  );
};