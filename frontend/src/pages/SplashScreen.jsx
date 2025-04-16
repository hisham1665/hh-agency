import { Box, Text, Spinner, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const MotionBox = motion(Box);

const SplashScreen = ({ onLoaded, preloadImages = [] }) => {
  const [animateExit, setAnimateExit] = useState(false);

  useEffect(() => {
    const preload = async () => {
      try {
        await Promise.all(
          preloadImages.map(
            (src) =>
              new Promise((resolve, reject) => {
                const img = new Image();
                img.src = src;
                img.onload = resolve;
                img.onerror = reject;
              })
          )
        );
        setTimeout(() => {
          setAnimateExit(true);
        }, 800); // slight pause before raise
      } catch (err) {
        setAnimateExit(true);
      }
    };

    preload();
  }, [preloadImages]);

  return (
    <MotionBox
      initial={{ y: 0 }}
      animate={animateExit ? { y: "-100%" } : { y: 0 }}
      transition={{ duration: 2, ease: "easeInOut" }}
      onAnimationComplete={() => onLoaded()}
      position="fixed"
      top="0"
      left="0"
      w="100vw"
      h="100vh"
      zIndex="9999"
      bg="linear-gradient(to bottom, #0c142e, #1a032e)"
    >
      <VStack h="100%" justify="center" align="center" spacing={4}>
        <Text fontSize="2xl" color="white" fontWeight="bold">
          Welcome to Hisham Agencies
        </Text>
        <Spinner size="xl" color="white" />
      </VStack>
    </MotionBox>
  );
};

export default SplashScreen;
