import React from 'react';
import { Waves, Store } from 'lucide-react';
import '../App.css';

const Homepage = ({ onLoginClick }) => {
  return (
    <div>
      {/* MAIN: Buttons centered in the middle of the screen */}
      <main className="main-content">
        
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

        </div>

      </main>

    </div>
  );
};

export default Homepage;