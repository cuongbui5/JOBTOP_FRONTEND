import {motion} from "framer-motion";
// eslint-disable-next-line react/prop-types
const AnimationWrapper=({children,index})=>{
    return <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        exit={{opacity: 0, y: -20}}
        transition={{duration: 0.3, delay: index * 0.2}}>
        {children}
    </motion.div>
}

export default AnimationWrapper;