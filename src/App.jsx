import React, { useState } from 'react'
import './App.css'
import Homepage from './page/homepage.jsx'
import Login from './page/login.jsx'
import Signup from './page/signup.jsx'
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

  return (
    <>
      {/* HEADER: Quiverpass with logo */}
      <header className="app-header">
        <img src={QuiverPassLogo} alt="Quiverpass Logo" className="header-logo" />
        <h1 className="header-title">Quiverpass</h1>
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
      ) : (
        <Signup 
          userType={userType} 
          onBack={handleBackToLogin}
          onSignupSuccess={handleSignupSuccess}
        />
      )}
    </>
  )
}

export default App
