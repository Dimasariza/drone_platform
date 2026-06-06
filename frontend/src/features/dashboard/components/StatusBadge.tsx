"use client"

type Props = {
  connected: boolean
  signalStrength?: number
}

export default function StatusBadge({
  connected,
  signalStrength = 4,
}: Props) {
  const normalizedSignal = Math.min(
    Math.max(signalStrength, 0),
    4
  )

  return (
    <div
      className="
        flex
        items-center
        gap-2
      "
    >
      {/* SIGNAL BARS */}
      {connected && (
        <div
          className="
            flex
            items-end
            gap-[3px]
            h-5
          "
        >
          {[1, 2, 3, 4].map((level) => {
            const isActive = normalizedSignal >= level

            let activeColor = ""

            if (normalizedSignal === 1) {
              activeColor =
                "bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.8)]"
            }

            else if (normalizedSignal === 2) {
              activeColor =
                "bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.8)]"
            }

            else if (normalizedSignal === 3) {
              activeColor =
                "bg-lime-400 shadow-[0_0_6px_rgba(163,230,53,0.8)]"
            }

            else {
              activeColor =
                "bg-emerald-400 shadow-[0_0_6px_rgba(74,222,128,0.8)]"
            }

            return (
              <div
                key={level}
                className={`
                  w-1.5
                  rounded-full
                  transition-all
                  duration-300
                  ${
                    isActive
                      ? activeColor
                      : "bg-zinc-700"
                  }
                `}
                style={{
                  height: `${level * 5}px`,
                }}
              />
            )
          })}
        </div>
      )}

      {/* DRONE ICON */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`
          size-6
          transition-colors
          duration-300
          ${
            connected
              ? "text-emerald-500"
              : "text-red-500"
          }
        `}
        viewBox="0 0 24 24"
      >
        <path d="M0 0h24v24H0z" fill="none" />

        <path
          fill="currentColor"
          d="M24 8V7h-7v1h3v1h-1v2h-3.3l-1.501-2.6H9.855l-1.5 2.6H5V9H4V8h3V7H0v1h3v1H2v5h3v-1h3.167l.216.374A8 8 0 0 0 4 20.5a.5.5 0 0 0 1 0a7 7 0 0 1 3.883-6.259l.972 1.683h4.344l.96-1.663A7 7 0 0 1 19 20.5a.5.5 0 0 0 1 0a8 8 0 0 0-4.34-7.106l.227-.394H19v1h3V9h-1V8Z"
        />
      </svg>

     
    </div>
  )
}