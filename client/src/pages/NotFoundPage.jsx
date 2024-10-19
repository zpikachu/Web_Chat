import React from "react"; // Provide the path to your video
import error from "../assets/404-error.png";
const NotFoundPage = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100%"}}>
    <img src={error} alt="404 EROR" style={{height:"200px",width:"200px"}}/>
  </div>
    </div>
  );
};

export default NotFoundPage;
