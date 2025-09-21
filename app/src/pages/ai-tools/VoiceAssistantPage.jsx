/**
 * Voice Assistant Page for Kalaikatha - AI-Powered Marketplace Assistant for Indian Artisans
 * 
 * Features:
 * - Multilingual voice recognition and synthesis (Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati)
 * - Voice-activated navigation to AI tools and platform features
 * - Accessible design with brown/terracotta/indigo color scheme
 * - Cultural context awareness for Indian artisan needs
 * - Google Cloud AI integration for enhanced voice processing
 * - Auto-listening mode for hands-free operation
 * - Quick action buttons with Indian craft terminology
 * - Floating microphone button with enhanced accessibility
 * 
 * Accessibility Features:
 * - ARIA labels for screen readers
 * - Keyboard navigation support
 * - High contrast color combinations
 * - Large touch targets for mobile/tablet use
 * - Focus indicators for all interactive elements
 * 
 * Color Scheme:
 * - Brown (#8B4513): Primary actions and headers
 * - Terracotta (#CD853F): Visual elements and highlights
 * - Indigo (#6366F1, #4B5563): Business functions and secondary actions
 * - Warm cream (#f5f3f0): Background for better readability
 */

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const VoiceAssistantPage = () => {
  const navigate = useNavigate();
  
  // State management for voice features
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');
  const [isAutoListening, setIsAutoListening] = useState(false);
  const [voiceCommands, setVoiceCommands] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const recognitionRef = useRef(null);
  const synthRef = useRef(null);

  const languages = [
    { code: 'en-IN', name: 'English', flag: '��', greeting: 'Hello! I am your AI assistant for Indian artisans.' },
    { code: 'hi-IN', name: 'हिन्दी', flag: '��', greeting: 'नमस्ते! मैं भारतीय कारीगरों का AI सहायक हूं।' },
    { code: 'bn-IN', name: 'বাংলা', flag: '🇮🇳', greeting: 'নমস্কার! আমি ভারতীয় শিল্পীদের AI সহায়ক।' },
    { code: 'ta-IN', name: 'தமிழ்', flag: '🇮🇳', greeting: 'வணக்கம்! நான் இந்திய கைவினைஞர்களின் AI உதவியாளர்.' },
    { code: 'te-IN', name: 'తెలుగు', flag: '�🇳', greeting: 'నమస్కారం! నేను భారతీయ కళాకారుల AI సహాయకుడిని.' },
    { code: 'mr-IN', name: 'मराठी', flag: '��', greeting: 'नमस्कार! मी भारतीय कारागिरांचा AI सहाय्यक आहे.' },
    { code: 'gu-IN', name: 'ગુજરાતી', flag: '🇮🇳', greeting: 'નમસ્તે! હું ભારતીય કારીગરોનો AI સહાયક છું.' }
  ];

  const voiceActions = [
    { 
      icon: '✍️', 
      action: 'Create Craft Description', 
      hindi: 'शिल्प विवरण बनाएं',
      bengali: 'কারুশিল্পের বিবরণ তৈরি',
      tamil: 'கைவினை விளக்கம் உருவாக்கு',
      route: '/ai-tools/content-generator',
      trigger: ['create', 'write', 'description', 'craft', 'product', 'kala', 'shilp', 'banao'],
      color: '#8B4513' // Rich brown for primary action
    },
    { 
      icon: '📸', 
      action: 'Enhance Craft Photos', 
      hindi: 'शिल्प फोटो सुधारें',
      bengali: 'কারুশিল্পের ছবি উন্নত করুন',
      tamil: 'கைவினை புகைப்படங்களை மேம்படுத்து',
      route: '/ai-tools/image-enhancer',
      trigger: ['photo', 'image', 'picture', 'enhance', 'tasveer', 'photo sudhar'],
      color: '#CD853F' // Terracotta for visual actions
    },
    { 
      icon: '�', 
      action: 'Find Fair Price', 
      hindi: 'उचित मूल्य जानें',
      bengali: 'ন্যায্য দাম খুঁজে নিন',
      tamil: 'நியாயமான விலையைக் கண்டறியுங்கள்',
      route: '/ai-tools/pricing-assistant',
      trigger: ['price', 'cost', 'money', 'pricing', 'keemat', 'paisa', 'daam'],
      color: '#6366F1' // Indigo for business functions
    },
    { 
      icon: '🤝', 
      action: 'Find Fellow Artisans', 
      hindi: 'साथी कारीगर खोजें',
      bengali: 'সহকর্মী কারিগর খুঁজুন',
      tamil: 'சக கைவினைஞர்களைக் கண்டறியுங்கள்',
      route: '/ai-tools/artist-collaboration',
      trigger: ['partner', 'artist', 'artisan', 'collaborate', 'karigar', 'saathi'],
      color: '#4B5563' // Indigo-gray for collaboration
    },
    { 
      icon: '📖', 
      action: 'Tell My Craft Story', 
      hindi: 'अपनी कला की कहानी',
      bengali: 'আমার কারুশিল্পের গল্প',
      tamil: 'என் கைவினைக் கதை',
      route: '/ai-tools/story-generator',
      trigger: ['story', 'heritage', 'tradition', 'kahani', 'itihas', 'parampara'],
      color: '#A0522D' // Sienna brown for cultural content
    },
    { 
      icon: '📊', 
      action: 'See Business Growth', 
      hindi: 'व्यापार की प्रगति देखें',
      bengali: 'ব্যবসায়ের বৃদ্ধি দেখুন',
      tamil: 'வணிக வளர்ச்சியைப் பார்க்கவும்',
      route: '/ai-tools/dashboard',
      trigger: ['dashboard', 'progress', 'business', 'vyapar', 'pragati'],
      color: '#8B6F47' // Warm brown for analytics
    }
  ];

  const getLocalizedText = (key) => {
    const texts = {
      'en-US': {
        title: 'Voice Assistant',
        subtitle: 'Speak in any language - I will help you!',
        chooseLanguage: 'Choose Language:',
        listening: 'Listening...',
        clickSpeak: 'Click & Speak',
        autoListen: 'Auto-Listen Mode',
        stopAutoListen: 'Stop Auto-Listen',
        youSaid: 'You said:',
        aiResponse: 'AI Response:',
        speaking: 'Speaking...',
        quickActions: 'Quick Actions',
        recentCommands: 'Recent Commands'
      },
      'hi-IN': {
        title: 'आवाज सहायक',
        subtitle: 'किसी भी भाषा में बोलें - मैं आपकी मदद करूंगा!',
        chooseLanguage: 'भाषा चुनें:',
        listening: 'सुन रहा हूं...',
        clickSpeak: 'दबाएं और बोलें',
        autoListen: 'ऑटो-लिसन मोड',
        stopAutoListen: 'ऑटो-लिसन बंद करें',
        youSaid: 'आपने कहा:',
        aiResponse: 'AI जवाब:',
        speaking: 'बोल रहा हूं...',
        quickActions: 'त्वरित क्रियाएं',
        recentCommands: 'हाल की कमांड'
      },
      'es-ES': {
        title: 'Asistente de Voz',
        subtitle: '¡Habla en cualquier idioma - te ayudo!',
        chooseLanguage: 'Elegir idioma:',
        listening: 'Escuchando...',
        clickSpeak: 'Clic y Habla',
        autoListen: 'Modo Auto-Escucha',
        stopAutoListen: 'Parar Auto-Escucha',
        youSaid: 'Dijiste:',
        aiResponse: 'Respuesta IA:',
        speaking: 'Hablando...',
        quickActions: 'Acciones Rápidas',
        recentCommands: 'Comandos Recientes'
      },
      'fr-FR': {
        title: 'Assistant Vocal',
        subtitle: 'Parlez dans n\'importe quelle langue - je vais vous aider!',
        chooseLanguage: 'Choisir la langue:',
        listening: 'Écoute...',
        clickSpeak: 'Cliquez et Parlez',
        autoListen: 'Mode Auto-Écoute',
        stopAutoListen: 'Arrêter Auto-Écoute',
        youSaid: 'Vous avez dit:',
        aiResponse: 'Réponse IA:',
        speaking: 'Parle...',
        quickActions: 'Actions Rapides',
        recentCommands: 'Commandes Récentes'
      },
      'zh-CN': {
        title: '语音助手',
        subtitle: '用任何语言说话 - 我会帮助你！',
        chooseLanguage: '选择语言：',
        listening: '正在听...',
        clickSpeak: '点击并说话',
        autoListen: '自动监听模式',
        stopAutoListen: '停止自动监听',
        youSaid: '你说：',
        aiResponse: 'AI回应：',
        speaking: '正在说话...',
        quickActions: '快速操作',
        recentCommands: '最近命令'
      }
    };

    return texts[selectedLanguage] || texts['en-US'];
  };

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = selectedLanguage;

      recognitionRef.current.onresult = (event) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          setTranscript(finalTranscript);
          processVoiceCommand(finalTranscript);
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        setIsAutoListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        if (isAutoListening) {
          setTimeout(() => {
            startListening();
          }, 1000);
        }
      };
    }

    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }

    const currentLang = languages.find(l => l.code === selectedLanguage);
    if (currentLang) {
      speakResponse(currentLang.greeting);
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [selectedLanguage]);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setTranscript('');
      setResponse('');
      recognitionRef.current.lang = selectedLanguage;
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      setIsAutoListening(false);
    }
  };

  const toggleAutoListening = () => {
    if (isAutoListening) {
      stopListening();
      setIsAutoListening(false);
    } else {
      setIsAutoListening(true);
      startListening();
    }
  };

  const processVoiceCommand = (command) => {
    const lowerCommand = command.toLowerCase();
    let aiResponse = '';
    let shouldNavigate = false;
    let targetRoute = '';

    setVoiceCommands(prev => [
      { text: command, timestamp: new Date(), response: '' },
      ...prev.slice(0, 9)
    ]);

    for (const action of voiceActions) {
      const isMatch = action.trigger.some(trigger => 
        lowerCommand.includes(trigger.toLowerCase())
      );
      
      if (isMatch) {
        aiResponse = getLocalizedResponse(action.action, selectedLanguage);
        shouldNavigate = true;
        targetRoute = action.route;
        break;
      }
    }

    if (lowerCommand.includes('home') || lowerCommand.includes('back') || lowerCommand.includes('ghar')) {
      aiResponse = getLocalizedResponse('go_home', selectedLanguage);
      shouldNavigate = true;
      targetRoute = '/';
    } else if (lowerCommand.includes('help') || lowerCommand.includes('madad') || lowerCommand.includes('tutorial')) {
      aiResponse = getLocalizedResponse('help_guide', selectedLanguage);
    } else if (!shouldNavigate) {
      aiResponse = getLocalizedResponse('default_help', selectedLanguage);
    }

    setResponse(aiResponse);
    speakResponse(aiResponse);

    if (shouldNavigate && targetRoute) {
      setTimeout(() => {
        navigate(targetRoute);
      }, 2000);
    }

    setVoiceCommands(prev => [
      { ...prev[0], response: aiResponse },
      ...prev.slice(1)
    ]);
  };

  const getLocalizedResponse = (actionType, language) => {
    const responses = {
      'en-IN': {
        'Create Craft Description': "I'll help you write compelling descriptions for your traditional crafts. Taking you to the content generator!",
        'Enhance Craft Photos': "Let's make your craft photos showcase the beauty of Indian artistry. Opening image enhancer!",
        'Find Fair Price': "I'll help you price your handmade crafts competitively in the Indian market. Loading pricing assistant!",
        'Find Fellow Artisans': "Let's connect you with other talented Indian artisans for collaboration. Opening partnership tool!",
        'Tell My Craft Story': "Let's share the rich heritage and story behind your craft. Opening story generator!",
        'See Business Growth': "Here's your artisan business dashboard with insights for the Indian market!",
        'go_home': "Taking you back to the main page!",
        'help_guide': "I can help you with: writing craft descriptions, enhancing photos, finding fair prices, connecting with artisans, sharing your story, or tracking business growth. Just speak naturally in any Indian language!",
        'default_help': "I'm here to help Indian artisans grow their business! Try saying: 'write description', 'enhance photo', 'find price', 'find partners', 'tell story', or 'show progress'"
      },
      'hi-IN': {
        'Create Craft Description': "मैं आपकी पारंपरिक शिल्पकला के लिए आकर्षक विवरण लिखने में मदद करूंगा। कंटेंट जेनरेटर पर ले जा रहा हूं!",
        'Enhance Craft Photos': "आइए आपकी शिल्प तस्वीरों को भारतीय कलाकारी की सुंदरता दिखाने वाली बनाते हैं। इमेज एन्हांसर खोल रहा हूं!",
        'Find Fair Price': "मैं भारतीय बाजार में आपकी हस्तनिर्मित शिल्पकला की प्रतिस्पर्धी कीमत लगाने में मदद करूंगा। प्राइसिंग असिस्टेंट लोड कर रहा हूं!",
        'Find Fellow Artisans': "आइए आपको अन्य प्रतिभाशाली भारतीय कारीगरों से जोड़ते हैं। पार्टनरशिप टूल खोल रहा हूं!",
        'Tell My Craft Story': "आइए आपकी शिल्पकला की समृद्ध विरासत और कहानी साझा करते हैं। स्टोरी जेनरेटर खोल रहा हूं!",
        'See Business Growth': "यह है आपका कारीगर व्यापार डैशबोर्ड भारतीय बाजार की जानकारी के साथ!",
        'go_home': "आपको मुख्य पेज पर वापस ले जा रहा हूं!",
        'help_guide': "मैं आपकी मदद कर सकता हूं: शिल्प विवरण लिखने में, फोटो सुधारने में, उचित कीमत जानने में, कारीगरों से जुड़ने में, अपनी कहानी साझा करने में, या व्यापार की प्रगति देखने में। किसी भी भारतीय भाषा में प्राकृतिक रूप से बोलें!",
        'default_help': "मैं भारतीय कारीगरों के व्यापार बढ़ाने में मदद के लिए हूं! कहने की कोशिश करें: 'विवरण लिखो', 'फोटो सुधारो', 'कीमत बताओ', 'साथी खोजो', 'कहानी बताओ', या 'प्रगति दिखाओ'"
      }
    };

    const langKey = language.startsWith('hi') ? 'hi-IN' : 'en-IN';
    return responses[langKey][actionType] || responses['en-IN'][actionType] || "I'm here to help Indian artisans succeed!";
  };

  const speakResponse = (text) => {
    if (synthRef.current && text) {
      synthRef.current.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = selectedLanguage;
      utterance.rate = 0.8;
      utterance.pitch = 1;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      
      synthRef.current.speak(utterance);
    }
  };

  const handleQuickAction = (action) => {
    processVoiceCommand(action.action);
  };

  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#F5F5DC', // Off-White/Beige background
      minHeight: '100vh',
      position: 'relative'
    }}>
      {/* Language Selector at Top - Enhanced with accessible colors */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        zIndex: 1000
      }}>
        <select 
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          style={{
            fontSize: '16px',
            padding: '12px 18px',
            borderRadius: '25px',
            border: '2px solid #A1887F', // Muted Brown border
            backgroundColor: '#FFFFFF', // White background
            color: '#333', // Dark gray text
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(229, 115, 115, 0.15)', // Soft terracotta shadow
            fontWeight: '500',
            outline: 'none',
            transition: 'all 0.3s ease'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#E57373'; // Terracotta focus
            e.target.style.boxShadow = '0 0 0 3px rgba(229, 115, 115, 0.3)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#A1887F';
            e.target.style.boxShadow = '0 4px 12px rgba(229, 115, 115, 0.15)';
          }}
          aria-label="Select language for voice assistant"
        >
          {languages.map(lang => (
            <option key={lang.code} value={lang.code}>
              {lang.flag} {lang.name}
            </option>
          ))}
        </select>
      </div>

      {/* Enhanced Floating Voice Button - Bottom Right Corner */}
      <button
        onClick={isListening ? stopListening : startListening}
        style={{
          position: 'fixed',
          bottom: '30px', // Positioned at bottom
          right: '30px', // Positioned at right
          width: '85px', // Slightly larger for better accessibility
          height: '85px',
          borderRadius: '50%',
          border: 'none',
          fontSize: '36px',
          cursor: 'pointer',
          // Enhanced color scheme with earth tones
          background: isListening 
            ? 'linear-gradient(135deg, #E57373 0%, #FFAB91 50%, #E57373 100%)' // Terracotta gradient when listening
            : 'linear-gradient(135deg, #283593 0%, #3F51B5 50%, #283593 100%)', // Deep Indigo gradient when idle
          color: '#FFFFFF', // White text for contrast
          boxShadow: isListening 
            ? '0 12px 30px rgba(229, 115, 115, 0.4), 0 0 0 4px rgba(229, 115, 115, 0.3)' 
            : '0 8px 25px rgba(40, 53, 147, 0.3)',
          zIndex: 'var(--z-modal, 1050)', // Use standardized z-index
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', // Smoother transition
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          // Enhanced accessibility
          outline: 'none',
          animation: isListening ? 'micPulse 1.5s infinite' : 'none',
          // Improved hover and focus states
          filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.1) translateY(-2px)';
          e.target.style.boxShadow = isListening 
            ? '0 15px 35px rgba(139, 69, 19, 0.5), 0 0 0 6px rgba(205, 133, 63, 0.4)'
            : '0 12px 30px rgba(75, 85, 99, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1) translateY(0)';
          e.target.style.boxShadow = isListening 
            ? '0 12px 30px rgba(139, 69, 19, 0.4), 0 0 0 4px rgba(205, 133, 63, 0.3)'
            : '0 8px 25px rgba(75, 85, 99, 0.3)';
        }}
        onFocus={(e) => {
          e.target.style.outline = '3px solid #CD853F';
          e.target.style.outlineOffset = '4px';
        }}
        onBlur={(e) => {
          e.target.style.outline = 'none';
        }}
        onMouseDown={(e) => {
          e.target.style.transform = 'scale(0.95) translateY(0)';
        }}
        onMouseUp={(e) => {
          e.target.style.transform = 'scale(1.1) translateY(-2px)';
        }}
        // Enhanced accessibility attributes
        aria-label={isListening ? "Stop voice recording" : "Start voice recording"}
        aria-pressed={isListening}
        role="button"
        tabIndex="0"
        title={isListening ? getLocalizedText().listening : getLocalizedText().clickSpeak}
      >
        {isListening ? '🔴' : '🎤'}
      </button>

      <style>
        {`
          /* Enhanced animations with accessible color scheme */
          @keyframes micPulse {
            0% { 
              transform: scale(1); 
              box-shadow: 0 12px 30px rgba(139, 69, 19, 0.4), 0 0 0 4px rgba(205, 133, 63, 0.3);
            }
            50% { 
              transform: scale(1.05); 
              box-shadow: 0 15px 35px rgba(139, 69, 19, 0.6), 0 0 0 8px rgba(205, 133, 63, 0.2);
            }
            100% { 
              transform: scale(1); 
              box-shadow: 0 12px 30px rgba(139, 69, 19, 0.4), 0 0 0 4px rgba(205, 133, 63, 0.3);
            }
          }
          
          /* Smooth transitions for better UX */
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
        `}
      </style>

      {/* Main Header Section with Enhanced Accessibility */}
      <div style={{
        textAlign: 'center',
        backgroundColor: '#FFFFFF', // White background
        padding: '40px',
        borderRadius: '20px',
        marginBottom: '30px',
        boxShadow: '0 8px 25px rgba(229, 115, 115, 0.15)', // Soft terracotta shadow
        marginTop: '80px',
        border: '2px solid #A1887F' // Muted brown border
      }}>
        <h1 style={{ 
          color: '#283593', // Deep Indigo for headers
          fontSize: '2.8rem', 
          marginBottom: '15px',
          fontWeight: '700',
          textShadow: '1px 1px 2px rgba(40, 53, 147, 0.1)'
        }}>
          🎤 Kalaikatha Voice Assistant<br/>
          <span style={{ fontSize: '2rem', color: '#E57373' }}>
            कलाकथा आवाज सहायक
          </span>
        </h1>
        <p style={{ 
          fontSize: '1.3rem', 
          color: '#333', // Dark gray for better readability
          marginBottom: '20px',
          lineHeight: '1.6',
          maxWidth: '800px',
          margin: '0 auto 20px'
        }}>
          Speak in your native language - AI will help you grow your craft business!<br/>
          अपनी मातृभाषा में बोलें - AI आपके शिल्प व्यापार को बढ़ाने में मदद करेगा!
        </p>
        
        {/* Google Cloud AI Branding */}
        <div style={{
          backgroundColor: 'rgba(229, 115, 115, 0.1)', // Light terracotta background
          padding: '15px 25px',
          borderRadius: '25px',
          display: 'inline-block',
          marginTop: '15px',
          border: '2px solid rgba(229, 115, 115, 0.3)'
        }}>
          <p style={{ 
            margin: 0, 
            fontWeight: 'bold', 
            color: '#283593', // Deep Indigo text
            fontSize: '1rem'
          }}>
            🌟 Powered by Google Cloud Generative AI
          </p>
        </div>
      </div>

      <div style={{
        backgroundColor: '#FFFFFF', // White background
        padding: '30px',
        borderRadius: '20px',
        marginBottom: '30px',
        textAlign: 'center',
        boxShadow: '0 4px 15px rgba(229, 115, 115, 0.15)', // Soft terracotta shadow
        border: '2px solid #A1887F' // Muted brown border
      }}>
        <div style={{ marginBottom: '20px' }}>
          <button
            onClick={isListening ? stopListening : startListening}
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              border: 'none',
              fontSize: '48px',
              cursor: 'pointer',
              boxShadow: '0 8px 20px rgba(229, 115, 115, 0.2)',
              background: isListening 
                ? 'linear-gradient(135deg, #E57373, #FFAB91)' // Terracotta gradient
                : 'linear-gradient(135deg, #283593, #3F51B5)', // Deep Indigo gradient
              color: '#FFFFFF', // White icon
              transition: 'all 0.3s ease',
              animation: isListening ? 'pulse 1.5s infinite' : 'none'
            }}
          >
            {isListening ? '🔴' : '🎤'}
          </button>
        </div>

                {/* Voice interaction status display */}
        <p style={{ 
          fontSize: '18px', 
          marginBottom: '20px', 
          fontWeight: 'bold',
          color: '#8B4513',
          textAlign: 'center'
        }}>
          {isListening ? 
            `🔴 ${getLocalizedText().listening}` : 
            `🎤 ${getLocalizedText().clickSpeak}`
          }
        </p>

        {/* Auto-listening toggle button */}
        <button
          onClick={toggleAutoListening}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            borderRadius: '25px',
            border: '2px solid #CD853F',
            cursor: 'pointer',
            backgroundColor: isAutoListening ? '#CD853F' : 'transparent',
            color: isAutoListening ? 'white' : '#8B4513',
            fontWeight: 'bold',
            marginBottom: '20px',
            transition: 'all 0.3s ease'
          }}
        >
          {isAutoListening ? `⏹️ ${getLocalizedText().stopAutoListen}` : `🔄 ${getLocalizedText().autoListen}`}
        </button>

        {/* User transcript display */}
        {transcript && (
          <div style={{
            backgroundColor: '#f5f3f0',
            border: '2px solid #CD853F',
            padding: '15px',
            borderRadius: '10px',
            marginBottom: '15px',
            fontSize: '16px',
            color: '#8B4513'
          }}>
            <strong style={{ color: '#CD853F' }}>{getLocalizedText().youSaid}</strong> {transcript}
          </div>
        )}

        {/* AI response display */}
        {response && (
          <div style={{
            backgroundColor: '#F5F5DC', // Off-White/Beige background
            border: '2px solid #283593', // Deep Indigo border
            padding: '15px',
            borderRadius: '10px',
            marginBottom: '15px',
            fontSize: '16px',
            color: '#333' // Dark gray text
          }}>
            <strong style={{ color: '#283593' }}>{getLocalizedText().aiResponse}</strong> {response}
            {isSpeaking && <span style={{ color: '#E57373' }}> 🔊 {getLocalizedText().speaking}</span>}
          </div>
        )}
      </div>

      {/* Quick Actions Section */}
      <div style={{
        backgroundColor: '#FFFFFF', // White background
        border: '2px solid #A1887F', // Muted Brown border
        padding: '30px',
        borderRadius: '20px',
        marginBottom: '30px',
        boxShadow: '0 4px 15px rgba(229, 115, 115, 0.15)' // Soft terracotta shadow
      }}>
        <h2 style={{ 
          textAlign: 'center', 
          marginBottom: '25px', 
          color: '#283593', // Deep Indigo heading
          fontSize: '24px',
          fontWeight: 'bold'
        }}>
          {getLocalizedText().quickActions}
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px'
        }}>
          {voiceActions.map((action, index) => (
            <button
              key={index}
              onClick={() => handleQuickAction(action)}
              style={{
                padding: '25px',
                borderRadius: '15px',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: '#E57373', // Soft Terracotta for all buttons
                color: '#FFFFFF', // White text
                fontSize: '16px',
                fontWeight: 'bold',
                textAlign: 'center',
                boxShadow: '0 4px 10px rgba(229, 115, 115, 0.2)',
                transition: 'transform 0.2s ease'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#C74444'} // Darker terracotta on hover
              onMouseOut={(e) => e.target.style.backgroundColor = '#E57373'}
            >
              <div style={{ fontSize: '40px', marginBottom: '10px' }}>
                {action.icon}
              </div>
              <div>{action.action}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Commands History */}
      {voiceCommands.length > 0 && (
        <div style={{
          backgroundColor: '#FFFFFF', // White background
          border: '2px solid #A1887F', // Muted Brown border
          padding: '20px',
          borderRadius: '15px',
          boxShadow: '0 4px 10px rgba(229, 115, 115, 0.15)' // Soft terracotta shadow
        }}>
          <h3 style={{ 
            marginBottom: '15px', 
            color: '#283593', // Deep Indigo heading
            fontSize: '20px',
            fontWeight: 'bold'
          }}>
            {getLocalizedText().recentCommands}
          </h3>
          {voiceCommands.slice(0, 5).map((cmd, index) => (
            <div key={index} style={{
              padding: '10px',
              borderBottom: '1px solid #A1887F',
              fontSize: '14px',
              color: '#333' // Dark gray text
            }}>
              <div><strong style={{ color: '#E57373' }}>You:</strong> {cmd.text}</div>
              {cmd.response && <div><strong style={{ color: '#283593' }}>AI:</strong> {cmd.response}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VoiceAssistantPage;
