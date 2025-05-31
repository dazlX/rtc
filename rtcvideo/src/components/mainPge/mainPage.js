import React, { useEffect, useState } from "react"
import axios from 'axios'
import { Content } from "../content/content"
import './mainPage.css'

export function MainPage() {
    const [info, setInfo] = useState([])
    console.log(2)  
    
    useEffect(() => {
        console.log(1)  
        const getInfo = async () => {
            const res = await axios.get('http://localhost:3001/test')
            const query = res.data.rows
            console.log(query) 
            console.log(4) 
            setInfo(query)
            console.log(info)  
        }
    getInfo()
    console.log(3)  
    }, [])
    console.log(info)
return(
    <div className="content">
            {info.map((item) => (
                <Content
                    key={item.id}
                    nameCam={item.namecam}
                    location={item.location}
                    latitude={item.latitude}
                    longitude={item.longitude}
                    camId={item.id}
                />
            ))}
        </div>
)
}