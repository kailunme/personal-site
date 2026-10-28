import type { TransitionAnimationPair, TransitionDirectionalAnimations } from 'astro';

const fadeThrough: TransitionAnimationPair = {
  old: {
    name: 'page-soft-out',
    duration: '300ms',
    easing: 'cubic-bezier(0.4, 0, 0.6, 1)',
    fillMode: 'both',
  },
  new: {
    name: 'page-soft-in',
    duration: '520ms',
    delay: '300ms',
    easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
    fillMode: 'both',
  },
};

// Start the entrance as soon as the exit completes, without an empty hold.
export const pageTransition: TransitionDirectionalAnimations = {
  forwards: fadeThrough,
  backwards: fadeThrough,
};
