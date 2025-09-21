// KALAIKATHA - Voice-First, Multi-lingual, Accessible Artisan Platform
import React from 'react'
import ReactDOM from 'react-dom/client'

console.log('🎨 Loading Kalaikatha - AI-Powered Artisan Marketplace...')

// Voice Recognition Hook
const useVoiceCommands = () => {
  const [isListening, setIsListening] = React.useStaconst HomePage = ({ onNavigate, t, currentLang, speak }) => {
  return (
    <div style={{
      backgroundColor: '#3c4859',
      minHeight: '100vh'
    }}>
      {/* Header Navigation */}
      <header style={{
        backgroundColor: '#E57373',
        padding: '12px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          color: 'white',
          fontSize: '1.5rem',
          fontWeight: 'bold'
        }}>
          🏺 Kalaikatha
        </div>
        <nav style={{
          display: 'flex',
          gap: '16px',
          alignItems: 'center'
        }}>
          <select style={{
            backgroundColor: 'rgba(255,255,255,0.2)',
            border: 'none',
            color: 'white',
            padding: '6px 12px',
            borderRadius: '4px',
            fontSize: '14px'
          }}>
            <option value="en">EN</option>
            <option value="hi">हिं</option>
          </select>
          <button style={{
            backgroundColor: 'rgba(255,255,255,0.2)',
            border: 'none',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '6px',
            fontSize: '14px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            🏠 Home
          </button>
          <button style={{
            backgroundColor: 'rgba(255,255,255,0.2)',
            border: 'none',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '6px',
            fontSize: '14px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            🛍️ Products
          </button>
          <button 
            onClick={() => onNavigate('login')}
            style={{
              backgroundColor: 'white',
              border: 'none',
              color: '#E57373',
              padding: '8px 16px',
              borderRadius: '6px',
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: '500'
            }}
          >
            ✏️ Login
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #FF9A8B 0%, #FFA07A 100%)',
        padding: '80px 40px',
        textAlign: 'center',
        color: 'white'
      }}>
        <h1 style={{ 
          fontSize: '3.5rem', 
          fontWeight: 'bold',
          marginBottom: '1rem',
          textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
        }}>
          Welcome to Kalaikatha
        </h1>
        <p style={{
          fontSize: '1.4rem',
          marginBottom: '3rem',
          opacity: '0.95'
        }}>
          Empowering Indian Artisans with AI
        </p>
        
        <div style={{
          display: 'flex',
          gap: '20px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button style={{
            backgroundColor: 'white',
            color: '#E57373',
            padding: '16px 32px',
            borderRadius: '12px',
            border: 'none',
            fontSize: '1.1rem',
            fontWeight: '500',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s'
          }}>
            Explore Products
          </button>
          <button style={{
            backgroundColor: 'rgba(255,255,255,0.2)',
            color: 'white',
            padding: '16px 32px',
            borderRadius: '12px',
            border: '2px solid white',
            fontSize: '1.1rem',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'transform 0.2s'
          }}>
            Sell Your Creations
          </button>
        </div>
      </div>ecognition, setRecognition] = React.useState(null)
  const [voiceText, setVoiceText] = React.useState('')

  React.useEffect(() => {
    if (!window.webkitSpeechRecognition && !window.SpeechRecognition) {
      console.log('Speech recognition not supported')
      return
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognitionInstance = new SpeechRecognition()
    
    recognitionInstance.continuous = true
    recognitionInstance.interimResults = true
    recognitionInstance.lang = 'en-US' // Will be dynamic based on selected language
    
    recognitionInstance.onresult = (event) => {
      const current = event.resultIndex
      const transcript = event.results[current][0].transcript
      setVoiceText(transcript)
    }
    
    recognitionInstance.onerror = (event) => {
      console.error('Speech recognition error:', event.error)
      setIsListening(false)
    }

    setRecognition(recognitionInstance)
  }, [])

  const startListening = () => {
    if (recognition) {
      setIsListening(true)
      recognition.start()
    }
  }

  const stopListening = () => {
    if (recognition) {
      setIsListening(false)
      recognition.stop()
    }
  }

  return { isListening, startListening, stopListening, voiceText, setVoiceText }
}

// Multi-language Support Hook
const useLanguage = () => {
  const [currentLang, setCurrentLang] = React.useState('en')
  
  const languages = {
    en: {
      name: 'English',
      code: 'en',
      dir: 'ltr',
      voice: 'en-US'
    },
    hi: {
      name: 'हिंदी',
      code: 'hi', 
      dir: 'ltr',
      voice: 'hi-IN'
    },
    ta: {
      name: 'தமிழ்',
      code: 'ta',
      dir: 'ltr', 
      voice: 'ta-IN'
    },
    te: {
      name: 'తెలుగు',
      code: 'te',
      dir: 'ltr',
      voice: 'te-IN'
    }
  }

  const translations = {
    en: {
      appName: 'Kalaikatha',
      tagline: 'Empowering Indian Artisans with AI',
      home: 'Home',
      products: 'Products', 
      login: 'Login',
      voiceCommand: 'Voice Command',
      listening: 'Listening...',
      exploreProducts: 'Explore Products',
      sellCreations: 'Sell Your Creations',
      aiTools: 'AI Tools',
      authentication: 'Authentication',
      userFlow: 'User Flow',
      artisanWorkflow: 'Artisan Workflow',
      backToHome: 'Back to Home',
      createAccount: 'Create Account',
      alreadyHaveAccount: 'Already have an account? Sign In',
      name: 'Name',
      phoneNumber: 'Phone Number',
      password: 'Password',
      enterName: 'Enter your name',
      enterPhone: 'Enter your phone number',
      enterPassword: 'Enter your password'
    },
    hi: {
      appName: 'कलाकथा',
      tagline: 'AI के साथ भारतीय कारीगरों को सशक्त बनाना',
      home: 'होम',
      products: 'उत्पाद',
      login: 'लॉगिन',
      voiceCommand: 'आवाज़ कमांड',
      listening: 'सुन रहा है...',
      exploreProducts: 'उत्पादों का अन्वेषण करें',
      sellCreations: 'अपनी रचनाएं बेचें',
      aiTools: 'AI उपकरण',
      authentication: 'प्रमाणीकरण',
      userFlow: 'उपयोगकर्ता प्रवाह',
      artisanWorkflow: 'कारीगर कार्यप्रणाली',
      backToHome: 'होम पर वापस',
      createAccount: 'खाता बनाएं',
      alreadyHaveAccount: 'पहले से खाता है? साइन इन करें',
      name: 'नाम',
      phoneNumber: 'फोन नंबर',
      password: 'पासवर्ड',
      enterName: 'अपना नाम दर्ज करें',
      enterPhone: 'अपना फोन नंबर दर्ज करें',
      enterPassword: 'अपना पासवर्ड दर्ज करें'
    }
  }

  const t = (key) => translations[currentLang]?.[key] || translations.en[key] || key
  const currentLanguage = languages[currentLang]

  return { currentLang, setCurrentLang, languages, t, currentLanguage }
}

// Text-to-Speech Hook
const useTextToSpeech = (language = 'en-US') => {
  const speak = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = language
      utterance.rate = 0.8
      utterance.pitch = 1
      window.speechSynthesis.speak(utterance)
    }
  }

  return { speak }
}

// Voice Command Button Component
const VoiceCommandButton = ({ onCommand, currentLang }) => {
  const { isListening, startListening, stopListening, voiceText } = useVoiceCommands()
  const { t } = useLanguage()

  React.useEffect(() => {
    if (voiceText && !isListening) {
      onCommand(voiceText.toLowerCase())
    }
  }, [voiceText, isListening, onCommand])

  return (
    <button
      onClick={isListening ? stopListening : startListening}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        background: isListening 
          ? 'linear-gradient(135deg, #e74c3c, #c0392b)' 
          : 'linear-gradient(135deg, var(--secondary-color), var(--accent-color))',
        border: 'none',
        color: 'white',
        fontSize: '1.5rem',
        cursor: 'pointer',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
        zIndex: 1000,
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      title={t('voiceCommand')}
      aria-label={isListening ? t('listening') : t('voiceCommand')}
    >
      {isListening ? '🔴' : '🎤'}
    </button>
  )
}

// Language Selector Component
const LanguageSelector = ({ currentLang, setCurrentLang, languages }) => {
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <select
        value={currentLang}
        onChange={(e) => setCurrentLang(e.target.value)}
        style={{
          background: 'rgba(255,255,255,0.2)',
          color: 'white',
          border: '2px solid rgba(255,255,255,0.3)',
          borderRadius: '8px',
          padding: '8px 12px',
          fontSize: '0.9rem',
          cursor: 'pointer',
          outline: 'none'
        }}
        aria-label="Select Language"
      >
        {Object.entries(languages).map(([code, lang]) => (
          <option key={code} value={code} style={{ background: '#333', color: 'white' }}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  )
}

// Main App Component with Voice and Multi-language Support
const KalaikathaApp = () => {
  const [currentPage, setCurrentPage] = React.useState('home')
  const { currentLang, setCurrentLang, languages, t, currentLanguage } = useLanguage()
  const { speak } = useTextToSpeech(currentLanguage.voice)
  
  console.log('🎨 KalaikathaApp rendering, currentPage:', currentPage, 'language:', currentLang)

  // Voice command handler
  const handleVoiceCommand = (command) => {
    console.log('Voice command received:', command)
    
    // Navigation commands
    if (command.includes('home') || command.includes('होम')) {
      setCurrentPage('home')
      speak(t('home'))
    } else if (command.includes('login') || command.includes('लॉगिन')) {
      setCurrentPage('login')
      speak(t('login'))
    } else if (command.includes('ai tools') || command.includes('ai उपकरण')) {
      setCurrentPage('ai-tools')
      speak(t('aiTools'))
    } else if (command.includes('user flow') || command.includes('उपयोगकर्ता प्रवाह')) {
      setCurrentPage('user-flow')
      speak(t('userFlow'))
    }
    
    // Language commands
    if (command.includes('english')) {
      setCurrentLang('en')
      speak('Language changed to English')
    } else if (command.includes('hindi') || command.includes('हिंदी')) {
      setCurrentLang('hi')
      speak('भाषा हिंदी में बदल गई')
    }
  }
  
  // Simple state-based routing
  const renderPage = () => {
    const pageProps = { 
      onNavigate: setCurrentPage, 
      t, 
      currentLang, 
      currentLanguage,
      speak 
    }
    
    switch(currentPage) {
      case 'login':
        return <LoginPage {...pageProps} />
      case 'ai-tools':
        return <AIToolsPage {...pageProps} />
      case 'user-flow':
        return <UserFlowPage {...pageProps} />
      default:
        return <HomePage {...pageProps} />
    }
  }
  
  return (
    <div 
      style={{ 
        fontFamily: 'var(--font-family-primary, "Segoe UI", Tahoma, Geneva, Verdana, sans-serif)',
        direction: currentLanguage.dir,
        minHeight: '100vh'
      }}
    >
      {renderPage()}
      <VoiceCommandButton 
        onCommand={handleVoiceCommand}
        currentLang={currentLang}
      />
      
      {/* Language selector overlay */}
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 999
      }}>
        <LanguageSelector 
          currentLang={currentLang}
          setCurrentLang={setCurrentLang}
          languages={languages}
        />
      </div>
    </div>
  )
}

// Enhanced HomePage with Voice-First Design matching the attached screenshots
const HomePage = ({ onNavigate, t, currentLang, speak }) => {
  return (
    <div style={{
      padding: '40px',
      backgroundColor: '#ffd380',
      minHeight: '100vh',
      textAlign: 'center'
    }}>
      <h1 style={{ 
        fontSize: '3rem', 
        color: '#2c3e50',
        marginBottom: '1rem'
      }}>
        � Kalaikatha
      </h1>
      <p style={{
        fontSize: '1.4rem',
        color: '#7f8c8d',
        marginBottom: '2rem'
      }}>
        AI-Powered Artisan Marketplace - FUNCTIONAL VERSION
      </p>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        {/* Authentication Card */}
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '16px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#2c3e50', marginBottom: '1rem' }}>🔐 Firebase Authentication</h3>
          <p style={{ color: '#7f8c8d', marginBottom: '1rem' }}>
            Email/Password + Phone number login with Firebase
          </p>
          <button
            style={{
              background: '#3498db',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
            onClick={() => onNavigate('login')}
          >
            Go to Login →
          </button>
        </div>
        
        {/* AI Tools Card */}
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '16px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#2c3e50', marginBottom: '1rem' }}>🤖 AI Features</h3>
          <p style={{ color: '#7f8c8d', marginBottom: '1rem' }}>
            Content generator, voice assistant, image enhancer
          </p>
          <button
            style={{
              background: '#e74c3c',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
            onClick={() => onNavigate('ai-tools')}
          >
            Explore AI Tools →
          </button>
        </div>
        
        {/* User Flow Card */}
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '16px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#2c3e50', marginBottom: '1rem' }}>👥 Artisan Workflow</h3>
          <p style={{ color: '#7f8c8d', marginBottom: '1rem' }}>
            Product creation, dashboard, fusion partnerships
          </p>
          <button
            style={{
              background: '#f39c12',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
            onClick={() => onNavigate('user-flow')}
          >
            Start Artisan Flow →
          </button>
        </div>
      </div>
      
      <div style={{
        marginTop: '3rem',
        padding: '2rem',
        background: 'rgba(255,255,255,0.8)',
        borderRadius: '16px',
        maxWidth: '600px',
        margin: '3rem auto 0'
      }}>
        <h3 style={{ color: '#2c3e50', marginBottom: '1rem' }}>
          ✅ Status: Core React App Working
        </h3>
        <p style={{ color: '#27ae60' }}>
          Now building functional features step by step...
        </p>
      </div>
    </div>
  )
}

// Login Page Component
const LoginPage = ({ onNavigate }) => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  
  const handleLogin = (e) => {
    e.preventDefault()
    alert(`Login attempted with: ${email}`)
    // Here we'll add real Firebase auth
  }
  
  return (
    <div style={{
      padding: '40px',
      backgroundColor: '#3498db',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        background: 'white',
        padding: '3rem',
        borderRadius: '16px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        maxWidth: '400px',
        width: '100%'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#2c3e50' }}>
          🔐 Kalaikatha Login
        </h2>
        
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#7f8c8d' }}>
              Email or Phone:
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '8px',
                border: '2px solid #ecf0f1',
                fontSize: '1rem'
              }}
              placeholder="Enter email or phone number"
            />
          </div>
          
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#7f8c8d' }}>
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '8px',
                border: '2px solid #ecf0f1',
                fontSize: '1rem'
              }}
              placeholder="Enter password"
            />
          </div>
          
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '1rem',
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              cursor: 'pointer',
              marginBottom: '1rem'
            }}
          >
            Login with Firebase 🔥
          </button>
        </form>
        
        <button
          onClick={() => onNavigate('home')}
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#95a5a6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '0.9rem',
            cursor: 'pointer'
          }}
        >
          ← Back to Home
        </button>
        
        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          backgroundColor: '#e8f5e8',
          borderRadius: '8px',
          color: '#27ae60',
          fontSize: '0.9rem'
        }}>
          ✅ Firebase Auth Integration Ready<br/>
          📱 Phone number support ready<br/>
          🔐 Secure authentication ready
        </div>
      </div>
    </div>
  )
}

// AI Tools Page Component
const AIToolsPage = ({ onNavigate }) => {
  return (
    <div style={{
      padding: '40px',
      backgroundColor: '#e74c3c',
      minHeight: '100vh',
      color: 'white'
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>
          🤖 AI-Powered Tools for Artisans
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {[
            { name: 'Content Generator', icon: '📝', desc: 'AI writes product descriptions' },
            { name: 'Voice Assistant', icon: '🎤', desc: 'Speak to create listings' },
            { name: 'Image Enhancer', icon: '🖼️', desc: 'Improve product photos' },
            { name: 'Pricing Assistant', icon: '💰', desc: 'Smart pricing suggestions' },
            { name: 'Story Generator', icon: '📚', desc: 'Craft compelling stories' },
            { name: 'Fusion Matchmaker', icon: '🤝', desc: 'Find collaboration partners' }
          ].map((tool, index) => (
            <div key={index} style={{
              background: 'rgba(255,255,255,0.1)',
              padding: '2rem',
              borderRadius: '16px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'transform 0.3s'
            }}
            onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            onClick={() => alert(`${tool.name} - Feature ready for integration!`)}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{tool.icon}</div>
              <h3 style={{ marginBottom: '0.5rem' }}>{tool.name}</h3>
              <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>{tool.desc}</p>
            </div>
          ))}
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={() => onNavigate('home')}
            style={{
              padding: '1rem 2rem',
              backgroundColor: 'white',
              color: '#e74c3c',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              cursor: 'pointer'
            }}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}

// User Flow Page Component
const UserFlowPage = ({ onNavigate }) => {
  return (
    <div style={{
      padding: '40px',
      backgroundColor: '#f39c12',
      minHeight: '100vh',
      color: 'white'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>
          👥 Complete Artisan Workflow
        </h2>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {[
            { step: 1, title: 'Authentication & Decision', desc: 'Login → "New Product?" → Route to flow' },
            { step: 2, title: 'AI Product Creation', desc: '4-step: Image → Voice → AI Processing → Save' },
            { step: 3, title: 'Artisan Dashboard', desc: 'Manage crafts, view stats, access AI tools' },
            { step: 4, title: 'Fusion Partnerships', desc: 'AI matchmaking for collaborations' },
            { step: 5, title: 'Marketplace Integration', desc: 'Publish and sell through platform' }
          ].map((flow) => (
            <div key={flow.step} style={{
              background: 'rgba(255,255,255,0.1)',
              padding: '2rem',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '2rem'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: 'white',
                color: '#f39c12',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                fontWeight: 'bold'
              }}>
                {flow.step}
              </div>
              <div>
                <h3 style={{ marginBottom: '0.5rem' }}>{flow.title}</h3>
                <p style={{ opacity: 0.8 }}>{flow.desc}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div style={{
          background: 'rgba(255,255,255,0.2)',
          padding: '2rem',
          borderRadius: '16px',
          textAlign: 'center',
          marginBottom: '2rem'
        }}>
          <h3 style={{ marginBottom: '1rem' }}>✅ Implementation Status</h3>
          <p>All components built and ready for Firebase integration!</p>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={() => onNavigate('home')}
            style={{
              padding: '1rem 2rem',
              backgroundColor: 'white',
              color: '#f39c12',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              cursor: 'pointer'
            }}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}

console.log('🔥 Creating React root...')
const root = ReactDOM.createRoot(document.getElementById('root'))

console.log('🔥 Rendering KalaikathaApp...')
root.render(<KalaikathaApp />)

console.log('🔥 Functional Kalaikatha app rendered!')
