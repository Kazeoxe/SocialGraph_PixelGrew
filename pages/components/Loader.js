import React from "react";

const Loader = () => {
  return (
    <div className="loadder">
      <div className="relative-pos">
        Social graph
        <svg>
          <rect x="1" y="1" />
        </svg>
      </div>
      <div className="bottom">
        For&nbsp;
        <div
          style={{
            textDecoration: "underline",
            color: "#895a8a",
            padding: "0",
          }}
        >
          <p style={{ color: "#ffe711" }}>Pixel</p>
          <p style={{ color: "#ef5e22" }}>Grew</p>
        </div>
        &nbsp;by Kazeoxe
      </div>
    </div>
  );
};

export default Loader;
