import { motion } from "framer-motion";
import Lottie from "lottie-react";
import Load from "./DogLoad.json";
import { useState, useEffect } from "react";

const transition = (OgComponent) => {
  return () => {
    const [hideAnimation, setHideAnimation] = useState(false);

    useEffect(() => {
      const timeout = setTimeout(() => {
        setHideAnimation(true);
      }, 1000);

      return () => clearTimeout(timeout);
    }, []); // Run this effect only once when the component mounts

    return (
      <>
        <OgComponent />

        <motion.div
          className={`slide-out dark:bg-gray-800`}
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 1 }}
        >
          <Lottie
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-auto ${hideAnimation ? "hidden" : ""}`}
            animationData={Load}
          />
        </motion.div>
      </>
    );
  };
};

export default transition;
