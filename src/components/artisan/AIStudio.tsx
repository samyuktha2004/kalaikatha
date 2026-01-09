import { motion } from 'motion/react';
import { ArrowLeft, Upload, Sparkles, AlertCircle, Check, Loader, Image as ImageIcon, Download, Mic, X as XIcon } from 'lucide-react';
import { useState, useRef } from 'react';
import { useFileUpload, useImageAnalysis, useDeviceCapability, useVoiceInput } from '../../hooks/useArtisanFeatures';

interface AIStudioProps {
  onBack: () => void;
  onSaveProduct?: (product: {
    image: string;
    enhancedImage: string;
    name: string;
    description: string;
    price: number;
    analysis: any;
  }) => void;
}

export function AIStudio({ onBack, onSaveProduct }: AIStudioProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [enhancedUrl, setEnhancedUrl] = useState<string | null>(null);
  const [showComparison, setShowComparison] = useState(false);
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [listeningFor, setListeningFor] = useState<'name' | 'description' | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Hooks
  const { upload, uploading, progress, error: uploadError, uploadedUrl } = useFileUpload();
  const { analyze, analyzing, analysis, error: analysisError } = useImageAnalysis();
  const capability = useDeviceCapability();
  const voiceInput = useVoiceInput();
  
  const [showDetailedText] = useState(
    localStorage.getItem('artisan_detailed_text') === 'true'
  );

  // Simple image enhancement using canvas filters
  const enhanceImage = (imageUrl: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = imageUrl;
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!;
        
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Apply enhancements via canvas filters
        ctx.filter = 'brightness(1.1) contrast(1.15) saturate(1.2) sharpen(1)';
        ctx.drawImage(img, 0, 0);
        
        // Convert to base64
        resolve(canvas.toDataURL('image/jpeg', 0.92));
      };
      
      img.onerror = () => {
        // Fallback: return original
        resolve(imageUrl);
      };
    });
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('📸 Please select an image file (JPG, PNG, etc.)');
      return;
    }

    // Validate file size (warn if > 5MB on low-end)
    if (capability.isLowEnd && file.size > 5 * 1024 * 1024) {
      const compress = confirm(
        `Your image is ${(file.size / (1024 * 1024)).toFixed(1)}MB. Compress it for faster upload?`
      );
      if (!compress) return;
    }

    setSelectedFile(file);
    
    // Create preview
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);
    setEnhancedUrl(null);
    setShowComparison(false);

    // Auto-upload and analyze
    const url = await upload(file);
    if (url) {
      const analysisResult = await analyze(url);
      
      // Auto-enhance the image
      const enhanced = await enhanceImage(preview);
      setEnhancedUrl(enhanced);
      
      // Auto-fill from AI analysis
      if (analysisResult) {
        if (analysisResult.description) {
          setProductDescription(analysisResult.description);
        }
        // Suggest a name from objects detected
        if (analysisResult.objects && analysisResult.objects.length > 0) {
          const topObject = analysisResult.objects[0].name;
          setProductName(`Handcrafted ${topObject.charAt(0).toUpperCase() + topObject.slice(1)}`);
        }
      }
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleVoiceInput = (field: 'name' | 'description') => {
    setListeningFor(field);
    voiceInput.start();
  };

  const handleSaveEnhancedImage = () => {
    if (!enhancedUrl) return;
    
    // Create download link
    const link = document.createElement('a');
    link.href = enhancedUrl;
    link.download = `enhanced-${productName || 'product'}.jpg`;
    link.click();
    
    alert('✅ Enhanced photo saved to your device!');
  };

  const handleSaveToVault = () => {
    if (!uploadedUrl || !enhancedUrl || !analysis) return;
    
    const productData = {
      image: uploadedUrl,
      enhancedImage: enhancedUrl,
      name: productName || 'Untitled Product',
      description: productDescription || analysis.description || '',
      price: parseInt(productPrice) || 0,
      analysis,
    };
    
    if (onSaveProduct) {
      onSaveProduct(productData);
    }
    
    alert('🔒 Product saved to Protected Vault!');
  };

  const handleGenerateMarketing = () => {
    if (!productName) {
      alert('Please add a product name first!');
      return;
    }
    
    alert(`✨ Generating marketing content for "${productName}"...\n\nThis will create:\n• Instagram post\n• Amazon listing\n• Etsy description\n\n(Redirecting to Marketing Review...)`);
    
    // Save to localStorage for Marketing Review to use
    localStorage.setItem('pending_product', JSON.stringify({
      name: productName,
      description: productDescription,
      image: enhancedUrl || previewUrl,
      analysis,
    }));
  };

  // Listen for voice input results
  useState(() => {
    if (voiceInput.transcript && listeningFor) {
      if (listeningFor === 'name') {
        setProductName(voiceInput.transcript);
      } else if (listeningFor === 'description') {
        setProductDescription(voiceInput.transcript);
      }
      setListeningFor(null);
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 pt-20 pb-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <button
            onClick={onBack}
            className="p-4 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl text-gray-900 dark:text-white">AI Studio</h1>
              <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full text-xs">
                Azure AI
              </span>
            </div>
            {showDetailedText && (
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                📸 Upload → AI enhances → Add details → Save
              </p>
            )}
          </div>
        </motion.div>

        {/* Device Capability Warning */}
        {capability.isLowEnd && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-amber-100 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-700 rounded-2xl p-4 mb-6"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-700 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-amber-800 dark:text-amber-300">
                <p className="font-medium mb-1">Data Saver Mode Active</p>
                <p>Images will be compressed for faster upload on your network.</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* AI Feedback Banner */}
        {analysis && !analyzing && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-2xl p-4 mb-6 shadow-lg"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="mb-2 font-medium">Azure AI Analysis Complete:</p>
                <ul className="space-y-1 text-sm text-white/90">
                  {analysis.tradeSecrets.length > 0 && (
                    <li>🔒 {analysis.tradeSecrets.length} trade secret(s) detected and protected</li>
                  )}
                  {analysis.objects.length > 0 && (
                    <li>✓ Identified: {analysis.objects.slice(0, 3).map((o: any) => o.name).join(', ')}</li>
                  )}
                  {analysis.enhancementSuggestions.map((suggestion: string, idx: number) => (
                    <li key={idx}>{suggestion}</li>
                  ))}
                  {analysis.enhancementSuggestions.length === 0 && (
                    <li>✓ Photo quality is excellent!</li>
                  )}
                </ul>
              </div>
            </div>
          </motion.div>
        )}

        {/* Main Content Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden mb-6"
        >
          {!selectedFile ? (
            // Empty State
            <div className="p-12">
              <div 
                onClick={handleUploadClick}
                className="aspect-square max-w-lg mx-auto bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 cursor-pointer hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors"
              >
                <Upload className="w-16 h-16 text-gray-400 dark:text-gray-500 mb-4" />
                <p className="text-gray-700 dark:text-gray-300 mb-2 text-lg">Tap to upload your craft photo</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">JPG, PNG • Max 10MB</p>
                {capability.shouldCompressUploads && (
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-3">
                    ⚡ Auto-compression enabled for your network
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="p-6 space-y-6">
              {/* Before/After Comparison */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg text-gray-900 dark:text-white">Photo Enhancement</h3>
                  <div className="flex gap-2">
                    {enhancedUrl && (
                      <button
                        onClick={() => setShowComparison(!showComparison)}
                        className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors text-sm"
                      >
                        {showComparison ? '✓ Comparing' : 'Compare Before/After'}
                      </button>
                    )}
                    <button
                      onClick={handleUploadClick}
                      className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm"
                    >
                      Change Photo
                    </button>
                  </div>
                </div>

                {/* Image Display */}
                <div className={`grid ${showComparison && enhancedUrl ? 'md:grid-cols-2' : 'grid-cols-1'} gap-4`}>
                  {/* Original OR Enhanced (if not comparing) */}
                  {showComparison ? (
                    <>
                      {/* Original */}
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 text-center">Original</p>
                        <div className="aspect-square bg-gray-100 dark:bg-gray-900 rounded-2xl overflow-hidden">
                          {previewUrl && (
                            <img
                              src={previewUrl}
                              alt="Original"
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                      </div>
                      {/* Enhanced */}
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 text-center flex items-center justify-center gap-1">
                          <Sparkles className="w-3 h-3 text-indigo-500" />
                          AI Enhanced
                        </p>
                        <div className="aspect-square bg-gray-100 dark:bg-gray-900 rounded-2xl overflow-hidden">
                          {enhancedUrl && (
                            <img
                              src={enhancedUrl}
                              alt="Enhanced"
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="max-w-2xl mx-auto w-full">
                      <div className="aspect-square bg-gray-100 dark:bg-gray-900 rounded-2xl overflow-hidden relative">
                        {(enhancedUrl || previewUrl) && (
                          <img
                            src={enhancedUrl || previewUrl}
                            alt="Product"
                            className="w-full h-full object-cover"
                          />
                        )}
                        {enhancedUrl && !showComparison && (
                          <div className="absolute top-4 left-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            Enhanced
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Upload/Analysis Progress */}
                {uploading && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Uploading...</span>
                      <span className="text-sm text-indigo-600 dark:text-indigo-400">{Math.round(progress)}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                      />
                    </div>
                  </div>
                )}

                {analyzing && (
                  <div className="mt-4 flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
                    <Loader className="w-5 h-5 animate-spin" />
                    <span className="text-sm">Azure AI analyzing & enhancing image...</span>
                  </div>
                )}

                {/* Save Enhanced Photo Button */}
                {enhancedUrl && (
                  <button
                    onClick={handleSaveEnhancedImage}
                    className="mt-4 w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    <span>Save Enhanced Photo to Device</span>
                  </button>
                )}
              </div>

              {/* Product Details Form */}
              {uploadedUrl && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-4"
                >
                  <h3 className="text-lg text-gray-900 dark:text-white mb-4">Add Product Details</h3>
                  
                  {/* Product Name */}
                  <div>
                    <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                      Product Name
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        placeholder="e.g., Hand-Chiseled Bronze Nataraja"
                        className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      <button
                        onClick={() => handleVoiceInput('name')}
                        className={`p-3 rounded-xl transition-all ${
                          listeningFor === 'name'
                            ? 'bg-red-500 text-white'
                            : 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800'
                        }`}
                      >
                        <Mic className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Product Description */}
                  <div>
                    <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                      Product Description
                    </label>
                    <div className="flex gap-2 items-start">
                      <textarea
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                        placeholder="AI will suggest a description, or you can type/speak your own..."
                        rows={4}
                        className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                      />
                      <button
                        onClick={() => handleVoiceInput('description')}
                        className={`p-3 rounded-xl transition-all ${
                          listeningFor === 'description'
                            ? 'bg-red-500 text-white'
                            : 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800'
                        }`}
                      >
                        <Mic className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Product Price */}
                  <div>
                    <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                      Price (₹)
                    </label>
                    <input
                      type="number"
                      value={productPrice}
                      onChange={(e) => setProductPrice(e.target.value)}
                      placeholder="e.g., 18500"
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      💡 Tip: Use Smart Pricing for AI recommendations
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </motion.div>

        {/* Actions */}
        {uploadedUrl && analysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-4"
          >
            <button
              onClick={handleSaveToVault}
              className="flex-1 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Check className="w-5 h-5" />
              <span>Save to Vault</span>
            </button>
            
            <button
              onClick={handleGenerateMarketing}
              className="flex-1 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              <span>Generate Marketing</span>
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
