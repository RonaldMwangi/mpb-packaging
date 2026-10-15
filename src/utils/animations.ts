import type { Variants } from "framer-motion";

const revealTransition = {
  duration: 0.68,
  ease: [0.16, 1, 0.3, 1] as const,
};

export const revealViewport = { once: true, amount: 0.18 } as const;

export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    x: -48,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: revealTransition,
  },
};

export const fadeLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -48,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: revealTransition,
  },
};

export const fadeRight: Variants = {
  hidden: {
    opacity: 0,
    x: 48,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: revealTransition,
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.04,
      staggerChildren: 0.12,
    },
  },
};

export const scaleIn = fadeLeft;

export const siteFadeLeft = fadeLeft;
export const siteFadeRight = fadeRight;
export const siteStaggerContainer = staggerContainer;
