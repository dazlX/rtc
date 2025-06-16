
import './mainPage.css'
import {Pagination} from '../pagination/pagination.js';
import { useNavigate } from "react-router-dom";

export function MainPage() {

    const nav = useNavigate()


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