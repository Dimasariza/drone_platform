"use client"

import { useEffect, useRef } from "react"

import { useMap } from "react-leaflet"

import L from "leaflet"

import "leaflet-fullscreen"

export default function FullscreenControl() {
  const map = useMap()

  const addedRef = useRef(false)

  useEffect(() => {
    if (addedRef.current) return

    addedRef.current = true

    // @ts-ignore
    const fullscreenControl = new L.Control.Fullscreen({
      position: "topleft",
    })

    map.addControl(fullscreenControl)
  }, [map])

  return null
}