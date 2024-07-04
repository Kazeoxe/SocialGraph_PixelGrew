import React from "react";

const Legend = ({ graphData }) => {
  return (
    <div className="Legend">
      <div>
        <p>Players: {graphData.nodes.length}</p>
        <p>Links: {graphData.edges.length}</p>
        <ul>
          <li>Click on a node to highlight its connected nodes</li>
          <li>Click on the empty space to reset the graph</li>
        </ul>
      </div>
      <div>
        <button>{/* <FaEye style={{ color: '#1B1714' }} /> */}</button>
      </div>
    </div>
  );
};

export default Legend;
