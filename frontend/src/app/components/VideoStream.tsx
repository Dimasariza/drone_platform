export default function VideoStream() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  return (
    <img
      src={apiUrl ? `${apiUrl}/video` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl-FLywm282DN-CuGQ2Yf_RLvNO2gdYaHW7w&s"}
      className="rounded-xl"
    />
  )
}