"use client"

import L from "leaflet"
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet"

// Fix for missing marker icons in Next.js/React
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
})

import "leaflet-fullscreen/dist/leaflet.fullscreen.css"
import FullscreenControl from "./FullscreenControl"

export default function DroneMap() {
  return (
    <MapContainer
      key={"drone-map"}
      center={[-7.2575, 112.7521]}
      minZoom={1}
      maxZoom={21} // Match Google's max zoom limit
      zoom={18}
      attributionControl={false}
      className="h-60 w-full rounded-md"
    >
      <TileLayer
        url="https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
        subdomains={["mt0", "mt1", "mt2", "mt3"]}
        maxZoom={21}
      />

      <FullscreenControl />

      <Marker position={[-7.2575, 112.7521]}>
        <Popup>
          Drone Position
        </Popup>
      </Marker>
    </MapContainer>
  )
}
