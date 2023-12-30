import React from 'react'
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import ErrorPage from './components/ErrorPage';
import SignupPage from './components/SignupPage';
import AboutPage from './components/AboutPage';
import Notes from './components/Notes';
import HomePage from './components/HeroPage';
import ContactPage from './components/ContactPage';
import UserInfo from './components/UserInfo';

const App = () => {


  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/create" element={<Notes />} />
        <Route path="/userinfo" element={<UserInfo />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<ErrorPage />} />


      </Routes>

    </Router>
  )
}

export default App;
