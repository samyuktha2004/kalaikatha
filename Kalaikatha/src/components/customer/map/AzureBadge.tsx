import { memo } from 'react';
import { AZURE_MAPS_ENABLED, Z_INDEX } from '../../../constants/mapConstants';

export const AzureBadge = memo(() => {
  if (AZURE_MAPS_ENABLED) {
    return (
      <div 
        className="absolute top-4 left-4 bg-blue-500/90 dark:bg-blue-600/90 text-white px-4 py-2 rounded-lg text-sm backdrop-blur-sm shadow-lg"
        style={{ zIndex: Z_INDEX.BADGE }}
      >
        <span className="flex items-center gap-2">
          <span>🗺️</span>
          <span>Azure Maps Active</span>
        </span>
      </div>
    );
  }

  return (
    <div 
      className="absolute top-4 left-4 bg-amber-500/90 dark:bg-amber-600/90 text-white px-4 py-2 rounded-lg text-sm backdrop-blur-sm shadow-lg"
      style={{ zIndex: Z_INDEX.BADGE }}
    >
      <span className="flex items-center gap-2">
        <span>🗺️</span>
        <span className="hidden md:inline">Image Fallback • Azure Maps Ready</span>
        <span className="md:hidden">Image Mode</span>
      </span>
    </div>
  );
});

AzureBadge.displayName = 'AzureBadge';
