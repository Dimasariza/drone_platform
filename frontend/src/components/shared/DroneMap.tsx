"use client"

import L from "leaflet"
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
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
import { WaypointController } from "@/features/mission-planner/components/WaypointController"
import { useMissionStore } from "@/features/mission-planner/store/mission-store"

export type DroneMapProps = {
  latitude: number
  longitude: number
  mapLayer?: "google" | "satellite" | "osm" | "offline" // Explicit layer selection type
}

export default function DroneMap({
  latitude,
  longitude,
  mapLayer = "google",
}: DroneMapProps) {
  const {
    startPoint,
    destinationPoint,
    setStartPoint,
    setDestinationPoint,
  } = useMissionStore()

  const distance =
    startPoint && destinationPoint
      ? startPoint.distanceTo(destinationPoint)
      : 0

  // Fallback to pointing to localhost port 8000 if your NEXT_PUBLIC environment variable isn't set
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000"

  return (
    <MapContainer
      key={"drone-map"}
      // center={[latitude, longitude]}
      center={[-7.2504, 112.7688]}
      minZoom={1}
      maxZoom={21}
      zoom={13} // Adjusted default zoom to typical offline database boundaries
      attributionControl={false}
      className="h-full w-full rounded-md"
    >
      {
        mapLayer === "google" && (
          <TileLayer
            url="https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
            subdomains={["mt0", "mt1", "mt2", "mt3"]}
            maxZoom={21}
          />
        )
      }

      {
        mapLayer === "satellite" && (
          <TileLayer
            url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
            subdomains={["mt0", "mt1", "mt2", "mt3"]}
            maxZoom={21}
          />
        )
      }

      {
        mapLayer === "osm" && (
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            maxZoom={19}
          />
        )
      }

      {/* NEW OFFLINE TILE LAYER CONTAINER */}
      {
        mapLayer === "offline" && (
          <TileLayer
            url={`${backendUrl}/maps/tiles/{z}/{x}/{y}.png`}
            maxZoom={18} // Match the physical maximum resolution exported in your .sqlitedb file
            minZoom={1}
          />
        )
      }

      <WaypointController />

      <Marker position={[latitude, longitude]}>
        <Popup>
          Drone Position
        </Popup>
      </Marker>

      {startPoint && (
        <Marker
          position={startPoint}
          draggable={true}
          eventHandlers={{
            dragend: (e) => {
              const marker = e.target
              setStartPoint(marker.getLatLng())
            },
          }}
        >
          <Popup>
            <div>
              <div>Start Waypoint</div>
              <div>Lat: {startPoint.lat.toFixed(6)}</div>
              <div>Lon: {startPoint.lng.toFixed(6)}</div>
            </div>
          </Popup>
        </Marker>
      )}

      {destinationPoint && (
        <Marker
          position={destinationPoint}
          draggable={true}
          eventHandlers={{
            dragend: (e) => {
              const marker = e.target
              setDestinationPoint(marker.getLatLng())
            },
          }}
        >
          <Popup>
            <div>
              <div>Destination Waypoint</div>
              <div>Lat: {destinationPoint.lat.toFixed(6)}</div>
              <div>Lon: {destinationPoint.lng.toFixed(6)}</div>
            </div>
          </Popup>
        </Marker>
      )}

      {startPoint && destinationPoint && (
        <Polyline
          positions={[startPoint, destinationPoint]}
          pathOptions={{
            color: "#00ff88",
            weight: 4,
          }}
        />
      )}
    </MapContainer>
  )
}