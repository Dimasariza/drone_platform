type Props = {
  label?: string;
  value?: string;
  className?: {
    label?: string;
    value?: string;
  };
}

export default function FlightInformation({
  label,
  value,
  className,
}: Props) {
  return (
    <div>
      <p className={`text-xs text-white uppercase ${className?.label}`}>
        {label}
      </p>
      <p className={`text-md font-bold text-white ${className?.value}`}>
        {value}
      </p>
    </div>
  )
}