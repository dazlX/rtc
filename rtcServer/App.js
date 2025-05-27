import express from "express"
import {WebSocketServer} from "ws"
import {spawn} from "child_process"

const app = new express()
const PORT = 3001

const wss = new WebSocketServer({ port: 4044 });

wss.on('connection', (ws) => 
    {
    console.log(1)

const rtspUrl = "https://rtsp.cam/php/iframe.php?devcode=0b30b1c3ec8544c4bdc77b2c123579b0"

const ffmpegP = [
    '-i', rtspUrl,
    '-c:v', 'libx264',
    '-preset', 'ultrafast',
    '-tune', 'zerolatency',
    '-f', 'mp4',
    '-movflags', 'frag_keyframe+empty_moov',
    '-reset_timestamps', '1',
    '-loglevel', 'error',
    '-'
  ];

const ffmpeg = spawn('ffmpeg', ffmpegP)

ffmpeg.stdout.on('data', (data) =>
    {
        if(wss.readyState === ws.OPEN)
        {
            ws.send(data)
        }
    }
)
ws.on("close", () => {
    ffmpeg.kill()
    console.log(2)
})
    }
)


app.listen(PORT, () => 
    {
        console.log(`SERVER OK ${PORT}`)
    })
