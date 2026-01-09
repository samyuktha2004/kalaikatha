import { memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin } from 'lucide-react';
import { 
  ANIMATION_TIMINGS, 
  SPRING_CONFIG, 
  EASING, 
  Z_INDEX 
} from '../../../constants/mapConstants';

interface Craft {
  id: string;
  name: string;
}

interface State {
  id: string;
  name: string;
  color: string;
  videoUrl: string;
  description: string;
  crafts: Craft[];
}

interface StatePinProps {
  state: State;
  index: number;
  position: { top: string; left: string };
  isActive: boolean;
  isHovered: boolean;
  onSelect: (stateId: string) => void;
  onHoverStart: (stateId: string) => void;
  onHoverEnd: () => void;
}

export const StatePin = memo(({
  state,
  index,
  position,
  isActive,
  isHovered,
  onSelect,
  onHoverStart,
  onHoverEnd,
}: StatePinProps) => {
  const entryDelay = (ANIMATION_TIMINGS.PIN_ENTRY_DELAY + index * ANIMATION_TIMINGS.PIN_ENTRY_STAGGER) / 1000;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: entryDelay,
        type: 'spring',
        ...SPRING_CONFIG,
      }}
      whileHover={{ scale: 1.1, zIndex: Z_INDEX.PIN_HOVER }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onSelect(state.id)}
      onMouseEnter={() => onHoverStart(state.id)}
      onMouseLeave={onHoverEnd}
      className="absolute group cursor-pointer"
      style={position}
      aria-label={`${state.name} - ${state.crafts.length} crafts`}
    >
      {/* State Pin Avatar */}
      <div className="relative">
        <motion.div
          animate={{
            scale: isActive ? [1, 1.2, 1] : 1,
          }}
          transition={{
            duration: ANIMATION_TIMINGS.PULSE_DURATION / 1000,
            repeat: isActive ? Infinity : 0,
            ease: EASING.smooth,
          }}
          className="w-12 h-12 md:w-16 md:h-16 rounded-full shadow-2xl border-4 border-white dark:border-gray-700 overflow-hidden"
          style={{ backgroundColor: state.color }}
        >
          <img
            src={state.videoUrl}
            alt={state.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </motion.div>

        {/* Ripple Effect */}
        {isActive && (
          <motion.div
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ 
              duration: ANIMATION_TIMINGS.RIPPLE_DURATION / 1000, 
              repeat: Infinity 
            }}
            className="absolute inset-0 rounded-full border-2"
            style={{ borderColor: state.color }}
            aria-hidden="true"
          />
        )}

        {/* MapPin Icon */}
        <motion.div
          animate={{ y: isActive ? [-3, 0, -3] : 0 }}
          transition={{ 
            duration: ANIMATION_TIMINGS.BOUNCE_DURATION / 1000, 
            repeat: isActive ? Infinity : 0 
          }}
          className="absolute -bottom-2 left-1/2 -translate-x-1/2"
        >
          <MapPin
            className="w-5 h-5 md:w-6 md:h-6 drop-shadow-lg"
            style={{ color: state.color }}
            fill="white"
            aria-hidden="true"
          />
        </motion.div>
      </div>

      {/* State Label */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: isActive || isHovered ? 1 : 0.9,
          y: 0,
        }}
        className="absolute top-full left-1/2 -translate-x-1/2 mt-4 whitespace-nowrap"
      >
        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-lg border border-gray-100 dark:border-gray-700">
          <p className="text-xs md:text-sm text-gray-800 dark:text-white">{state.name}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {state.crafts.length} {state.crafts.length === 1 ? 'craft' : 'crafts'}
          </p>
        </div>
      </motion.div>

      {/* Hover Tooltip - Desktop Only */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="hidden md:block absolute -top-20 left-1/2 -translate-x-1/2 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-4 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 w-48"
            style={{ zIndex: Z_INDEX.TOOLTIP }}
          >
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{state.description}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {state.crafts.slice(0, 2).map((craft) => (
                <span
                  key={craft.id}
                  className="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 px-2 py-1 rounded-full"
                >
                  {craft.name}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
});

StatePin.displayName = 'StatePin';
