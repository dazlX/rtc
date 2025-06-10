import react, { useEffect, useRef, useState } from "react"
import Hls from "hls.js"
import './main.css'
import axios from 'axios'
import { useParams } from "react-router-dom"


export const App = () => {
  const videoRef = useRef(null)
  const hlsRef = useRef(null)
  const [retry, setRetry] = useState(0)
  const queryHls = useRef(null)
  
  
  const params = useParams()
  console.log(params.id)
  useEffect(() => {
    const hls = new Hls() 
    const video = videoRef.current

    const Connect = async () => {
    
    const req = await axios.get(`http://localhost:3001/id/${params.id}`).then(res => {
      queryHls.current = res.data[0].camid
    })
    
    hls.on(Hls.Events.MANIFEST_PARSED, (data) => {
      console.log("CONNECT OK")
      hlsRef.current = hls
      setRetry(0)
    })

    hls.on(Hls.Events.ERROR, (e, data) => {
      if(data.type == Hls.ErrorTypes.NETWORK_ERROR){
        if(retry < 10) {
          setTimeout(() => {
            console.log('reconnect')
            setRetry(c => c + 1)
            Connect()
          }, 3000)
        }
        else{
          console.log('DISCONNECT')
        }
      }
    })

    hls.loadSource(queryHls.current)
    hls.attachMedia(video)
  }

  if(Hls.isSupported){
    Connect()
  }

  return () => {
    if (hls) {
      hls.destroy(); 
    }
  }
})
  
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

