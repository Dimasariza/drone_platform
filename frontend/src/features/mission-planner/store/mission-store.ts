import { create } from "zustand"
import L from "leaflet"

interface MissionStore {
  startPoint: L.LatLng | null
  destinationPoint: L.LatLng | null

  setStartPoint: (
    point: L.LatLng | null
  ) => void

  setDestinationPoint: (
    point: L.LatLng | null
  ) => void

  clearMission: () => void

  getMissionDistance: () => number
}

export const useMissionStore =
  create<MissionStore>((set, get) => ({
    startPoint: null,

    destinationPoint: null,

    setStartPoint: (point) =>
      set({
        startPoint: point,
      }),

    setDestinationPoint: (point) =>
      set({
        destinationPoint: point,
      }),

    clearMission: () =>
      set({
        startPoint: null,
        destinationPoint: null,
      }),
    
    getMissionDistance: () => {
      const state = get()

      if (
        !state.startPoint ||
        !state.destinationPoint
      ) {
        return 0
      }

      return state.startPoint.distanceTo(
        state.destinationPoint
      )
    }
  }))