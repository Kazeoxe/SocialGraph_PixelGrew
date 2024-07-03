import React, { useEffect, useState } from 'react';
import { Network } from 'vis-network';
import 'vis-network/styles/vis-network.css';
import Loader from './Loader/loader';

const GraphComponent = ({ graphData }) => {
  const [network, setNetwork] = useState(null);
  const [graphLoaded, setGraphLoaded] = useState(false);

  useEffect(() => {
    if (!network && graphData) {
      const container = document.getElementById('network-container');
      const options = {
        nodes: {
          shape: 'dot',
          color: {
            background: '#fef3b3',
            border: '#fde768',
          },
          font: {
            size: 24,
            face: 'arial',
            color: 'white',
          },
        },
        interaction: {
          tooltipDelay: 200,
        },
        physics: {
          solver: 'forceAtlas2Based',
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

      // Gestionnaire d'événement de clic
      networkInstance.on('click', (event) => {
        const { nodes } = event;
        const updateNodesArray = [];

        if (nodes.length) {
          // Si un nœud est cliqué
          const selectedNodeId = nodes[0];
          const connectedEdges = networkInstance.getConnectedEdges(selectedNodeId);

          connectedEdges.forEach((edgeId) => {
            const edge = networkInstance.body.data.edges.get(edgeId);
            if (edge.to === selectedNodeId) {
              updateNodesArray.push({
                id: edge.from,
                color: {
                  background: '#ff2525',
                  border: '#ff2525',
                },
              });
            }
            //  else if (edge.from === selectedNodeId) {
            //   updateNodesArray.push({
            //     id: edge.to,
            //     color: {
            //       background: '#fef3b3',
            //       border: 'purple',
            //     },
            //   });
            // }
          });

          const selectedNodes = graphData.nodes.filter((node) => nodes.includes(node.id));
          const updatedNodes = selectedNodes.map((node) => ({
            id: node.id,
            color: {
              border: node.from ='#10c7d1',
              bold: true,
            },
          }));
          networkInstance.body.data.nodes.update(updatedNodes);
        } else {
          // Si on clique dans l'espace vide
          graphData.nodes.forEach((node) => {
            updateNodesArray.push({
              id: node.id,
              color: {
                background: '#fef3b3',
                border: '#fde768',
              },
            });
          });
        }

        networkInstance.body.data.nodes.update(updateNodesArray);
      });

      // Définir l'état de chargement à true une fois que le graphique est prêt
      networkInstance.once('stabilizationIterationsDone', () => {
        setGraphLoaded(true);
      });

      setNetwork(networkInstance);
    }
  }, [graphData, network]);

  return (
    <div>
      {graphLoaded ? null : <Loader />}
      <div id="network-container" style={{ ...(graphLoaded ? { display: 'block' } : { display: 'none' }) }}></div>
    </div>
  );
};

export default GraphComponent;
