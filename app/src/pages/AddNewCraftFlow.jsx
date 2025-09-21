import React from 'react';
import { useNavigate } from 'react-router-dom';

const AddNewCraftFlow = ({ userName = "Priya" }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = React.useState(1)
  const [uploadedPhoto, setUploadedPhoto] = React.useState(null)
  const [isUploading, setIsUploading] = React.useState(false)
  const [isListening, setIsListening] = React.useState(false)
  const [voiceText, setVoiceText] = React.useState('')
  const [textInput, setTextInput] = React.useState('')
  const [inputMethod, setInputMethod] = React.useState(null) // 'voice' or 'text'
  const [generatedContent, setGeneratedContent] = React.useState('')
  const [structuredContent, setStructuredContent] = React.useState(null) // New structured content
  const [currentGeneratedContent, setCurrentGeneratedContent] = React.useState('') // Currently displayed content
  const [activeContentFormat, setActiveContentFormat] = React.useState('') // Track which format is active
  const [copyFeedback, setCopyFeedback] = React.useState('')
  const [isGenerating, setIsGenerating] = React.useState(false)
  const [uploadProgress, setUploadProgress] = React.useState(0)

  // Handle photo upload with enhanced functionality
  const handlePhotoUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file')
        return
      }
      
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('Please select an image smaller than 10MB')
        return
      }

      setIsUploading(true)
      setUploadProgress(0)
      
      // Simulate progressive upload with realistic progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + Math.random() * 15
        })
      }, 100)

      // Create preview immediately
      const reader = new FileReader()
      reader.onload = (e) => {
        setTimeout(() => {
          setUploadedPhoto(e.target.result)
          setUploadProgress(100)
          setTimeout(() => {
            setIsUploading(false)
            setTimeout(() => setCurrentStep(2), 800)
          }, 500)
        }, 2000)
      }
      reader.readAsDataURL(file)
    }
  }

  // Actual Web Speech Recognition API implementation
  const [recognition, setRecognition] = React.useState(null)
  const [speechSupported, setSpeechSupported] = React.useState(false)

  // Initialize speech recognition on component mount
  React.useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    
    if (SpeechRecognition) {
      setSpeechSupported(true)
      const recognitionInstance = new SpeechRecognition()
      
      // Configure recognition settings
      recognitionInstance.continuous = true
      recognitionInstance.interimResults = true
      recognitionInstance.lang = 'en-US'
      
      // Handle recognition results
      recognitionInstance.onresult = (event) => {
        let finalTranscript = ''
        let interimTranscript = ''
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            finalTranscript += transcript
          } else {
            interimTranscript += transcript
          }
        }
        
        // Update voice text with final transcript, show interim in real-time
        if (finalTranscript) {
          setVoiceText(prev => prev + finalTranscript)
        }
        
        // For better UX, show interim results too
        if (interimTranscript && !finalTranscript) {
          setVoiceText(prev => prev + interimTranscript)
        }
      }
      
      // Handle recognition start
      recognitionInstance.onstart = () => {
        setIsListening(true)
        console.log('Speech recognition started')
      }
      
      // Handle recognition end
      recognitionInstance.onend = () => {
        setIsListening(false)
        console.log('Speech recognition ended')
        
        // Note: We no longer auto-advance here since the user will use the "Next" button
      }
      
      // Handle recognition errors
      recognitionInstance.onerror = (event) => {
        setIsListening(false)
        console.error('Speech recognition error:', event.error)
        
        let errorMessage = ''
        switch (event.error) {
          case 'not-allowed':
            errorMessage = 'Microphone access denied. Please allow microphone access and try again.'
            break
          case 'no-speech':
            errorMessage = 'No speech detected. Please try speaking again.'
            break
          case 'audio-capture':
            errorMessage = 'No microphone found. Please check your microphone connection.'
            break
          case 'network':
            errorMessage = 'Network error occurred. Please check your internet connection.'
            break
          default:
            errorMessage = 'Speech recognition error. Please try again.'
        }
        
        setVoiceText(errorMessage)
      }
      
      setRecognition(recognitionInstance)
    } else {
      setSpeechSupported(false)
      console.warn('Speech Recognition API not supported in this browser')
    }
  }, [])

  // Enhanced voice recording with actual speech recognition
  const toggleVoiceRecording = () => {
    if (!speechSupported) {
      setVoiceText('Speech recognition is not supported in your browser. Please try Chrome, Edge, or Safari.')
      return
    }

    if (!recognition) {
      setVoiceText('Speech recognition not initialized. Please refresh the page and try again.')
      return
    }

    if (!isListening) {
      // Start recording
      setVoiceText('')
      
      try {
        recognition.start()
      } catch (error) {
        console.error('Error starting recognition:', error)
        setVoiceText('Failed to start recording. Please try again.')
      }
    } else {
      // Stop recording
      try {
        recognition.stop()
      } catch (error) {
        console.error('Error stopping recognition:', error)
        setIsListening(false)
      }
    }
  }

  // Initialize on Step 3 but don't auto-generate content
  React.useEffect(() => {
    if (currentStep === 3) {
      // Reset content states when entering Step 3
      setCurrentGeneratedContent('')
      setActiveContentFormat('')
      setIsGenerating(false)
    }
  }, [currentStep])

  // Copy current displayed content to clipboard
  const copyCurrentContent = async () => {
    if (!currentGeneratedContent) {
      console.error('No content available to copy')
      return
    }
    
    try {
      await navigator.clipboard.writeText(currentGeneratedContent)
      setCopyFeedback('Copied to clipboard!')
      
      // Clear feedback after 2 seconds
      setTimeout(() => {
        setCopyFeedback('')
      }, 2000)
    } catch (err) {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea')
      textArea.value = currentGeneratedContent
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      
      setCopyFeedback('Copied to clipboard!')
      setTimeout(() => {
        setCopyFeedback('')
      }, 2000)
    }
  }

  // Enhanced text-to-speech state management
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [currentUtterance, setCurrentUtterance] = React.useState(null)
  const [availableVoices, setAvailableVoices] = React.useState([])
  const [selectedVoice, setSelectedVoice] = React.useState(null)

  // Initialize speech synthesis voices
  React.useEffect(() => {
    if ('speechSynthesis' in window) {
      // Load available voices
      const loadVoices = () => {
        const voices = speechSynthesis.getVoices()
        setAvailableVoices(voices)
        
        // Try to select a good default voice (English, preferably female)
        const preferredVoice = voices.find(voice => 
          voice.lang.startsWith('en') && voice.name.toLowerCase().includes('female')
        ) || voices.find(voice => voice.lang.startsWith('en')) || voices[0]
        
        setSelectedVoice(preferredVoice)
      }
      
      // Load voices immediately and also listen for voices changed event
      loadVoices()
      speechSynthesis.addEventListener('voiceschanged', loadVoices)
      
      return () => {
        speechSynthesis.removeEventListener('voiceschanged', loadVoices)
      }
    }
  }, [])

  // Enhanced text-to-speech with better controls and error handling
  const playContent = () => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported in your browser. Please try a modern browser like Chrome, Firefox, or Safari.')
      return
    }

    if (!generatedContent || !generatedContent.trim()) {
      alert('No content available to play. Please generate content first.')
      return
    }

    // If already playing, stop the current speech
    if (isPlaying) {
      speechSynthesis.cancel()
      setIsPlaying(false)
      setCurrentUtterance(null)
      return
    }

    // Stop any ongoing speech
    speechSynthesis.cancel()
    
    // Clean the content for better speech (remove emojis and special characters)
    const cleanContent = generatedContent
      .replace(/[🏺✨🔥🎨💫]/g, '') // Remove emojis
      .replace(/\n\n/g, '. ') // Replace double line breaks with periods
      .replace(/\n/g, ' ') // Replace single line breaks with spaces
      .trim()
    
    const utterance = new SpeechSynthesisUtterance(cleanContent)
    
    // Configure speech settings
    utterance.rate = 0.8
    utterance.pitch = 1.1
    utterance.volume = 0.9
    
    // Use selected voice if available
    if (selectedVoice) {
      utterance.voice = selectedVoice
    }
    
    // Add comprehensive event listeners
    utterance.onstart = () => {
      setIsPlaying(true)
      console.log('Speech started')
    }
    
    utterance.onend = () => {
      setIsPlaying(false)
      setCurrentUtterance(null)
      console.log('Speech ended')
    }
    
    utterance.onpause = () => {
      console.log('Speech paused')
    }
    
    utterance.onresume = () => {
      console.log('Speech resumed')
    }
    
    utterance.onerror = (event) => {
      setIsPlaying(false)
      setCurrentUtterance(null)
      console.error('Speech error:', event.error)
      
      let errorMessage = 'Sorry, there was an error playing the audio.'
      switch (event.error) {
        case 'network':
          errorMessage = 'Network error occurred while trying to play audio. Please check your internet connection.'
          break
        case 'synthesis-failed':
          errorMessage = 'Speech synthesis failed. Please try again with a different voice or shorter text.'
          break
        case 'synthesis-unavailable':
          errorMessage = 'Speech synthesis is currently unavailable. Please try again later.'
          break
      }
      
      alert(errorMessage)
    }
    
    setCurrentUtterance(utterance)
    speechSynthesis.speak(utterance)
  }

  // Auto-advance helper function
  const canAdvanceToNextStep = () => {
    switch (currentStep) {
      case 1:
        return uploadedPhoto && !isUploading
      case 2:
        return (inputMethod === 'voice' && voiceText && !isListening) || 
               (inputMethod === 'text' && textInput.trim())
      case 3:
        return true // Step 3 is now the final step with on-demand generation
      default:
        return false
    }
  }

  // Get the user's story content from either voice or text input
  const getUserStory = () => {
    return inputMethod === 'voice' ? voiceText : textInput
  }

  // Reset all input states
  const resetInputStates = () => {
    setInputMethod(null)
    setVoiceText('')
    setTextInput('')
    setIsListening(false)
  }

  // AI-Powered Content Generation Function
  const generateContent = (userInputStory) => {
    if (!userInputStory || !userInputStory.trim()) {
      // Fallback content for empty input
      return {
        headline: "Handcrafted Artisan Creation",
        amazonDescription: `Handcrafted Traditional Pottery - Authentic Artisan Quality

Experience the timeless beauty of traditional craftsmanship with this exceptional handmade pottery piece. Each item is individually crafted using time-honored techniques, ensuring unique character and lasting quality.

Key Features:
• Premium quality materials sourced locally
• Traditional handcrafting techniques
• Unique design with authentic artisan character
• Perfect for home decoration or gifting
• Durable construction for long-lasting beauty
• One-of-a-kind piece with individual variations

Ideal for collectors, home decorators, and anyone who appreciates authentic handmade artistry. This piece brings warmth, character, and cultural heritage to any space.

Care Instructions: Clean gently with soft cloth. Handle with care to preserve artisan details.`,

        etsyDescription: `🏺 Handcrafted Traditional Pottery

This exquisite pottery piece showcases the timeless artistry of traditional craftsmanship. Each curve and detail tells a story of heritage, skill, and passion passed down through generations.

• Crafted from locally sourced materials
• Traditional techniques and methods
• Unique regional design elements
• Perfect for home decor or gifting
• Authentic handmade quality

Experience the beauty of genuine handcrafted pottery that brings warmth and character to any space.`,
        
        socialMediaPost: `#HandmadePottery #TraditionalCrafts #ArtisanMade #SupportLocal #HandcraftedWithLove #PotteryArt`,
        
        websiteDescription: `Meet the artistry behind this exceptional handcrafted creation. This piece embodies the perfect marriage of traditional techniques and contemporary aesthetics, crafted with meticulous attention to detail and a deep respect for cultural heritage.

Each element of this work reflects the maker's journey—from sourcing authentic materials to applying time-honored methods passed down through generations. The result is not just a beautiful object, but a tangible connection to the rich tapestry of traditional craftsmanship.

This piece invites you to appreciate the subtle imperfections that mark genuine handwork, the warmth that only comes from human touch, and the stories embedded in every texture and line. It's more than decor—it's a celebration of cultural continuity and artistic dedication.`
      }
    }

    // Extract key information from user story
    const story = userInputStory.toLowerCase()
    
    // Detect materials mentioned
    const materials = []
    if (story.includes('clay') || story.includes('ceramic')) materials.push('clay')
    if (story.includes('wood')) materials.push('wood')
    if (story.includes('fabric') || story.includes('textile')) materials.push('fabric')
    if (story.includes('metal') || story.includes('brass') || story.includes('copper')) materials.push('metal')
    if (story.includes('stone')) materials.push('stone')
    if (story.includes('bamboo')) materials.push('bamboo')
    
    // Detect techniques mentioned
    const techniques = []
    if (story.includes('hand') || story.includes('manual')) techniques.push('hand-crafted')
    if (story.includes('wheel') || story.includes('pottery wheel')) techniques.push('wheel-thrown')
    if (story.includes('carved') || story.includes('carving')) techniques.push('hand-carved')
    if (story.includes('painted') || story.includes('painting')) techniques.push('hand-painted')
    if (story.includes('woven') || story.includes('weaving')) techniques.push('hand-woven')
    if (story.includes('fired') || story.includes('kiln')) techniques.push('kiln-fired')
    
    // Detect cultural/traditional elements
    const cultural = story.includes('traditional') || story.includes('heritage') || story.includes('cultural') || story.includes('generation')
    
    // Detect time investment
    const timeWords = ['hours', 'days', 'weeks', 'months', 'time', 'long']
    const timeInvestment = timeWords.some(word => story.includes(word))
    
    // Generate professional content based on analysis
    const detectedMaterial = materials[0] || 'artisan materials'
    const primaryTechnique = techniques[0] || 'traditional techniques'
    
    // Create dynamic headline
    const headlines = [
      `Handcrafted ${detectedMaterial.charAt(0).toUpperCase() + detectedMaterial.slice(1)} Artistry`,
      `Traditional ${primaryTechnique.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} Creation`,
      `Artisan-Made Cultural Heritage Piece`,
      `Authentic Handcrafted Masterpiece`
    ]
    const headline = headlines[0]
    
    // Generate Amazon-optimized description
    const amazonDescription = `${headline} - Premium Quality Handmade Craft

This exceptional handcrafted piece combines traditional artistry with premium quality materials. Every detail reflects the maker's expertise and commitment to authentic craftsmanship.

Product Features:
• Material: Premium ${detectedMaterial} with authentic finish
• Technique: ${primaryTechnique.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} using traditional methods
• Quality: Handmade with meticulous attention to detail
${cultural ? '• Heritage: Rooted in traditional cultural practices' : '• Style: Contemporary interpretation of classic techniques'}
${timeInvestment ? '• Craftsmanship: Significant time investment ensuring superior quality' : '• Construction: Carefully crafted with professional attention to detail'}
• Purpose: Perfect for home decor, gifting, or collecting
• Uniqueness: One-of-a-kind piece with natural variations

Why Choose This Piece:
✓ Authentic handmade quality you can trust
✓ Supports traditional artisan communities
✓ Unique character that mass-produced items lack
✓ Durable construction for long-lasting beauty
✓ Cultural significance and artistic value

Care Instructions: Handle with care. Clean gently with appropriate methods for ${detectedMaterial}. Avoid harsh chemicals or extreme temperature changes.

Perfect for: Art collectors, home decorators, cultural enthusiasts, anyone who values authentic craftsmanship and unique handmade pieces.`;

    // Generate Etsy-optimized description
    const etsyDescription = `${headline}

This exceptional piece represents the perfect blend of traditional craftsmanship and personal artistry. Every detail reflects the maker's dedication to their craft and the cultural heritage that inspires their work.

Key Features:
• Authentic ${detectedMaterial} construction
• ${primaryTechnique.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} using traditional methods
• Unique design with personal storytelling elements
${cultural ? '• Rich cultural heritage and traditional significance' : '• Contemporary interpretation of classic techniques'}
${timeInvestment ? '• Significant time investment ensuring quality craftsmanship' : '• Meticulously crafted with attention to detail'}
• Perfect for collectors, art enthusiasts, and cultural appreciation
• One-of-a-kind piece with authentic handmade character

Experience the warmth and authenticity that only comes from genuine handcrafted artistry. This piece tells a story through the universal language of traditional craft.`;

    // Generate social media post
    const socialMediaPost = `✨ From story to creation! ✨

This beautiful ${detectedMaterial} piece showcases the magic that happens when traditional ${primaryTechnique.replace('-', ' ')} meets personal passion! 🎨

Every curve, texture, and detail tells the maker's unique story. This is what authentic handcrafted artistry looks like! 💫

#HandmadeWithLove #${detectedMaterial.charAt(0).toUpperCase() + detectedMaterial.slice(1)}Craft #TraditionalArts #ArtisanStory #SupportLocal #HandcraftedHeritage #MadeWithPassion #AuthenticCraft`;

    // Generate website description
    const websiteDescription = `The Story Behind This Exceptional Creation

This remarkable piece embodies the essence of authentic craftsmanship, where traditional techniques meet contemporary artistic expression. The maker's journey—from initial inspiration through the careful selection of ${detectedMaterial} to the final ${primaryTechnique.replace('-', ' ')} finish—reflects a deep commitment to preserving and evolving cultural heritage.

What makes this piece truly special is not just its aesthetic beauty, but the human story woven into every element. ${cultural ? 'Rooted in traditional practices passed down through generations, it represents a living connection to cultural heritage.' : 'While honoring traditional methods, it brings a fresh perspective to classical craftsmanship.'} ${timeInvestment ? 'The significant time investment evident in every detail speaks to the maker\'s dedication to excellence and authentic artistry.' : 'The careful attention to detail and quality of execution demonstrate true artistic dedication.'}

This creation invites you to appreciate the subtle imperfections that mark genuine handwork, the warmth that emerges from human touch, and the stories embedded in every texture and form. It transcends mere decoration to become a conversation piece, a cultural artifact, and a testament to the enduring power of traditional craftsmanship in our modern world.

For those who value authenticity, cultural connection, and the irreplaceable quality of handmade artistry, this piece represents an opportunity to own something truly meaningful—a tangible piece of the maker's creative journey and cultural heritage.`;

    return {
      headline,
      amazonDescription,
      etsyDescription,
      socialMediaPost,
      websiteDescription
    }
  }

  // On-Demand Content Generation Function
  const generateAndDisplay = (format) => {
    setIsGenerating(true)
    setActiveContentFormat(format)
    
    setTimeout(() => {
      // Get the user's story for content generation
      const userStory = getUserStory() || ''
      
      // Generate all content if not already done
      if (!structuredContent) {
        const generatedStructuredContent = generateContent(userStory)
        setStructuredContent(generatedStructuredContent)
      }
      
      // Display specific format content
      let contentToDisplay = ''
      
      switch (format) {
        case 'amazon':
          contentToDisplay = structuredContent?.amazonDescription || generateContent(userStory).amazonDescription
          break
        case 'etsy':
          contentToDisplay = structuredContent?.etsyDescription || generateContent(userStory).etsyDescription
          break
        case 'social':
          contentToDisplay = structuredContent?.socialMediaPost || generateContent(userStory).socialMediaPost
          break
        case 'website':
          contentToDisplay = structuredContent?.websiteDescription || generateContent(userStory).websiteDescription
          break
        default:
          contentToDisplay = 'Please select a content format to generate.'
      }
      
      setCurrentGeneratedContent(contentToDisplay)
      setGeneratedContent(contentToDisplay) // For audio playback compatibility
      setIsGenerating(false)
    }, 1500) // 1.5 seconds for realistic generation
  }

  // Handle proceeding to next step for text input
  const proceedToContentGeneration = () => {
    if (inputMethod === 'text' && textInput.trim()) {
      setCurrentStep(3)
    } else if (inputMethod === 'voice' && voiceText && !isListening) {
      setCurrentStep(3)
    }
  }

  return (
    <div className="craft-flow-container">
      {/* Navigation Header */}
      <header className="dashboard-header" role="banner">
        <div className="header-left">
          <button 
            className="back-button"
            onClick={() => navigate('/dashboard')}
            aria-label="Go back to dashboard"
          >
            ← Back
          </button>
          <div className="logo" aria-label="Kalaikatha - Traditional Crafts Platform">🏺 Kalaikatha</div>
        </div>
        <div className="header-right">
          <button 
            className="notification-icon" 
            aria-label="View notifications"
            title="Notifications"
          >
            🔔
          </button>
          <div className="user-profile" role="button" tabIndex="0" aria-label={`User profile: ${userName}`}>
            <div className="avatar" aria-hidden="true">👤</div>
            <span className="user-name">{userName}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="craft-flow-main" role="main">
        {/* Progress Indicator */}
        <div className="progress-section">
          <div className="progress-indicator">
            <div className={`progress-step ${currentStep >= 1 ? 'active' : ''} ${currentStep === 1 ? 'current' : ''}`}>
              <span className="step-number">1</span>
              <span className="step-label">Photo</span>
            </div>
            <div className={`progress-line ${currentStep >= 2 ? 'active' : ''}`}></div>
            <div className={`progress-step ${currentStep >= 2 ? 'active' : ''} ${currentStep === 2 ? 'current' : ''}`}>
              <span className="step-number">2</span>
              <span className="step-label">Story</span>
            </div>
            <div className={`progress-line ${currentStep >= 3 ? 'active' : ''}`}></div>
            <div className={`progress-step ${currentStep >= 3 ? 'active' : ''} ${currentStep === 3 ? 'current' : ''}`}>
              <span className="step-number">3</span>
              <span className="step-label">Generate</span>
            </div>
          </div>
        </div>

        {/* Copy Feedback Notification */}
        {copyFeedback && (
          <div className="copy-feedback-notification">
            <span className="feedback-icon">✓</span>
            <span className="feedback-text">{copyFeedback}</span>
          </div>
        )}

        {/* Step Content */}
        <div className="step-content">
          {/* Step 1: Photo Upload */}
          {currentStep === 1 && (
            <div className="step-screen photo-upload-screen">
              <h1 className="step-headline">
                Step 1: Show us your craft. You can take a photo or upload one.
              </h1>
              
              <div className="upload-section">
                {!isUploading && !uploadedPhoto && (
                  <div className="upload-area">
                    <label className="upload-button" htmlFor="photo-input">
                      <div className="upload-icon">📷</div>
                      <span className="upload-text">Upload Photo</span>
                      <span className="upload-subtitle">or drag and drop an image here</span>
                      <input 
                        type="file" 
                        id="photo-input"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        style={{ display: 'none' }}
                      />
                    </label>
                    <div className="upload-tips">
                      <p>💡 Tips for great photos:</p>
                      <ul>
                        <li>Use natural lighting when possible</li>
                        <li>Show your craft from multiple angles</li>
                        <li>Keep the background simple and clean</li>
                        <li>Maximum file size: 10MB</li>
                      </ul>
                    </div>
                  </div>
                )}

                {isUploading && (
                  <div className="upload-progress">
                    <div className="upload-spinner">
                      <div className="spinner-ring"></div>
                      <div className="spinner-center">📷</div>
                    </div>
                    <p className="upload-status">Enhancing your photo now...</p>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                    <span className="progress-percentage">{Math.round(uploadProgress)}%</span>
                  </div>
                )}

                {uploadedPhoto && !isUploading && (
                  <div className="upload-success">
                    <div className="image-preview">
                      <img src={uploadedPhoto} alt="Uploaded craft" className="uploaded-image" />
                      <div className="image-overlay">
                        <span className="enhancement-badge">✨ Enhanced</span>
                      </div>
                    </div>
                    <p className="success-message">✨ Photo enhanced! Moving to next step...</p>
                    <button 
                      className="change-photo-btn"
                      onClick={() => {
                        setUploadedPhoto(null)
                        setUploadProgress(0)
                        document.getElementById('photo-input').value = ''
                      }}
                    >
                      Change Photo
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Hybrid Input Choice */}
          {currentStep === 2 && (
            <div className="step-screen input-choice-screen">
              <h1 className="step-headline">
                Step 2: Tell us its story. What is it made of? What inspired you?
              </h1>
              
              {/* Input Method Selection */}
              {!inputMethod && (
                <div className="input-method-selection">
                  <div className="method-choice-container">
                    <p className="choice-subtitle">Choose how you\'d like to share your story:</p>
                    
                    <div className="input-methods">
                      <button 
                        className="method-button voice-method"
                        onClick={() => setInputMethod('voice')}
                        aria-label="Use voice input to tell your story"
                      >
                        <div className="method-icon">🎤</div>
                        <h3>Use Voice Input</h3>
                        <p>Speak naturally and we\'ll transcribe your story</p>
                        <div className="method-features">
                          <span>✨ Natural conversation</span>
                          <span>🎯 Quick and easy</span>
                        </div>
                      </button>
                      
                      <button 
                        className="method-button text-method"
                        onClick={() => setInputMethod('text')}
                        aria-label="Use text input to write your story"
                      >
                        <div className="method-icon">✍️</div>
                        <h3>Use Text Input</h3>
                        <p>Type your story with full control over every word</p>
                        <div className="method-features">
                          <span>📝 Precise editing</span>
                          <span>🎨 Creative control</span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Voice Input Interface */}
              {inputMethod === 'voice' && (
                <div className="voice-input-interface">
                  <div className="interface-header">
                    <button 
                      className="back-to-choice-btn"
                      onClick={() => {
                        setInputMethod(null)
                        setVoiceText('')
                        setIsListening(false)
                      }}
                      aria-label="Go back to input method selection"
                    >
                      ← Back to options
                    </button>
                  </div>

                  <div className="voice-section">
                    {/* Browser Compatibility Notice */}
                    {!speechSupported && (
                      <div className="compatibility-notice error">
                        <span>⚠️</span>
                        <span>Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari for the best experience.</span>
                      </div>
                    )}
                    
                    {speechSupported && !isListening && !voiceText && (
                      <div className="compatibility-notice">
                        <span>ℹ️</span>
                        <span>Click the microphone to start recording. Your browser will ask for microphone permission.</span>
                      </div>
                    )}
                    
                    <div className="microphone-container">
                      <button 
                        className={`microphone-button ${isListening ? 'listening' : ''}`}
                        onClick={toggleVoiceRecording}
                        aria-label={isListening ? 'Stop recording' : 'Start recording'}
                        disabled={!speechSupported}
                      >
                        <div className="microphone-icon">🎤</div>
                        {isListening && (
                          <div className="sound-waves">
                            <div className="wave wave-1"></div>
                            <div className="wave wave-2"></div>
                            <div className="wave wave-3"></div>
                            <div className="wave wave-4"></div>
                          </div>
                        )}
                      </button>
                      
                      {isListening && (
                        <div className="listening-indicator">
                          <p className="listening-text">🎤 Listening... Tap to stop</p>
                          <div className="recording-timer">
                            <span className="timer-dot">●</span>
                            <span className="timer-text">Recording</span>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {voiceText && !isListening && (
                      <div className="voice-success">
                        <div className="voice-transcript">
                          <h3>Your story:</h3>
                          <p className="transcript-text">"{voiceText}"</p>
                        </div>
                        <div className="voice-actions">
                          <button 
                            className="retry-voice-btn"
                            onClick={() => {
                              setVoiceText('')
                              setIsListening(false)
                            }}
                          >
                            Record Again
                          </button>
                          <button 
                            className="proceed-btn primary"
                            onClick={proceedToContentGeneration}
                          >
                            Next: Generate Content
                          </button>
                        </div>
                      </div>
                    )}

                    {!voiceText && !isListening && speechSupported && (
                      <div className="voice-instructions">
                        <h3>💡 What to include in your story:</h3>
                        <ul>
                          <li>Materials used (clay, wood, fabric, etc.)</li>
                          <li>Techniques or methods applied</li>
                          <li>Cultural significance or tradition</li>
                          <li>Personal inspiration or meaning</li>
                          <li>Time taken to create</li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Text Input Interface */}
              {inputMethod === 'text' && (
                <div className="text-input-interface">
                  <div className="interface-header">
                    <button 
                      className="back-to-choice-btn"
                      onClick={() => {
                        setInputMethod(null)
                        setTextInput('')
                      }}
                      aria-label="Go back to input method selection"
                    >
                      ← Back to options
                    </button>
                  </div>

                  <div className="text-section">
                    <div className="text-input-container">
                      <label htmlFor="story-textarea" className="textarea-label">
                        Write your craft's story:
                      </label>
                      <textarea
                        id="story-textarea"
                        className="story-textarea"
                        placeholder="Describe your craft... What materials did you use? What techniques? What inspired you to create this piece? Share the story behind your creation..."
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                        rows="8"
                        aria-describedby="text-instructions"
                      />
                      <div className="character-count">
                        {textInput.length} characters
                      </div>
                    </div>

                    <div className="text-instructions" id="text-instructions">
                      <h3>💡 What to include in your story:</h3>
                      <ul>
                        <li>Materials used (clay, wood, fabric, etc.)</li>
                        <li>Techniques or methods applied</li>
                        <li>Cultural significance or tradition</li>
                        <li>Personal inspiration or meaning</li>
                        <li>Time taken to create</li>
                      </ul>
                    </div>

                    <div className="text-actions">
                      <button 
                        className="proceed-btn primary"
                        onClick={proceedToContentGeneration}
                        disabled={!textInput.trim()}
                        aria-label="Proceed to content generation with your written story"
                      >
                        Next: Generate Content
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Content Generation */}
          {currentStep === 3 && (
            <div className="step-screen content-generation-screen">
              <h1 className="celebratory-headline">
                Choose your content format and generate optimized descriptions!
              </h1>
              
              <div className="content-section">
                {isGenerating && (
                  <div className="generating-content">
                    <div className="generation-spinner">
                      <div className="ai-icon">🤖</div>
                      <div className="thinking-dots">
                        <span className="dot dot-1">.</span>
                        <span className="dot dot-2">.</span>
                        <span className="dot dot-3">.</span>
                      </div>
                    </div>
                    <p className="generation-status">Creating platform-optimized content...</p>
                    <div className="generation-steps">
                      <div className="step-item active">
                        <span className="step-icon">🔍</span>
                        <span>Analyzing your story</span>
                      </div>
                      <div className="step-item active">
                        <span className="step-icon">🧠</span>
                        <span>Processing with AI</span>
                      </div>
                      <div className="step-item active">
                        <span className="step-icon">📝</span>
                        <span>Generating descriptions</span>
                      </div>
                      <div className="step-item active">
                        <span className="step-icon">✨</span>
                        <span>Optimizing for platforms</span>
                      </div>
                    </div>
                  </div>
                )}

                {!isGenerating && (
                  <>
                    {/* Format Selection Buttons */}
                    <div className="format-selection-section">
                      <h3 className="format-section-title">Select Content Format:</h3>
                      <div className="format-buttons-container">
                        <button 
                          className={`format-button ${activeContentFormat === 'amazon' ? 'active' : ''}`}
                          onClick={() => generateAndDisplay('amazon')}
                          disabled={isGenerating}
                          aria-label="Generate content optimized for Amazon marketplace"
                        >
                          <span className="format-icon">📦</span>
                          <span className="format-text">Marketplace (Amazon)</span>
                          <span className="format-desc">Product listing optimized</span>
                        </button>
                        
                        <button 
                          className={`format-button ${activeContentFormat === 'etsy' ? 'active' : ''}`}
                          onClick={() => generateAndDisplay('etsy')}
                          disabled={isGenerating}
                          aria-label="Generate content optimized for Etsy marketplace"
                        >
                          <span className="format-icon">🛍️</span>
                          <span className="format-text">Marketplace (Etsy)</span>
                          <span className="format-desc">Handmade focus</span>
                        </button>
                        
                        <button 
                          className={`format-button ${activeContentFormat === 'social' ? 'active' : ''}`}
                          onClick={() => generateAndDisplay('social')}
                          disabled={isGenerating}
                          aria-label="Generate content optimized for social media"
                        >
                          <span className="format-icon">📱</span>
                          <span className="format-text">Social Media Post</span>
                          <span className="format-desc">With hashtags & emojis</span>
                        </button>
                        
                        <button 
                          className={`format-button ${activeContentFormat === 'website' ? 'active' : ''}`}
                          onClick={() => generateAndDisplay('website')}
                          disabled={isGenerating}
                          aria-label="Generate content optimized for website"
                        >
                          <span className="format-icon">🌐</span>
                          <span className="format-text">Website Description</span>
                          <span className="format-desc">Professional narrative</span>
                        </button>
                      </div>
                    </div>

                    {/* Dynamic Content Display */}
                    {currentGeneratedContent && (
                      <div className="dynamic-content-display">
                        <div className="content-header">
                          <h3>Generated Content</h3>
                          <span className="ai-badge">✨ AI Enhanced</span>
                        </div>
                        
                        <div className="content-preview-area">
                          <div className="content-text">{currentGeneratedContent}</div>
                        </div>
                        
                        <div className="content-actions">
                          <button 
                            className={`play-button-secondary ${isPlaying ? 'playing' : ''}`}
                            onClick={playContent}
                            aria-label={isPlaying ? "Stop audio playback" : "Play generated content aloud"}
                          >
                            <span className="speaker-icon">{isPlaying ? '⏸️' : ''}</span>
                            <span className="button-text">{isPlaying ? 'Stop Audio' : 'Play Audio'}</span>
                          </button>
                          
                          <button 
                            className="copy-content-button"
                            onClick={copyCurrentContent}
                            aria-label="Copy generated content to clipboard"
                          >
                            <span className="copy-icon">📋</span>
                            <span className="button-text">Copy Content</span>
                          </button>
                        </div>
                      </div>
                    )}
                    
                    {!currentGeneratedContent && (
                      <div className="no-content-message">
                        <p>Select a format above to generate optimized content for your craft!</p>
                      </div>
                    )}
                    
                    <div className="completion-section">
                      <div className="completion-actions">
                        <button 
                          className="return-dashboard-button"
                          onClick={() => navigate('/dashboard')}
                          aria-label="Complete flow and return to dashboard"
                        >
                          ✨ Done! Return to Dashboard
                        </button>
                        <button 
                          className="start-new-craft-button"
                          onClick={() => {
                            setCurrentStep(1)
                            setUploadedPhoto(null)
                            setIsUploading(false)
                            setIsListening(false)
                            setVoiceText('')
                            setTextInput('')
                            setInputMethod(null)
                            setGeneratedContent('')
                            setStructuredContent(null)
                            setCurrentGeneratedContent('')
                            setActiveContentFormat('')
                            setCopyFeedback('')
                            setIsGenerating(false)
                            setUploadProgress(0)
                          }}
                          aria-label="Start creating another craft"
                        >
                          🏺 Create Another Craft
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AddNewCraftFlow;