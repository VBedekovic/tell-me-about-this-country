import React, { useState, useEffect } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";
import "../App.css"

const MapChart = ({ content, setTooltipContent, mapSettings, trainingMode, setSelectedCountry, gameOverFlag }) => {
  const [settings, setSettings] = useState(mapSettings)
  const [mapStyle, setMapStyle] = useState("")

  useEffect(() => {
    if (trainingMode) {
      setMapStyle({
        default: {
          fill: "#123456"
        },
        hover: {
          fill: "var(--secondary)"
        },
        pressed: {
          fill: "#F53"
        }
      })
    } else {
      setMapStyle({
        default: {
          fill: "#123456",
          outline: "none"
        },
        hover: {
          fill: "var(--secondary)",
          outline: "none"
        },
        pressed: {
          fill: "#F53",
          outline: "none"
        }
      })
    }
  }, [trainingMode])
  // dodati 
  const [gameOver, setGameOver] = useState(gameOverFlag)
  return (
    <div data-tip="">
      <ComposableMap projectionConfig={{
        scale: settings.scale,
        rotation: [-11, 0, 0],
      }}
        width={800}
        height={500}>
        <ZoomableGroup zoom={settings.zoom} center={settings.center}>
          <Geographies geography={`/${settings.region}.json`}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  data-tooltip-id={content}
                  geography={geo}
                  onClick={() => {
                    if (trainingMode) setSelectedCountry(geo.properties.name)
                  }}
                  onMouseEnter={() => {
                    setTooltipContent(`${geo.properties.name}`);
                  }}
                  onMouseLeave={() => {
                    //setTooltipContent("");
                  }}
                  style={mapStyle}
                  stroke={gameOver && geo.properties.name.toLowerCase() === gameOver.toLowerCase() ? "var(--secondary)" : ""}
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default MapChart