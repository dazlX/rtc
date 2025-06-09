import { useEffect, useState } from "react"
import { Content } from "../content/content.js"
import './pagination.css'
import axios from "axios"

export function Pagination(props) {
    const [dataS, setDataS] = useState([])
    const [active, setActive] = useState(1)
    const [filterData, setFilterData] = useState([])
    const [test, setTest] = useState([])
    const [dataElement, setDataElement] = useState()
    const [currentPage, setPage] = useState(1)
    const [searchItem, setSearchItem] = useState('')




    
    const pageElement = 6

    const lastElement = currentPage * pageElement

    const firstElement = lastElement - pageElement
 
     
    const queryT = async () => {
        try{
            const query = await axios.get(`http://localhost:3001/camera/pagination?firstElement=${firstElement}&lastElement=${lastElement}`).then(res => {
                setDataElement(res.data.allData)
                setTest(res.data.data)
            })
        }
        catch (err){

        }
    }

    useEffect(() => {
        queryT()
    }, [currentPage])

    useEffect(() => {
        setDataS(test)
    }, [test])

    const totalPage = Math.ceil(dataElement / pageElement)

    const pageNum = []

    let firstPage, lastPage
    
    if(totalPage <= 5){
        firstPage = 1
        lastPage = totalPage
    }
    else{

        if(currentPage <= 2){
            firstPage = 1
            lastPage = 4
        }
        
    }

    for(let i = firstPage; i <= lastPage; i++){
        pageNum.push(i)
    }

    const setActiveButton = (i) => {
        setActive(i)
    }

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
        if(searchItem == '') {
            return
        }
        else {
            filter(searchItem)
        }
    }, [searchItem])

    const result = () => {
        if(searchItem == ''){
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
        else{
            return(
                filterData.map((item) => (
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

    return(
        <div className="body">
            <div className="searchInputBody">
                <input className="searchInput" placeholder="Поиск..." onChange={(e) => {setSearchItem(e.target.value)}}/>
            </div>
            <div className="main">
            {result()}
            </div>
            <div className="btnPagination">
                {pageNum.map(i => (<button key={i} className={active == i ? "btnPageActive":"btnPage"} onClick={() =>  {
                    setPage(i)
                    setActiveButton(i)
                }}>{i}</button>))}
            </div>
        </div>
      
        
    )
}