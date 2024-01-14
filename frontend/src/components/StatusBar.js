import React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import "../App.css"

function StatusBar({ selectedRegion }) {
  const [region, setRegion] = useState(selectedRegion)
  const [questionsUsed, setQuestionsUsed] = useState(0)
  const [timer, setTimer] = useState(0)
  const [categories, setCategory] = useState([{ name: "History", left: 5 }, { name: "Geographical", left: 4 }])
  const [currentCategory, setCurrentCategory] = useState({ name: "History", left: 5 })
  const [categoryNumber, setCategoryNumber] = useState(0)

  useEffect(() => {
    setTimeout(() => setTimer(timer + 1), 1000);
  }, [timer]);

  useEffect(() => {
    setTimeout(() => {
      setCurrentCategory(categories[categoryNumber])
      setCategoryNumber((categories.length - 1) < (categoryNumber + 1) ? 0 : categoryNumber + 1)
    }, 1000);
  }, [categories, categoryNumber]);

  return (
    <>
      <Box sx={{ margin: "auto", width: "99%" }}>
        <Card sx={{ display: "flex", minWidth: "100%", minHeight: "20%", justifyContent: "space-between" }}>
          <CardContent>
            <br />
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center">
              <Typography variant='h5' sx={{ mb: 1.5, fontFamily: "Montserrat", fontWeight: "bold" }} color="text.secondary">
                DIFFICULTY
              </Typography>
              <Typography variant="h6" color={region.color} sx={{ mb: 1.5, fontFamily: "Montserrat" }}>
                {region.name}
                <br />
              </Typography>
            </Grid>
          </CardContent>
          <CardContent>
            <br />
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center">
              <Typography variant='h5' sx={{ mb: 1.5, fontFamily: "Pixelify Sans" }} color="text.secondary">
                QUESTIONS LEFT
              </Typography>
              <Typography variant="h6" color={region.color} sx={{ mb: 1.5, fontFamily: "Pixelify Sans" }}>
                {currentCategory.name}: {currentCategory.left}
                <br />
              </Typography>
            </Grid>
          </CardContent>
          <CardContent>
            <br />
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center">
              <Typography variant='h5' sx={{ mb: 1.5, fontFamily: "Pixelify Sans" }} color="text.secondary">
                SECONDS PASSED
              </Typography>
              <Typography variant="h6" color={region.color} sx={{ mb: 1.5, fontFamily: "Pixelify Sans" }}>
                {timer}
                <br />
              </Typography>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </>
  )

}

export default StatusBar