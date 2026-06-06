"use client"

import { useEffect, useState } from "react"

import {
  Camera,
  WifiOff,
  AlertTriangle,
} from "lucide-react"

export default function VideoStream() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  const [videoAvailable, setVideoAvailable] =
    useState(false)

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {
    if (!apiUrl) {
      setLoading(false)
      setVideoAvailable(false)
      return
    }

    const img = new window.Image()

    img.src = `${apiUrl}/video`

    img.onload = () => {
      setVideoAvailable(true)
      setLoading(false)
    }

    img.onerror = () => {
      setVideoAvailable(false)
      setLoading(false)
    }
  }, [apiUrl])

  if (!videoAvailable) {
    return (
      <div
        className="
          w-full
          h-full
          rounded-xl
          bg-zinc-950
          border
          border-white/10
          flex
          flex-col
          items-center
          justify-center
          relative
          overflow-hidden
        "
      >
        {/* Background Glow */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-br
            from-red-500/5
            via-transparent
            to-blue-500/5
          "
        />

        {/* Icon */}
        <div
          className="
            w-24
            h-24
            rounded-full
            bg-zinc-900
            border
            border-white/10
            flex
            items-center
            justify-center
            mb-6
            z-10
          "
        >
          {loading ? (
            <AlertTriangle
              className="
                w-10
                h-10
                text-yellow-500
              "
            />
          ) : (
            <WifiOff
              className="
                w-10
                h-10
                text-red-500
              "
            />
          )}
        </div>

        {/* Title */}
        <h2
          className="
            text-2xl
            font-semibold
            text-white
            z-10
          "
        >
          {loading
            ? "Initializing Video Stream"
            : "No Video Signal"}
        </h2>

        {/* Description */}
        <p
          className="
            text-zinc-400
            mt-3
            text-center
            max-w-md
            z-10
          "
        >
          {loading
            ? "Waiting for drone camera connection..."
            : "Drone is disconnected or no live stream is currently being transmitted."}
        </p>

        {/* Bottom Status */}
        <div
          className="
            absolute
            bottom-6
            left-6
            right-6
            flex
            items-center
            justify-between
            text-sm
            text-zinc-500
          "
        >
          <div className="flex items-center gap-2">
            <Camera className="w-4 h-4" />

            <span>HDZero Stream</span>
          </div>

          <div
            className="
              px-3
              py-1
              rounded-full
              bg-red-500/10
              text-red-400
              border
              border-red-500/20
            "
          >
            OFFLINE
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="
        relative
        w-full
        h-140
        overflow-hidden
        rounded-md
        border
        border-white/10
        bg-black
      "
    >
      <img
        src={`${apiUrl}/video`}
        alt="Drone Video Stream"
        className="
          w-full
          h-full
          object-fill
        "
      />

      {/* LIVE Badge */}
      <div
        className="
          absolute
          bottom-4
          left-4
          px-4
          py-2
          rounded-full
          bg-red-500/90
          text-white
          text-sm
          font-medium
          flex
          items-center
          gap-2
          backdrop-blur-md
        "
      >
        <div
          className="
            w-2
            h-2
            rounded-full
            bg-white
            animate-pulse
          "
        />

        LIVE
      </div>
    </div>
  )
}