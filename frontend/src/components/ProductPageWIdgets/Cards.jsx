import React, { useState } from 'react';
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
} from '@chakra-ui/react';

function Cards_product({ product = [], getCategoryImage }) {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 20;

  const totalPages = Math.ceil(product.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedProducts = product.sort(() => 0.5 - Math.random()).slice(startIndex, endIndex);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  if (!product || product.length === 0) {
    return (
      <Text textAlign="center" fontSize="lg" color="gray.500">
        No products found.
      </Text>
    );
  }
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

  return (
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
            bg="gray.700"
            color="white"
            overflow="hidden"
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

              <CardHeader pb={1}>
                <Heading size="md" noOfLines={2}>
                  {product.Product_name}
                </Heading>
              </CardHeader>

              <CardBody pt={1} pb={2}>
                <Text fontSize="sm" color="gray.300">
                  Category: <b>{product.Product_Catogory}</b>
                </Text>
                <Text fontSize="xl" fontWeight="bold" mt={2}>
                  ₹{product.Product_price}
                </Text>
              </CardBody>

              <CardFooter pt={0} pb={4} px={4}>
                <Stack direction="row" spacing={3} width="100%">
                  <Button colorScheme="blue" size="sm" flex={1}>
                    Buy now
                  </Button>
                  <Button variant="outline" colorScheme="blue" size="sm" flex={1}>
                    Add to cart
                  </Button>
                </Stack>
              </CardFooter>
            </VStack>
          </Card>
        ))}
      </SimpleGrid>

      {/* Numbered Pagination */}
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
  );
}

export default Cards_product;
