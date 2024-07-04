import React, { useState } from "react";
import { IconButton } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const Legend = ({ graphData }) => {
  const [showLegend, setShowLegend] = useState(true);

  const toggleLegend = () => {
    setShowLegend(!showLegend);
  };
 if (!graphData || !graphData.nodes || !graphData.edges) {
   return null; 
  }
  return (
    <div className="Legend">
      <div className={`legendWrapper ${!showLegend ? "hidden" : ""}`}>
        <div className="legendInfo">
          <p>Players: {graphData.nodes.length}</p>
          <p>Links: {graphData.edges.length}</p>
          <div className="legendInfoItem">
            <div>
              <p>Blue has trust Yellow</p>
              <div className="legendInfoItem-symbol">
                <div className="legend-selectedPlayer" />
                <div className="legend-bluelink" />
                <div className="legend-player" />
              </div>
            </div>
            <div>
              <p>Blue is trusted by Red</p>
              <div className="legendInfoItem-symbol">
                <div className="legend-selectedPlayer" />
                <div className="legend-redlink" />
                <div className="legend-redplayer" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <IconButton
          style={{ color: "1B1714", backgroundColor: "azure" }}
          fontSize="16px"
          icon={showLegend ? <ViewOffIcon /> : <ViewIcon />}
          onClick={toggleLegend}
        />
      </div>
    </div>
  );
};

export default Legend;
