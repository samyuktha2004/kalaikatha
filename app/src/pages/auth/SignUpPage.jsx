import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../services/AuthContext';
import '../../styles/auth.css';

const SignUpPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();              <button 
                type="button"
                className="signup-link-btn"
                onClick={() => {
                  console.log('Navigating to login page...');
                  console.log('Navigate function:', navigate);
                  try {
                    navigate('/login');
                  } catch (err) {
                    console.error('Navigation error:', err);
                  }
                }}
              >
                I've been here already!
              </button>
  
  const [formData, setFormData] = React.useState({
    name: '',
    phoneNumber: '',
    countryCode: '+91',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = React.useState(false);
  const [selectedLanguage, setSelectedLanguage] = React.useState('en');
  const [passwordStrength, setPasswordStrength] = React.useState('');
  const [error, setError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'bn', name: 'বাংলা', flag: '🇮🇳'}
  ];

  const currentLanguage = languages.find(lang => lang.code === selectedLanguage);

  const countryCodes = [
    { code: '+91', country: 'India', flag: '🇮🇳' },
    { code: '+1', country: 'USA', flag: '🇺🇸' },
    { code: '+44', country: 'UK', flag: '🇬🇧' },
    { code: '+86', country: 'China', flag: '🇨🇳' },
    { code: '+81', country: 'Japan', flag: '🇯🇵' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === 'password') {
      evaluatePasswordStrength(value);
    }
  };

  const evaluatePasswordStrength = (password) => {
    if (password.length < 6) {
      setPasswordStrength('weak');
    } else if (password.length < 10) {
      setPasswordStrength('medium');
    } else {
      setPasswordStrength('strong');
    }
  };

  const handleLanguageSelect = (langCode) => {
    setSelectedLanguage(langCode);
    setShowLanguageDropdown(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      // Validate required fields
      if (!formData.name.trim()) {
        throw new Error('Please enter your name');
      }
      if (!formData.phoneNumber.trim()) {
        throw new Error('Please enter your phone number');
      }
      if (!formData.password.trim() || formData.password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }
      
      // Register user with Firebase
      await register(
        formData.email || `${formData.countryCode}${formData.phoneNumber}@kalaikatha.com`, 
        formData.password, 
        formData.name, 
        `${formData.countryCode}${formData.phoneNumber}`
      );
      
      // Navigate to dashboard after successful registration
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-page-container">
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

      {/* Main Content */}
      <main className="signup-main">
        <div className="signup-container">
          <div className="signup-header">
            <h1>Join Kalaikatha</h1>
            <p>Create your account to start showcasing your craftsmanship</p>
          </div>

          <form className="signup-form" onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Full Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="name"
                className="form-input"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter your full name"
                required
                aria-describedby="name-help"
              />
              <div id="name-help" className="form-help">
                This will be displayed on your artisan profile
              </div>
            </div>

            {/* Phone Number Field */}
            <div className="form-group">
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number <span className="required">*</span>
              </label>
              <div className="phone-input-group">
                <select
                  className="country-code-select"
                  value={formData.countryCode}
                  onChange={(e) => handleInputChange('countryCode', e.target.value)}
                  aria-label="Country code"
                >
                  {countryCodes.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.flag} {country.code}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  id="phoneNumber"
                  className="form-input phone-input"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  placeholder="Enter your phone number"
                  required
                  aria-describedby="phone-help"
                />
              </div>
              <div id="phone-help" className="form-help">
                We'll use this to verify your account and send important updates
              </div>
            </div>

            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email ID <span className="optional">(Optional)</span>
              </label>
              <input
                type="email"
                id="email"
                className="form-input"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email address"
                aria-describedby="email-help"
              />
              <div id="email-help" className="form-help">
                Optional - for updates and easier account recovery
              </div>
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password <span className="required">*</span>
              </label>
              <div className="password-input-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className="form-input password-input"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Create a secure password"
                  required
                  aria-describedby="password-help"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              <div id="password-help" className="form-help">
                <span className={`password-strength ${passwordStrength}`}>
                  {passwordStrength === 'weak' && '❌ Too weak - needs at least 6 characters'}
                  {passwordStrength === 'medium' && '⚠️ Medium strength - consider adding more characters'}
                  {passwordStrength === 'strong' && '✅ Strong password'}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <div className="form-group">
              <button
                type="submit"
                className="signup-submit-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="loading-spinner">⏳</span>
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="auth-error">
                {error}
              </div>
            )}

            {/* Sign In Link */}
            <div className="auth-footer">
              <p>Already have an account?</p>
              <button
                type="button"
                className="auth-link-btn"
                onClick={() => navigate('/login')}
              >
                I've been here already!
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SignUpPage;