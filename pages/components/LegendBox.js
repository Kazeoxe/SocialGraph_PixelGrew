import React, { useState } from "react";
import { IconButton } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import SearchBar from "./SearchBar";

const Legend = ({ graphData, handleSearch, setSearchTerm, searchTerm }) => {
  const [showLegend, setShowLegend] = useState(true);

  const toggleLegend = () => {
    setShowLegend(!showLegend);
  };

  //Vercel build will crash without this check
  if (!graphData || !graphData.nodes || !graphData.edges) {
    return null;
  }
  return (
    <div className="Legend">
      <div style={{ display: "flex" }}>
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
                <p>Blue is trusted by Yellow</p>
                <div className="legendInfoItem-symbol">
                  <div className="legend-selectedPlayer" />
                  <div className="legend-redlink" />
                  <div className="legend-player" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <IconButton
            style={{ color: "white", backgroundColor: "#182424" }}
            fontSize="16px"
            icon={showLegend ? <ViewOffIcon /> : <ViewIcon />}
            onClick={toggleLegend}
          />
        </div>
      </div>
      <SearchBar
        showLegend={showLegend}
        handleSearch={handleSearch}
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
      />
    </div>
  );
};

export default Legend;
