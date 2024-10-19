import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Logo from "../components/Logo";
import "../styles.css"; // Import the CSS file

export default function SignInSide() {
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
    room_id: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if any required input field is empty
    const requiredFields = ["username", "password", "room_id"];
    const emptyField = requiredFields.find((field) => !userInfo[field]);

    if (emptyField) {
      // Display a toast notification for empty required field
      toast.error(`${emptyField} cannot be empty`);
      return;
    }
    axios
      .post("http://localhost:3000/api/user/login", userInfo)
      .then(async (response) => {
        if (response.data.success) {
          toast.success(response.data.message);
          setTimeout(()=>{
          navigate("/chat", { state: response.data.user });
            },3000)
        } else {
          const errorMessage =
            response.data.message || "Username or password is wrong.";
          toast.error(errorMessage);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("An error occurred. Please try again.");
      });
  };

  const fields = [
    { label: "Username", name: "username", type: "text" },
    { label: "Password", name: "password", type: "password" },
    { label: "Room ID", name: "room_id", type: "text" },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        position: "relative",
        backgroundImage:
          "linear-gradient(to right, black, rgba(255, 255, 255, 0))",
      }}
    >
      <Logo />
      <form onSubmit={handleSubmit} className="form-container">
        <h1 className="heading">Welcome Back!</h1>
        <div
          style={{ marginBottom: "25px", color: "rgba(255, 255, 255, 0.5)" }}
        >
          Don't have an account? &nbsp;
          <Link to={"/signup"} className="link">
            Register
          </Link>
        </div>
        <div>
          {fields.map((field) => (
            <div key={field.name}>
              <label className="label">{field.label}:</label>
              <input
                type={field.type}
                required
                name={field.name}
                value={userInfo[field.name]}
                onChange={handleChange}
                className="input-field"
              />
            </div>
          ))}
        </div>
        <button type="submit" className="button">
          LogIn
        </button>
      </form>
      <Toaster position="top-right" />
    </div>
  );
}
