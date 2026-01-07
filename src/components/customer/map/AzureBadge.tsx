import { memo, useMemo } from 'react';
import { AZURE_MAPS_ENABLED, Z_INDEX } from '../../../constants/mapConstants';

export const AzureBadge = memo(() => {
  // Memoize badge classes
  const activeBadgeClasses = useMemo(
    () => "absolute top-2 md:top-4 right-2 md:right-4 bg-blue-500/90 dark:bg-blue-600/90 text-white px-2 md:px-4 py-1.5 md:py-2 rounded-md md:rounded-lg text-xs md:text-sm backdrop-blur-sm shadow-lg",
    []
  );

  const fallbackBadgeClasses = useMemo(
    () => "absolute top-2 md:top-4 right-2 md:right-4 bg-amber-500/90 dark:bg-amber-600/90 text-white px-2 md:px-4 py-1.5 md:py-2 rounded-md md:rounded-lg text-xs md:text-sm backdrop-blur-sm shadow-lg",
    []
  );

  if (AZURE_MAPS_ENABLED) {
    return (
      <div 
        className={activeBadgeClasses}
        style={{ zIndex: Z_INDEX.BADGE }}
      >
        <span className="flex items-center gap-1.5 md:gap-2">
          <span className="text-sm md:text-base">🗺️</span>
          <span className="hidden sm:inline">Azure Maps Active</span>
          <span className="sm:hidden">Azure Maps</span>
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
        <span className="text-sm md:text-base">🗺️</span>
        <span className="hidden lg:inline">Image Fallback • Azure Maps Ready</span>
        <span className="hidden sm:inline lg:hidden">Image Mode • Azure Ready</span>
        <span className="sm:hidden">Image Mode</span>
      </span>
    </div>
  );
});

AzureBadge.displayName = 'AzureBadge';