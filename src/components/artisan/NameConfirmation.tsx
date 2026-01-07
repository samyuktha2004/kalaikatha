import { motion } from 'motion/react';
import { useState } from 'react';
import { Edit2, Check, Mic, MicOff } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface NameConfirmationProps {
  onComplete: () => void;
  isPhoneSignup: boolean;
}

export function NameConfirmation({ onComplete, isPhoneSignup }: NameConfirmationProps) {
  const { user, updateName } = useAuth();
  const [isEditing, setIsEditing] = useState(isPhoneSignup); // Auto-edit if phone signup
  const [name, setName] = useState(user?.name || '');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleVoiceInput = () => {
    setIsListening(true);
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      alert('Voice input not supported on your device.');
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'hi-IN'; // Hindi-English mixed
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setName(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    await updateName(name.trim());
    setIsLoading(false);
    onComplete();
  };

  const displayName = user?.name || 'there';

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8"
      >
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
            <span className="text-4xl">👋</span>
          </div>
          <h2 className="text-2xl text-gray-900 dark:text-white mb-2">
            Namaste!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {isPhoneSignup 
              ? 'What should we call you?' 
              : 'Is this your name?'}
          </p>
        </motion.div>

        {/* Name Display/Edit */}
        {!isEditing ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-6"
          >
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-2xl p-6 text-center">
              <p className="text-3xl text-amber-900 dark:text-amber-400 mb-2">
                {displayName}
              </p>
              <button
                onClick={() => setIsEditing(true)}
                className="text-amber-600 dark:text-amber-400 text-sm flex items-center gap-2 mx-auto hover:underline"
              >
                <Edit2 className="w-4 h-4" />
                Edit Name
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">
              Your Name
            </label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900 dark:text-white pr-12"
                placeholder="Enter your name"
                autoFocus
              />
              
              {/* Voice Input Button */}
              <button
                type="button"
                onClick={handleVoiceInput}
                className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all ${
                  isListening 
                    ? 'bg-amber-100 dark:bg-amber-900' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                title="Speak your name"
              >
                {isListening ? (
                  <MicOff className="w-5 h-5 text-amber-600 dark:text-amber-400 animate-pulse" />
                ) : (
                  <Mic className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                )}
              </button>
            </div>
            
            {/* Voice Hint */}
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 flex items-center gap-1">
              <Mic className="w-3 h-3" /> 
              Tap the microphone to speak your name, or type it
            </p>
          </motion.div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleConfirm}
            disabled={isLoading || !name.trim()}
            className={`w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
              isLoading || !name.trim() 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:shadow-lg hover:scale-[1.02]'
            }`}
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Check className="w-5 h-5" />
                {isEditing ? 'Confirm Name' : 'Yes, That\'s Right'}
              </>
            )}
          </button>

          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="w-full py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
            >
              Change Name
            </button>
          )}
        </div>

        {/* Skip Option (for testing) */}
        <button
          onClick={onComplete}
          className="w-full mt-4 py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
        >
          Skip for now →
        </button>
      </motion.div>
    </div>
  );
}
