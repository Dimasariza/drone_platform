type Props = {
  value?: number
}

export default function BatteryBar({
  value = 0
}: Props) {
  return (
    <div className="w-full">
      <div className="flex justify-between mb-1 text-white">
        <span>Battery</span>
        <span>{value}%</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className="
            bg-green-600 h-4 rounded-full
            transition-all duration-500
          "
          style={{
            width: `${value}%`
          }}
        />
      </div>
    </div>
  )
}