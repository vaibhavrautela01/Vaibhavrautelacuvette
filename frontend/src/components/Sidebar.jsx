import React from 'react';
import Logo from '../assets/Home.png';
import { Link } from 'react-router-dom';
import View from '../assets/view.png';


const Sidebar = () => {
  return (
    <>
    <div className="sidebar">

 <Link to="/Dashboard">
        <img src={Logo} alt="logo" style={{ height: "30px", cursor: "pointer" }} />
      </Link>


      <Link to="/View">
        <img src={View} alt="logo" style={{ height: "30px",width:"35px", cursor: "pointer",position:"absolute",top:"250px",left:"10px" }} />
      </Link> 
   
      </div>
    </>
  );
};

export default Sidebar;
