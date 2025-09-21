import { useState, useEffect } from 'react';

/**
 * Custom hook for creating a sticky navbar that becomes sticky after scrolling past a certain point
 * @param {number} threshold - The scroll position threshold (default: 200px)
 * @returns {boolean} isSticky - Whether the navbar should be sticky
 */
export const useStickyNavbar = (threshold = 200) => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > threshold) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  return isSticky;
};