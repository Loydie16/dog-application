import { motion } from "framer-motion";



const transition = (OgComponent) => {
  return () => (
    <>
        <OgComponent />
            <motion.div
                className="fixed top-0 left-0 w-full h-screen"
                initial={{scaleY: 0}}
                animate={{scaleY: 0}}
                exit={{scaleY: 1}}
                transition={{duration: 1000, ease: (0.22, 1, 0.36, 1)}}
                style={{ transitionOrigin: 'bottom', backgroundColor: '#0f0f0f' }}
            />

            <motion.div
                className="fixed top-0 left-0 w-full h-screen"
                initial={{scaleY: 1}}
                animate={{scaleY: 0}}
                exit={{scaleY: 0}}
                transition={{duration: 1000, ease: (0.22, 1, 0.36, 1)}}
                style={{ transitionOrigin: 'top', backgroundColor: '#0f0f0f' }}
            />
    </>
  );
};

export default transition;