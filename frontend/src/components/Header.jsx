import Logo from '../assets/Cuvette.jpg';
import React from 'react';

function Header() {
  return (
    <div style={{backgroundColor: "white"}}>
      <header className="header" style={{position: "fixed", top: "0px", left: "0", width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 20px", boxSizing: "border-box", zIndex: "1000", backgroundColor: "white"}}>
        <div className="logo">
          <img src={Logo} alt="logo" style={{height: "100px"}} />
        </div>
        <nav className="nav">
          <a href="#contact" style={{textDecoration: "none"}}>Contact</a>
        </nav>
      </header>
      
      
    </div>
  );
}

export default Header;
