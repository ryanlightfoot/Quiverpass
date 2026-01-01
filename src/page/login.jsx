import React, { useState } from 'react';
import { Waves, Store, ArrowLeft, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import '../App.css';

const Login = ({ userType = 'surfer', onBack, onSignupClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isSurfer = userType === 'surfer';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log(`${isSurfer ? 'Surfer' : 'Surf School'} Login:`, { email, password });
      setIsLoading(false);
      // Handle successful login here
    }, 1000);
  };

  return (
    <div className="login-container">
      <main className="login-content">
        <div className="login-card">
          {/* Back Button */}
          {onBack && (
            <button className="login-back-btn" onClick={onBack} aria-label="Go back">
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>
          )}

          {/* Header Section */}
          <div className="login-header">
            <div className={`login-icon ${isSurfer ? 'surfer-icon' : 'school-icon'}`}>
              {isSurfer ? (
                <Waves size={48} color="#F4F0E6" strokeWidth={2.5} />
              ) : (
                <Store size={48} color="#F4F0E6" strokeWidth={2.5} />
              )}
            </div>
            <h2 className="login-title">
              {isSurfer ? 'Surfer Login' : 'Surf School Login'}
            </h2>
            <p className="login-subtitle">
              {isSurfer 
                ? 'Welcome back! Ready to catch some waves?'
                : 'Welcome back! Manage your surf school.'}
            </p>
          </div>

          {/* Login Form */}
          <form className="login-form" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <div className="form-input-wrapper">
                <Mail size={20} className="form-icon" />
                <input
                  type="email"
                  id="email"
                  className="form-input"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="form-input-wrapper">
                <Lock size={20} className="form-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className="form-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="form-options">
              <a href="#" className="forgot-password-link">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`login-submit-btn ${isSurfer ? 'surfer-btn' : 'school-btn'}`}
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="login-footer">
            <p className="signup-text">
              Don't have an account?{' '}
              <a 
                href="#" 
                className="signup-link"
                onClick={(e) => {
                  e.preventDefault();
                  if (onSignupClick) {
                    onSignupClick(userType);
                  }
                }}
              >
                Sign up here
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;

