import { useEffect, useState } from "react"
import { Content } from "../content/content.js"
import './pagination.css'
import axios from "axios"
import { PageNum } from "./pageNum.js"

export function Pagination(props) {
    const [filterData, setFilterData] = useState([])
    const [test, setTest] = useState([])
    const [data, setData] = useState([])
    const [data1, setData1] = useState([])

    const [dataElement, setDataElement] = useState([])
    const [currentPage, setPage] = useState(1)
    const [searchItem, setSearchItem] = useState('')
    const [info, setInfo] = useState([])

    
    const queryT = async () => {
        try{
            const query = await axios.get(`http://localhost:3001/camera/pagAll`).then(res => {
                setDataElement(res.data.allData)
                console.log(res.data.allData)
            })
        }
        catch (err){
            console.log(err)
        }
    }
    useEffect(() => {
        queryT()
        console.log(dataElement)
    }, [currentPage])

    useEffect(() => {
        console.log(dataElement)
    }, [dataElement])

    const filter = async (searchItem) => {
        try {
                const queryFilter = await axios.get(`http://localhost:3001/camera/filter/${searchItem}`).then(res => {
                setFilterData(res.data.filter)
            })
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if(searchItem == '') return
        filter(searchItem)
    }, [searchItem])

    const pagiQ = async (info) => {
        setTest(info)
        try {
            const firstElement = info.shift()
            const lastElement = info.pop()
            console.log(firstElement, lastElement)
            console.log('asd')
            if(firstElement === undefined || lastElement === undefined) return
            await axios.get(`http://localhost:3001/camera/pagination?firstElement=${firstElement}&lastElement=${lastElement}`).then(res => {
                setData(res.data.data)
            })
        } catch (error) {
            console.log(error)
        }
    }

       

    useEffect(() => {
            pagiQ(info)
    },[info])

    useEffect(() => {
        console.log(data)
    }, [data])

    const result = () => {

        if(searchItem == '') {
            if(data.length == undefined) {
                console.log(data1)
                return(
                    data1.map((item) => (
                        <Content
                            key={item.id}
                            nameCam={item.namecam}
                            location={item.location}
                            latitude={item.latitude}
                            longitude={item.longitude}
                            camId={item.id}
                            />
                        )) 
                )
            }
            return(
                data ? data.map((item) => (
                    <Content
                        key={item.id}
                        nameCam={item.namecam}
                        location={item.location}
                        latitude={item.latitude}
                        longitude={item.longitude}
                        camId={item.id}
                        />
                    )) 
                : <h1>Ошибка</h1>
            )
        }
        else {
            console.log(filterData)
            return(
                test.map((item) => (
                    <Content
                        key={item.id}
                        nameCam={item.namecam}
                        location={item.location}
                        latitude={item.latitude}
                        longitude={item.longitude}
                        camId={item.id}
                        />
                    )) 
            )
        }
    }


    const resultQ = () => {

        if(searchItem == '') {
            return(
                <PageNum
                data ={dataElement}
                setTest ={setTest}
                setPage = {setPage}
                currentPage = {currentPage}
                setInfo = {setInfo}
            />
            )
        }
        else {
            console.log(filterData)
            return(
                <PageNum
                    fd = {true}
                    setTest ={setTest}
                    data ={filterData}
                    setPage = {setPage}
                    currentPage = {currentPage}
                    setInfo = {setInfo}
                />
            )
        }
    }

    return(
        <div className="body">
            <div className="searchInputBody">
                <input className="searchInput" placeholder="Поиск..." onChange={(e) => {setSearchItem(e.target.value)}}/>
            </div>
            <div className="main">
            {result()}
            </div>
            {resultQ()}
        </div>
      
        
    )
}