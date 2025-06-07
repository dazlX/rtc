import { useEffect, useState } from "react"
import { Content } from "../content/content.js"
import './pagination.css'

export function Pagination(props) {
    const {paginate, data, currentPage} = props
    const[dataS, setDataS] = useState([])
    const [active, setActive] = useState(1)
    const [searchItem, setSearchItem] = useState('')

    useEffect(() => {
        setDataS(data)
    }, [data])

    const pageElement = 6

    const lastElement = currentPage * pageElement

    const firstElement = lastElement - pageElement
 
    const info = dataS.slice(firstElement, lastElement)  
 
    const infoLen = dataS.length

    const totalPage = Math.ceil(infoLen / pageElement)

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

    const Filter = searchItem ?
    info.filter(info => 
        `${info.namecam} ${info.location} ${info.latitude} ${info.longitude}`.toLowerCase().includes(searchItem.toLowerCase())
    )
    :
    info

    return(
        <div className="body">
            <div className="searchInputBody">
                <input className="searchInput" placeholder="Поиск..." onChange={(e) => {setSearchItem(e.target.value)}}/>
            </div>
            <div className="main">
            {Filter.map((item) => (
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
            <div className="btnPagination">
                {pageNum.map(i => (<button key={i} className={active == i ? "btnPageActive":"btnPage"} onClick={() =>  {
                    paginate(i)
                    setActiveButton(i)
                }}>{i}</button>))}
            </div>
        </div>
      
        
    )
}