import { motion } from 'motion/react';
import { ArrowLeft, Upload, Sparkles, AlertCircle, ToggleLeft, ToggleRight, Check } from 'lucide-react';
import { useState } from 'react';

interface AIStudioProps {
  onBack: () => void;
}

export function AIStudio({ onBack }: AIStudioProps) {
  const [uploadedImage, setUploadedImage] = useState(false);
  const [blurSecrets, setBlurSecrets] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [processed, setProcessed] = useState(false);
  const [showDetailedText, setShowDetailedText] = useState(
    localStorage.getItem('artisan_detailed_text') === 'true'
  );

  const handleUpload = () => {
    setUploadedImage(true);
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setProcessed(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-4 pt-20">
      <div className="max-w-6xl mx-auto">
        {/* Header - Icon Prominent */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <button
            onClick={onBack}
            className="p-4 bg-white rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          {showDetailedText && (
            <div>
              <h1 className="text-2xl text-gray-900">AI Studio</h1>
              <p className="text-gray-600">Professional photo enhancement for marketplace</p>
            </div>
          )}
        </motion.div>

        {/* AI Feedback Banner */}
        {uploadedImage && !processing && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-2xl p-4 mb-6 shadow-lg"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p className="mb-2">AI Analysis Complete:</p>
                <ul className="space-y-1 text-sm text-white/90">
                  <li>✓ Background removed successfully</li>
                  <li>✓ Color correction applied</li>
                  <li>⚠️ The lighting is low. Please move closer to the sun and retake for best results.</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}

        {/* Split Screen View */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-6"
        >
          <div className="grid md:grid-cols-2 divide-x divide-gray-200">
            {/* Left: Raw Upload */}
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg text-gray-900">Original Photo</h3>
                {!uploadedImage && (
                  <button
                    onClick={handleUpload}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    <Upload className="w-4 h-4" />
                    Upload
                  </button>
                )}
              </div>

              {!uploadedImage ? (
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-gray-300">
                  <Upload className="w-16 h-16 text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-2">Upload your product photo</p>
                  <p className="text-sm text-gray-500">JPG, PNG up to 10MB</p>
                </div>
              ) : (
                <div className="relative aspect-square rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1760764541302-e3955fbc6b2b?w=600"
                    alt="Raw upload"
                    className="w-full h-full object-cover"
                    style={{ filter: 'brightness(0.7) contrast(0.9)' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900/30 to-transparent" />
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                    Low Light
                  </div>
                </div>
              )}
            </div>

            {/* Right: AI Enhanced */}
            <div className="p-8 bg-gradient-to-br from-purple-50 to-pink-50">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg text-gray-900">AI Enhanced</h3>
                {processed && (
                  <div className="flex items-center gap-2 text-green-600">
                    <Check className="w-5 h-5" />
                    <span className="text-sm">Ready</span>
                  </div>
                )}
              </div>

              {!uploadedImage ? (
                <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-purple-300">
                  <div className="text-center">
                    <Sparkles className="w-16 h-16 text-purple-400 mb-4 mx-auto" />
                    <p className="text-purple-700">AI enhancement preview</p>
                  </div>
                </div>
              ) : processing ? (
                <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    >
                      <Sparkles className="w-16 h-16 text-purple-600 mb-4 mx-auto" />
                    </motion.div>
                    <p className="text-purple-700">Processing with AI...</p>
                  </div>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative aspect-square rounded-2xl overflow-hidden shadow-xl"
                >
                  <img
                    src="https://images.unsplash.com/photo-1760764541302-e3955fbc6b2b?w=600"
                    alt="AI Enhanced"
                    className="w-full h-full object-cover"
                    style={{ filter: 'brightness(1.1) contrast(1.1) saturate(1.2)' }}
                  />
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    <Sparkles className="w-4 h-4" />
                    Enhanced
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <h3 className="text-lg text-gray-900 mb-4">Privacy Controls</h3>

          {/* Blur Trade Secrets Toggle */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-gray-900">Blur Trade Secrets</p>
                <p className="text-sm text-gray-600">Automatically protect sensitive techniques</p>
              </div>
            </div>
            <button
              onClick={() => setBlurSecrets(!blurSecrets)}
              className="flex-shrink-0"
            >
              {blurSecrets ? (
                <ToggleRight className="w-12 h-12 text-green-600" />
              ) : (
                <ToggleLeft className="w-12 h-12 text-gray-400" />
              )}
            </button>
          </div>

          {/* Action Buttons */}
          {processed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-2 gap-4 mt-6"
            >
              <button className="py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors">
                Retake Photo
              </button>
              <button className="py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all">
                Save to Gallery
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}