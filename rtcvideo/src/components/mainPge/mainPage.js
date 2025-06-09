import { useEffect, useState } from "react"
import axios from 'axios'
import './mainPage.css'
import {Pagination} from '../pagination/pagination.js';
import { useNavigate } from "react-router-dom";

export function MainPage() {
    const [info, setInfo] = useState([])
    
    const nav = useNavigate()
    const [Error, setError] = useState(false)
    const [loading , serLoading] = useState(true)

    const getInfo = async () => {
        try {

            const res = await axios.get('http://localhost:3001/camera/list')
            const query = res.data.rows
            setInfo(query)
        }
        catch(err)
        {
            console.log(err)
            setError(true)
        }
    }

    useEffect(() => {
        getInfo()
        serLoading(false)  
    }, [])

    
 
    if(loading) {
        return(
            <div className="errMessageCont">
                <h1>Загрузка</h1>
            </div>
        )
    }

    if(Error){
        return(
            <div className="errMessageCont">
                <h1>Ошибка</h1>
            </div>
        )
    }

    return(
        <div>
            <div className="content">   
                <Pagination/>
            </div>
            <div className="addCamBtn">
                <button onClick={() => {nav(`/addCam`)}}>Добавить камеру</button>
            </div>
        </div>
    )
}