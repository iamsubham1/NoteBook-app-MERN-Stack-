import React from 'react'
import Navbar from './components/Navbar';
import HeroElement from './components/HeroElement';
import Login from './components/login';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';


const App = () => (

  <Router>
    <Navbar />

    <Routes>
      <Route path="/home" element={<HeroElement />} />
      <Route path="/about" element={<Login />} />

    </Routes>
  </Router>
)

export default App;
