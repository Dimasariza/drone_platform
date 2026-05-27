type Props = {
  connected: boolean
}

export default function StatusBadge({
  connected
}: Props) {

  return (

    <div
      className={`
        px-4 py-2 rounded-full text-white font-semibold
        ${connected ? "bg-green-600" : "bg-red-600"}
      `}
    >
      {connected ? "CONNECTED" : "DISCONNECTED"}
    </div>

  )
}