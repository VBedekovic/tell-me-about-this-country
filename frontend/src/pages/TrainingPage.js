import React from 'react';
import { useEffect, useState } from 'react';
import Chat from '../components/Chat';
import MapChart from '../components/MapChart';
import StatusBar from '../components/StatusBar';
import StatusBarTraining from '../components/StatusBarTraining';
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


function TrainingPage() {
  const [content, setContent] = useState("");

  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedCountry, setSelectedCountry] = useState("")
  const [chatDisabled, setChatDisabled] = useState(true)
  const [regionSettings, setRegionSettings] = useState({
    region: "world",
    zoom: 1,
    center: [0, 0],
    scale: 140
  })

  useEffect(() => {
    console.log(selectedCountry)
    if (selectedCountry) setChatDisabled(false)
  }, [selectedCountry])

  return (
    <>
      <Button variant='contained' sx={{ position: "absolute", fontFamily: "var(--primary-font)", backgroundColor: "var(--primary-accent)", margin: "5px" }} href="/">{"< Natrag"}</Button>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          <div>
            <MapChart setTooltipContent={setContent}
              content={content} mapSettings={regionSettings} trainingMode={true} setSelectedCountry={setSelectedCountry} />
            <ReactTooltip id={content}
              place="bottom"
              content={content}
              offset={content === "Russia" ? "" : ""}
            />
          </div>
          <StatusBarTraining selectedCountry={selectedCountry.toUpperCase()}></StatusBarTraining>
        </Box>
        <Chat sx={{ maxHeight: "95%", filter: "blur(8px)" }} trainingMode={true} chatDisabled={chatDisabled}></Chat>
      </Box>
    </>
  )
}

export default TrainingPage