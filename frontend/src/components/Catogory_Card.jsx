import React, { useState, useEffect } from 'react';
import {
    Box,
    Image,
    Text,
    Heading,
    Link,
    IconButton,
    useBreakpointValue,
    useColorModeValue,
    SimpleGrid,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

const CategoryCarousel = ({ catagories }) => {
    const navigate = useNavigate();
    const cardBg = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');
    const textColor = useColorModeValue('gray.900', 'white');

    // Responsive value: number of columns per row
    const columns = useBreakpointValue({ base: 2, sm: 3, md: 4, lg: 5 });

    const itemsPerPage = columns * 2; // two rows
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) =>
            prev + itemsPerPage >= catagories.length ? 0 : prev + itemsPerPage
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prev) =>
            prev - itemsPerPage < 0
                ? Math.floor((catagories.length - 1) / itemsPerPage) * itemsPerPage
                : prev - itemsPerPage
        );
    };

    // Auto-slide every 5 seconds
    useEffect(() => {
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, [catagories, itemsPerPage]);

    const currentItems = catagories.slice(currentIndex, currentIndex + itemsPerPage);

    const itemsToShow =
        currentItems.length < itemsPerPage
            ? [...currentItems, ...catagories.slice(0, itemsPerPage - currentItems.length)]
            : currentItems;

    return (
        <Box position="relative" width="100%" px={[2, 4, 6]} py={6}>
            {/* Left Arrow */}
            <IconButton
                icon={<ChevronLeftIcon />}
                position="absolute"
                left="0"
                top="50%"
                transform="translateY(-50%)"
                zIndex="1"
                onClick={prevSlide}
                aria-label="Previous"
                size="lg"
                variant="ghost"
            />

            {/* Cards Grid */}
            <SimpleGrid
                columns={columns}
                spacing={4}
                width="100%"
                mx="auto"
                justifyItems="center"
            >
                {itemsToShow.map((catagory, idx) => (
                    <Box
                        key={idx}
                        onClick={() => navigate(`/category/${catagory.Catagory_name}`)}
                        borderWidth="1px"
                        borderRadius="lg"
                        overflow="hidden"
                        bg={cardBg}
                        borderColor={borderColor}
                        shadow="sm"
                        cursor="pointer"
                        _hover={{ shadow: 'md', transform: 'scale(1.02)' }}
                        transition="all 0.2s"
                        width="100%"
                        maxW="180px"
                        mx="auto"
                    >
                        <Image
                            src={catagory.Catagory_Image}
                            alt={catagory.Catagory_name}
                            objectFit="cover"
                            width="100%"
                            height="140px"
                            p={3}
                            borderRadius="xl"
                            border="1px solid"
                            borderColor="gray.200"
                            boxShadow="sm"
                        />
                        <Box p={4}>
                            <Link _hover={{ textDecor: 'none' }}>
                                <Heading fontSize="md" mb={1} color={textColor} textAlign="center">
                                    {catagory.Catagory_name}
                                </Heading>
                            </Link>
                        </Box>
                    </Box>
                ))}
            </SimpleGrid>

            {/* Right Arrow */}
            <IconButton
                icon={<ChevronRightIcon />}
                position="absolute"
                right="0"
                top="50%"
                transform="translateY(-50%)"
                zIndex="1"
                onClick={nextSlide}
                aria-label="Next"
                size="lg"
                variant="ghost"
            />
        </Box>
    );
};

export default CategoryCarousel;
