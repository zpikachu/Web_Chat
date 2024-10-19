// safe to remove

import React from "react";
import { motion } from "framer-motion";

const ballStyle = {
  display: "flex",
  width: "1rem",
  height: "1rem",
  backgroundColor: "red",
  borderRadius: "0.5rem"
};

const bounceTransition = {
  duration: 0.8,
  repeat: Infinity, // Make the animation repeat infinitely
  repeatType: "reverse", // Reverse the animation to create a bouncing effect
  ease: "easeInOut" // Use easeInOut for smoother animation
};

export default function Home() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "2rem",
          height: "2rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <motion.span
          style={ballStyle}
          transition={bounceTransition}
          animate={{
            y: ["20%", "80%", "20%"] // Adjust the bouncing range for smoother motion
          }}
        />
      </div>
    </div>
  );
}
