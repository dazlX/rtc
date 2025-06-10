import express from "express"
import fs, { lstat } from "fs"
import {spawn} from "child_process"
import cors from 'cors'
import path from "path"
import { fileURLToPath } from 'url';
import { pool } from "./db.js";
import { json } from "stream/consumers"

const app = express()


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors())
app.use(express.json())

// const ffmeg = spawn("ffmpeg", [
//   '-rtsp_transport', 'tcp',
//   '-i', 'rtsp://rtspstream:B9NznuFEYqVpm3PFiygCM@zephyr.rtsp.stream/pattern',
//   '-c:v', 'libx264',
//   '-c:a', 'aac',
//   '-f', 'hls',
//   '-hls_time', '2',
//   '-hls_list_size', '5',
//   '-hls_flags', 'delete_segments',
//   '-hls_segment_filename', 'stream/stream_%03d.ts',
//   'stream/stream.m3u8'
// ])

// ffmeg.stderr.on('data', (data) => {
//     console.log(data.toString())
// })

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', (req,res) => {
    res.status(200)
    res.send('<h1>тест</h1>')
})



// app.use('/stream', express.static('stream'));

// app.get('/stream.m3u8', (req,res) => {
//     const filePath = path.join(__dirname, 'stream', 'stream.m3u8')
//     fs.readFile(filePath, (err, data) => {
//         if(err){
//             console.log(err)
//             res.status(404).json({
//                 message: "Файл не найден"
//             })
//         }

//         res.status(200).end(data)
//     })
// })

// app.get('/:ts', (req,res) => {
//     const tsName = req.params.ts

//     const filePath = path.join(__dirname, 'stream', tsName)

//     fs.readFile(filePath, (err,data) => {
//         if(err) {
//             console.log(err)
//             res.status(500).json({
//                 message: err
//             })
//         }
//         res.status(200).end(data)
//     })

// })

app.get('/id/:id', async (req, res) => {
    const params = req.params.id

    try{
        const query = await pool.query(`SELECT camid FROM cam WHERE id = $1`, [params])
        res.status(200).send(query.rows)
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            message: error
        })
    }

})

app.get('/camera/list', async (req, res) => {
    const query = await pool.query('SELECT * FROM cam')
    res.status(200).send(query.rows)
})

app.post('/camera/add', async (req, res) => {
    const {data} = req.body
    console.log(data)
    try {
        if(!data) throw new Error("Данных нету")
        await pool.query(`INSERT INTO cam(namecam, location, latitude, longitude, camId) VALUES ($1,$2,$3,$4,$5)`, [data.nameCam, data.location, data.latitude, data.longitude, data.camAddress])
        res.status(200).json({
        success: true
    })
    }
    catch(err) {
        console.log(err)
        res.status(500).json({
            message: err
        })
    }
})

const dataF = await pool.query('SELECT * FROM cam')

app.get('/camera/filter/:searchItem', async (req,res) => {
    const searchItem = req.params.searchItem

    try{
        const Filter = searchItem ?
            dataF.rows.filter(dataF => 
            `${dataF.namecam} ${dataF.location} ${dataF.latitude} ${dataF.longitude}`.toLowerCase().includes(searchItem.toLowerCase())
            )
            :
            dataF
        res.status(200).json({
            filter: Filter
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            success: false
        })
    }
})

app.get('/camera/pagAll', async (req, res) => {
     try{
        const allData = await pool.query('SELECT COUNT(*) FROM cam')  
        let test = []

        for(let i = 1; i <= allData.rows[0].count; i++){
            test.push(i)
        }
        res.status(200).json({
            allData: test
        })
    }
    catch(err) {
        console.log(err)
        res.status(500).json({
            success: false
        })
    }
})

app.get('/camera/pagination', async (req, res) => {
    try{
        const {firstElement, lastElement} = req.query
        console.log(firstElement, lastElement)
        const query = await pool.query('SELECT * FROM cam WHERE id >= $1 and id <= $2', [firstElement, lastElement])    
        res.status(200).json({
            data: query.rows,
        })
    }
    catch(err) {
        //console.log(err)
        res.status(500).json({
            success: false
        })
    }
})

app.get('/camera/:id', async (req,res) => {
    const id = req.params.id
    
    try {
        const query = await pool.query('SELECT * FROM cam WHERE id = $1', [id])
        console.log(query.rows)
        res.status(200).send(query.rows)
    }
    catch(err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: err
        })
    }
})

app.delete("/camera/:id", async (req, res) => {
        const id = req.params.id
    try{
        await pool.query('DELETE FROM cam WHERE id = $1', [id])
        res.status(200).json({
            success: true
        })
    }
    catch(err) {
        console.log(err)
        res.status(500).json({
            success: false
        })
    }
})

app.patch('/camera/:id', async   (req, res) => {
    const id = req.params.id
    const data = req.body
    // console.log(req.body)
    console.log(data)
    try{
        await pool.query('UPDATE cam SET namecam = $1, location = $2, latitude = $3, longitude = $4, camid = $5 WHERE id = $6' , [data.nameCam, data.location, data.latitude, data.longitude, data.camAddress, id])
        res.status(200).json({
            success: true
        })
    }
    catch(err){
        console.log(data)
        console.log(err)
        res.status(500).json({
            success: false
        })
    }
})

const PORT = 3001
app.listen(PORT, (err) => {
    if(err){console.log(err)}
    console.log("SERVER OK")
})

