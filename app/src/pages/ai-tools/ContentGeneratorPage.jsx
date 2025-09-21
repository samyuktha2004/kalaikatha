/**
 * Content Generator Page - AI-Powered Product Description Creator
 * Features: Multi-platform optimization, Indian craft categories, AI content generation
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';

const ContentGeneratorPage = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    productName: '',
    category: '',
    materials: '',
    dimensions: '',
    artStyle: '',
    targetPlatform: 'amazon',
    keywords: '',
    priceRange: '',
  });
  
  const [generatedContent, setGeneratedContent] = useState(null);
  const [loading, setLoading] = useState(false);

  const platforms = [
    { value: 'amazon-india', label: 'Amazon India' },
    { value: 'flipkart', label: 'Flipkart' },
    { value: 'etsy', label: 'Etsy Global' },
    { value: 'facebook', label: 'Facebook Marketplace' },
    { value: 'instagram', label: 'Instagram Shop' },
    { value: 'government-emporium', label: 'Government Emporium' },
    { value: 'craft-council', label: 'Craft Council of India' }
  ];

  const categories = [
    'Handloom & Weaving (हथकरघा)',
    'Pottery & Ceramics (मिट्टी के बर्तन)',
    'Wood Carving (लकड़ी की नक्काशी)',
    'Traditional Jewelry (पारंपरिक आभूषण)', 
    'Paintings & Folk Art (लोक चित्रकला)',
    'Metal Craft (धातु शिल्प)',
    'Stone Carving (पत्थर की नक्काशी)',
    'Embroidery & Needlework (कढ़ाई)',
    'Leather Craft (चमड़े का काम)',
    'Bamboo & Cane Work (बांस की कलाकृति)'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateContent = async () => {
    setLoading(true);
    
    try {
      // Call the actual Google Cloud function
      const response = await api.generateContent({
        category: formData.category,
        style: formData.artStyle,
        keywords: formData.keywords.split(',').map(k => k.trim()),
        productName: formData.productName,
        materials: formData.materials,
        dimensions: formData.dimensions,
        uniqueFeatures: formData.uniqueFeatures
      });

      if (response.success) {
        const content = {
          title: `Handcrafted ${formData.productName} - Authentic Indian ${formData.category} Art`,
          description: response.content,
          story: response.story,
          seoKeywords: [
            `indian handmade ${formData.category.toLowerCase()}`,
            `traditional ${formData.materials} craft`,
            `${formData.artStyle} indian art`,
            'authentic indian decor',
            'heritage craftsmanship',
            'diwali gifts',
            'indian artisan made',
            'cultural home decor',
            'traditional indian crafts',
            'festival decorations',
            ...formData.keywords.split(',').map(k => k.trim())
          ].filter(Boolean),
          bulletPoints: [
            `Premium ${formData.materials} with traditional techniques`,
            `Authentic Indian ${formData.artStyle} design`,
            `Handcrafted by certified Indian artisans`,
            `Perfect for festivals and cultural celebrations`,
            `Supports traditional craft preservation`,
            `UNESCO heritage techniques`
          ],
          hashtags: [
            '#IndianHandmade',
            '#artisan',
            '#homedecor',
            '#unique',
            '#crafted',
            `#${formData.category.toLowerCase().replace(/\s+/g, '')}`,
            `#${formData.materials.toLowerCase()}`,
            '#supportartists'
          ]
        };
        setGeneratedContent(content);
      } else {
        throw new Error('Content generation failed');
      }
    } catch (error) {
      console.error('Error generating content:', error);
      // Fallback to mock content if API fails
      const mockContent = {
        title: `Handcrafted ${formData.productName} - Authentic Indian ${formData.category} Art`,
        description: `🇮🇳 AUTHENTIC INDIAN CRAFTSMANSHIP 🇮🇳

Discover the timeless beauty of traditional Indian artistry with this exquisite ${formData.productName}. Crafted using heritage techniques passed down through generations, this ${formData.category.toLowerCase()} represents the rich cultural legacy of Indian craftsmanship.

✨ PRODUCT HIGHLIGHTS:
• Handcrafted with premium ${formData.materials} sourced locally
• Traditional ${formData.artStyle} artistic style
• Dimensions: ${formData.dimensions || 'Custom sizing available'}
• ${formData.uniqueFeatures}
• Perfect for festivals, home decor, or meaningful gifts

🎨 HERITAGE CRAFTSMANSHIP:
Each piece is meticulously created by skilled Indian artisans who have inherited their craft through family traditions. The authentic techniques and quality materials ensure this ${formData.category.toLowerCase()} carries the soul of Indian culture.

🌟 WHY CHOOSE INDIAN HANDMADE:
• Supports traditional Indian artisans and their families
• Eco-friendly, sustainable crafting methods
• UNESCO recognized traditional techniques
• Perfect for Diwali, weddings, and festivals
• Each piece tells a unique cultural story
• International shipping available

💫 POWERED BY GOOGLE CLOUD AI:
This description was crafted using advanced AI to highlight the cultural significance and market appeal of traditional Indian crafts, helping artisans reach global audiences while preserving their heritage.

Celebrate India's rich artistic heritage while supporting the livelihoods of talented craftspeople.`,
        
        seoKeywords: [
          `indian handmade ${formData.category.toLowerCase()}`,
          `traditional ${formData.materials} craft`,
          `${formData.artStyle} indian art`,
          'authentic indian decor',
          'heritage craftsmanship',
          'diwali gifts',
          'indian artisan made',
          'cultural home decor',
          'traditional indian crafts',
          'festival decorations',
          formData.keywords
        ].filter(Boolean),
        
        bulletPoints: [
          `Premium ${formData.materials} with traditional techniques`,
          `Authentic Indian ${formData.artStyle} design`,
          `Handcrafted by certified Indian artisans`,
          `Perfect for festivals and cultural celebrations`,
          `Supports traditional craft preservation`,
          `UNESCO heritage techniques`
        ],
        
        hashtags: [
          '#IndianHandmade',
          '#artisan',
          '#homedecor',
          '#unique',
          '#crafted',
          `#${formData.category.toLowerCase().replace(/\s+/g, '')}`,
          `#${formData.materials.toLowerCase()}`,
          '#supportartists'
        ]
      };
      
      setGeneratedContent(mockContent);
      alert('Using offline mode - API connection failed. Content generated locally.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const exportForPlatform = (platform) => {
    const content = generatedContent;
    let formattedContent = '';
    
    switch(platform) {
      case 'amazon':
        formattedContent = `TITLE: ${content.title}

DESCRIPTION:
${content.description}

BULLET POINTS:
${content.bulletPoints.map(point => `• ${point}`).join('\n')}

KEYWORDS: ${content.seoKeywords.join(', ')}`;
        break;
        
      case 'etsy':
        formattedContent = `TITLE: ${content.title}

DESCRIPTION:
${content.description}

TAGS:
${content.seoKeywords.slice(0, 13).join(', ')}`;
        break;
        
      default:
        formattedContent = content.description;
    }
    
    copyToClipboard(formattedContent);
  };

  return (
    <div style={{ 
      padding: '20px', 
      maxWidth: '1200px', 
      margin: '0 auto',
      backgroundColor: '#ffd380', // Warm yellow background
      minHeight: '100vh'
    }}>
      <div style={{ marginBottom: '30px', textAlign: 'center' }}>
        <h2 style={{ 
          color: '#283593', // Deep Indigo
          marginBottom: '10px', 
          fontSize: '2.5rem',
          fontWeight: 'bold'
        }}>
          🤖 AI Content Generator for Indian Artisans
        </h2>
        <p style={{ 
          color: 'var(--text-primary)', // High contrast text
          fontSize: '1.1rem' 
        }}>
          Create compelling product descriptions with SEO optimization for Indian & global marketplaces
        </p>
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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        {/* Input Form */}
        <div style={{ 
          backgroundColor: '#FFFFFF', // White background
          padding: '30px', 
          borderRadius: '12px', 
          border: '2px solid #A1887F', // Muted Brown border
          boxShadow: '0 4px 15px rgba(229, 115, 115, 0.15)' // Soft terracotta shadow
        }}>
          <h3 style={{ 
            marginTop: 0, 
            color: '#283593' // Deep Indigo heading
          }}>Product Information</h3>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontWeight: 'bold', 
              color: '#283593' // Deep Indigo labels
            }}>
              Product Name *
            </label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleInputChange}
              placeholder="e.g., Ceramic Vase, Wooden Sculpture"
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid var(--secondary-light)', // Harmonious border
                borderRadius: '6px',
                fontSize: '14px',
                boxSizing: 'border-box',
                backgroundColor: 'var(--dominant-light)', // Light background
                color: 'var(--text-primary)' // High contrast text
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: 'var(--text-primary)' }}>
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
            >
              <option value="">Select category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: 'var(--text-primary)' }}>
              Materials Used
            </label>
            <input
              type="text"
              name="materials"
              value={formData.materials}
              onChange={handleInputChange}
              placeholder="e.g., Clay, Oak wood, Cotton fabric"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: 'var(--text-primary)' }}>
              Dimensions
            </label>
            <input
              type="text"
              name="dimensions"
              value={formData.dimensions}
              onChange={handleInputChange}
              placeholder="e.g., 12 x 8 x 6 inches"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: 'var(--text-primary)' }}>
              Art Style
            </label>
            <input
              type="text"
              name="artStyle"
              value={formData.artStyle}
              onChange={handleInputChange}
              placeholder="e.g., Modern, Traditional, Abstract"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: 'var(--text-primary)' }}>
              Target Platform
            </label>
            <select
              name="targetPlatform"
              value={formData.targetPlatform}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
            >
              {platforms.map(platform => (
                <option key={platform.value} value={platform.value}>{platform.label}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: 'var(--text-primary)' }}>
              Additional Keywords
            </label>
            <input
              type="text"
              name="keywords"
              value={formData.keywords}
              onChange={handleInputChange}
              placeholder="handmade, vintage, rustic, modern"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: 'var(--text-primary)' }}>
              Unique Features
            </label>
            <textarea
              name="uniqueFeatures"
              value={formData.uniqueFeatures}
              onChange={handleInputChange}
              placeholder="What makes this piece special? Techniques used, inspiration, etc."
              rows="3"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '14px',
                boxSizing: 'border-box',
                resize: 'vertical'
              }}
            />
          </div>

          <button
            onClick={generateContent}
            disabled={loading || !formData.productName || !formData.category}
            className={`btn btn-lg btn-block ${loading ? 'btn-outline' : 'btn-primary'}`}
          >
            {loading ? '🤖 Generating Content...' : '✨ Generate AI Content'}
          </button>
        </div>

        {/* Generated Content */}
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', border: '1px solid #ddd' }}>
          <h3 style={{ marginTop: 0, color: 'var(--text-primary)' }}>Generated Content</h3>
          
          {!generatedContent ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#666' }}>
              <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🤖</div>
              <p>Fill out the form and click "Generate AI Content" to create optimized product descriptions</p>
            </div>
          ) : (
            <div>
              {/* Title */}
              <div style={{ marginBottom: '25px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <h4 style={{ margin: 0, color: '#e83e8c' }}>Product Title</h4>
                  <button
                    onClick={() => copyToClipboard(generatedContent.title)}
                    className="btn btn-outline btn-xs"
                  >
                    Copy
                  </button>
                </div>
                <div style={{
                  padding: '15px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '6px',
                  border: '1px solid #e9ecef',
                  fontSize: '14px'
                }}>
                  {generatedContent.title}
                </div>
              </div>

              {/* Description */}
              <div style={{ marginBottom: '25px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <h4 style={{ margin: 0, color: '#e83e8c' }}>Product Description</h4>
                  <button
                    onClick={() => copyToClipboard(generatedContent.description)}
                    className="btn btn-outline btn-xs"
                  >
                    Copy
                  </button>
                </div>
                <div style={{
                  padding: '15px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '6px',
                  border: '1px solid #e9ecef',
                  fontSize: '14px',
                  maxHeight: '200px',
                  overflowY: 'auto',
                  whiteSpace: 'pre-line'
                }}>
                  {generatedContent.description}
                </div>
              </div>

              {/* SEO Keywords */}
              <div style={{ marginBottom: '25px' }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#e83e8c' }}>SEO Keywords</h4>
                <div style={{
                  padding: '15px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '6px',
                  border: '1px solid #e9ecef'
                }}>
                  {generatedContent.seoKeywords.map((keyword, index) => (
                    <span
                      key={index}
                      style={{
                        display: 'inline-block',
                        backgroundColor: '#e83e8c',
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        margin: '2px',
                        fontWeight: 'bold'
                      }}
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              {/* Export Buttons */}
              <div style={{ borderTop: '1px solid #eee', paddingTop: '20px' }}>
                <h4 style={{ margin: '0 0 15px 0', color: 'var(--text-primary)' }}>Export for Platform</h4>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {platforms.map(platform => (
                    <button
                      key={platform.value}
                      onClick={() => exportForPlatform(platform.value)}
                      className="btn btn-secondary btn-sm"
                    >
                      {platform.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentGeneratorPage;