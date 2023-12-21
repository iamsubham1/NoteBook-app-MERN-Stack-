import React from 'react'
import Navbar from './components/Navbar';
import HeroElement from './components/HeroElement';

import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import LoginPage from './components/LoginPage';


const App = () => (

  <Router>
    <Navbar />

    <Routes>
      <Route path="/home" element={<HeroElement />} />
      <Route path="/about" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />

    </Routes>
  </Router>
)

export default App;
