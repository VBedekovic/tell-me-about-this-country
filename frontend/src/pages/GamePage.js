import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Chat from '../components/Chat';
import MapChart from '../components/MapChart';
import StatusBar from '../components/StatusBar';
import { Tooltip as ReactTooltip } from "react-tooltip";
import { Box, Button, Modal, Typography, Card, Grid, CardContent } from '@mui/material';

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
  const navigate = useNavigate()

  const [regionSelector, setRegionSelector] = useState(true);
  const handleOpenRegionSelector = () => setRegionSelector(true);
  const handleCloseRegionSelector = () => setRegionSelector(false);
  const [gameOverInfo, setGameOverInfo] = useState("")
  const [gameOverTimer, setGameOverTimer] = useState(false)
  const [questions, setQuestions] = useState({
    "loading": 0
  })

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
        zoom: gameOver ? 0.5 : 1,
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

  useEffect(() => {
    if (gameOverTimer) {
      console.log(gameOverInfo)
      console.log(gameOverTimer)
      console.log(selectedRegion)
    }
  }, [gameOverTimer])

  useEffect(() => {
    if (gameOverInfo) {
      setGameOver(true)
      setQuestions(gameOverInfo.category_chances_dict)
    }
    console.log(gameOverInfo)
    // inace ide salji gameOverInfo - tocna drzava dolje u komponentu
  }, [gameOverInfo])

  const toNewGame = () => {
    window.location.reload()
  }

  const toMainMenu = () => {
    navigate("/")
  }

  return (
    <><Modal
      open={regionSelector}
      onClose={handleOpenRegionSelector}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...modalStyle, display: "flex", flexDirection: "column" }}>
        <Typography id="modal-modal-title" variant="h4" component="h2" sx={{ margin: "auto", fontFamily: "var(--primary-font)" }}>Pick a region</Typography>
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
        <Box sx={{ ...modalStyle, display: "flex", flexDirection: "column", width: "90%", height: "90%" }}>
          <Card sx={{ height: "15%", width: "95%", position: "absolute", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <CardContent>
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center">
                <Typography variant='h6' sx={{ mb: 1.5, fontFamily: "var(--primary-font)", fontWeight: "bold" }} color="text.secondary">
                  STATUS
                </Typography>
                <Typography variant="h6" sx={{ mb: 1.5, fontFamily: "var(--primary-font)", color: gameOverInfo.color ? gameOverInfo.color : "" }}>
                  {gameOverInfo.status ? gameOverInfo.status.toUpperCase() : ""}
                  <br />
                </Typography>
              </Grid>
            </CardContent>
            <CardContent>
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center">
                <Typography variant='h6' sx={{ mb: 1.5, fontFamily: "var(--primary-font)", fontWeight: "bold" }} color="text.secondary">
                  COUNTRY
                </Typography>
                <Typography variant="h6" sx={{ mb: 1.5, fontFamily: "var(--primary-font)" }}>
                  {gameOverInfo.country ? gameOverInfo.country : ""}
                  <br />
                </Typography>
              </Grid>
            </CardContent>
            <CardContent>
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center">
                <Typography variant='h6' sx={{ mb: 1.5, fontFamily: "var(--primary-font)", fontWeight: "bold" }} color="text.secondary">
                  QUESTIONS LEFT
                </Typography>
                <Typography variant="h6" sx={{ mb: 1.5, fontFamily: "var(--primary-font)" }}>
                  {questions ? Object.keys(questions).map(key => { return key.toUpperCase() + ": " + questions[key] }).join(", ") : ""}
                  <br />
                </Typography>
              </Grid>
            </CardContent>
            <CardContent>
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center">
                <Typography variant='h6' sx={{ mb: 1.5, fontFamily: "var(--primary-font)", fontWeight: "bold" }} color="text.secondary">
                  TIME LEFT
                </Typography>
                <Typography variant="h6" sx={{ mb: 1.5, fontFamily: "var(--primary-font)" }}>
                  {gameOverTimer} s
                  <br />
                </Typography>
              </Grid>
            </CardContent>
          </Card>
          <MapChart setTooltipContent={setContent} content={content} mapSettings={regionSettings} trainingMode={false} gameOverFlag={gameOverInfo.country} />
          <ReactTooltip id={content}
            place="bottom"
            content={content}
            offset={content === "Russia" ? "" : ""}
          />
          <Button size="large"
            variant="contained"
            style={{ fontFamily: "var(--primary-font)", fontSize: "30px", minWidth: "10%", minHeight: "10%", backgroundColor: "var(--primary-accent)", position: "absolute", bottom: "10px" }}
            onClick={toNewGame}>Try again</Button>
          <Button size="large"
            variant="contained"
            style={{ fontFamily: "var(--primary-font)", fontSize: "30px", minWidth: "10%", minHeight: "10%", backgroundColor: "var(--primary-accent)", position: "absolute", bottom: "10px", right: "30px" }}
            onClick={toMainMenu}>Main Menu</Button>
        </Box>

      </Modal >
      {selectedRegion ?
        <><Button variant='contained' sx={{ position: "absolute", fontFamily: "var(--primary-font)", backgroundColor: "var(--primary-accent)", margin: "5px" }} href="/">{"< Natrag"}</Button>
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
              <StatusBar selectedRegion={{ name: selectedRegion.toUpperCase(), color: "var(--primary-accent)" }} gameOverFlag={gameOver} setTimerGameOver={setGameOverTimer} questions={questions}></StatusBar>
            </Box>
            <Chat sx={{ maxHeight: "95%", margin: "5px" }} trainingMode={false} chatDisabled={false} setGameOverInfo={setGameOverInfo} setQuestionsInfo={setQuestions} regionOrContinent={selectedRegion}></Chat>
          </Box></>
        : <></>}
    </>
  )




}

export default GamePage