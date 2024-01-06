import '../App.css';
import Box from "@mui/material/Box"

import WithSplashScreen from '../components/WithSplashScreen';// Include this line
import { Button, Typography } from '@mui/material';

function LandingPage() {
  return (
    <>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Bungee+Spice:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Pixelify+Sans:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <Box className="app" style={{ background: "content-box radial-gradient(orange, white)" }}>
        <br />
        <Typography variant="h2" fontFamily="Bungee Spice">Tell me about this country</Typography>

        <Box style={{ margin: "auto", height: "50%" }}>
          <Button size="large" variant="contained" color="error" style={{ fontFamily: "Pixelify Sans", fontSize: "30px", minWidth: "300px", minHeight: "100px" }}>Start game
          </Button>
          <br />
          <br />
          <br />
          <Button size="large" variant="contained" color="error" style={{ fontFamily: "Pixelify Sans", fontSize: "30px", minWidth: "300px", minHeight: "100px" }}>Training
          </Button>
        </Box>
      </Box>
    </>
  );
}

// Update this line, so that withSplashScreen gets App as parameter
export default LandingPage;  