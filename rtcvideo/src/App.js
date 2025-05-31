import React from "react";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { App } from "./components/hls/hls.js";
import { MainPage } from "./components/mainPge/mainPage.js";


export function Main() {
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage/>}/>
      <Route path="/hls/:id" element={<App/>}/>
    </Routes>
    </BrowserRouter>
  )
}
