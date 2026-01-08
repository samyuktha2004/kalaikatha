import { motion } from 'motion/react';
import { ArrowLeft, Lock, Eye, EyeOff, Shield, FileImage, FileVideo, FileText, AlertCircle, KeyRound, Fingerprint } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ProtectedVaultProps {
  onBack: () => void;
}

export function ProtectedVault({ onBack }: ProtectedVaultProps) {
  const [showDetailedText] = useState(
    localStorage.getItem('artisan_detailed_text') === 'true'
  );
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isLocked, setIsLocked] = useState(true);
  const [hasPin, setHasPin] = useState(false);
  const [showPinSetup, setShowPinSetup] = useState(false);
  const [showPinEntry, setShowPinEntry] = useState(false);
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [enteredPin, setEnteredPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [isSettingUp, setIsSettingUp] = useState(true);

  // Check if PIN exists on mount
  useEffect(() => {
    const storedPin = localStorage.getItem('vault_pin');
    setHasPin(!!storedPin);
    setIsLocked(!!storedPin);
  }, []);

  const handleUnlockClick = () => {
    if (!hasPin) {
      // First time - setup PIN
      setShowPinSetup(true);
      setIsSettingUp(true);
    } else {
      // Has PIN - enter it
      setShowPinEntry(true);
      setIsSettingUp(false);
    }
  };

  const handleSetupPin = () => {
    if (pin.length < 4) {
      setPinError('PIN must be at least 4 digits');
      return;
    }
    if (pin !== confirmPin) {
      setPinError('PINs do not match');
      return;
    }
    
    // Store hashed PIN (simple hash for MVP - use bcrypt in production)
    const hashedPin = btoa(pin); // Base64 encode (NOT secure, just for MVP demo)
    localStorage.setItem('vault_pin', hashedPin);
    setHasPin(true);
    setIsLocked(false);
    setShowPinSetup(false);
    setPin('');
    setConfirmPin('');
    setPinError('');
    console.log('🔐 Vault PIN created');
  };

  const handleUnlockWithPin = () => {
    const storedPin = localStorage.getItem('vault_pin');
    const hashedEnteredPin = btoa(enteredPin);
    
    if (hashedEnteredPin === storedPin) {
      // Correct PIN
      setIsLocked(false);
      setShowPinEntry(false);
      setEnteredPin('');
      setAttemptsLeft(3);
      setPinError('');
      console.log('🔓 Vault unlocked');
    } else {
      // Wrong PIN
      const newAttempts = attemptsLeft - 1;
      setAttemptsLeft(newAttempts);
      
      if (newAttempts <= 0) {
        setPinError('Too many attempts. Vault locked for 5 minutes.');
        setShowPinEntry(false);
        setEnteredPin('');
        // In production, implement actual lockout timer
        setTimeout(() => {
          setAttemptsLeft(3);
        }, 300000); // 5 minutes
      } else {
        setPinError(`Wrong PIN. ${newAttempts} attempts left.`);
        setEnteredPin('');
      }
    }
  };

  const handlePinDigitClick = (digit: string, isSetup: boolean) => {
    if (isSetup) {
      if (pin.length < 6) {
        setPin(prev => prev + digit);
        setPinError('');
      }
    } else {
      if (enteredPin.length < 6) {
        setEnteredPin(prev => prev + digit);
        setPinError('');
      }
    }
  };

  const handleDeleteDigit = (isSetup: boolean) => {
    if (isSetup) {
      setPin(prev => prev.slice(0, -1));
    } else {
      setEnteredPin(prev => prev.slice(0, -1));
    }
    setPinError('');
  };

  const handleResetPin = () => {
    if (confirm('Reset PIN? You will need to set up a new PIN.')) {
      localStorage.removeItem('vault_pin');
      setHasPin(false);
      setIsLocked(true);
      setShowPinEntry(false);
      setEnteredPin('');
      setAttemptsLeft(3);
      console.log('🔄 Vault PIN reset');
      alert('PIN Reset\n\nClick "Unlock Vault" to set up a new PIN.');
    }
  };

  const PinPad = ({ onDigitClick, onDelete, value, isSetup }: any) => (
    <div className="space-y-4">
      {/* PIN Display */}
      <div className="flex justify-center gap-3 mb-8">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl border-2 flex items-center justify-center text-2xl transition-all ${
              i < value.length
                ? 'bg-amber-500 border-amber-500 text-white'
                : 'bg-white border-gray-300'
            }`}
          >
            {i < value.length ? '•' : ''}
          </div>
        ))}
      </div>

      {/* Number Pad */}
      <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
          <button
            key={digit}
            onClick={() => onDigitClick(digit.toString(), isSetup)}
            className="aspect-square bg-white hover:bg-gray-50 rounded-2xl shadow-lg text-2xl text-gray-900 transition-all active:scale-95"
          >
            {digit}
          </button>
        ))}
        <button
          onClick={() => onDelete(isSetup)}
          className="aspect-square bg-red-100 hover:bg-red-200 rounded-2xl shadow-lg text-red-600 transition-all active:scale-95 flex items-center justify-center"
        >
          ←
        </button>
        <button
          onClick={() => onDigitClick('0', isSetup)}
          className="aspect-square bg-white hover:bg-gray-50 rounded-2xl shadow-lg text-2xl text-gray-900 transition-all active:scale-95"
        >
          0
        </button>
        <button
          onClick={() => {
            if (isSetup) {
              setPin('');
              setConfirmPin('');
            } else {
              setEnteredPin('');
            }
            setPinError('');
          }}
          className="aspect-square bg-gray-100 hover:bg-gray-200 rounded-2xl shadow-lg text-gray-600 text-sm transition-all active:scale-95"
        >
          Clear
        </button>
      </div>
    </div>
  );

  const vaultItems = [
    {
      id: 1,
      type: 'video',
      name: 'Golden Patina Secret Technique',
      thumbnail: 'https://images.unsplash.com/photo-1582719366074-e33fe5f7ec73?w=400',
      detectedSecrets: ['9th generation alloy ratio', 'Patina temperature (exact °C)', 'Acid mixture formula'],
      uploadDate: '3 days ago',
      autoDetected: true,
    },
    {
      id: 2,
      type: 'image',
      name: 'Lost-Wax Mold Blueprint',
      thumbnail: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=400',
      detectedSecrets: ['Wax layering technique', 'Grandfather\'s chisel angles', 'Cooling time secrets'],
      uploadDate: '1 week ago',
      autoDetected: true,
    },
    {
      id: 3,
      type: 'document',
      name: 'Bell Metal Alloy Composition',
      thumbnail: 'https://images.unsplash.com/photo-1456324463128-7ff6903988d8?w=400',
      detectedSecrets: ['Copper-tin ratio (family secret)', 'Smelting temperature chart', 'Sound tuning measurements'],
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
            onClick={handleUnlockClick}
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
            <p className="text-gray-600 mb-6">
              {hasPin ? 'Enter your PIN to unlock' : 'Set up a PIN to protect your trade secrets'}
            </p>
            <button
              onClick={handleUnlockClick}
              className="px-8 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-full hover:shadow-lg transition-all"
            >
              {hasPin ? 'Unlock Vault' : 'Set Up PIN'}
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

        {/* PIN Setup */}
        {showPinSetup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="fixed top-0 left-0 right-0 bottom-0 bg-black/50 flex items-center justify-center"
          >
            <div className="bg-white rounded-3xl p-12 shadow-xl w-full max-w-2xl">
              <h2 className="text-xl text-gray-900 mb-6">Set Up Vault PIN</h2>
              <p className="text-gray-600 mb-4">Enter a 4-digit PIN to secure your vault:</p>
              <PinPad
                onDigitClick={handlePinDigitClick}
                onDelete={handleDeleteDigit}
                value={pin}
                isSetup={true}
              />
              {pinError && <p className="text-red-500 text-sm mt-2">{pinError}</p>}
              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setShowPinSetup(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSetupPin}
                  className="px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-full hover:shadow-lg transition-all"
                >
                  Set PIN
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* PIN Entry */}
        {showPinEntry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="fixed top-0 left-0 right-0 bottom-0 bg-black/50 flex items-center justify-center"
          >
            <div className="bg-white rounded-3xl p-12 shadow-xl w-full max-w-2xl">
              <h2 className="text-xl text-gray-900 mb-6">Enter Vault PIN</h2>
              <p className="text-gray-600 mb-4">Enter your 4-digit PIN to unlock the vault:</p>
              <PinPad
                onDigitClick={handlePinDigitClick}
                onDelete={handleDeleteDigit}
                value={enteredPin}
                isSetup={false}
              />
              {pinError && <p className="text-red-500 text-sm mt-2">{pinError}</p>}
              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setShowPinEntry(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUnlockWithPin}
                  className="px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-full hover:shadow-lg transition-all"
                >
                  Unlock
                </button>
              </div>
              <button
                onClick={handleResetPin}
                className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded-full hover:bg-red-200 transition-all"
              >
                Reset PIN
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}