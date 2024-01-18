import '../App.css';
import Box from "@mui/material/Box"
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import GamePage from './GamePage';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "60%",
  height: "40%",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function LandingPage() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate()

  const [selectedRegion, setSelectedRedion] = useState("")

  const navigateToGameScreen = () => {
    navigate("/game")
  }

  const navigateToTrainingScreen = () => {
    navigate("/training")
  }

  return (
    <>
      <Box></Box>
      <Box className="background-image" style={{ width: "100%", height: "100vh", display: "flex", flexDirection: "column", alignContent: "space-between" }}>
        <Typography variant="h2" color="text.secondary" fontFamily="Play" sx={{ margin: "auto", fontWeight: "bold" }}>{"Tell me about this country".toUpperCase()}</Typography>
        <Box style={{ margin: "auto", flex: "0 0 60%" }}>
          <Button size="large"
            variant="contained"
            style={{ fontFamily: "var(--primary-font)", fontSize: "30px", minWidth: "300px", minHeight: "100px", backgroundColor: "var(--primary-accent)" }}
            onClick={navigateToGameScreen}>
            Start game
          </Button>
          <br />
          <br />
          <br />
          <Button size="large" variant="contained" color="error"
            style={{ fontFamily: "var(--primary-font)", fontSize: "30px", minWidth: "300px", minHeight: "100px", backgroundColor: "var(--primary-accent)" }}
            onClick={navigateToTrainingScreen}>
            Training
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default LandingPage;
//background: "content-box radial-gradient(orange, white)" backgroundImage: 'url("world_map_start2.png")', backgroundSize: "100%", filter: "blur(8px)"