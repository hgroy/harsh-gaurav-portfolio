import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { getScrollRevealTransition, SNAPPY_SPRING } from '../utils/motionConfig';

export interface UseIntersectionRevealOptions {
  /** Percentage of element visibility required to trigger (0.0 to 1.0) */
  threshold?: number;
  /** CSS margin around viewport root before triggering */
  rootMargin?: string;
  /** Whether to keep the element visible once revealed */
  once?: boolean;
}

/**
 * Custom hook backed by the native browser IntersectionObserver API.
 * Detects when a section or card enters the viewport as the user scrolls down.
 */
export function useIntersectionReveal<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.12,
  rootMargin = '0px 0px -48px 0px',
  once = true,
}: UseIntersectionRevealOptions = {}) {
  const elementRef = useRef<T | null>(null);
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);

  useEffect(() => {
    const node = elementRef.current;
    if (!node) return;

    // Respect user reduced-motion preferences or environments without IntersectionObserver
    if (
      typeof window === 'undefined' ||
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ) {
      setIsIntersecting(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsIntersecting(true);
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            setIsIntersecting(false);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, once]);

  return { ref: elementRef, isIntersecting };
}

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay in seconds */
  delay?: number;
  /** Initial vertical offset in pixels (default: 26) */
  yOffset?: number;
  /** Initial horizontal offset in pixels (default: 0) */
  xOffset?: number;
  /** Visibility threshold (0 to 1) */
  threshold?: number;
  /** Root margin for early/late trigger */
  rootMargin?: string;
  /** Enable subtle hover elevation lift for interactive cards */
  hoverLift?: boolean;
  onClick?: () => void;
  as?: 'div' | 'article' | 'section';
}

/**
 * ScrollReveal component powered by native IntersectionObserver triggers.
 * Animates project cards, case study sections, and editorial headers into view
 * with critically-damped spring physics as the user scrolls down the page.
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  yOffset = 26,
  xOffset = 0,
  threshold = 0.12,
  rootMargin = '0px 0px -48px 0px',
  hoverLift = false,
  onClick,
  as = 'div',
}) => {
  const { ref, isIntersecting } = useIntersectionReveal<HTMLDivElement>({
    threshold,
    rootMargin,
    once: true,
  });

  const MotionTag =
    as === 'article'
      ? motion.article
      : as === 'section'
      ? motion.section
      : motion.div;

  return (
    <MotionTag
      ref={ref}
      onClick={onClick}
      initial={{
        opacity: 0,
        y: yOffset,
        x: xOffset,
      }}
      animate={
        isIntersecting
          ? {
              opacity: 1,
              y: 0,
              x: 0,
            }
          : {
              opacity: 0,
              y: yOffset,
              x: xOffset,
            }
      }
      whileHover={
        hoverLift && isIntersecting
          ? { y: -4, transition: SNAPPY_SPRING }
          : undefined
      }
      whileTap={
        hoverLift && isIntersecting
          ? { y: 0, transition: SNAPPY_SPRING }
          : undefined
      }
      transition={getScrollRevealTransition(delay)}
      className={className}
    >
      {children}
    </MotionTag>
  );
};
