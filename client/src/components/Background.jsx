import React from "react";
import bgVideo from "../assets/BG.mp4";

const Background = () => {
  return (
    <div >
      <video
        autoPlay
        loop
        muted
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: "-1",
        }}
      >
        <source src={bgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Background;
