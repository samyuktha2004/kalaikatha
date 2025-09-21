import React, { useState, useRef } from 'react';

const ImageEnhancerPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [enhancedImage, setEnhancedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [enhancementOptions, setEnhancementOptions] = useState({
    brightness: 0,
    contrast: 0,
    saturation: 0,
    sharpness: 0,
    removeBackground: false,
    addWatermark: false,
    resize: false,
    targetWidth: 1200,
    targetHeight: 1200
  });
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        setEnhancedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOptionChange = (option, value) => {
    setEnhancementOptions(prev => ({
      ...prev,
      [option]: value
    }));
  };

  const enhanceImage = async () => {
    if (!selectedImage) return;
    
    setLoading(true);
    
    // Simulate AI enhancement process
    setTimeout(() => {
      // In a real implementation, this would call your image enhancement API
      // For demo purposes, we'll just use the original image with filters applied
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        // Set canvas dimensions
        if (enhancementOptions.resize) {
          canvas.width = enhancementOptions.targetWidth;
          canvas.height = enhancementOptions.targetHeight;
        } else {
          canvas.width = img.width;
          canvas.height = img.height;
        }
        
        // Apply filters
        const filters = [];
        if (enhancementOptions.brightness !== 0) {
          filters.push(`brightness(${100 + enhancementOptions.brightness}%)`);
        }
        if (enhancementOptions.contrast !== 0) {
          filters.push(`contrast(${100 + enhancementOptions.contrast}%)`);
        }
        if (enhancementOptions.saturation !== 0) {
          filters.push(`saturate(${100 + enhancementOptions.saturation}%)`);
        }
        
        ctx.filter = filters.join(' ');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        // Add watermark if requested
        if (enhancementOptions.addWatermark) {
          ctx.filter = 'none';
          ctx.font = '20px Arial';
          ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
          ctx.fillText('Kalaikatha', canvas.width - 120, canvas.height - 20);
        }
        
        setEnhancedImage(canvas.toDataURL());
        setLoading(false);
      };
      
      img.src = selectedImage;
    }, 2000);
  };

  const downloadImage = () => {
    if (!enhancedImage) return;
    
    const link = document.createElement('a');
    link.download = 'enhanced-image.jpg';
    link.href = enhancedImage;
    link.click();
  };

  const resetImage = () => {
    setSelectedImage(null);
    setEnhancedImage(null);
    setEnhancementOptions({
      brightness: 0,
      contrast: 0,
      saturation: 0,
      sharpness: 0,
      removeBackground: false,
      addWatermark: false,
      resize: false,
      targetWidth: 1200,
      targetHeight: 1200
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#20c997', marginBottom: '10px' }}>📸 AI Image Enhancer</h2>
        <p style={{ color: '#666' }}>Enhance your product photos with AI-powered tools for better sales</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '30px' }}>
        {/* Control Panel */}
        <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '12px', border: '1px solid #ddd', height: 'fit-content' }}>
          <h3 style={{ marginTop: 0, color: '#333', marginBottom: '20px' }}>Enhancement Controls</h3>
          
          {/* Upload Section */}
          <div style={{ marginBottom: '30px' }}>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold', color: '#333' }}>
              Upload Image
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{
                width: '100%',
                padding: '10px',
                border: '2px dashed #20c997',
                borderRadius: '8px',
                backgroundColor: '#f8f9fa',
                cursor: 'pointer'
              }}
            />
            <p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
              Supported: JPG, PNG, WebP (Max 5MB)
            </p>
          </div>

          {/* Basic Adjustments */}
          <div style={{ marginBottom: '25px' }}>
            <h4 style={{ color: '#20c997', marginBottom: '15px' }}>Basic Adjustments</h4>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 'bold' }}>
                Brightness: {enhancementOptions.brightness}%
              </label>
              <input
                type="range"
                min="-50"
                max="50"
                value={enhancementOptions.brightness}
                onChange={(e) => handleOptionChange('brightness', parseInt(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 'bold' }}>
                Contrast: {enhancementOptions.contrast}%
              </label>
              <input
                type="range"
                min="-50"
                max="50"
                value={enhancementOptions.contrast}
                onChange={(e) => handleOptionChange('contrast', parseInt(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 'bold' }}>
                Saturation: {enhancementOptions.saturation}%
              </label>
              <input
                type="range"
                min="-50"
                max="50"
                value={enhancementOptions.saturation}
                onChange={(e) => handleOptionChange('saturation', parseInt(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>
          </div>

          {/* AI Features */}
          <div style={{ marginBottom: '25px' }}>
            <h4 style={{ color: '#20c997', marginBottom: '15px' }}>AI Features</h4>
            
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={enhancementOptions.removeBackground}
                  onChange={(e) => handleOptionChange('removeBackground', e.target.checked)}
                  style={{ marginRight: '10px' }}
                />
                <span style={{ fontSize: '14px' }}>Remove Background</span>
              </label>
            </div>

            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={enhancementOptions.addWatermark}
                  onChange={(e) => handleOptionChange('addWatermark', e.target.checked)}
                  style={{ marginRight: '10px' }}
                />
                <span style={{ fontSize: '14px' }}>Add Watermark</span>
              </label>
            </div>
          </div>

          {/* Resize Options */}
          <div style={{ marginBottom: '25px' }}>
            <h4 style={{ color: '#20c997', marginBottom: '15px' }}>Resize for Platform</h4>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={enhancementOptions.resize}
                  onChange={(e) => handleOptionChange('resize', e.target.checked)}
                  style={{ marginRight: '10px' }}
                />
                <span style={{ fontSize: '14px' }}>Resize Image</span>
              </label>
            </div>

            {enhancementOptions.resize && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px' }}>Width</label>
                  <input
                    type="number"
                    value={enhancementOptions.targetWidth}
                    onChange={(e) => handleOptionChange('targetWidth', parseInt(e.target.value))}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '12px'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px' }}>Height</label>
                  <input
                    type="number"
                    value={enhancementOptions.targetHeight}
                    onChange={(e) => handleOptionChange('targetHeight', parseInt(e.target.value))}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '12px'
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button
              onClick={enhanceImage}
              disabled={!selectedImage || loading}
              style={{
                padding: '12px 20px',
                backgroundColor: !selectedImage || loading ? '#ccc' : '#20c997',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: !selectedImage || loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? '🤖 Enhancing...' : '✨ Enhance Image'}
            </button>

            {enhancedImage && (
              <button
                onClick={downloadImage}
                style={{
                  padding: '12px 20px',
                  backgroundColor: '#6f42c1',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                📥 Download Enhanced
              </button>
            )}

            <button
              onClick={resetImage}
              style={{
                padding: '12px 20px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              🔄 Reset
            </button>
          </div>
        </div>

        {/* Image Preview Area */}
        <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '12px', border: '1px solid #ddd' }}>
          <h3 style={{ marginTop: 0, color: '#333', marginBottom: '20px' }}>Image Preview</h3>
          
          {!selectedImage ? (
            <div style={{
              textAlign: 'center',
              padding: '80px 20px',
              border: '2px dashed #ddd',
              borderRadius: '12px',
              color: '#666'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '20px' }}>📸</div>
              <h4>Upload an image to get started</h4>
              <p>Drag and drop or click the upload button to select your product photo</p>
            </div>
          ) : (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: enhancedImage ? '1fr 1fr' : '1fr', gap: '20px' }}>
                {/* Original Image */}
                <div>
                  <h4 style={{ marginBottom: '15px', color: '#333' }}>Original</h4>
                  <div style={{
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    backgroundColor: '#f8f9fa'
                  }}>
                    <img
                      src={selectedImage}
                      alt="Original"
                      style={{
                        width: '100%',
                        height: 'auto',
                        maxHeight: '400px',
                        objectFit: 'contain'
                      }}
                    />
                  </div>
                </div>

                {/* Enhanced Image */}
                {enhancedImage && (
                  <div>
                    <h4 style={{ marginBottom: '15px', color: '#20c997' }}>Enhanced ✨</h4>
                    <div style={{
                      border: '2px solid #20c997',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      backgroundColor: '#f8f9fa'
                    }}>
                      <img
                        src={enhancedImage}
                        alt="Enhanced"
                        style={{
                          width: '100%',
                          height: 'auto',
                          maxHeight: '400px',
                          objectFit: 'contain'
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Enhancement Tips */}
              <div style={{
                marginTop: '30px',
                padding: '20px',
                backgroundColor: '#e8f5f0',
                borderRadius: '8px',
                border: '1px solid #20c997'
              }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#20c997' }}>💡 Enhancement Tips</h4>
                <ul style={{ margin: 0, paddingLeft: '20px', color: '#333' }}>
                  <li>Use bright, natural lighting for best results</li>
                  <li>Clean backgrounds help products stand out</li>
                  <li>Multiple angles showcase your product better</li>
                  <li>High resolution images (1200x1200px) work best for marketplaces</li>
                  <li>Remove background for professional product catalogs</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageEnhancerPage;