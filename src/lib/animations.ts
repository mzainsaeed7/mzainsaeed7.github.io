// Framer Motion Animation Variants

export const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

export const fadeInDown = {
    initial: { opacity: 0, y: -30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

export const fadeInLeft = {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

export const fadeInRight = {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

export const scaleIn = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
};

export const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

export const staggerItem = {
    initial: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
};

export const slideInFromLeft = {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
};

export const slideInFromRight = {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
};

export const textReveal = {
    initial: { y: "100%" },
    animate: { y: 0 },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
};

export const letterAnimation = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
};

export const wordAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
};

// Page Transition
export const pageTransition = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.5 },
};

// Hover Effects
export const hoverScale = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: { type: "spring", stiffness: 400, damping: 17 },
};

export const hoverLift = {
    whileHover: { y: -5 },
    transition: { type: "spring", stiffness: 400, damping: 17 },
};

export const magneticButton = {
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.9 },
    transition: { type: "spring", stiffness: 400, damping: 17 },
};

// Scroll Variants
export const scrollFadeIn = {
    offscreen: { opacity: 0, y: 50 },
    onscreen: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

// 3D Card Effect
export const card3DEffect = {
    rest: {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        transition: { duration: 0.5, ease: "easeOut" },
    },
    hover: {
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" },
    },
};
