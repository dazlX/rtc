import React, { useEffect, useState } from "react"
import axios from 'axios'
import { Content } from "../content/content"
import './mainPage.css'
import {Pagination} from '../pagination/pagination.js';

export function MainPage() {
    const [info, setInfo] = useState([])
    const [queryLenght, setQueryL] = useState()
    const [currentPage, setPage] = useState(1)
    const pageElement = 2
    
    useEffect(() => {
        const getInfo = async () => {
            const res = await axios.get('http://localhost:3001/test')
            const query = res.data.rows
            setInfo(query)

            setQueryL(query.length)
        }
    getInfo()
    }, [])
    const lastElement = currentPage * pageElement
    const firstElement = lastElement - pageElement
    const test = info.slice(firstElement. lastElement)
    
    const paginate = (pageNumber) => {setPage(pageNumber)}
return(
    <div className="content">
            
        <Pagination 
        // itemsPerPage={pageElement}
        
        paginate={paginate}
        data={info}
        currentPage={currentPage}
      />
        </div>
)
}