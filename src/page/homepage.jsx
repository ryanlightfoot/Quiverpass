import React from 'react';
import { Waves, Store } from 'lucide-react';
import QuiverPassLogo from '../assets/QuiverPassLogo.png';
import '../App.css';

const Homepage = ({ onLoginClick, onSignupClick }) => {
  return (
    <div>
      {/* MAIN: Buttons centered in the middle of the screen */}
      <main className="main-content">
        
        {/* Logo */}
        <div className="homepage-logo-container">
          <img 
            src={QuiverPassLogo} 
            alt="Quiverpass Logo" 
            className="homepage-logo"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
        
        <div className="button-group">
          
          {/* BIG BUTTON: SURFER */}
          <button 
            className="btn-surfer"
            onClick={() => onLoginClick && onLoginClick('surfer')}
            aria-label="Login as Surfer"
          >
            {/* Icon */}
            <Waves size={40} color="#F4F0E6" strokeWidth={2.5} />
            
            {/* Text */}
            <div className="surfer-text-container">
              <span className="surfer-label-small">Ready to ride?</span>
              <span className="surfer-label-large">Login as Surfer</span>
            </div>
          </button>

          {/* SMALL BUTTON: SCHOOL */}
          <button 
            className="btn-school"
            onClick={() => onLoginClick && onLoginClick('school')}
            aria-label="Login as Surf School"
          >
            <Store size={18} />
            <span>Login as Surf School</span>
          </button>

          {/* Sign Up Link */}
          <div className="homepage-signup">
            <p className="homepage-signup-text">
              Don't have an account?{' '}
              <button 
                className="homepage-signup-link"
                onClick={() => onSignupClick && onSignupClick('surfer')}
              >
                Sign up here
              </button>
            </p>
          </div>

        </div>

      </main>
    </div>
  );
};

export default Homepage;