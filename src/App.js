import React from 'react';
import { useState, useEffect } from 'react';
import GraphComponent from './components/GraphComponent';
import graphData from '../src/scripts/data/nodes-edges_data.json';

const App = () => {
  const [graph, setGraph] = useState({ nodes: [], edges: [] });

  useEffect(() => {
    
    setGraph(graphData);
  }, []);
console.log(graph)

  return (
    <div className="App">
      
      <GraphComponent graphData={graphData} />
    </div>
  );
};

export default App;
