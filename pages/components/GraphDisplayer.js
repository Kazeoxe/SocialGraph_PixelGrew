import React, { useEffect, useState } from "react";
import { Network } from "vis-network";
import Loader from "./Loader";
import Legend from "./LegendBox";

const GraphDisplayer = ({ graphData }) => {
  const [network, setNetwork] = useState(null);
  const [graphLoaded, setGraphLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!network && graphData) {
      const container = document.getElementById("network-container");
      const options = {
        nodes: {
          shape: "dot",
          color: {
            background: "#fef3b3",
            border: "#fde768",
          },
          font: {
            size: 24,
            face: "arial",
            color: "white",
          },
        },
        interaction: {
          tooltipDelay: 200,
        },
        physics: {
          solver: "forceAtlas2Based",
          forceAtlas2Based: {
            gravitationalConstant: -30,
            springConstant: 0.04,
            springLength: 95,
          },
          adaptiveTimestep: true,
          stabilization: {
            iterations: 987,
            updateInterval: 10,
          },
        },
        layout: {
          improvedLayout: false,
          randomSeed: 191006,
        },
      };
      const networkInstance = new Network(container, graphData, options);

      networkInstance.on("click", (event) => {
        const { nodes } = event;
        if (nodes.length) {
          let selectedNodeId = null;
          const updateNodesArray = [];
          const updateEdgesArray = [];

          if (nodes[0] !== selectedNodeId) {
            selectedNodeId = nodes[0];
            const resetEdgesArray = graphData.edges.map((edge) => ({
              id: edge.id,
              color: "#fde768",
            }));

            networkInstance.body.data.edges.update(resetEdgesArray);

            const connectedEdges =
              networkInstance.getConnectedEdges(selectedNodeId);

            // Update the colors of the edges connected to the selected node
            connectedEdges.forEach((edgeId) => {
              const edge = networkInstance.body.data.edges.get(edgeId);
              if (edge.from === selectedNodeId) {
                updateEdgesArray.push({
                  id: edgeId,
                  color: "blue",
                });
              }
              if (edge.to === selectedNodeId) {
                updateEdgesArray.push({
                  id: edgeId,
                  color: "red",
                });
              }
            });

            networkInstance.body.data.edges.update(updateEdgesArray);
          }
          networkInstance.body.data.nodes.update(updateNodesArray);
          // Reset colors when clicking on an empty space
        } else if (!nodes.length) {
          // const resetNodesArray = graphData.nodes.map((node) => ({
          //   id: node.id,
          //   color: {
          //     background: "#fef3b3",
          //     border: "#fde768",
          //   },
          // }));

          // networkInstance.body.data.nodes.update(resetNodesArray);

          const resetEdgesArray = graphData.edges.map((edge) => ({
            id: edge.id,
            color: "#fde768",
          }));

          networkInstance.body.data.edges.update(resetEdgesArray);
        }
      });

      networkInstance.once("stabilizationIterationsDone", () => {
        setGraphLoaded(true);
      });

      setNetwork(networkInstance);
    }
  }, [graphData, network]);

  const handleSearch = () => {
    if (network && searchTerm) {
      const nodes = graphData.nodes.filter((node) =>
        node.label.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (nodes.length) {
        const nodeId = nodes[0].id;
        // DUPE :Reset the colors of the edges
        const resetEdgesArray = graphData.edges.map((edge) => ({
          id: edge.id,
          color: "#fde768",
        }));

        network.body.data.edges.update(resetEdgesArray);

        const connectedEdges = network.getConnectedEdges(nodeId);
        const updateEdgesArray = [];
        // DUPE :Update the colors of the edges connected to the selected node
        connectedEdges.forEach((edgeId) => {
          const edge = network.body.data.edges.get(edgeId);
          if (edge.from === nodeId) {
            updateEdgesArray.push({
              id: edgeId,
              color: "blue",
            });
          }
          if (edge.to === nodeId) {
            updateEdgesArray.push({
              id: edgeId,
              color: "red",
            });
          }
        });

        network.body.data.edges.update(updateEdgesArray);

        network.focus(nodeId, {
          scale: 1,
          animation: {
            duration: 1000,
            easingFunction: "easeInOutQuad",
          },
        });
      }
    }
  };

  //Vercel build will crash without this check
  if (!graphData || !graphData.nodes || !graphData.edges) {
    return null;
  }

  return (
    <div>
      {graphLoaded ? null : <Loader />}
      <div
        className="graph-wrapper"
        style={{
          ...(graphLoaded ? { display: "block" } : { display: "none" }),
        }}
      >
        <Legend
          graphData={graphData}
          handleSearch={handleSearch}
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
        />

        <div id="network-container"></div>
      </div>
    </div>
  );
};

export default GraphDisplayer;
