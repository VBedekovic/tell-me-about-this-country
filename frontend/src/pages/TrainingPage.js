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


function TrainingPage() {
  const [content, setContent] = useState("");

  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [selectedRegion, setSelectedRegion] = useState("world")
  const [regionSettings, setRegionSettings] = useState({
    region: "world",
    zoom: 1,
    center: [0, 0],
    scale: 140
  })

  return (
    <>
      <Button sx={{ position: "absolute" }} href="/">{"< Natrag"}</Button>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          <div>
            <MapChart setTooltipContent={setContent}
              content={content} mapSettings={regionSettings} trainingMode={true} />
            <ReactTooltip id={content}
              place="bottom"
              content={content}
              offset={content === "Russia" ? "" : ""}
            />
          </div>
          <StatusBar selectedRegion={{ name: selectedRegion.toUpperCase(), color: "red" }}></StatusBar>
        </Box>
        <Chat sx={{ maxHeight: "95%" }} trainingMode={true}></Chat>
      </Box>
    </>
  )
}

export default TrainingPage