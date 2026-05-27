type Props = {
  title: string
  value: any
}

export default function TelemetryCard({
  title,
  value
}: Props) {

  return (
    <div className="border rounded-xl p-5 shadow">

      <h2 className="text-lg font-semibold">
        {title}
      </h2>

      <p className="text-2xl mt-2">
        {String(value)}
      </p>

    </div>
  )
}