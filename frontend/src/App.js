
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Fragment, useEffect, useState, useHistory } from "react";
import './App.css';
import LandingPage from "./pages/LandingPage";
import 'react-tooltip/dist/react-tooltip.css'
import MapPage from "./pages/MapPage";
import Chat from "./components/Chat";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LandingPage />}></Route>
        <Route exact path="/map" element={<MapPage />}></Route>
        <Route exact path="/chat" element={<Chat />}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
