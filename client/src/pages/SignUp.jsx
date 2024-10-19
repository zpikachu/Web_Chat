import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Logo from "../components/Logo";
import "../styles.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [otp, setOtp] = useState("");
  const [verificationInProgress, setVerificationInProgress] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    let intervalId;
    if (timeRemaining > 0) {
      intervalId = setInterval(() => {
        setTimeRemaining((prevTime) => Math.max(0, prevTime - 1000));
      }, 1000);
    } else {
      setVerificationInProgress(false);
    }
    return () => clearInterval(intervalId);
  }, [timeRemaining]);

  useEffect(() => {
    const unloadCallback = (event) => {
      if (verificationInProgress) {
        event.preventDefault();
        axios
          .post(`${import.meta.env.VITE_API}/api/user/delete`, {
            email: userInfo.email,
          })
          .then((response) => {
            console.log(response.data);
            event.returnValue = null;
            return;
          })
          .catch((error) => {
            console.error("Error deleting user:", error);
            event.returnValue = null;
            return;
          });
        setUserInfo({ username: "", email: "", password: "" });
      }
    };

    window.addEventListener("beforeunload", unloadCallback);

    return () => {
      window.removeEventListener("beforeunload", unloadCallback);
    };
  }, [verificationInProgress]);

  const handleSendOtp = () => {
    if (!validateInput()) return;
    axios
      .post(`${import.meta.env.VITE_API}/api/user/register`, userInfo)
      .then(async (response) => {
        if (!response.data.success) toast.error(response.data.message);
        else {
          toast.success(response.data.message);
          setTimeout(()=>{
          setVerificationInProgress(true);
          setTimeRemaining(120000);
          },3000)
        }
      })
      .catch((error) => console.log(error));
  };

  const handleVerify = () => {
    axios
      .post(`${import.meta.env.VITE_API}/api/user/verify`, {
        otp,
        email: userInfo.email,
      })
      .then(async (response) => {
        if (response.data.success) {
          toast.success(response.data.message);
          setTimeout(()=>{
            navigate("/login");
            },3000)
        } else toast.error(response.data.message);
      })
      .catch((error) => console.log(error));
  };

  const validateInput = () => {
    const { email, username, password } = userInfo;
    if (!email || !username || !password) {
      toast.error("Please fill in all the fields.");
      return false;
    }
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }
    if (username.length < 4 || username.length > 10) {
      toast.error("Username must be between 4 and 10 characters long.");
      return false;
    }
    if (password.length < 8 || password.length > 12) {
      toast.error("Password must be between 8 and 12 characters long.");
      return false;
    }
    return true;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

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

      {!verificationInProgress && (
        <form onSubmit={handleSubmit} className="form-container">
          <h1 className="heading">Register Here!</h1>

          <div
            style={{ marginBottom: "25px", color: "rgba(255, 255, 255, 0.5)" }}
          >
            Already have an account? &nbsp;
            <Link to={"/login"} className="link">
              SignIn
            </Link>
          </div>
          {["Email", "Username", "Password"].map((field) => (
            <div key={field} style={{ marginBottom: "10px" }}>
              <label className="label">{field}:</label>
              <input
                type={field === "Password" ? "password" : "text"}
                required
                name={field.toLowerCase()}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
                }
                className="input-field"
              />
            </div>
          ))}

          <button type="button" onClick={handleSendOtp} className="button">
            Send OTP
          </button>
        </form>
      )}

      {verificationInProgress && (
        <form onSubmit={handleSubmit} className="form-container">
          <h1>Verify Your OTP</h1>
          <input
            placeholder={`Time remaining: ${Math.floor(
              timeRemaining / 60000
            )}:${((timeRemaining % 60000) / 1000).toFixed(0).padStart(2, "0")}`}
            name="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={{ marginTop: "20px", marginBottom: "6px" }}
            maxLength="4"
            autoComplete="one-time-code"
            className="input-field"
          />
          <button type="button" onClick={handleVerify} className="button">
            Verify
          </button>
        </form>
      )}

      <Toaster position="top-right" />
    </div>
  );
};

export default SignUp;
