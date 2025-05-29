import express from "express"
import fs from "fs"
import {spawn} from "child_process"
import path from "path"
import { fileURLToPath } from 'url';

const app = express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ffmeg = spawn("ffmpeg", [
  '-rtsp_transport', 'tcp',
  '-i', 'rtsp://rtspstream:B9NznuFEYqVpm3PFiygCM@zephyr.rtsp.stream/pattern',
  '-c:v', 'libx264',
  '-c:a', 'aac',
  '-f', 'hls',
  '-hls_time', '2',
  '-hls_list_size', '5',
  '-hls_flags', 'delete_segments',
  '-hls_segment_filename', 'stream/stream_%03d.ts',
  'stream/stream.m3u8'
])

ffmeg.stderr.on('data', (data) => {
    console.log(data.toString())
})

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', (req,res) => {
    res.status(200)
})

app.use('/stream', express.static('stream'));

app.get('/stream.m3u8', (req,res) => {
    const filePath = path.join(__dirname, 'stream', 'stream.m3u8')
    fs.readFile(filePath, (err, data) => {
        if(err){
            console.log(err)
            res.status(404).json({
                message: "Файл не найден"
            })
        }

        res.status(200).end(data)
    })
})

app.get('/:ts', (req,res) => {
    const tsName = req.params.ts

    const filePath = path.join(__dirname, 'stream', tsName)

    fs.readFile(filePath, (err,data) => {
        if(err) {
            console.log(err)
            res.status(500).json({
                message: err
            })
        }
        res.status(200).end(data)
    })

})



const PORT = 3001
app.listen(PORT, (err) => {
    if(err){console.log(err)}
    console.log("SERVER OK")
})

