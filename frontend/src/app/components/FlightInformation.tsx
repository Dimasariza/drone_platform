type Props = {
  label?: string;
  value?: string;
}

export default function FlightInformation({
  label,
  value
}: Props) {
  return (
    <div>
      <p className="text-xs text-white">{label}</p>
      <span className="text-md font-bold text-white">{value}</span>
    </div>
  )
}