import React from 'react';
import { useEffect, useState } from 'react';
import Chat from '../components/Chat';
import MapChart from '../components/MapChart';
import StatusBar from '../components/StatusBar';
import { Tooltip as ReactTooltip } from "react-tooltip";
import { Box, Button, Modal, Typography } from '@mui/material';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "80%",
  height: "40%",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


function GamePage() {
  const [content, setContent] = useState("");

  const [regionSelector, setRegionSelector] = useState(true);
  const handleOpenRegionSelector = () => setRegionSelector(true);
  const handleCloseRegionSelector = () => setRegionSelector(false);

  const [gameOver, setGameOver] = useState(false);
  const handleOpenGameOver = () => setGameOver(true);
  const handleCloseGameOver = () => setGameOver(false);

  const [selectedRegion, setSelectedRegion] = useState(false)
  const [regionSettings, setRegionSettings] = useState(null)

  const handleRegionSelect = (region) => {
    setRegionSelector(false)
    console.log(region)
    setSelectedRegion(region)
    let settings
    if (region === "world") {
      settings = {
        region: "world",
        zoom: 1,
        center: [0, 0],
        scale: 140
      }
    } else if (region === "europe") {
      settings = {
        region: "europe",
        zoom: 4,
        center: [20, 50],
        scale: 140
      }

    } else if (region === "asia") {
      settings = {
        region: "asia",
        zoom: 2,
        center: [80, 30],
        scale: 140
      }

    } else if (region === "oceania") {
      settings = {
        region: "oceania",
        zoom: 2.5,
        center: [140, 195],
        scale: 140
      }

    } else if (region === "africa") {
      settings = {
        region: "africa",
        zoom: 2,
        center: [20, 180],
        scale: 140
      }

    } else if (region === "north america") {
      settings = {
        region: "north_america",
        zoom: 2,
        center: [20, 180],
        scale: 140
      }

    } else if (region === "south america") {
      settings = {
        region: "south_america",
        zoom: 2,
        center: [-60, 200],
        scale: 140
      }
    }
    setRegionSettings(settings)
  }

  return (
    <><Modal
      open={regionSelector}
      onClose={handleOpenRegionSelector}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...modalStyle, display: "flex", flexDirection: "column" }}>
        <Typography id="modal-modal-title" variant="h4" component="h2" sx={{ margin: "auto", fontFamily: "Pixelify Sans" }}>Pick a region</Typography>
        <Box sx={{ fontFamily: "Pixelify Sans", display: "flex", flexDirection: "row", justifyContent: "space-between", flex: "0 0 80%" }}>
          <Box className="regionCard" onClick={() => handleRegionSelect("world")}>
            <img src="/world.png" height="100px" alt="" style={{ margin: "auto" }}></img>
            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ margin: "auto" }}>
              World
            </Typography>
          </Box>
          <Box className="regionCard" onClick={() => handleRegionSelect("europe")}>
            <img src="/europe.png" height="100px" alt="" style={{ margin: "auto" }}></img>
            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ margin: "auto" }}>
              Europe
            </Typography>
          </Box>
          <Box className="regionCard" onClick={() => handleRegionSelect("north america")}>
            <img src="/america.png" height="100px" alt="" style={{ margin: "auto" }}></img>
            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ margin: "auto" }}>
              N. America
            </Typography>
          </Box>
          <Box className="regionCard" onClick={() => handleRegionSelect("south america")}>
            <img src="/america.png" height="100px" alt="" style={{ margin: "auto" }}></img>
            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ margin: "auto" }}>
              S. America
            </Typography>
          </Box>
          <Box className="regionCard" onClick={() => handleRegionSelect("asia")}>
            <img src="/asia.png" height="100px" alt="" style={{ margin: "auto" }}></img>
            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ margin: "auto" }}>
              Asia
            </Typography>
          </Box>
          <Box className="regionCard" onClick={() => handleRegionSelect("oceania")}>
            <img src="/oceania.png" height="100px" alt="" style={{ margin: "auto" }}></img>
            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ margin: "auto" }}>
              Oceania
            </Typography>
          </Box>
          <Box className="regionCard" onClick={() => handleRegionSelect("africa")}>
            <img src="/africa.png" height="100px" alt="" style={{ margin: "auto" }}></img>
            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ margin: "auto" }}>
              Africa
            </Typography>
          </Box>
        </Box>
      </Box>
    </Modal >
      <Modal
        open={gameOver}
        onClose={handleOpenGameOver}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...modalStyle, display: "flex", flexDirection: "column" }}>
          <Typography variant="h3">Za tebe je ovdje game over!</Typography>
        </Box>
      </Modal >
      {selectedRegion ?
        <><Button sx={{ position: "absolute" }} href="/">{"< Natrag"}</Button>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
              <div>
                <MapChart setTooltipContent={setContent}
                  content={content} mapSettings={regionSettings} trainingMode={false} />
                <ReactTooltip id={content}
                  place="bottom"
                  content={content}
                  offset={content === "Russia" ? "" : ""}
                />
              </div>
              <StatusBar selectedRegion={{ name: selectedRegion.toUpperCase(), color: "red" }}></StatusBar>
            </Box>
            <Chat sx={{ maxHeight: "95%" }} trainingMode={false}></Chat>
          </Box></>
        : <></>}
    </>
  )




}

export default GamePage