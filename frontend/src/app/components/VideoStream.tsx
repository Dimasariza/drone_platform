import Image from "next/image"

export default function VideoStream() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  return (
    <Image
      alt="Streaming Drone Video"
      src={apiUrl ? `${apiUrl}/video` : "https://cdn.britannica.com/88/160888-050-F34A4160/Rip-current-sandbars.jpg"}
      className="rounded-xl h-auto"
      width={"800"}
      height={"800"}
      loading="eager"
    />
  )
}