import React, { Fragment, useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Tooltip as ReactTooltip } from "react-tooltip";

import MapChart from "../components/MapChart";

function MapPage() {
  const [content, setContent] = useState("");
  return (
    <>
      <div>
        <MapChart setTooltipContent={setContent}
          content={content} />
        <ReactTooltip id={content}
          place="bottom"
          content={content}
          offset={content === "Russia" ? "" : ""}
        />
      </div>
    </>
  );
}

export default MapPage

