import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Logo = () => {
  return (
    <div style={{ position: "relative" }}>
      <Link to="/">
        <div
          style={{
            position: "absolute",
            top: "50px",
            left: "96.67px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src={logo}
            alt="Logo"
            style={{ width: "20px", marginRight: "10px" }}
          />
          <h1 style={{ fontSize: "15px", margin: "0", color: "#fff" ,fontFamily:"logo"}}>
            webChat
          </h1>
        </div>
      </Link>
    </div>
  );
};

export default Logo;
