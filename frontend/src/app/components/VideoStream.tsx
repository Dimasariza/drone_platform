export default function VideoStream() {
  return (
    <img
      src={`${process.env.NEXT_PUBLIC_API_URL}/video`}
      className="rounded-xl"
    />
  )
}