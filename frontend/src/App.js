
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Fragment, useEffect, useState, useHistory } from "react";
import './App.css';
import LandingPage from "./pages/LandingPage";
import 'react-tooltip/dist/react-tooltip.css'
import MapPage from "./pages/MapPage";
import Chat from "./components/Chat";
import StatusBar from "./components/StatusBar";
import GamePage from "./pages/GamePage";
import TrainingPage from "./pages/TrainingPage";

function App() {
  return (
    <>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Bungee+Spice:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Pixelify+Sans:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Play:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap" rel="stylesheet" />

      </head>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LandingPage />}></Route>
          <Route exact path="/map" element={<MapPage />}></Route>
          <Route exact path="/chat" element={<Chat />}></Route>
          <Route exact path="/statusbar" element={<StatusBar />}></Route>
          <Route exact path="/game" element={<GamePage />}></Route>
          <Route exact path="/training" element={<TrainingPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
