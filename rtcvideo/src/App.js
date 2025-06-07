import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { App } from "./components/hls/hls.js";
import { MainPage } from "./components/mainPge/mainPage.js";
import { EditPanel } from "./components/editPanel/editPanel.js";
import {AddCam} from './components/addCam/addCam.js'


export function Main() {
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage/>}/>
      <Route path="/hls/:id" element={<App/>}/>
      <Route path="/editor/:id" element={<EditPanel/>}/>
      <Route path="/addCam" element={<AddCam/>}/>
    </Routes>
    </BrowserRouter>
  )
}
