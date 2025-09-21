// Universal Card Hover System - Easy Import
import React from 'react';
export { 
  useCardHover,
  UniversalCard,
  IconCard,
  HOVER_VARIANTS,
  CARD_HOVER_CSS,
  injectCardHoverCSS
} from './UniversalCardHover';

// Auto-inject CSS when imported
import { injectCardHoverCSS, UniversalCard } from './UniversalCardHover';

// Inject styles on import
if (typeof window !== 'undefined') {
  injectCardHoverCSS();
}

export default UniversalCard;