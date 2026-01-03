import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, MapPin } from 'lucide-react';
import { indianStatesData } from '../../data/mockData';
import { LoadingScreen } from '../LoadingScreen';

interface InteractiveMapProps {
  onStateSelect: (stateId: string) => void;
  selectedState: string | null;
}

export function InteractiveMap({ onStateSelect, selectedState }: InteractiveMapProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const filteredStates = indianStatesData.filter(state =>
    state.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    state.crafts.some(craft => craft.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-indigo-950 dark:to-purple-950">
      {/* Search Bar - Fixed below nav bar */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-20 left-1/2 -translate-x-1/2 z-30 w-full max-w-2xl px-4"
      >
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search crafts, states, or stories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 md:py-4 rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-xl border border-white/20 dark:border-gray-700/50 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:ring-amber-400 transition-all text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
          />
        </div>
      </motion.div>

      {/* Loading State */}
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen message="Loading Heritage Map..." fullScreen={true} />
        )}
      </AnimatePresence>

      {/* AZURE MAPS INTEGRATION PLACEHOLDER */}
      {/* Replace the container below with Azure Maps component */}
      {/* Example: <AzureMap states={filteredStates} onStateClick={onStateSelect} /> */}
      
      {/* Interactive Map Container - Full Screen */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute inset-0 flex items-center justify-center pt-24 pb-4 px-4"
      >
        <div className="relative w-full h-full bg-white/40 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/30">
          {/* Decorative Grid Background */}
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full" style={{
              backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }} />
          </div>

          {/* Azure Maps Integration Note */}
          <div className="absolute top-4 left-4 bg-blue-500 text-white px-4 py-2 rounded-lg text-sm z-10 opacity-75">
            🗺️ Azure Maps Integration Ready
          </div>

          {/* State Pins - These will overlay Azure Maps */}
          <div className="relative w-full h-full p-4 md:p-8">
            {filteredStates.map((state, index) => {
              const positions = [
                { top: '15%', left: '20%' }, // Rajasthan
                { top: '60%', left: '35%' }, // Tamil Nadu
                { top: '25%', right: '25%' }, // West Bengal
                { top: '40%', left: '15%' }, // Gujarat
                { top: '50%', left: '45%' }, // Karnataka
              ];
              
              const position = positions[index % positions.length];
              const isActive = selectedState === state.id || hoveredState === state.id;

              return (
                <motion.button
                  key={state.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.5 + (index * 0.1),
                    type: "spring",
                    stiffness: 200
                  }}
                  whileHover={{ scale: 1.1, zIndex: 10 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onStateSelect(state.id)}
                  onMouseEnter={() => setHoveredState(state.id)}
                  onMouseLeave={() => setHoveredState(null)}
                  className="absolute group cursor-pointer"
                  style={position}
                >
                  {/* State Pin */}
                  <div className="relative">
                    <motion.div
                      animate={{
                        scale: isActive ? [1, 1.2, 1] : 1,
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: isActive ? Infinity : 0,
                        ease: "easeInOut"
                      }}
                      className="w-12 h-12 md:w-16 md:h-16 rounded-full shadow-2xl border-4 border-white overflow-hidden"
                      style={{ backgroundColor: state.color }}
                    >
                      <img 
                        src={state.videoUrl} 
                        alt={state.name}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>

                    {/* Ripple Effect */}
                    {isActive && (
                      <motion.div
                        initial={{ scale: 1, opacity: 0.5 }}
                        animate={{ scale: 2, opacity: 0 }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="absolute inset-0 rounded-full border-2"
                        style={{ borderColor: state.color }}
                      />
                    )}

                    {/* MapPin Icon */}
                    <motion.div
                      animate={{ y: isActive ? [-3, 0, -3] : 0 }}
                      transition={{ duration: 1, repeat: isActive ? Infinity : 0 }}
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2"
                    >
                      <MapPin 
                        className="w-5 h-5 md:w-6 md:h-6 drop-shadow-lg" 
                        style={{ color: state.color }}
                        fill="white"
                      />
                    </motion.div>
                  </div>

                  {/* State Label */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ 
                      opacity: isActive || hoveredState === state.id ? 1 : 0.9, 
                      y: 0 
                    }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-4 whitespace-nowrap"
                  >
                    <div className="bg-white/95 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-lg border border-gray-100">
                      <p className="text-xs md:text-sm text-gray-800">{state.name}</p>
                      <p className="text-xs text-gray-500">{state.crafts.length} crafts</p>
                    </div>
                  </motion.div>

                  {/* Hover Tooltip - Hidden on mobile */}
                  <AnimatePresence>
                    {hoveredState === state.id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                        className="hidden md:block absolute -top-20 left-1/2 -translate-x-1/2 bg-gradient-to-br from-white to-gray-50 p-4 rounded-xl shadow-2xl border border-gray-200 w-48 z-20"
                      >
                        <p className="text-xs text-gray-500 mb-1">{state.description}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {state.crafts.slice(0, 2).map(craft => (
                            <span key={craft.id} className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                              {craft.name}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </div>

          {/* Legend */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-3 md:p-4 rounded-xl shadow-lg"
          >
            <p className="text-xs text-gray-500 mb-2">Heritage Regions</p>
            <div className="space-y-1">
              {indianStatesData.slice(0, 3).map(state => (
                <div key={state.id} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: state.color }}
                  />
                  <span className="text-xs text-gray-700">{state.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}