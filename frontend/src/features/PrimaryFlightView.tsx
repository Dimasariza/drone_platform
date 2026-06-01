import VideoStream from "@/app/components/VideoStream";

export default function PrimaryFlightView() {
  return (
    <div className="w-full h-full rounded-xl border border-white/10 bg-black/40 backdrop-blur-md overflow-hidden">
      <VideoStream />
    </div>
  )
}