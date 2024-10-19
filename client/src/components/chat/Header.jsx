import React from "react";
import { Typography, Avatar, Button, Paper } from "@mui/material";
import '../../styles.css';

const Header = ({ user, logout }) => {
  return (
    <Paper
      style={{
        position: "fixed",
        border:"none",
        borderBottomRightRadius:"0px",
        borderBottomLeftRadius:"0px",
        top: 0,
        left: 0,
        right: 0,
        height: "70px", // Added height
        padding: "20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#1a1a1a",
      }}
    >
      <div style={{ display: "flex", alignItems: "center"}}>
        <Avatar
          src={user?.profile}
          alt=""
          sx={{ width: 30, height: 30, marginRight: "10px" }}
        />
        <Typography sx={{
           color: "whitesmoke",fontFamily:"cursive",animation: "animate-tube-light 5s linear infinite"
          
            }}>Hello, {user?.username}</Typography>
      </div>
      <Button 
        variant="contained" 
        onClick={() => logout(user?.user_id)}
        sx={{ minWidth: '80px', height: '36px', fontSize: '0.8rem', fontWeight: 'bold', backgroundColor: "#1976d2", color: "#fff",  "&:hover": {
          backgroundColor: "#03bcf4", /* Change to a darker shade of blue */
          boxShadow: "0 0 10px #03bcf4, 0 0 20px #03bcf4, 0 0 40px #03bcf4", /* Add a glowing effect */
        } }} // Adjusted button dimensions and styling
      >
        Logout
      </Button>
    </Paper>
  );
};

export default Header;