import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import axios from "axios"; 
import "./Verify.css"; 
import Header from './Header';

function Verify() {
  const navigate = useNavigate(); 
  const [otp, setOtp] = useState(""); // Unified OTP input for both Email and Mobile
  const [email, setEmail] = useState(""); // Input for the email
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const isValidOTP = (otp) => /^\d{4}$/.test(otp); // Validates 4-digit OTP

  const verifyOTP = async () => {
    if (!isValidOTP(otp)) {
      setErrorMessage("Please enter a valid 4-digit OTP.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/verify-otp", { otp, email });
      
      // Check for success response
      if (response.status === 200) {
        setSuccessMessage(response.data.message);
        setErrorMessage(""); 
        navigate("/Dashboard", { state: { message: response.data.message } });
      }
    } catch (error) {
      console.error("Error verifying OTP:", error); 
      setErrorMessage(error.response ? error.response.data.message : "Failed to verify OTP.");
      setSuccessMessage(""); 
    }
  };

  return (
    <div className="container">
      <Header/>

      
      
      <div className="content">
      <div className="left-content" style={{position:"relative",top:"170px"}}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime quod officiis voluptate incidunt, enim, perspiciatis doloremque nulla vero nesciunt sapiente beatae, rem mollitia ex. Perferendis nam facilis dolor consequatur
      </div>
        <div className="right">
          <div className="signup-box">
            <h2>Verify OTP</h2>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}

            <form>
              <div className="input-group">
                <span className="icon">✉️</span>
                <input 
                  type="text"
                  placeholder="Email Address" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                />
              </div>
              <div className="input-group">
                <span className="icon">🔑</span>
                <input 
                  type="text"
                  placeholder="Enter OTP" 
                  value={otp} 
                  onChange={(e) => setOtp(e.target.value)} 
                />
              </div>
              <button 
                type="button" 
                onClick={verifyOTP} 
                style={{ width: "100%", backgroundColor: "blue", color: "white", padding: "10px", border: "none", cursor: "pointer", marginTop: "10px" }}>
                Verify OTP
              </button>
            </form>

            <Link to="/Signup" style={{ textDecoration: "none" }}>
              <button 
                style={{ width: "100%", padding: "10px", border: "none", cursor: "pointer", marginTop: "20px" }}>
                New User? Register Here
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Verify;
