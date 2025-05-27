import react, { useEffect, useRef } from "react"
import Hls from "hls.js"


export const App = () => {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current

    if(Hls.isSupported()) {
      const hls = new Hls()
      hls.loadSource('http://localhost:3001/stream.m3u8')
      hls.attachMedia(video)
    }

  })
  
  return (
    <div>
      <video 
        ref={videoRef} 
        controls 
        autoPlay 
      />
    </div>
  );
}
