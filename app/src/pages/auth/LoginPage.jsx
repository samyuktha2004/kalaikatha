import React, { useState } from 'react';
import { useAuth } from '../../services/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useUserFlow } from '../../contexts/UserFlowContext';
import '../../styles/auth.css';

const LoginPage = () => {
  const [username, setUsername] = useState(''); // Can be email or phone
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showDecisionDialog, setShowDecisionDialog] = useState(false);
  
  // Add error handling for contexts
  let auth, userFlow, navigate;
  
  try {
    auth = useAuth();
    userFlow = useUserFlow();
    navigate = useNavigate();
  } catch (err) {
    console.error('Context error in LoginPage:', err);
    // Fallback if contexts are not available
    navigate = () => console.log('Navigation not available');
    auth = { login: () => Promise.reject('Auth not available'), loginWithPhoneNumber: () => Promise.reject('Auth not available') };
    userFlow = { startNewProductFlow: () => {}, goToDashboard: () => {}, setFlowState: () => {} };
  }
  
  const { login, loginWithPhoneNumber } = auth;
  const { startNewProductFlow, goToDashboard, setFlowState } = userFlow;

  console.log('LoginPage component mounted/rendered');
  console.log('Auth context:', auth);
  console.log('UserFlow context:', userFlow);
  console.log('Navigate function:', navigate);

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const isEmail = (input) => {
    return validateEmail(input);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      if (!username.trim()) {
        throw new Error('Please enter your email or phone number');
      }
      if (!password.trim()) {
        throw new Error('Please enter your password');
      }

      // Try to login with email or phone
      if (isEmail(username)) {
        await login(username, password);
      } else {
        await loginWithPhoneNumber(username, password);
      }
      
      setFlowState(prev => ({ ...prev, userType: 'artisan' }));
      setShowDecisionDialog(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewProduct = () => {
    startNewProductFlow();
    navigate('/add-product');
  };

  const handleDashboard = () => {
    goToDashboard();
    navigate('/dashboard');
  };

  const DecisionDialog = () => (
    <div className="decision-dialog-overlay">
      <div className="decision-dialog">
        <h3>Welcome! What would you like to do today?</h3>
        <p>Choose how you'd like to use your AI-powered marketplace assistant:</p>
        
        <div className="decision-options">
          <button 
            className="decision-btn new-product"
            onClick={handleNewProduct}
          >
            <div className="decision-icon">🎨</div>
            <h4>Create New Product</h4>
            <p>Upload images, describe your craft with voice, and let AI generate marketplace content</p>
          </button>
          
          <button 
            className="decision-btn dashboard"
            onClick={handleDashboard}
          >
            <div className="decision-icon">📋</div>
            <h4>Go to Dashboard</h4>
            <p>Manage existing crafts, find fusion partners, or explore AI tools</p>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Simple Navigation Header */}
      <nav className="auth-nav">
        <div className="nav-container">
          <button 
            className="home-nav-btn"
            onClick={() => navigate('/')}
          >
            ← Back to Home
          </button>
          <div className="logo-text">🏺 Kalaikatha</div>
        </div>
      </nav>

      <div className="login-container">
        <div className="login-form">
          <div className="auth-header">
            <h1 className="auth-title">
              Welcome Back
            </h1>
            <p className="auth-subtitle">
              Sign in to your Kalaikatha account
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Username Field */}
            <div className="form-field">
              <label className="form-label">
                Username
              </label>
              <div className="input-group">
                <span className="input-icon">👤</span>
                <input
                  className="form-input with-icon"
                  type="text"
                  placeholder="Mobile Number or Email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="form-field">
              <label className="form-label">
                Password
              </label>
              <div className="input-group">
                <input
                  className="form-input password-field"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="forgot-password">
              <button 
                type="button" 
                className="forgot-link"
                onClick={() => navigate('/forgot-password')}
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              className="auth-submit-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading-spinner">⏳</span>
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
          
          {/* Sign Up Link */}
          <div className="auth-footer">
            <p>Don't have an account?</p>
            <button
              type="button"
              className="auth-link-btn"
              onClick={() => navigate('/signup')}
            >
              Create Account
            </button>
          </div>
          
          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}
        </div>
        
        {showDecisionDialog && <DecisionDialog />}
      </div>
    </>
  );
};

export default LoginPage;