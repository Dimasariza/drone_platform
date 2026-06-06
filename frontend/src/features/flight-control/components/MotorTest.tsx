import { Button } from "@/components/ui/button";
import { testMotor } from "@/services/drone/motor.service";

export default function MotorTest() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {[1, 2, 3, 4].map((motor) => (
        <Button
          key={motor}
          onClick={() => testMotor(motor)}
          className="
            h-24
            rounded-xl
            bg-zinc-900
            hover:bg-zinc-800
          "
        >
          Motor {motor}
        </Button>
      ))}
    </div>
  )
}