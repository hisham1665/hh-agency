import React, { useState, useEffect } from 'react';
import {
  Box,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Heading,
  Text,
  VStack,
  Stack,
  Button,
  Flex,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { motion } from "framer-motion";
import { FaWhatsapp } from 'react-icons/fa';



const MotionBox = motion.create(Box);

function Cards_product({ product = [], getCategoryImage }) {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 20;
  const bgColorCard = useColorModeValue('white', 'gray.700');
  const bgColor = useColorModeValue('gray.700', 'white');
  const totalPages = Math.ceil(product.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedProducts = product.sort(() => 0.5 - Math.random()).slice(startIndex, endIndex);
  useEffect(() => {
    setCurrentPage(1); // Reset page whenever the product list changes
  }, [product]);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const getVisiblePageNumbers = (currentPage, totalPages, maxVisiblePages = 5) => {
    if (totalPages <= maxVisiblePages) {
      return [...Array(totalPages)].map((_, i) => i + 1);
    }

    const pages = [];
    const sidePages = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(1, currentPage - sidePages);
    let endPage = Math.min(totalPages, currentPage + sidePages);

    if (startPage === 1) {
      endPage = maxVisiblePages;
    } else if (endPage === totalPages) {
      startPage = totalPages - maxVisiblePages + 1;
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  if (product.length === 0) {
    return (
      <Text textAlign="center" fontSize="lg" color={useColorModeValue("gray.800", "gray.100")}>
        No products found.
      </Text>
    );
  }

  return (
    <MotionBox
      key={product.length} // key forces animation on product list changes
      initial={{ opacity: 0, y: 70 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Box p={5} width="100%">
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
          spacing={6}
          width="100%"
          justifyItems="center"
        >
          {paginatedProducts.map((product) => (
            <Card
              key={product._id}
              width={'100%'}
              maxW="260px"
              borderRadius="2xl"
              boxShadow="lg"
              bg={bgColorCard}
              color={bgColor}
              overflow="hidden"
              _hover={{
                bg: useColorModeValue('gray.100', 'gray.600'),
                boxShadow: 'xl',
                transform: 'scale(1.05)',
                transition: 'all 0.3s ease',
              }}
            >
              <VStack spacing={0} align="stretch">
                <Image
                  marginTop={5}
                  src={getCategoryImage(product.Product_Catogory)}
                  alt={product.Product_Catogory}
                  height="200px"
                  width="100%"
                  objectFit="contain"
                  borderRadius="2xl"
                />
                <CardHeader pb={0}>
                  <Heading size="md" noOfLines={2} minHeight="48px">
                    {product.Product_name}
                  </Heading>
                </CardHeader>

                <CardBody pt={1} pb={1}>
                  <Text fontSize="sm" color={bgColor} >
                    Category: <b>{product.Product_Catogory}</b>
                  </Text>
                </CardBody>
                <Box flex="1" minH="20px" />
                <CardFooter pt={5} pb={2} px={4}>
                  <Flex justify="space-between" align="center" width="100%">
                    <Text fontSize="2xl" fontWeight="bold">
                      ₹{product.Product_price}
                    </Text>
                    <Button
                      colorScheme="green"
                      size="xl"
                      onClick={(e) => {
                        e.stopPropagation();
                        const phoneNumber = '919349818253';
                        const message = encodeURIComponent(
                          `Hello! I'm interested in ${product.Product_name} from category ${product.Product_Catogory}. Please share more details.`
                        );
                        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
                      }}
                    >
                      <FaWhatsapp size={35} />
                    </Button>
                  </Flex>
                </CardFooter>
              </VStack>
            </Card>
          ))}
        </SimpleGrid>

        {/* Numbered Pagination */}
        <Flex justify="center" mt={8}>
          <HStack spacing={2} wrap="wrap">
            <Button
              onClick={handlePrev}
              isDisabled={currentPage === 1}
              size="sm"
              variant="ghost"
            >
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i + 1}
                onClick={() => handlePageClick(i + 1)}
                size="sm"
                variant={currentPage === i + 1 ? 'solid' : 'ghost'}
                colorScheme={currentPage === i + 1 ? 'blue' : 'gray'}
              >
                {i + 1}
              </Button>
            ))}
            <Button
              onClick={handleNext}
              isDisabled={currentPage === totalPages}
              size="sm"
              variant="ghost"
            >
              Next
            </Button>
          </HStack>
        </Flex>
      </Box>
    </MotionBox>
  );
}

export default Cards_product;
