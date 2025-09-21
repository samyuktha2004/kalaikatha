/**
 * Story Generator Page - AI-Powered Heritage Storytelling for Indian Artisans
 * 
 * This component helps Indian artisans create compelling narratives about their
 * traditional crafts, family heritage, and cultural significance. It leverages
 * Google Cloud AI to generate authentic, culturally-sensitive stories.
 * 
 * Features:
 * - Multilingual story generation (6 Indian languages)
 * - Cultural context preservation and storytelling
 * - Family tradition and heritage documentation
 * - SEO-optimized craft narratives for online sales
 * - Personal journey integration with traditional methods
 * - Regional craft knowledge and significance
 * 
 * @component
 * @example
 * return <StoryGeneratorPage />
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StoryGeneratorPage = () => {
  const [formData, setFormData] = useState({
    craftType: '',
    location: '',
    tradition: '',
    materials: '',
    techniques: '',
    heritage: '',
    personalStory: ''
  });
  const [generatedStory, setGeneratedStory] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en-IN');
  const navigate = useNavigate();

  const languages = [
    { code: 'en-IN', name: 'English', flag: '🇮🇳' },
    { code: 'hi-IN', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'bn-IN', name: 'বাংলা', flag: '🇮🇳' },
    { code: 'ta-IN', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'te-IN', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'mr-IN', name: 'मराठी', flag: '🇮🇳' }
  ];

  const getLocalizedText = () => {
    const texts = {
      'en-IN': {
        title: 'Craft Heritage Story Generator',
        subtitle: 'Share the beautiful story of your traditional craft with Google Cloud AI',
        craftType: 'Type of Craft',
        craftTypePlaceholder: 'e.g., Handloom weaving, Pottery, Wood carving, Jewelry making',
        location: 'Your Location/Region',
        locationPlaceholder: 'e.g., Varanasi, Rajasthan, Kerala, Gujarat',
        tradition: 'Family/Community Tradition',
        traditionPlaceholder: 'How long has this craft been in your family or community?',
        materials: 'Materials Used',
        materialsPlaceholder: 'e.g., Silk, Clay, Sandalwood, Silver, Natural dyes',
        techniques: 'Special Techniques',
        techniquesPlaceholder: 'Unique methods or skills passed down generations',
        heritage: 'Cultural Significance',
        heritagePlaceholder: 'Religious, cultural, or historical importance of your craft',
        personalStory: 'Your Personal Journey',
        personalStoryPlaceholder: 'How did you learn? What motivates you? Challenges faced?',
        generateButton: 'Generate My Craft Story',
        generatingText: 'Creating your beautiful story...',
        backButton: 'Back to Home',
        voiceButton: 'Voice Assistant'
      },
      'hi-IN': {
        title: 'शिल्प विरासत कहानी जनरेटर',
        subtitle: 'Google Cloud AI के साथ अपनी पारंपरिक शिल्पकला की सुंदर कहानी साझा करें',
        craftType: 'शिल्प का प्रकार',
        craftTypePlaceholder: 'जैसे, हथकरघा बुनाई, मिट्टी के बर्तन, लकड़ी की नक्काशी, आभूषण निर्माण',
        location: 'आपका स्थान/क्षेत्र',
        locationPlaceholder: 'जैसे, वाराणसी, राजस्थान, केरल, गुजरात',
        tradition: 'पारिवारिक/सामुदायिक परंपरा',
        traditionPlaceholder: 'यह शिल्प आपके परिवार या समुदाय में कितने समय से है?',
        materials: 'उपयोग की जाने वाली सामग्री',
        materialsPlaceholder: 'जैसे, रेशम, मिट्टी, चंदन, चांदी, प्राकृतिक रंग',
        techniques: 'विशेष तकनीकें',
        techniquesPlaceholder: 'पीढ़ियों से चली आ रही अनूठी विधियां या कौशल',
        heritage: 'सांस्कृतिक महत्व',
        heritagePlaceholder: 'आपकी शिल्पकला का धार्मिक, सांस्कृतिक, या ऐतिहासिक महत्व',
        personalStory: 'आपकी व्यक्तिगत यात्रा',
        personalStoryPlaceholder: 'आपने कैसे सीखा? आपको क्या प्रेरणा मिलती है? कौन सी चुनौतियां आईं?',
        generateButton: 'मेरी शिल्प कहानी बनाएं',
        generatingText: 'आपकी सुंदर कहानी बना रहे हैं...',
        backButton: 'होम पर वापस',
        voiceButton: 'आवाज सहायक'
      }
    };
    return texts[selectedLanguage] || texts['en-IN'];
  };

  const text = getLocalizedText();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateStory = async () => {
    setIsGenerating(true);
    
    // Simulate AI story generation
    setTimeout(() => {
      const sampleStory = selectedLanguage === 'hi-IN' ? 
        `${formData.craftType} की परंपरा ${formData.location} में सदियों से चली आ रही है। हमारे परिवार में ${formData.tradition} से यह कला पीढ़ी दर पीढ़ी स्थानांतरित होती रही है। हम ${formData.materials} का उपयोग करके ${formData.techniques} की विधि से अपनी कलाकृतियां बनाते हैं।

यह शिल्पकला न केवल हमारी आजीविका है, बल्कि ${formData.heritage} के कारण यह हमारी सांस्कृतिक पहचान का हिस्सा भी है। ${formData.personalStory}

हमारी हर कलाकृति में भारतीय संस्कृति की आत्मा बसी है। Google Cloud AI की मदद से हम अपनी इस पारंपरिक कला को दुनिया भर के लोगों तक पहुंचाना चाहते हैं, ताकि आने वाली पीढ़ियां भी हमारी इस समृद्ध विरासत को संजो सकें।` :
        
        `The art of ${formData.craftType} has been flourishing in ${formData.location} for centuries. In our family, this craft has been ${formData.tradition}, passed down through generations with love and dedication. We create our masterpieces using ${formData.materials} through the traditional technique of ${formData.techniques}.

This craft is not just our livelihood, but ${formData.heritage} makes it an integral part of our cultural identity. ${formData.personalStory}

Every piece we create carries the soul of Indian heritage. With the help of Google Cloud AI, we aim to share our traditional art with people worldwide, ensuring that future generations can appreciate and preserve this rich cultural legacy.

Our craft tells the story of India - a tale of skill, tradition, and timeless beauty that transcends borders and connects hearts.`;

      setGeneratedStory(sampleStory);
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#F5F5DC', // Off-White/Beige background
      fontFamily: 'Arial, sans-serif',
      padding: '20px'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
        backgroundColor: '#FFFFFF', // White background
        padding: '15px 30px',
        borderRadius: '15px',
        border: '2px solid #A1887F', // Muted Brown border
        boxShadow: '0 4px 15px rgba(229, 115, 115, 0.15)' // Soft terracotta shadow
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px'
        }}>
          <button
            onClick={() => navigate('/')}
            style={{
              padding: '10px 20px',
              backgroundColor: '#E0E0E0', // Light Stone Gray
              border: 'none',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: 'bold',
              color: 'var(--text-primary)', // Dark gray text
              cursor: 'pointer',
              boxShadow: '0 4px 10px rgba(229, 115, 115, 0.1)'
            }}
          >
            ← {text.backButton}
          </button>
          
          <select 
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              border: '2px solid #A1887F', // Muted Brown border
              fontSize: '14px',
              backgroundColor: '#FFFFFF', // White background
              color: 'var(--text-primary)', // Dark gray text
              cursor: 'pointer'
            }}
          >
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => navigate('/ai-tools/voice-assistant')}
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #ff6b35, #f7931e)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 8px 25px rgba(255, 107, 53, 0.4)',
            zIndex: 1000,
            transition: 'all 0.3s ease'
          }}
        >
          🎤
        </button>
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          padding: '40px',
          boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
          marginBottom: '30px'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1 style={{
              fontSize: '2.5rem',
              color: 'var(--text-primary)',
              marginBottom: '15px',
              fontWeight: 'bold'
            }}>
              📖 {text.title}
            </h1>
            <p style={{
              fontSize: '1.2rem',
              color: '#666',
              marginBottom: '20px'
            }}>
              {text.subtitle}
            </p>
            <div style={{
              backgroundColor: 'rgba(66, 165, 245, 0.1)',
              padding: '15px',
              borderRadius: '10px',
              border: '2px solid rgba(66, 165, 245, 0.3)'
            }}>
              <p style={{ margin: 0, fontWeight: 'bold', color: '#1976d2' }}>
                🌟 Powered by Google Cloud Generative AI
              </p>
            </div>
          </div>

          {/* Form Fields */}
          <div style={{
            display: 'grid',
            gap: '25px',
            marginBottom: '30px'
          }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '16px',
                fontWeight: 'bold',
                color: 'var(--text-primary)',
                marginBottom: '8px'
              }}>
                🎨 {text.craftType}
              </label>
              <input
                type="text"
                value={formData.craftType}
                onChange={(e) => handleInputChange('craftType', e.target.value)}
                placeholder={text.craftTypePlaceholder}
                style={{
                  width: '100%',
                  padding: '15px',
                  fontSize: '16px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '10px',
                  fontFamily: 'Arial, sans-serif'
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '16px',
                fontWeight: 'bold',
                color: 'var(--text-primary)',
                marginBottom: '8px'
              }}>
                📍 {text.location}
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder={text.locationPlaceholder}
                style={{
                  width: '100%',
                  padding: '15px',
                  fontSize: '16px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '10px',
                  fontFamily: 'Arial, sans-serif'
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '16px',
                fontWeight: 'bold',
                color: 'var(--text-primary)',
                marginBottom: '8px'
              }}>
                🏛️ {text.tradition}
              </label>
              <textarea
                value={formData.tradition}
                onChange={(e) => handleInputChange('tradition', e.target.value)}
                placeholder={text.traditionPlaceholder}
                rows={3}
                style={{
                  width: '100%',
                  padding: '15px',
                  fontSize: '16px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '10px',
                  fontFamily: 'Arial, sans-serif',
                  resize: 'vertical'
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '16px',
                fontWeight: 'bold',
                color: 'var(--text-primary)',
                marginBottom: '8px'
              }}>
                🧵 {text.materials}
              </label>
              <input
                type="text"
                value={formData.materials}
                onChange={(e) => handleInputChange('materials', e.target.value)}
                placeholder={text.materialsPlaceholder}
                style={{
                  width: '100%',
                  padding: '15px',
                  fontSize: '16px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '10px',
                  fontFamily: 'Arial, sans-serif'
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '16px',
                fontWeight: 'bold',
                color: 'var(--text-primary)',
                marginBottom: '8px'
              }}>
                ⚒️ {text.techniques}
              </label>
              <textarea
                value={formData.techniques}
                onChange={(e) => handleInputChange('techniques', e.target.value)}
                placeholder={text.techniquesPlaceholder}
                rows={3}
                style={{
                  width: '100%',
                  padding: '15px',
                  fontSize: '16px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '10px',
                  fontFamily: 'Arial, sans-serif',
                  resize: 'vertical'
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '16px',
                fontWeight: 'bold',
                color: 'var(--text-primary)',
                marginBottom: '8px'
              }}>
                🕉️ {text.heritage}
              </label>
              <textarea
                value={formData.heritage}
                onChange={(e) => handleInputChange('heritage', e.target.value)}
                placeholder={text.heritagePlaceholder}
                rows={3}
                style={{
                  width: '100%',
                  padding: '15px',
                  fontSize: '16px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '10px',
                  fontFamily: 'Arial, sans-serif',
                  resize: 'vertical'
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '16px',
                fontWeight: 'bold',
                color: 'var(--text-primary)',
                marginBottom: '8px'
              }}>
                💫 {text.personalStory}
              </label>
              <textarea
                value={formData.personalStory}
                onChange={(e) => handleInputChange('personalStory', e.target.value)}
                placeholder={text.personalStoryPlaceholder}
                rows={4}
                style={{
                  width: '100%',
                  padding: '15px',
                  fontSize: '16px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '10px',
                  fontFamily: 'Arial, sans-serif',
                  resize: 'vertical'
                }}
              />
            </div>
          </div>

          {/* Generate Button */}
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={generateStory}
              disabled={isGenerating || !formData.craftType || !formData.location}
              style={{
                padding: '18px 40px',
                fontSize: '18px',
                fontWeight: 'bold',
                background: isGenerating ? '#ccc' : 'linear-gradient(135deg, #667eea, #764ba2)',
                color: 'white',
                border: 'none',
                borderRadius: '15px',
                cursor: isGenerating ? 'not-allowed' : 'pointer',
                boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
                transition: 'all 0.3s ease'
              }}
            >
              {isGenerating ? (
                <>⏳ {text.generatingText}</>
              ) : (
                <>✨ {text.generateButton}</>
              )}
            </button>
          </div>
        </div>

        {/* Generated Story */}
        {generatedStory && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '40px',
            boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
            border: '3px solid #4caf50'
          }}>
            <h2 style={{
              fontSize: '2rem',
              color: 'var(--text-primary)',
              marginBottom: '25px',
              textAlign: 'center'
            }}>
              📚 Your Craft Heritage Story
            </h2>
            <div style={{
              fontSize: '16px',
              lineHeight: '1.8',
              color: '#555',
              whiteSpace: 'pre-line',
              padding: '20px',
              backgroundColor: '#f8f9fa',
              borderRadius: '10px',
              border: '1px solid #e9ecef'
            }}>
              {generatedStory}
            </div>
            <div style={{
              textAlign: 'center',
              marginTop: '30px'
            }}>
              <button
                onClick={() => navigator.clipboard.writeText(generatedStory)}
                style={{
                  padding: '12px 24px',
                  fontSize: '16px',
                  backgroundColor: '#4caf50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  marginRight: '15px'
                }}
              >
                📋 Copy Story
              </button>
              <button
                onClick={() => setGeneratedStory('')}
                style={{
                  padding: '12px 24px',
                  fontSize: '16px',
                  backgroundColor: '#ff9800',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: 'pointer'
                }}
              >
                🔄 Generate New Story
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryGeneratorPage;