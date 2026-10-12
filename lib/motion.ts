export const spring = { type: "spring" as const, stiffness: 150, damping: 30, mass: 1 };

export const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: spring,
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

export const heroImage = {
  initial: { opacity: 0, scale: 1.3 },
  animate: { opacity: 1, scale: 1 },
  transition: { type: "spring" as const, stiffness: 100, damping: 30, delay: 0.2 },
};

export const heroItem = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
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
  hidden: { opacity: 0, y: 20 },
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
