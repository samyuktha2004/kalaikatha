/**
 * AddProductFlow - Core AI-Powered Product Creation Assistant
 * MVP Features: Image Upload → Voice Description → AI Content Generation → Preview → Save
 * Focus: Help artisans create marketplace-ready product content using AI
 */

import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserFlow } from '../../contexts/UserFlowContext';
import { api } from '../../services/api';
import StickyNavbar from '../../components/StickyNavbar';
import './AddProductFlow.css';

const AddProductFlow = () => {
  const navigate = useNavigate();
  const { flowState, updateProductData, completeProductCreation } = useUserFlow();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef();
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  // Step 1: Image Upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const imageUrls = files.map(file => URL.createObjectURL(file));
      updateProductData({ 
        images: imageUrls,
        imageFiles: files 
      });
      setCurrentStep(2);
    }
  };

  // Step 2: Voice Recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const audioChunks = [];

      recorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        updateProductData({ voiceDescription: audioBlob });
        processVoiceInput(audioBlob);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (error) {
      setError('Microphone access denied. Please allow microphone access.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  // Step 3: Process Voice + Generate Content
  const processVoiceInput = async (audioBlob) => {
    setLoading(true);
    setCurrentStep(3);

    try {
      // Convert voice to text
      const voiceResult = await api.voiceToText(audioBlob);
      const transcription = voiceResult.text;
      
      updateProductData({ transcription });

      // Generate AI content from transcription + images
      const contentResult = await api.generateContent({
        productName: extractProductName(transcription),
        category: extractCategory(transcription),
        materials: extractMaterials(transcription),
        voiceDescription: transcription,
        artStyle: 'Traditional', // Default, could be extracted from voice
        keywords: extractKeywords(transcription)
      });

      if (contentResult.success) {
        updateProductData({ 
          generatedContent: contentResult.content,
          story: contentResult.story,
          seoKeywords: contentResult.seoKeywords || []
        });
        setCurrentStep(4); // Move to preview
      } else {
        throw new Error('Content generation failed');
      }
    } catch (error) {
      console.error('AI processing failed:', error);
      // Fallback to manual input
      setError('AI processing failed. Please try again or continue manually.');
      setCurrentStep(4);
    } finally {
      setLoading(false);
    }
  };

  // Helper functions to extract info from voice transcription
  const extractProductName = (text) => {
    // Simple extraction - in real app, use NLP
    const words = text.split(' ');
    return words.slice(0, 3).join(' '); // First 3 words as product name
  };

  const extractCategory = (text) => {
    const categoryKeywords = {
      'pottery': ['pot', 'vase', 'ceramic', 'clay'],
      'textile': ['fabric', 'cloth', 'weave', 'embroidery'],
      'jewelry': ['ring', 'necklace', 'bracelet', 'ornament'],
      'wood': ['wooden', 'carved', 'wood', 'timber']
    };

    for (const [category, keywords] of Object.entries(categoryKeywords)) {
      if (keywords.some(keyword => text.toLowerCase().includes(keyword))) {
        return category;
      }
    }
    return 'craft';
  };

  const extractMaterials = (text) => {
    const materials = ['clay', 'wood', 'cotton', 'silk', 'metal', 'stone', 'bamboo'];
    return materials.find(material => text.toLowerCase().includes(material)) || 'natural materials';
  };

  const extractKeywords = (text) => {
    const words = text.toLowerCase().split(' ');
    return words.filter(word => word.length > 4).slice(0, 5).join(', ');
  };

  // Step 4: Save Product
  const handleSaveProduct = async () => {
    setLoading(true);
    try {
      // In real app, save to Firestore
      console.log('Saving product:', flowState.productData);
      
      completeProductCreation();
      
      // Navigate to success page or product detail
      navigate('/product-created-success');
    } catch (error) {
      setError('Failed to save product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="step-content">
            <h2>📸 Upload Your Craft Images</h2>
            <p>Show us your beautiful creation! Upload 1-5 high-quality images.</p>
            
            <div className="image-upload-area" onClick={() => fileInputRef.current?.click()}>
              <div className="upload-icon">📁</div>
              <p>Click to upload images</p>
              <small>Supports JPG, PNG (max 5MB each)</small>
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
            
            {flowState.productData.images?.length > 0 && (
              <div className="uploaded-images">
                {flowState.productData.images.map((url, index) => (
                  <img key={index} src={url} alt={`Upload ${index + 1}`} />
                ))}
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="step-content">
            <h2>🎤 Describe Your Craft</h2>
            <p>Tell us about your creation! Our AI will listen and understand.</p>
            
            <div className="voice-recorder">
              <button 
                className={`record-btn ${isRecording ? 'recording' : ''}`}
                onClick={isRecording ? stopRecording : startRecording}
              >
                {isRecording ? '🛑 Stop Recording' : '🎤 Start Recording'}
              </button>
              
              {isRecording && (
                <div className="recording-indicator">
                  <div className="pulse"></div>
                  Recording... Tell us about your craft!
                </div>
              )}
            </div>

            <div className="voice-tips">
              <h4>💡 Tips for better results:</h4>
              <ul>
                <li>Mention the materials you used</li>
                <li>Describe the techniques or style</li>
                <li>Share the inspiration behind your creation</li>
                <li>Mention any special features or cultural significance</li>
              </ul>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="step-content">
            <h2>🤖 AI is Creating Your Content...</h2>
            <div className="loading-animation">
              <div className="ai-brain">🧠</div>
              <p>Our AI is analyzing your images and voice description to create compelling marketplace content...</p>
            </div>
            
            <div className="ai-process-steps">
              <div className="process-step completed">✓ Processing your images</div>
              <div className="process-step completed">✓ Understanding your voice description</div>
              <div className="process-step active">🔄 Generating product description</div>
              <div className="process-step">⏳ Creating SEO keywords</div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="step-content">
            <h2>✨ Your AI-Generated Product Content</h2>
            
            <div className="content-preview">
              {flowState.productData.generatedContent ? (
                <div className="generated-content">
                  <h3>Product Description:</h3>
                  <div className="content-box">
                    {flowState.productData.generatedContent}
                  </div>
                  
                  {flowState.productData.story && (
                    <>
                      <h3>Artisan Story:</h3>
                      <div className="content-box">
                        {flowState.productData.story}
                      </div>
                    </>
                  )}
                  
                  {flowState.productData.seoKeywords?.length > 0 && (
                    <>
                      <h3>SEO Keywords:</h3>
                      <div className="keywords-box">
                        {flowState.productData.seoKeywords.map((keyword, index) => (
                          <span key={index} className="keyword-tag">{keyword}</span>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="fallback-message">
                  <p>AI content generation is temporarily unavailable. You can still save your product and add content manually.</p>
                </div>
              )}
            </div>

            <div className="action-buttons">
              <button className="btn-secondary" onClick={() => setCurrentStep(2)}>
                🔄 Re-record Description
              </button>
              <button className="btn-primary" onClick={handleSaveProduct} disabled={loading}>
                {loading ? '💾 Saving...' : '✅ Save & Publish'}
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="add-product-flow">
      <StickyNavbar 
        onNavigate={navigate}
        navItems={[
          { label: 'Dashboard', route: '/dashboard', icon: '📊' },
          { label: 'Products', route: '/products', icon: '🛍️' },
          { label: 'Profile', route: '/profile', icon: '👤' }
        ]}
      />
      <div className="flow-header">
        <h1>🎨 AI-Powered Product Assistant</h1>
        <div className="progress-bar">
          {[1, 2, 3, 4].map(step => (
            <div 
              key={step}
              className={`progress-step ${currentStep >= step ? 'completed' : ''} ${currentStep === step ? 'active' : ''}`}
            >
              {step}
            </div>
          ))}
        </div>
      </div>

      <div className="flow-content">
        {renderCurrentStep()}
      </div>

      {error && (
        <div className="error-message">
          ⚠️ {error}
        </div>
      )}
    </div>
  );
};

export default AddProductFlow;