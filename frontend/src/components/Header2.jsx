import React, { useState } from 'react';
import Logo from '../assets/Cuvette.jpg';

function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    // Handle logout logic here
    console.log('Logged out');
    // Redirect to login or perform other actions
  };

  return (
    <div style={{ backgroundColor: "white" }}>
      <header className="header" style={{
        position: "fixed", top: "0px", left: "0", width: "100%",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "0 20px", boxSizing: "border-box", zIndex: "1000",
        backgroundColor: "white"
      }}>
        <div className="logo">
          <img src={Logo} alt="logo" style={{ height: "100px" }} />
        </div>
        <nav className="nav">
          <a href="#contact" style={{ textDecoration: "none" }}>Contact</a>
          <div className="profile" style={{ position: 'relative', display: 'inline-block' }}>
            <span onClick={toggleDropdown} style={{ cursor: 'pointer', marginLeft: '20px' }}>
              Profile Name
            </span>
            {dropdownOpen && (
              <div style={{
                position: 'absolute', right: 0, backgroundColor: 'white',
                boxShadow: '0 2px 5px rgba(0,0,0,0.2)', zIndex: 1000
              }}>
                <ul style={{ listStyleType: 'none', margin: 0, padding: 0 }}>
                  <li style={{ padding: '10px', cursor: 'pointer' }} onClick={handleLogout}>
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Header;
