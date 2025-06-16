import { useEffect, useRef, useState } from "react";
import './editPanel.css'
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { apiService } from "../api";

export function EditPanel() {
    const inputRef = useRef(null)
    const inputRef1 = useRef(null)
    const inputRef2 = useRef(null)
    const inputRef3 = useRef(null)
    const inputRef4 = useRef(null)

    const nav = useNavigate()

    const [data, setData] = useState([])

    const camId = useParams()
    useEffect(() => {
        

        console.log(camId.id)
        const getInfo = async () => {
            const res = await apiService.editPanelGetInfo(camId.id)
            setData(res)
        }

        getInfo()
    }, [])

    useEffect(() => {
        console.log(data)
        try{
            inputRef.current.value = data[0].namecam
            inputRef1.current.value = data[0].location
            inputRef2.current.value = data[0].latitude
            inputRef3.current.value = data[0].longitude
            inputRef4.current.value = data[0].camid
        }
        catch{
            console.log('Ошибка')
        }
    }, [data])

    
    const edit = async () => {
        const q = inputRef4.current.value
        const editInfo = {
            nameCam: inputRef.current.value,
            location: inputRef1.current.value,
            latitude: inputRef2.current.value,
            longitude: inputRef3.current.value,
            camAddress: q
        }
    
        
        console.log(inputRef.current.value)

        const res = await apiService.editPanelUpdateInfo(camId.id, editInfo)
        if(res) nav('/')
       
    }

    const del = async () => {
        try{
            const res = await  apiService.editPanelDeleteInfo(camId.id)
                if(res) nav('/')
                
            
        }
        catch{
            console.log("Ошибка")
        }
    }
    return(
        <div className="editPanelBody">
            
        <div className="editPanel">
            <input name="nameCam" ref={inputRef}/>
            <input name="location" ref={inputRef1}/>
            <input name="latitude" ref={inputRef2}/>
            <input name="longitude" ref={inputRef3}/>
            <input name="camAddress" ref={inputRef4}/>
            <button className="btnEdit" onClick={edit}>Сохранить</button>
            <button className="btnDel" onClick={del}>Удалить</button>
            <button className="btnExit" onClick={() => {nav('/')}}>Отмена</button>
        </div>
        </div>
    )
}