import { motion } from "framer-motion";

// eslint-disable-next-line react/prop-types
const AnimationWrapper = ({ children, index = 0, animationType = "fadeInUp" }) => {
    const animations = {
        fadeInUp: { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 } },
        fadeInDown: { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 20 } },
        fadeInLeft: { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 } },
        fadeInRight: { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 20 } },
        scaleIn: { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.9 } },
        rotateIn: { initial: { opacity: 0, rotate: -10 }, animate: { opacity: 1, rotate: 0 }, exit: { opacity: 0, rotate: -10 } },
    };

    return (
        <motion.div
            style={{width:"100%"}}
            initial={animations[animationType]?.initial || animations.fadeInUp.initial}
            animate={animations[animationType]?.animate || animations.fadeInUp.animate}
            exit={animations[animationType]?.exit || animations.fadeInUp.exit}
            transition={{ duration: 0.3, delay: index * 0.2 }}
        >
            {children}
        </motion.div>
    );
};

export default AnimationWrapper;
