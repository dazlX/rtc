import { useState , useEffect} from "react"


export function PageNum(props) {
    const currentPage = props.currentPage
    const setPage = props.setPage
    const data = props.data
    const setInfo = props.setInfo
    const fd = props.fd
    const setTest = props.setTest
    console.log(fd)
    const [active, setActive] = useState(1)
    
    const pageElement = 6
    
    const totalPage = Math.ceil(data.length / pageElement)
    
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


    useEffect(() => {

        const lastElement = currentPage * pageElement

        const firstElement = lastElement - pageElement

        const info = data.slice(firstElement, lastElement)  

        fd ? setInfo(info) : setTest(info)

    }, [currentPage, data])
    
    return(
        <div className="btnPagination">
                {pageNum.map(i => (<button key={i} className={active == i ? "btnPageActive":"btnPage"} onClick={() =>  {
                    setPage(i)
                    setActiveButton(i)
                }}>{i}</button>))}
            </div>
    )
}