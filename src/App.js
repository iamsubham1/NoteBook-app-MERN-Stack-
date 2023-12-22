import React from 'react'
import Navbar from './components/Navbar';
import HeroElement from './components/HeroElement';

import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import ErrorPage from './components/ErrorPage';
import SignupPage from './components/SignupPage';


const App = () => (

  <Router>
    <Navbar />

    <Routes>
      <Route path="/" element={<HeroElement />} />
      {/* <Route path="/about" element={<LoginPage />} /> */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="*" element={<ErrorPage />} />

    </Routes>
  </Router>
)

export default App;
