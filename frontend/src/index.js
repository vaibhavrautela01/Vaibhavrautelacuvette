import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ReactDOM from 'react-dom/client';

import './index.css'


import Signup from './components/Signup';

import Dasboard from './components/Dashboard';

import Verify from './components/verify';

import View from './components/View';


import reportWebVitals from './reportWebVitals';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <Router>
      <Routes>
        <Route exact path="/" element={<Signup />} />      
        <Route exact path="/Dashboard" element={<Dasboard />} />   
        <Route exact path="/Verify" element={<Verify />} />   

        <Route exact path="/View" element={<View />} />   

 
      </Routes>
    </Router>

    
  
);
reportWebVitals();
