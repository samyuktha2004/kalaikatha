import { motion } from 'motion/react';
import { Mic, Upload, Image, Video, TrendingUp, Eye, ShoppingBag, Settings, Camera, MessageSquare, Lock, Store, Globe } from 'lucide-react';
import { useState } from 'react';

interface ArtisanDashboardProps {
  onNavigate: (view: 'dashboard' | 'studio' | 'bargain' | 'marketing' | 'shop' | 'vault' | 'orders') => void;
}

export function ArtisanDashboard({ onNavigate }: ArtisanDashboardProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [pulseAnimation, setPulseAnimation] = useState(false);
  const [showDetailedText, setShowDetailedText] = useState(
    localStorage.getItem('artisan_detailed_text') === 'true'
  );
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
    { code: 'bn', name: 'বাংলা', flag: '🇮🇳' },
  ];

  const handleVaniClick = () => {
    setIsRecording(!isRecording);
    setPulseAnimation(!isRecording);
  };

  const toggleDetailedText = () => {
    const newValue = !showDetailedText;
    setShowDetailedText(newValue);
    localStorage.setItem('artisan_detailed_text', String(newValue));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 pb-20 overflow-x-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Top Bar - Settings & Language */}
        <div className="fixed top-20 right-4 z-50 flex gap-2">
          {/* Language Selector */}
          <div className="relative group">
            <button className="p-2 md:p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
              <Globe className="w-4 h-4 md:w-5 md:h-5 text-gray-700 dark:text-gray-300" />
              <span className="text-xs md:text-sm">{languages.find(l => l.code === selectedLanguage)?.flag}</span>
            </button>
            
            {/* Language Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-2 min-w-[200px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all"
            >
              <div className="text-xs text-gray-500 dark:text-gray-400 px-3 py-2">Azure AI Translation</div>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setSelectedLanguage(lang.code)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                    selectedLanguage === lang.code ? 'bg-indigo-50 dark:bg-indigo-900' : ''
                  }`}
                >
                  <span className="text-xl">{lang.flag}</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">{lang.name}</span>
                </button>
              ))}
            </motion.div>
          </div>

          {/* Settings Toggle */}
          <button
            onClick={toggleDetailedText}
            className="p-2 md:p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all"
            title="Toggle detailed descriptions"
          >
            <Settings className={`w-4 h-4 md:w-5 md:h-5 text-gray-700 dark:text-gray-300 ${showDetailedText ? 'rotate-180' : ''} transition-transform duration-300`} />
          </button>
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl text-gray-900 dark:text-gray-100 mb-2">Welcome, Master Artisan</h1>
          <p className="text-gray-600 dark:text-gray-400">Vani AI is here to help you grow your craft business</p>
        </motion.div>

        {/* Active Negotiations Alert - Always show content */}
        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          onClick={() => onNavigate('orders')}
          className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-3xl p-6 mb-6 shadow-xl hover:shadow-2xl transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 relative">
              <MessageSquare className="w-8 h-8" />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs"
              >
                2
              </motion.div>
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-lg mb-1">Custom Order Requests</h3>
              <p className="text-white/90 text-sm">2 new custom orders waiting for your response</p>
            </div>
          </div>
        </motion.button>

        {/* Vani AI Center - Voice First */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
          className="relative mb-8 flex flex-col items-center"
        >
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Tap and speak in your language</p>
          
          <div className="relative">
            {/* Pulsing Rings */}
            {pulseAnimation && (
              <>
                <motion.div
                  animate={{
                    scale: [1, 2, 2],
                    opacity: [0.5, 0.2, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeOut',
                  }}
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                  style={{ filter: 'blur(20px)' }}
                />
                <motion.div
                  animate={{
                    scale: [1, 1.8, 1.8],
                    opacity: [0.3, 0.1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeOut',
                    delay: 0.3,
                  }}
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                  style={{ filter: 'blur(20px)' }}
                />
              </>
            )}

            {/* Main Vani Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleVaniClick}
              className={`relative w-48 h-48 rounded-full shadow-2xl flex flex-col items-center justify-center transition-all ${
                isRecording
                  ? 'bg-gradient-to-br from-red-500 to-pink-500'
                  : 'bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600'
              }`}
            >
              <motion.div
                animate={isRecording ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 1, repeat: isRecording ? Infinity : 0 }}
              >
                <Mic className="w-16 h-16 text-white" />
              </motion.div>
              <p className="text-white text-sm mt-3">Vani AI</p>
            </motion.button>
          </div>

          {isRecording && (
            <motion.div
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="mt-4 text-gray-700 dark:text-gray-300"
            >
              🎤 Listening in {languages.find(l => l.code === selectedLanguage)?.name}...
            </motion.div>
          )}
        </motion.div>

        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-3xl p-6 mb-6 shadow-xl"
        >
          <h3 className="text-lg text-gray-900 dark:text-gray-100 mb-4">Upload Your Work</h3>
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => onNavigate('studio')}
              className="flex flex-col items-center gap-3 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl hover:shadow-lg transition-all"
            >
              <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center">
                <Image className="w-8 h-8 text-white" />
              </div>
              <span className="text-sm text-gray-700 dark:text-gray-300">Photos</span>
            </button>

            <button className="flex flex-col items-center gap-3 p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl hover:shadow-lg transition-all">
              <div className="w-16 h-16 rounded-full bg-purple-500 flex items-center justify-center">
                <Video className="w-8 h-8 text-white" />
              </div>
              <span className="text-sm text-gray-700 dark:text-gray-300">Videos</span>
            </button>

            <button className="flex flex-col items-center gap-3 p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl hover:shadow-lg transition-all">
              <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <span className="text-sm text-gray-700 dark:text-gray-300">Documents</span>
            </button>
          </div>
          {showDetailedText && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
              🔒 Trade secrets are automatically detected and protected in your vault
            </p>
          )}
        </motion.div>

        {/* Quick Access Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 gap-4 mb-6"
        >
          <button
            onClick={() => onNavigate('shop')}
            className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all group"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Store className="w-8 h-8 text-white" />
              </div>
              <div className="text-center">
                <h4 className="text-gray-900 dark:text-gray-100 mb-1">My Shop</h4>
                {showDetailedText && <p className="text-sm text-gray-500 dark:text-gray-400">View listings</p>}
              </div>
            </div>
          </button>

          <button
            onClick={() => onNavigate('vault')}
            className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all group"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <div className="text-center">
                <h4 className="text-gray-900 dark:text-gray-100 mb-1">Protected Vault</h4>
                {showDetailedText && <p className="text-sm text-gray-500 dark:text-gray-400">Trade secrets</p>}
              </div>
            </div>
          </button>

          <button
            onClick={() => onNavigate('studio')}
            className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all group"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <div className="text-center">
                <h4 className="text-gray-900 dark:text-gray-100 mb-1">AI Studio</h4>
                {showDetailedText && <p className="text-sm text-gray-500 dark:text-gray-400">Enhance photos</p>}
              </div>
            </div>
          </button>

          <button
            onClick={() => onNavigate('bargain')}
            className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all group"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <div className="text-center">
                <h4 className="text-gray-900 dark:text-gray-100 mb-1">Bargain Bot</h4>
                {showDetailedText && <p className="text-sm text-gray-500 dark:text-gray-400">Set prices</p>}
              </div>
            </div>
          </button>
        </motion.div>

        {/* Marketplace Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-green-600" />
            <h3 className="text-lg text-gray-900 dark:text-gray-100">Your Performance</h3>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-indigo-100 flex items-center justify-center">
                <ShoppingBag className="w-8 h-8 text-indigo-600" />
              </div>
              <p className="text-4xl text-gray-900 dark:text-gray-100 mb-1">₹45K</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Sales (This Month)</p>
              <p className="text-sm text-green-600 mt-1">↑ 23%</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-purple-100 flex items-center justify-center">
                <Eye className="w-8 h-8 text-purple-600" />
              </div>
              <p className="text-4xl text-gray-900 dark:text-gray-100 mb-1">1.2K</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Profile Views</p>
              <p className="text-sm text-green-600 mt-1">↑ 15%</p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('marketing')}
            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl hover:shadow-lg transition-all flex items-center justify-center gap-3"
          >
            <TrendingUp className="w-5 h-5" />
            <span>Review Marketing Content</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}