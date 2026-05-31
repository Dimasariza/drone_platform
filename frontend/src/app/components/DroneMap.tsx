"use client"

import L from "leaflet"

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet"

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
})

import "leaflet-fullscreen/dist/leaflet.fullscreen.css"
import { useEffect, useState } from "react"

export default function DroneMap() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <MapContainer
      key={mounted ? "map-ready" : "map-loading"}
      center={[-7.2575, 112.7521]}
      zoom={18}
      attributionControl={false}
      className="h-[500px] w-full rounded-2xl"
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />

      <Marker position={[-7.2575, 112.7521]}>
        <Popup>
          Drone Position
        </Popup>
      </Marker>
    </MapContainer>
  )
}