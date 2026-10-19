export const spring = { type: "spring" as const, stiffness: 150, damping: 30, mass: 1 };

export const easeOut = [0.22, 1, 0.36, 1] as const;

export const hoverMove = { duration: 0.4, ease: easeOut };

export const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: spring,
};

export const heroIn = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

export const heroInItem = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: spring },
};

export const heroPhotoIn = {
  initial: { opacity: 0, scale: 1.06 },
  animate: { opacity: 1, scale: 1 },
  transition: { type: "spring" as const, stiffness: 80, damping: 28, delay: 0.15 },
};

export const listStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

export const listItem = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: spring },
};

export const sectionHead = {
  initial: { opacity: 0, y: 20, scale: 1.1 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: true, amount: 0.3 },
  transition: spring,
};

export const fromLeft = {
  initial: { opacity: 0, x: -80 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: spring,
};

export const fromRight = {
  initial: { opacity: 0, x: 80 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: spring,
};

export const heroImage = heroPhotoIn;

export const heroItem = (delay: number) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { ...spring, delay },
});

export const navIn = {
  initial: { opacity: 0, x: -10 },
  animate: { opacity: 1, x: 0 },
  transition: { ...spring, delay: 0.2 },
};

export const fromLeftFar = {
  hidden: { opacity: 0, x: -440 },
  show: { opacity: 1, x: 0, transition: spring },
};

export const fromRightFar = {
  hidden: { opacity: 0, x: 440 },
  show: { opacity: 1, x: 0, transition: spring },
};

export const cardStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export const cardItem = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: spring },
};

export const pawLeft = {
  initial: { opacity: 0, y: -36, rotate: -40 },
  whileInView: { opacity: 1, y: 0, rotate: -15 },
  viewport: { once: true, amount: 0.4 },
  transition: spring,
};

export const pawRight = {
  initial: { opacity: 0, y: 28, rotate: 42 },
  whileInView: { opacity: 1, y: 0, rotate: 18 },
  viewport: { once: true, amount: 0.4 },
  transition: spring,
};

/* Modern theme ------------------------------------------------------------ */

/** Hero headline, word by word. */
export const wordStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

export const wordItem = {
  hidden: { opacity: 0, y: "0.55em", filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: easeOut } },
};

/** Hero photo wipes up into view. */
export const clipReveal = {
  initial: { clipPath: "inset(100% 0% 0% 0% round 28px)" },
  animate: { clipPath: "inset(0% 0% 0% 0% round 28px)" },
  transition: { duration: 1.4, ease: [0.77, 0, 0.18, 1] as const, delay: 0.2 },
};

/** Floating card: pops in, then bobs. */
export const floatCard = (delay: number) => ({
  initial: { opacity: 0, scale: 0.85, y: 0 },
  animate: { opacity: 1, scale: 1, y: [0, -10, 0] },
  transition: {
    opacity: { ...spring, delay },
    scale: { ...spring, delay },
    y: { duration: 6, ease: "easeInOut" as const, repeat: Infinity, delay: delay + 0.7 },
  },
});

/** Live dot next to the hero eyebrow. */
export const pulseRing = {
  animate: {
    boxShadow: ["0 0 0 0 rgba(47,165,111,0.55)", "0 0 0 12px rgba(47,165,111,0)"],
  },
  transition: { duration: 1.8, ease: "easeOut" as const, repeat: Infinity },
};

/** Pixels per second for marquee rows. */
export const marqueeSpeed = { ticker: 60, reviews: 40 } as const;

/** DNA strand in the spotlight band. */
export const helixLoop = {
  animate: { x: [0, -120] },
  transition: { duration: 3.5, ease: "linear" as const, repeat: Infinity },
};

/** Service card lift. */
export const cardLift = { y: -8, boxShadow: "0 24px 50px rgba(15,34,51,0.12)" };

/** Accent bar on a services block. */
export const barGrow = {
  initial: { scaleY: 0 },
  whileInView: { scaleY: 1 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 1, ease: easeOut },
};

/** Handset wiggle on the contact card. */
export const phoneRing = {
  animate: { rotate: [0, -14, 12, -8, 0, 0] },
  transition: {
    duration: 2.4,
    times: [0, 0.1, 0.2, 0.3, 0.4, 1],
    ease: "easeInOut" as const,
    repeat: Infinity,
    delay: 1.2,
  },
};

/* Warm theme -------------------------------------------------------------- */

/** Headline words slide up out of a mask. */
export const maskStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

export const maskItem = {
  hidden: { y: "105%" },
  show: { y: "0%", transition: { duration: 1, ease: easeOut } },
};

/** Hero photo: pops in, then its outline slowly morphs. */
export const blobPhoto = {
  initial: { opacity: 0, scale: 0.9, borderRadius: "58% 42% 46% 54% / 48% 56% 44% 52%" },
  animate: {
    opacity: 1,
    scale: 1,
    borderRadius: [
      "58% 42% 46% 54% / 48% 56% 44% 52%",
      "44% 56% 58% 42% / 56% 44% 52% 48%",
      "58% 42% 46% 54% / 48% 56% 44% 52%",
    ],
  },
  transition: {
    opacity: { duration: 1.2, ease: easeOut, delay: 0.15 },
    scale: { duration: 1.2, ease: easeOut, delay: 0.15 },
    borderRadius: { duration: 14, ease: "easeInOut" as const, repeat: Infinity, delay: 1.4 },
  },
};

/** Small tilted photo over the hero photo. */
export const polaroidSway = {
  initial: { opacity: 0, scale: 0.9, rotate: -6 },
  animate: { opacity: 1, scale: 1, rotate: [-6, -2, -6] },
  transition: {
    opacity: { duration: 1, ease: easeOut, delay: 0.6 },
    scale: { duration: 1, ease: easeOut, delay: 0.6 },
    rotate: { duration: 7, ease: "easeInOut" as const, repeat: Infinity, delay: 1.6 },
  },
};

/** Gallery polaroids: drop in tilted one after another, straighten and lift on hover. */
export const polaroidDrop = (index: number) => {
  const tilt = [-4, 3, -2][index % 3];
  return {
    initial: { opacity: 0, y: 60, rotate: tilt * 3 },
    whileInView: { opacity: 1, y: 0, rotate: tilt },
    whileHover: { rotate: 0, y: -10, scale: 1.03 },
    viewport: { once: true, margin: "-80px" },
    transition: { type: "spring" as const, stiffness: 120, damping: 14, delay: index * 0.15 },
  };
};

/** Paw prints appearing one after another, on a loop. */
export const pawStep = (index: number) => ({
  animate: { opacity: [0, 1, 1, 0, 0], scale: [0.4, 1, 1, 1, 1] },
  transition: {
    duration: 4.2,
    times: [0, 0.12, 0.55, 0.75, 1],
    ease: "easeInOut" as const,
    repeat: Infinity,
    delay: index * 0.35,
  },
});

/** Stars in the rating band pop in one by one. */
export const starRow = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

export const starItem = {
  hidden: { opacity: 0, scale: 0, rotate: -40 },
  show: { opacity: 1, scale: 1, rotate: 0, transition: { type: "spring" as const, stiffness: 320, damping: 14 } },
};

/** Review slider: the quote slides in from the side it came from. */
export const slideSwap = (direction: number) => ({
  initial: { opacity: 0, x: 40 * direction },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 * direction },
  transition: { duration: 0.45, ease: easeOut },
});

/** Pulsing ring on the warm call buttons. */
export const peachRing = {
  animate: { boxShadow: ["0 0 0 0 rgba(244,167,140,0.7)", "0 0 0 14px rgba(244,167,140,0)"] },
  transition: { duration: 1.8, ease: "easeOut" as const, repeat: Infinity },
};
