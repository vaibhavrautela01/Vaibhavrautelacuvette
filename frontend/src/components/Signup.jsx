import React, { useState } from "react";
import axios from 'axios';
import "./Signup.css";
import Header from './Header';
import { useNavigate } from 'react-router-dom';

const Loader = () => (
  <div className="loader">
    <style jsx>{`
      .loader {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
      }
      .spinner {
        border: 8px solid rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        border-top: 8px solid #3498db;
        width: 60px;
        height: 60px;
        animation: spin 1s linear infinite;
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
    <div className="spinner"></div>
  </div>
);

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    company: "",
    email: "",
    employees: "",
    password: ""
  });
  const [isGmail, setIsGmail] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    if (id === "email") {
      setIsGmail(value.includes("@gmail.com"));
    }

    if (id === "phone") {
      setIsPhoneValid(/^\d{10}$/.test(value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/signup", formData);
      alert(response.data.message);
      navigate("/verify", { state: { otp: response.data.otp, email: formData.email } });
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : 'Something went wrong! Please try again.';
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      {loading && <Loader />}
      <Header />
      <div className="left-content">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime quod officiis voluptate incidunt, enim, perspiciatis doloremque nulla vero nesciunt sapiente beatae, rem mollitia ex. Perferendis nam facilis dolor consequatur
      </div>

      <div className="right-form">
        <div className="signup-box">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="name" className="input-label">👤</label>
              <input type="text" id="name" className="input-field" placeholder="Name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="input-group">
              <label htmlFor="phone" className="input-label">📞</label>
              <input 
                type="text" 
                id="phone" 
                className="input-field" 
                placeholder="Phone no." 
                value={formData.phone} 
                onChange={handleChange} 
                required 
              />
              {isPhoneValid && <span className="phone-tick">✅</span>}
            </div>

            <div className="input-group">
              <label htmlFor="company" className="input-label">🏢</label>
              <input type="text" id="company" className="input-field" placeholder="Company Name" value={formData.company} onChange={handleChange} required />
            </div>

            <div className="input-group">
              <label htmlFor="email" className="input-label">✉️</label>
              <input 
                type="email" 
                id="email" 
                className="input-field" 
                placeholder="Company Email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
              />
              {isGmail && <span className="email-tick">✅</span>}
            </div>

            <div className="input-group">
              <label htmlFor="employees" className="input-label">👥</label>
              <input type="number" id="employees" className="input-field" placeholder="Employee Size" value={formData.employees} onChange={handleChange} required />
            </div>

            <div className="input-group">
              <label htmlFor="password" className="input-label">🔒</label>
              <input 
                type="password" 
                id="password" 
                className="input-field" 
                placeholder="Password" 
                value={formData.password} 
                onChange={handleChange} 
                required 
              />
            </div>

            <button type="submit" style={{ width: "100%", padding: "10px", marginTop: "20px" }} className="proceed-button">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
