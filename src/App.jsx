import React, { useState } from 'react'
import './App.css'
import Homepage from './page/homepage.jsx'
import Login from './page/login.jsx'
import Signup from './page/signup.jsx'
import Surfboards from './page/surfboards.jsx'
import Rent from './page/rent.jsx'
import QuiverPassLogo from './assets/QuiverPassLogo.png'

function App() {
  const [currentPage, setCurrentPage] = useState('surfpage');
  const [userType, setUserType] = useState('surfer');
  const [selectedBoard, setSelectedBoard] = useState(null);

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

  const handleRentClick = (board) => {
    setSelectedBoard(board);
    setCurrentPage('rent');
  };

  const handleBackToSurfboards = () => {
    setCurrentPage('surfboards');
    setSelectedBoard(null);
  };

  return (
    <>
      {/* HEADER: Quiverpass with logo */}
      <header className="app-header">
        <button className="header-link" onClick={handleHeaderClick}>
          <img 
            src={QuiverPassLogo} 
            alt="Quiverpass Logo" 
            className="header-logo"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
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
      ) : currentPage === 'rent' ? (
        <Rent 
          board={selectedBoard}
          onBack={handleBackToSurfboards}
        />
      ) : (
        <Surfboards onRentClick={handleRentClick} />
      )}
    </>
  )
}

export default App
