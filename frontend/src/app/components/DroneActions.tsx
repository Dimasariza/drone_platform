import { Button } from "@/components/ui/button"
import { armDrone, disarmDrone } from "@/services/drone/drone.service"

export default function DroneActions() {
  async function handleArm () {
    try {
			await armDrone()
    } catch (error) {
			console.error(error)
    }
  }

  async function handleDisarm() {
    try {
			await disarmDrone()
    } catch (error) {
			console.error(error)
    }
	}

  return (
    <div className="flex gap-3">
      <Button
        onClick={handleArm}
        className="
          bg-green-600 text-white
          px-5 py-2 rounded-lg
        "
      >
        ARM
      </Button>

      <Button   
        onClick={handleDisarm}
        className="
          bg-red-600 text-white
          px-5 py-2 rounded-lg
        "
      >
        DISARM
      </Button>
    </div>
  )
}