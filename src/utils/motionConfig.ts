import type { Transition } from 'motion/react';

/**
 * Critically damped, high-stiffness spring configuration.
 * - High stiffness (640) + critical damping (46) + low mass (0.45) = zero bounce/overshoot.
 * - Explicit restDelta (0.01) & restSpeed (0.01) terminate sub-pixel tail oscillations immediately,
 *   eliminating any micro-stutter or shaking sensation on buttons and cards.
 */
export const SNAPPY_SPRING: Transition = {
  type: 'spring',
  stiffness: 640,
  damping: 46,
  mass: 0.45,
  restDelta: 0.01,
  restSpeed: 0.01,
};

/**
 * Ultra-snappy shared-layout (`layoutId`) tab pill spring.
 * Glides between segmented tabs with zero wobble or overshoot.
 */
export const SNAPPY_TAB_SPRING: Transition = {
  type: 'spring',
  stiffness: 680,
  damping: 48,
  mass: 0.45,
  restDelta: 0.01,
  restSpeed: 0.01,
};

/**
 * Snappy modal & panel entrance/exit spring.
 */
export const SNAPPY_MODAL_SPRING: Transition = {
  type: 'spring',
  stiffness: 580,
  damping: 44,
  mass: 0.5,
  restDelta: 0.01,
  restSpeed: 0.01,
};

/**
 * Interactive button motion props.
 * Uses pure GPU-accelerated vertical translation (`y`) without CSS `transition-transform` conflicts.
 */
export const BUTTON_MOTION = {
  whileHover: { y: -1 },
  whileTap: { y: 0.5 },
  transition: SNAPPY_SPRING,
} as const;

/**
 * Interactive card motion props.
 * Avoids fractional scale transforms on text containers to prevent browser sub-pixel font rasterization jitter.
 */
export const CARD_MOTION = {
  whileHover: { y: -3 },
  whileTap: { y: 0 },
  transition: SNAPPY_SPRING,
} as const;

/**
 * Smooth, critically-damped entrance spring for IntersectionObserver scroll-triggered reveals.
 * Delivers an effortless editorial glide into position with zero overshoot or oscillation.
 */
export const SCROLL_REVEAL_SPRING: Transition = {
  type: 'spring',
  stiffness: 380,
  damping: 36,
  mass: 0.65,
  restDelta: 0.01,
  restSpeed: 0.01,
};

export function getScrollRevealTransition(delaySeconds = 0): Transition {
  return {
    ...SCROLL_REVEAL_SPRING,
    delay: delaySeconds,
  };
}

