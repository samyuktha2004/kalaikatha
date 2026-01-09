import { memo } from 'react';
import { motion } from 'motion/react';
import { ANIMATION_TIMINGS } from '../../../constants/mapConstants';

interface State {
  id: string;
  name: string;
  color: string;
}

interface MapLegendProps {
  states: State[];
  maxItems?: number;
}

export const MapLegend = memo(({ states, maxItems = 3 }: MapLegendProps) => {
  const displayStates = states.slice(0, maxItems);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: ANIMATION_TIMINGS.LEGEND_DELAY / 1000 }}
      className="absolute bottom-4 left-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-3 md:p-4 rounded-xl shadow-lg"
    >
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Heritage Regions</p>
      <div className="space-y-1">
        {displayStates.map((state) => (
          <div key={state.id} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: state.color }}
              aria-hidden="true"
            />
            <span className="text-xs text-gray-700 dark:text-gray-300">{state.name}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
});

MapLegend.displayName = 'MapLegend';
