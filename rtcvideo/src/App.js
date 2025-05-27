import react, { useState } from "react"
import { useEffect,useRef } from "react"

export const Default = () => {

  const videoRef = useRef(null)
  const [status,setStatus] = useState('disconnected')
  const webRef = useRef(null)
  const mediaRef = useRef(null)

  const connect = () => {

    setStatus('connecting')

    try{

      const ws = new WebSocket('http://localhost:4044')

      webRef.current = ws

      const mediaS = new MediaSource()

      mediaRef.current = mediaS

      ws.onopen = () => {
        setStatus('connected')
      }

      ws.onclose = () => {
        setStatus('disconnect')
      }

      mediaS.addEventListener('sourceopen', () => {
      
        const sourceBuffer = MediaSource.addSourceBuffer('video/mp4; codecs="avc1.42E01E"')

        const bufQueue = []

        let update = false

        const startBuf = () => {

          if(update && bufQueue == 0){
            return
          }

          update = true

          sourceBuffer.addSourceBuffer(bufQueue.shift())
        }

        sourceBuffer.addEventListener('updateend', () => {
          update = false
          startBuf()
        })

        ws.onmessage = (e) => {
          bufQueue.push(Uint16Array(e.data))
          startBuf()
        }

      }) 
    }
    catch(err){
      setStatus(err)
    }
  }

  const closeWs = () => {
    if(webRef.current.readyState == 'open'){
      webRef.current.close()
    }
    if(mediaRef.current && mediaRef.current.readyState == "open"){
      mediaRef.current.endOfStream()
    }
  }

  useEffect(() => {
    connect()
    closeWs()
  }, [])

return(
  <div>
    <h3>{status}</h3>
    <iframe src="https://rtsp.cam/php/iframe.php?devcode=0b30b1c3ec8544c4bdc77b2c123579b0"/>
    <video
        ref={videoRef}
        autoPlay
        playsInline
        controls
        muted
      />
  </div>
)
}