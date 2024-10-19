import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { SyncLoader } from "react-spinners";

import logo from "../assets/logo.png";

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <img src={logo} style={{ maxWidth: "150px", marginBottom: "20px" }} alt="Logo" />
        <SyncLoader color="#03bcf4" margin={4} size={10} />
      </div>
    </div>
  );
};

export default HomePage;
