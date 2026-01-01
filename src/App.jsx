import React, { useState } from 'react'
import './App.css'
import Homepage from './page/homepage.jsx'
import Login from './page/login.jsx'
import Signup from './page/signup.jsx'
import Surfboards from './page/surfboards.jsx'
import QuiverPassLogo from './assets/QuiverPassLogo.png'

function App() {
  const [currentPage, setCurrentPage] = useState('homepage');
  const [userType, setUserType] = useState('surfer');

  const handleLoginClick = (type) => {
    setUserType(type);
    setCurrentPage('login');
  };

  const handleSignupClick = (type) => {
    setUserType(type);
    setCurrentPage('signup');
  };

  const handleBackToHome = () => {
    setCurrentPage('homepage');
  };

  const handleBackToLogin = () => {
    setCurrentPage('login');
  };

  const handleSignupSuccess = () => {
    // After successful signup, redirect to login
    setCurrentPage('login');
  };

  const handleHeaderClick = () => {
    setCurrentPage('surfboards');
  };

  return (
    <>
      {/* HEADER: Quiverpass with logo */}
      <header className="app-header">
        <div className="header-spacer"></div>
        <button className="header-link" onClick={handleHeaderClick}>
          <img src={QuiverPassLogo} alt="Quiverpass Logo" className="header-logo" />
          <h1 className="header-title">Quiverpass</h1>
        </button>
        <button className="header-login-btn" onClick={handleBackToHome}>
          Login/Register
        </button>
      </header>
      
      {/* Main content */}
      {currentPage === 'homepage' ? (
        <Homepage onLoginClick={handleLoginClick} onSignupClick={handleSignupClick} />
      ) : currentPage === 'login' ? (
        <Login 
          userType={userType} 
          onBack={handleBackToHome}
          onSignupClick={handleSignupClick}
        />
      ) : currentPage === 'signup' ? (
        <Signup 
          userType={userType} 
          onBack={handleBackToLogin}
          onSignupSuccess={handleSignupSuccess}
        />
      ) : (
        <Surfboards />
      )}
    </>
  )
}

export default App
