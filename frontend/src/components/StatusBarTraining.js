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

function StatusBarTraining({ selectedCountry }) {
  const [country, setRegion] = useState(selectedCountry)

  useEffect(() => {
    setRegion(selectedCountry)
  }, [selectedCountry])

  return (
    <>
      <Box sx={{ margin: "auto", width: "99%" }}>
        <Card sx={{ display: "flex", minWidth: "100%", minHeight: "20%", justifyContent: "space-between" }}>
          <CardContent sx={{ margin: "auto" }}>
            <br />
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center">
              <Typography variant='h5' sx={{ mb: 1.5, fontFamily: "var(--primary-font)", fontWeight: "bold" }} color="text.secondary">
                SELECTED COUNTRY
              </Typography>
              <Typography variant="h6" color="var(--primary)" sx={{ mb: 1.5, fontFamily: "var(--primary-font)" }}>
                {country ? country : "Please select a country from the map"}
                <br />
              </Typography>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </>
  )

}

export default StatusBarTraining