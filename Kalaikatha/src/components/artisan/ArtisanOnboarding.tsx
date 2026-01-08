import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  Volume2, 
  VolumeX, 
  X,
  Mic,
  Package,
  Settings,
  Bell,
  Hand,
  Sparkles,
  ArrowRight,
  Circle
} from 'lucide-react';

interface OnboardingSlide {
  id: string;
  title: string;
  visualType: 'animation' | 'illustration';
  voiceText: string;
  animation: JSX.Element;
  gesture?: string;
}

interface ArtisanOnboardingProps {
  onComplete: () => void;
  artisanName: string;
}

export function ArtisanOnboarding({ onComplete, artisanName }: ArtisanOnboardingProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [touchStart, setTouchStart] = useState(0);

  const slides: OnboardingSlide[] = [
    {
      id: 'welcome',
      title: `Namaste ${artisanName}!`,
      visualType: 'animation',
      voiceText: `Welcome ${artisanName}. I am Vani, your voice assistant. Let me show you how easy it is to manage your craft business.`,
      animation: <WelcomeAnimation />,
      gesture: 'Swipe left to continue'
    },
    {
      id: 'voice',
      title: 'Talk to Me Anytime',
      visualType: 'animation',
      voiceText: 'Just tap the microphone and speak. I understand Hindi, English, and many Indian languages. Try saying - Show my orders.',
      animation: <VoiceAnimation />,
      gesture: 'Tap mic icon to speak'
    },
    {
      id: 'orders',
      title: 'New Orders Arrive Here',
      visualType: 'animation',
      voiceText: 'When customers want custom work, you will see it here. Tap the bell to check new requests.',
      animation: <OrdersAnimation />,
      gesture: 'Tap to view orders'
    },
    {
      id: 'commission',
      title: 'Control Your Availability',
      visualType: 'animation',
      voiceText: 'Busy? Just toggle this switch. You can also set your minimum price so you only get orders that match your worth.',
      animation: <CommissionAnimation />,
      gesture: 'Toggle on/off'
    },
    {
      id: 'products',
      title: 'Your Beautiful Creations',
      visualType: 'animation',
      voiceText: 'Add photos of your work. Customers can buy directly through WhatsApp or Amazon. I can help you upload using voice commands.',
      animation: <ProductsAnimation />,
      gesture: 'Add new products'
    },
    {
      id: 'ready',
      title: "You're All Set!",
      visualType: 'illustration',
      voiceText: 'You are ready to receive orders! Remember, I am always here. Just say "Hey Vani" and I will help you.',
      animation: <ReadyAnimation artisanName={artisanName} />,
      gesture: 'Tap to start'
    }
  ];

  // Azure Text-to-Speech simulation
  const speak = (text: string) => {
    if (!voiceEnabled) return;
    
    setIsSpeaking(true);
    
    // TODO: Replace with Azure Speech Services
    // const synth = window.speechSynthesis;
    // const utterance = new SpeechSynthesisUtterance(text);
    // utterance.lang = 'en-IN'; // or 'hi-IN' for Hindi
    // utterance.onend = () => setIsSpeaking(false);
    // synth.speak(utterance);

    // For now, simulate speech duration
    const duration = text.length * 50; // ~50ms per character
    setTimeout(() => setIsSpeaking(false), duration);
  };

  useEffect(() => {
    // Auto-play voice narration when slide changes
    if (voiceEnabled) {
      const timer = setTimeout(() => {
        speak(slides[currentSlide].voiceText);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentSlide, voiceEnabled]);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      completeOnboarding();
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const completeOnboarding = () => {
    localStorage.setItem('kalaikatha_artisan_onboarded', 'true');
    onComplete();
  };

  // Touch swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrevious();
      }
    }
  };

  const currentSlideData = slides[currentSlide];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 z-[100] flex flex-col"
    >
      {/* Header Controls */}
      <div className="flex items-center justify-between p-4">
        <button
          onClick={completeOnboarding}
          className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          Skip Tutorial
        </button>

        <button
          onClick={() => setVoiceEnabled(!voiceEnabled)}
          className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all"
          aria-label={voiceEnabled ? 'Mute voice' : 'Enable voice'}
        >
          {voiceEnabled ? (
            <Volume2 className={`w-5 h-5 ${isSpeaking ? 'text-amber-600 animate-pulse' : 'text-gray-700 dark:text-gray-300'}`} />
          ) : (
            <VolumeX className="w-5 h-5 text-gray-400" />
          )}
        </button>
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center gap-2 mb-8">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className="relative"
            aria-label={`Go to slide ${index + 1}`}
          >
            <Circle
              className={`w-2 h-2 transition-all ${
                index === currentSlide
                  ? 'text-amber-600 fill-current w-3 h-3'
                  : index < currentSlide
                  ? 'text-amber-400 fill-current'
                  : 'text-gray-300 dark:text-gray-600'
              }`}
            />
          </button>
        ))}
      </div>

      {/* Slide Content */}
      <div
        className="flex-1 flex flex-col items-center justify-center px-6 pb-20"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            className="w-full max-w-md text-center"
          >
            {/* Animation Container */}
            <div className="mb-8">
              {currentSlideData.animation}
            </div>

            {/* Title */}
            <h2 className="text-2xl md:text-3xl text-gray-900 dark:text-white mb-4">
              {currentSlideData.title}
            </h2>

            {/* Gesture Hint */}
            {currentSlideData.gesture && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center justify-center gap-2 text-sm text-amber-600 dark:text-amber-400"
              >
                <Hand className="w-4 h-4" />
                <span>{currentSlideData.gesture}</span>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="p-6 pt-0">
        <div className="flex gap-3">
          {currentSlide > 0 && (
            <button
              onClick={handlePrevious}
              className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-2xl hover:shadow-lg transition-all"
            >
              Back
            </button>
          )}
          
          <button
            onClick={handleNext}
            className="flex-1 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-2xl hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            <span className="font-medium">
              {currentSlide === slides.length - 1 ? "Start Creating" : "Continue"}
            </span>
            {currentSlide === slides.length - 1 ? (
              <Sparkles className="w-5 h-5" />
            ) : (
              <ArrowRight className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ==================== ANIMATION COMPONENTS ====================

function WelcomeAnimation() {
  return (
    <div className="relative w-64 h-64 mx-auto">
      {/* Vani Avatar */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', damping: 10, stiffness: 100 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="w-40 h-40 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-2xl">
          <Sparkles className="w-20 h-20 text-white" />
        </div>
      </motion.div>

      {/* Pulsing Rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.4,
            ease: 'easeOut'
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-40 h-40 rounded-full border-4 border-amber-400" />
        </motion.div>
      ))}

      {/* Floating Icons */}
      {[
        { Icon: Package, angle: 0, delay: 0 },
        { Icon: Bell, angle: 120, delay: 0.2 },
        { Icon: Settings, angle: 240, delay: 0.4 }
      ].map(({ Icon, angle, delay }) => (
        <motion.div
          key={angle}
          initial={{ scale: 0, rotate: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{ delay, type: 'spring', damping: 10 }}
          className="absolute top-1/2 left-1/2"
          style={{
            transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-100px)`
          }}
        >
          <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg flex items-center justify-center">
            <Icon className="w-6 h-6 text-amber-600" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function VoiceAnimation() {
  return (
    <div className="relative w-64 h-64 mx-auto">
      {/* Microphone */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="w-32 h-32 bg-gradient-to-br from-amber-500 to-orange-500 rounded-3xl flex items-center justify-center shadow-2xl">
          <Mic className="w-16 h-16 text-white" />
        </div>
      </motion.div>

      {/* Sound Waves */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          initial={{ scaleX: 0.5, opacity: 0 }}
          animate={{ scaleX: [0.5, 1, 0.5], opacity: [0, 1, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.15,
            ease: 'easeInOut'
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <div
            className="h-2 bg-amber-400 rounded-full"
            style={{ width: `${120 + i * 30}px` }}
          />
        </motion.div>
      ))}

      {/* Tap Gesture Hint */}
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
      >
        <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center">
          <Hand className="w-6 h-6 text-amber-600" />
        </div>
      </motion.div>
    </div>
  );
}

function OrdersAnimation() {
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 2000);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-64 h-64 mx-auto">
      {/* Phone/Dashboard Mockup */}
      <div className="w-48 h-56 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl mx-auto mt-4 overflow-hidden border-4 border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white/20 rounded-full" />
            <div className="w-16 h-2 bg-white/40 rounded" />
          </div>
          <div className="relative">
            <Bell className="w-5 h-5 text-white" />
            <AnimatePresence>
              {showNotification && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"
                />
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Orders List */}
        <div className="p-3 space-y-2">
          <AnimatePresence>
            {showNotification && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="bg-amber-50 dark:bg-amber-900/20 p-2 rounded-lg border-l-4 border-amber-600"
              >
                <div className="flex items-start gap-2">
                  <Package className="w-4 h-4 text-amber-600 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="h-2 bg-amber-300 dark:bg-amber-700 rounded w-20 mb-1" />
                    <div className="h-1.5 bg-amber-200 dark:bg-amber-800 rounded w-full" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {[1, 2].map((i) => (
            <div key={i} className="bg-gray-50 dark:bg-gray-700 p-2 rounded-lg opacity-50">
              <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded w-16 mb-1" />
              <div className="h-1.5 bg-gray-200 dark:bg-gray-600 rounded w-full" />
            </div>
          ))}
        </div>
      </div>

      {/* New Order Badge */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ scale: 0, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0 }}
            className="absolute -top-4 right-8 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg"
          >
            New Order!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CommissionAnimation() {
  const [isOn, setIsOn] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsOn((prev) => !prev);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
      {/* Toggle Switch */}
      <motion.div
        animate={{ scale: isOn ? 1 : 0.95 }}
        className="relative"
      >
        <div className="text-center mb-6">
          <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Accepting Commissions</div>
          <motion.button
            onClick={() => setIsOn(!isOn)}
            className={`relative w-24 h-12 rounded-full transition-colors ${
              isOn
                ? 'bg-gradient-to-r from-green-400 to-green-600'
                : 'bg-gray-300 dark:bg-gray-600'
            }`}
          >
            <motion.div
              animate={{ x: isOn ? 48 : 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="absolute top-1 left-1 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center"
            >
              {isOn ? (
                <span className="text-green-600 text-xl">✓</span>
              ) : (
                <span className="text-gray-400 text-xl">✕</span>
              )}
            </motion.div>
          </motion.button>
        </div>

        {/* Status Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
            isOn
              ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
          }`}>
            <div className={`w-2 h-2 rounded-full ${isOn ? 'bg-green-500' : 'bg-gray-400'}`} />
            <span className="text-sm">{isOn ? 'Open for Orders' : 'Taking a Break'}</span>
          </div>
        </motion.div>

        {/* Minimum Budget Example */}
        <motion.div
          animate={{ opacity: isOn ? 1 : 0.3 }}
          className="mt-8 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg"
        >
          <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Minimum Budget</div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">₹</span>
            <motion.div
              animate={{ scale: isOn ? [1, 1.05, 1] : 1 }}
              transition={{ duration: 1, repeat: isOn ? Infinity : 0 }}
              className="text-3xl text-amber-600"
            >
              5,000
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function ProductsAnimation() {
  const [currentProduct, setCurrentProduct] = useState(0);
  const products = [
    { color: 'from-blue-400 to-blue-600' },
    { color: 'from-purple-400 to-purple-600' },
    { color: 'from-pink-400 to-pink-600' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentProduct((prev) => (prev + 1) % products.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
      {/* Product Gallery */}
      <div className="relative w-48 h-48">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProduct}
            initial={{ opacity: 0, rotateY: -90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: 90 }}
            transition={{ duration: 0.5 }}
            className={`absolute inset-0 bg-gradient-to-br ${products[currentProduct].color} rounded-3xl shadow-2xl flex items-center justify-center`}
          >
            <Package className="w-20 h-20 text-white/50" />
          </motion.div>
        </AnimatePresence>

        {/* Add Button */}
        <motion.button
          animate={{ rotate: [0, 90, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full shadow-xl flex items-center justify-center text-white text-3xl"
        >
          +
        </motion.button>
      </div>

      {/* Gallery Dots */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2">
        {products.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentProduct
                ? 'bg-amber-600 w-6'
                : 'bg-gray-300 dark:bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function ReadyAnimation({ artisanName }: { artisanName: string }) {
  return (
    <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
      {/* Success Checkmark */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', damping: 10, stiffness: 100, delay: 0.2 }}
        className="relative"
      >
        <div className="w-40 h-40 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-2xl">
          <motion.svg
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="w-24 h-24 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          >
            <motion.path d="M5 13l4 4L19 7" />
          </motion.svg>
        </div>

        {/* Confetti Particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, x: 0, y: 0 }}
            animate={{
              scale: [0, 1, 0],
              x: Math.cos((i * 30 * Math.PI) / 180) * 100,
              y: Math.sin((i * 30 * Math.PI) / 180) * 100,
            }}
            transition={{ duration: 1, delay: 0.7 + i * 0.05 }}
            className={`absolute top-1/2 left-1/2 w-2 h-2 rounded-full ${
              i % 3 === 0
                ? 'bg-amber-400'
                : i % 3 === 1
                ? 'bg-orange-400'
                : 'bg-red-400'
            }`}
          />
        ))}
      </motion.div>

      {/* Encouraging Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="absolute -bottom-8 text-center"
      >
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Ready to showcase your craft! 🎨
        </div>
      </motion.div>
    </div>
  );
}
