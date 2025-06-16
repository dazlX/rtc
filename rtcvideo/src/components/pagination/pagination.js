import { useEffect, useState } from "react"
import { Content } from "../content/content.js"
import './pagination.css'
import { apiService } from "../api.js"


export function Pagination(props) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchItem, setSearchItem] = useState('')
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 6,
        totalItems: 0,
        totalPage: 1
    })


    const queryData = async () => {
        try{
            setLoading(true)
            await apiService.paginationQueryData({params: {
                search: searchItem,
                page: pagination.page,
                limit: pagination.limit
            }}).then(res => {
                setData(res.data)
                setPagination({
                    ...pagination,
                    totalItems: res.pagination.totalItems,
                    totalPage: res.pagination.totalPage
                })
            })  
        } catch(err) {
            console.log(err)
        }
        finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        queryData()
    }, [])

    useEffect(() => {
        queryData()
    }, [searchItem, pagination.page, pagination.limit])
    
    const searchChange = (e) => {
        setSearchItem(e.target.value)
        setPagination({
            ...pagination,
            page: 1
        })
    }

    const pageChange = (i) => {
        setPagination({
            ...pagination,
            page: i
        })
    }

    return(
        <div className="body">
            <div className="searchInputBody">
                <input 
                    className="searchInput" 
                    placeholder="Поиск..." 
                    value={searchItem}
                    onChange={searchChange}/>
            </div>
            <div className="main">
            {data.map(item => (<Content
                key={item.id}
                nameCam={item.namecam}
                location={item.location}
                latitude={item.latitude}
                longitude={item.longitude}
                camId={item.id}
            />))}
            </div>
            <p className="pAllPage">{pagination.page} | {pagination.totalPage}</p>
            <div className="btnPagee">
                <button className="btnPage" onClick={() => pageChange(pagination.page -1)} disabled={pagination.page == 1}>
                    &lt;
                </button>
                <button className="btnPage" onClick={() => pageChange(pagination.page +1)} disabled={pagination.page >= pagination.totalPage}>
                    &gt;
                </button>
            </div>
            </div>
      
      
    )
}
