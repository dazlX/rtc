import react, { useEffect, useRef, useState } from "react"
import Hls from "hls.js"
import './css/main.css'


export const App = () => {
  const videoRef = useRef(null)
  const [retry, setRetry] = useState(0)

  useEffect(() => {

    const video = videoRef.current
    const connect = () => {
    const hls = new Hls()

    hls.on(Hls.Events.MANIFEST_PARSED, (data) => {
      console.log("CONNECT OK")
      setRetry(0)
    })

    hls.on(Hls.Events.ERROR, (e, data) => {
      if(data.type == Hls.ErrorTypes.NETWORK_ERROR){
        if(retry < 10) {
          setTimeout(() => {
            console.log('reconnect')
            setRetry(c => c + 1)
            connect()
          }, 3000)
        }
        else{
          console.log('DISCONNECT')
        }
      }
    })
    hls.loadSource('http://localhost:3001/stream.m3u8')
    hls.attachMedia(video)
  }
  if(Hls.isSupported){
    connect()
  }
}, [retry])
  
  return (
    <div className="main">
      <video
        className="rtcVideo"
        ref={videoRef} 
        controls 
        autoPlay 
      />
    </div>
  );
}

