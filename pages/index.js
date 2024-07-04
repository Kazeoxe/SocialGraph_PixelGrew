import React from "react";
import Head from "next/head";
import GraphComponent from "./components/GraphDisplayer";
import graphData  from "../assets/scripts/data/nodes-edges_data.json";

const Index = () => {
  return (
    <div>
      <Head>
        <title>Social Graph Network</title>
        <link rel="icon" href="/icon48.png" sizes="any" />
        <meta name="description" content="PixelGrew's players social graph" />
      </Head>
      <main>
        <div className="App">
          <GraphComponent graphData={graphData} />
        </div>
      </main>
    </div>
  );
};

export default Index;
