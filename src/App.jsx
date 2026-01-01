import React, { useState } from 'react'
import './App.css'
import Homepage from './page/homepage.jsx'
import Login from './page/login.jsx'
import QuiverPassLogo from './assets/QuiverPassLogo.png'

function App() {
  const [currentPage, setCurrentPage] = useState('homepage');
  const [loginType, setLoginType] = useState('surfer');

  const handleLoginClick = (type) => {
    setLoginType(type);
    setCurrentPage('login');
  };

  const handleBackToHome = () => {
    setCurrentPage('homepage');
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
        <Homepage onLoginClick={handleLoginClick} />
      ) : (
        <Login userType={loginType} onBack={handleBackToHome} />
      )}
    </>
  )
}

export default App
