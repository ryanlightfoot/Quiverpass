import React, { useState } from 'react';
import { Waves, Store, ArrowLeft, Mail, Lock, Eye, EyeOff, User, Phone, Building2, CheckCircle } from 'lucide-react';
import '../App.css';

const Signup = ({ userType: initialUserType = 'surfer', onBack, onSignupSuccess }) => {
  const [selectedUserType, setSelectedUserType] = useState(initialUserType);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    schoolName: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const isSurfer = selectedUserType === 'surfer';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!isSurfer && !formData.schoolName.trim()) {
      newErrors.schoolName = 'School name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log(`${isSurfer ? 'Surfer' : 'Surf School'} Signup:`, formData);
      setIsLoading(false);
      setShowSuccess(true);
    }, 1500);
  };

  const handleContinueAfterSuccess = () => {
    if (onSignupSuccess) {
      onSignupSuccess();
    }
  };

  // Show success message
  if (showSuccess) {
    return (
      <div className="login-container">
        <main className="login-content">
          <div className="login-card">
            <div className="signup-success">
              <div className={`success-icon ${isSurfer ? 'surfer-icon' : 'school-icon'}`}>
                <CheckCircle size={64} color="#F4F0E6" strokeWidth={2.5} />
              </div>
              <h2 className="success-title">
                {isSurfer ? 'Sign Up Approved!' : 'Thank You!'}
              </h2>
              <p className="success-message">
                {isSurfer 
                  ? 'Your signup is approved!'
                  : `We will be in touch with ${formData.email} soon.`}
              </p>
              <button
                className={`login-submit-btn ${isSurfer ? 'surfer-btn' : 'school-btn'}`}
                onClick={handleContinueAfterSuccess}
              >
                Continue to Login
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

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
              {isSurfer ? 'Surfer Sign Up' : 'Surf School Sign Up'}
            </h2>
            <p className="login-subtitle">
              {isSurfer 
                ? 'Join the community! Start your surfing journey today.'
                : 'Register your surf school and start managing bookings.'}
            </p>
          </div>

          {/* User Type Selector */}
          <div className="user-type-selector">
            <button
              type="button"
              className={`user-type-btn ${isSurfer ? 'active' : ''}`}
              onClick={() => {
                setSelectedUserType('surfer');
                // Clear school name when switching to surfer
                if (formData.schoolName) {
                  setFormData(prev => ({ ...prev, schoolName: '' }));
                }
              }}
            >
              <Waves size={20} />
              <span>Surfer</span>
            </button>
            <button
              type="button"
              className={`user-type-btn ${!isSurfer ? 'active' : ''}`}
              onClick={() => setSelectedUserType('school')}
            >
              <Store size={20} />
              <span>Surf School</span>
            </button>
          </div>

          {/* Signup Form */}
          <form className="login-form" onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                {isSurfer ? 'Full Name' : 'Contact Name'}
              </label>
              <div className="form-input-wrapper">
                <User size={20} className="form-icon" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-input"
                  placeholder={isSurfer ? 'Enter your full name' : 'Enter contact name'}
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              {errors.name && <span className="form-error">{errors.name}</span>}
            </div>

            {/* School Name Field (only for surf school) */}
            {!isSurfer && (
              <div className="form-group">
                <label htmlFor="schoolName" className="form-label">
                  School Name
                </label>
                <div className="form-input-wrapper">
                  <Building2 size={20} className="form-icon" />
                  <input
                    type="text"
                    id="schoolName"
                    name="schoolName"
                    className="form-input"
                    placeholder="Enter your surf school name"
                    value={formData.schoolName}
                    onChange={handleChange}
                    required
                  />
                </div>
                {errors.schoolName && <span className="form-error">{errors.schoolName}</span>}
              </div>
            )}

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
                  name="email"
                  className="form-input"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              {errors.email && <span className="form-error">{errors.email}</span>}
            </div>

            {/* Phone Field */}
            <div className="form-group">
              <label htmlFor="phone" className="form-label">
                Phone Number
              </label>
              <div className="form-input-wrapper">
                <Phone size={20} className="form-icon" />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="form-input"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              {errors.phone && <span className="form-error">{errors.phone}</span>}
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
                  name="password"
                  className="form-input"
                  placeholder="Create a password (min. 8 characters)"
                  value={formData.password}
                  onChange={handleChange}
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
              {errors.password && <span className="form-error">{errors.password}</span>}
            </div>

            {/* Confirm Password Field */}
            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <div className="form-input-wrapper">
                <Lock size={20} className="form-icon" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  className="form-input"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.confirmPassword && <span className="form-error">{errors.confirmPassword}</span>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`login-submit-btn ${isSurfer ? 'surfer-btn' : 'school-btn'}`}
              disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>

          {/* Login Link */}
          <div className="login-footer">
            <p className="signup-text">
              Already have an account?{' '}
              <a href="#" className="signup-link" onClick={(e) => {
                e.preventDefault();
                if (onBack) {
                  // Navigate back to login
                  onBack();
                }
              }}>
                Login here
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Signup;

