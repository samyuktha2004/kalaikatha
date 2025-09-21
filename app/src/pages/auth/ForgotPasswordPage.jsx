import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/auth.css';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      // Simulate password reset (replace with actual Firebase implementation)
      setTimeout(() => {
        setMessage('Password reset link has been sent to your email.');
        setIsLoading(false);
      }, 2000);
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Simple Navigation Header */}
      <nav className="auth-nav">
        <div className="nav-container">
          <button 
            className="home-nav-btn"
            onClick={() => navigate('/login')}
          >
            ← Back to Sign In
          </button>
          <div className="logo-text">🏺 Kalaikatha</div>
        </div>
      </nav>

      <div className="login-container">
        <div className="login-form">
          <div className="auth-header">
            <h1 className="auth-title">
              Reset Password
            </h1>
            <p className="auth-subtitle">
              Enter your email to receive a password reset link
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="form-field">
              <label className="form-label">
                Email Address
              </label>
              <div className="input-group">
                <span className="input-icon">📧</span>
                <input
                  className="form-input with-icon"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
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
                  Sending Reset Link...
                </>
              ) : (
                'Send Reset Link'
              )}
            </button>
          </form>
          
          {/* Back to Login Link */}
          <div className="auth-footer">
            <p>Remember your password?</p>
            <button
              type="button"
              className="auth-link-btn"
              onClick={() => navigate('/login')}
            >
              Back to Sign In
            </button>
          </div>
          
          {message && (
            <div className="auth-success">
              {message}
            </div>
          )}
          
          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;