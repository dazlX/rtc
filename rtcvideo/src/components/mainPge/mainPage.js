import React, { useEffect, useRef, useState } from "react"
import axios from 'axios'
import './mainPage.css'
import {Pagination} from '../pagination/pagination.js';

export function MainPage() {
    const [info, setInfo] = useState([])
    const [queryLenght, setQueryL] = useState()
    const [currentPage, setPage] = useState(1)
    const [queryData, setQD] = useState({
        nameCam: '',
        location: '',
        latitude: '',
        longitude: '',
        camAddress: ''
    })
    const pageElement = 2
    

    const getInfo = async () => {
        const res = await axios.get('http://localhost:3001/test')
        const query = res.data.rows
        setInfo(query)
    }
    useEffect(() => {
        getInfo()
    }, [])

    const paginate = (pageNumber) => {setPage(pageNumber)}

    const onChage = (e) => {
        const {name, value} = e.target
        setQD({
            ...queryData,
            [name]: value
        })
    }

    const onClick = () => {
        console.log(queryData)
        let result = true
        if(!queryData.nameCam.trim()) result = false
        if(!queryData.location.trim()) result = false
        if(!queryData.latitude.trim())  result = false
        if(!queryData.longitude.trim())  result = false
        if(!queryData.camAddress.trim()) result = false
        console.log(result)
        const data = queryData
        if(result) {
            axios.post("http://localhost:3001/add", {data}).then(res => {
                if(res.status == 200){
                    getInfo()
                    inputRef.current.value = ''
                    inputRef1.current.value = ''
                    inputRef2.current.value = ''
                    inputRef3.current.value = ''
                    inputRef4.current.value = ''
                }
            })
        }
    }

    useEffect(() => {
        console.log(queryData)
    },[queryData])
    const inputRef = useRef(null)
    const inputRef1 = useRef(null)
    const inputRef2 = useRef(null)
    const inputRef3 = useRef(null)
    const inputRef4 = useRef(null)
return(
    <div className="mainPage">
        <div className="boxInput">
            <input name="nameCam" placeholder="Название камеры" onChange={onChage} ref={inputRef}/>
            <input name="location" placeholder="Локация" onChange={onChage} ref={inputRef1}/>
            <input name="latitude" placeholder="Широта" onChange={onChage} type="number" ref={inputRef2}/>
            <input name="longitude" placeholder="Долгота" onChange={onChage} type="number" ref={inputRef3}/>
            <input name="camAddress" placeholder="Адрес камеры" onChange={onChage} ref={inputRef4}/>
            <button className="btn" onClick={onClick}>Добавить</button>
        </div>

        <div className="content">   
            <Pagination 
                paginate={paginate}
                data={info}
                currentPage={currentPage}/>
        </div>
    </div>
)
}