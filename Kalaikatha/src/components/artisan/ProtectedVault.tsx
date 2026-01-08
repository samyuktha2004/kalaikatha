import { motion } from 'motion/react';
import { ArrowLeft, Lock, Eye, EyeOff, Shield, FileImage, FileVideo, FileText, AlertCircle } from 'lucide-react';
import { useState } from 'react';

interface ProtectedVaultProps {
  onBack: () => void;
}

export function ProtectedVault({ onBack }: ProtectedVaultProps) {
  const [showDetailedText] = useState(
    localStorage.getItem('artisan_detailed_text') === 'true'
  );
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isLocked, setIsLocked] = useState(true);

  const vaultItems = [
    {
      id: 1,
      type: 'image',
      name: 'Secret Dye Recipe',
      thumbnail: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=400',
      detectedSecrets: ['Natural dye formula', 'Mixing ratios', 'Temperature settings'],
      uploadDate: '2 days ago',
      autoDetected: true,
    },
    {
      id: 2,
      type: 'video',
      name: 'Thread Preparation Process',
      thumbnail: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400',
      detectedSecrets: ['Traditional spinning technique', 'Tool specifications'],
      uploadDate: '1 week ago',
      autoDetected: true,
    },
    {
      id: 3,
      type: 'document',
      name: 'Family Loom Settings',
      thumbnail: 'https://images.unsplash.com/photo-1456324463128-7ff6903988d8?w=400',
      detectedSecrets: ['Loom tension measurements', 'Pattern calculations'],
      uploadDate: '2 weeks ago',
      autoDetected: false,
    },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'image': return <FileImage className="w-5 h-5" />;
      case 'video': return <FileVideo className="w-5 h-5" />;
      case 'document': return <FileText className="w-5 h-5" />;
      default: return <Lock className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 p-4 pt-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
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
          <div>
            <h1 className="text-2xl text-gray-900 flex items-center gap-2">
              <Lock className="w-6 h-6 text-amber-600" />
              Protected Vault
            </h1>
            {showDetailedText && <p className="text-gray-600">Your trade secrets, safe and secure</p>}
          </div>
        </motion.div>

        {/* Security Notice */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-3xl p-6 mb-6 shadow-xl"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg mb-1">AI Protection Active</h3>
              <p className="text-white/90 text-sm">
                Vani AI automatically detects and protects trade secrets in your uploads. These will never appear in public listings.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Lock/Unlock Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-4 mb-6 shadow-lg flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            {isLocked ? (
              <Lock className="w-5 h-5 text-red-600" />
            ) : (
              <Eye className="w-5 h-5 text-green-600" />
            )}
            <span className="text-gray-900">
              {isLocked ? 'Vault Locked' : 'Vault Unlocked'}
            </span>
          </div>
          <button
            onClick={() => setIsLocked(!isLocked)}
            className={`px-6 py-2 rounded-full transition-all ${
              isLocked
                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
          >
            {isLocked ? (
              <div className="flex items-center gap-2">
                <EyeOff className="w-4 h-4" />
                <span>Unlock</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                <span>Lock</span>
              </div>
            )}
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-3 gap-4 mb-6"
        >
          <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
            <p className="text-3xl text-amber-600 mb-1">{vaultItems.length}</p>
            <p className="text-xs text-gray-600">Protected Items</p>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
            <p className="text-3xl text-green-600 mb-1">
              {vaultItems.filter(i => i.autoDetected).length}
            </p>
            <p className="text-xs text-gray-600">Auto-Detected</p>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
            <p className="text-3xl text-blue-600 mb-1">
              {vaultItems.reduce((sum, i) => sum + i.detectedSecrets.length, 0)}
            </p>
            <p className="text-xs text-gray-600">Trade Secrets</p>
          </div>
        </motion.div>

        {/* Vault Items */}
        {isLocked ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-3xl p-12 shadow-xl text-center"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-amber-100 flex items-center justify-center">
              <Lock className="w-12 h-12 text-amber-600" />
            </div>
            <h3 className="text-xl text-gray-900 mb-2">Vault is Locked</h3>
            <p className="text-gray-600 mb-6">Unlock to view your protected content</p>
            <button
              onClick={() => setIsLocked(false)}
              className="px-8 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-full hover:shadow-lg transition-all"
            >
              Unlock Vault
            </button>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {vaultItems.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + (index * 0.1) }}
                onClick={() => setSelectedItem(item)}
                className="w-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all text-left"
              >
                <div className="flex gap-4 p-4">
                  {/* Thumbnail */}
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={item.thumbnail}
                      alt={item.name}
                      className="w-full h-full object-cover blur-sm"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Lock className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-gray-900">{item.name}</h3>
                      <div className="flex items-center gap-1 text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
                        {getTypeIcon(item.type)}
                        <span className="capitalize">{item.type}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-1 mb-2">
                      {item.detectedSecrets.map((secret, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-gray-600">
                          <AlertCircle className="w-3 h-3 text-red-500" />
                          <span>{secret}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>{item.uploadDate}</span>
                      {item.autoDetected && (
                        <span className="flex items-center gap-1 text-green-600">
                          <Shield className="w-3 h-3" />
                          AI Protected
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        )}

        {/* Help Text */}
        {showDetailedText && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-6 bg-blue-50 rounded-2xl p-4 border border-blue-100"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-gray-700">
                <p className="mb-2">When you upload content, Vani AI scans for:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Recipes, formulas, and measurements</li>
                  <li>Tool specifications and settings</li>
                  <li>Traditional techniques and processes</li>
                  <li>Family or proprietary patterns</li>
                </ul>
                <p className="mt-2 text-blue-700">
                  Protected content is automatically blurred or hidden from public view.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
