import { useMapEvents } from "react-leaflet"
import { useMissionStore } from "../store/mission-store"

export function WaypointController() {
  const {
    startPoint,
    destinationPoint,
    setStartPoint,
    setDestinationPoint,
  } = useMissionStore()

  useMapEvents({
    click(e) {
      if (!startPoint) {
        setStartPoint(e.latlng)
        return
      }

      if (!destinationPoint) {
        setDestinationPoint(e.latlng)
        return
      }

      // third click resets route
      setStartPoint(e.latlng)
      setDestinationPoint(null)
    },
  })

  return null
}