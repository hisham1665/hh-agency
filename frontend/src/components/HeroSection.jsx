import React, { useEffect, useState } from "react";
import {
    Box,
    Flex,
    Heading,
    Text,
    Button,
    Image,
    useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

// Framer Motion Components
const MotionBox = motion.create(Box);
const MotionImage = motion.create(Image);
const MotionFlex = motion.create(Flex);

// Carousel images
const images = ["/images/slide1.jpeg", "/images/slide2.jpeg", "/images/slide3.jpeg"];

const HeroSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref );

    // Auto slide
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const bg = useColorModeValue("gray.200", "gray.800");

    return (
        <MotionBox
            ref={ref}
            w="full"
            py={{ base: 10, md: 16 }}
            px={{ base: 4, md: 6 }}
            bg={bg}
            initial={{ opacity: 0, y: 5 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
        >

            <MotionFlex
                maxW="1200px"
                mx="auto"
                direction={{ base: "column", md: "row" }}
                align="center"
                justify="space-between"
                gap={10}
            >
                {/* Left Side */}
                <MotionBox
                    flex="1"
                    ml={{ base: 0, md: "-40px" }}
                    textAlign={{ base: "center", md: "left" }}
                    initial={{ opacity: 0, x: -50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 1, delay: 0.3 }}
                >

                    <Heading
                        as="h1"
                        fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
                        mb={4}
                    >
                        Welcome to Hisham Agencies
                    </Heading>
                    <Text
                        fontSize={{ base: "md", md: "lg" }}
                        mb={6}
                        fontStyle="italic"
                        fontFamily="sans-serif"
                    >
                        Your reliable source for quality household plastic essentials.
                    </Text>
                    <Button
                        size="lg"
                        colorScheme="teal"
                        px={8}
                        fontSize={{ base: "sm", md: "md" }}
                    >
                        Get Started
                    </Button>
                </MotionBox>

                {/* Right Side - Carousel */}
                <MotionBox
                    flex="1"
                    position="relative"
                    h={{ base: "250px", sm: "300px", md: "350px" }}
                    w="full"
                    minH="250px"
                    overflow="hidden"
                    borderRadius="xl"
                    initial={{ opacity: 0, x: 50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 1, delay: 0.6 }}
                >

                    {images.map((img, index) => (
                        <MotionImage
                            key={img}
                            src={img}
                            alt={`Slide ${index}`}
                            objectFit="cover"
                            position="absolute"
                            top={0}
                            left={0}
                            w="full"
                            h="full"
                            borderRadius="xl"
                            zIndex={index === currentIndex ? 1 : 0}
                            animate={{
                                opacity: index === currentIndex ? 1 : 0,
                                scale: index === currentIndex ? 1 : 1.05,
                            }}
                            transition={{ duration: 1 }}
                        />
                    ))}
                </MotionBox>
            </MotionFlex>
        </MotionBox>
    );
};

export default HeroSection;
