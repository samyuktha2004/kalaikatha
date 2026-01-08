import { memo, useMemo } from 'react';
import { AZURE_MAPS_ENABLED, Z_INDEX } from '../../../constants/mapConstants';

export const AzureBadge = memo(() => {
  // Memoize badge classes
  const activeBadgeClasses = useMemo(
    () => "absolute top-2 md:top-4 right-2 md:right-4 bg-blue-500/90 dark:bg-blue-600/90 text-white px-2 md:px-4 py-1.5 md:py-2 rounded-md md:rounded-lg text-xs md:text-sm backdrop-blur-sm shadow-lg",
    []
  );

  const fallbackBadgeClasses = useMemo(
    () => "absolute top-2 md:top-4 right-2 md:right-4 bg-gradient-to-r from-blue-500/90 to-indigo-600/90 dark:from-blue-600/90 dark:to-indigo-700/90 text-white px-2 md:px-4 py-1.5 md:py-2 rounded-md md:rounded-lg text-xs md:text-sm backdrop-blur-sm shadow-lg",
    []
  );

  if (AZURE_MAPS_ENABLED) {
    return (
      <div 
        className={activeBadgeClasses}
        style={{ zIndex: Z_INDEX.BADGE }}
      >
        <span className="flex items-center gap-1.5 md:gap-2">
          <span className="text-sm md:text-base">☁️</span>
          <span className="hidden sm:inline font-medium">Powered by Azure Maps</span>
          <span className="sm:hidden font-medium">Azure Maps</span>
        </span>
      </div>
    );
  }

  return (
    <div 
      className={fallbackBadgeClasses}
      style={{ zIndex: Z_INDEX.BADGE }}
    >
      <span className="flex items-center gap-1.5 md:gap-2">
        <span className="text-sm md:text-base">☁️</span>
        <span className="hidden sm:inline font-medium">Powered by Azure AI</span>
        <span className="sm:hidden font-medium">Azure AI</span>
      </span>
    </div>
  );
});

AzureBadge.displayName = 'AzureBadge';