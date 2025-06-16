import { useRef, useState } from "react"
import axios from "axios"
import './addCam.css'
import { useNavigate } from "react-router-dom";

export function AddCam(getInfo) {
    const inputRef = useRef(null)
    const inputRef1 = useRef(null)
    const inputRef2 = useRef(null)
    const inputRef3 = useRef(null)
    const inputRef4 = useRef(null)
    const nav = useNavigate()

    const [data, setQD] = useState({
        nameCam: '',
        location: '',
        latitude: '',
        longitude: '',
        camAddress: ''
    })

    const onClick = () => {
        let result = true
        if(!data.nameCam.trim()) result = false
        if(!data.location.trim()) result = false
        if(!data.latitude.trim())  result = false
        if(!data.longitude.trim())  result = false
        if(!data.camAddress.trim()) result = false
        if(result) {
            axios.post("http://localhost:3001/camera/add", {data}).then(res => {
                if(res.status == 200){
                    inputRef.current.value = ''
                    inputRef1.current.value = ''
                    inputRef2.current.value = ''
                    inputRef3.current.value = ''
                    inputRef4.current.value = ''
                }
            })
        }
    }

    const onChage = (e) => {
        const {name, value} = e.target
        setQD({
            ...data,
            [name]: value
        })
    }

    return(
        <div className="AddCamPage">
            <div className="boxInput">
                <input name="nameCam" placeholder="Название камеры" onChange={onChage} ref={inputRef}/>
                <input name="location" placeholder="Локация" onChange={onChage} ref={inputRef1}/>
                <input name="latitude" placeholder="Широта" onChange={onChage} type="number" ref={inputRef2}/>
                <input name="longitude" placeholder="Долгота" onChange={onChage} type="number" ref={inputRef3}/>
                <input name="camAddress" placeholder="Адрес камеры" onChange={onChage} ref={inputRef4}/>
                <button className="btnOk" onClick={onClick}>Добавить</button>
                <button className="btnExit" onClick={() => {nav('/')}}>Отмена</button>
            </div>
        </div>

    )
}