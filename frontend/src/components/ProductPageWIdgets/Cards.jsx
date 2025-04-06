import React, { useEffect, useState } from 'react';
import {
  Box,
  SimpleGrid,
  Spinner,
  Center,
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
} from '@chakra-ui/react';
import axios from 'axios';

function Cards_product() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      try {
        const [productRes, categoryRes] = await Promise.all([
          axios.get('http://localhost:5000/api/product/get-products'),
          axios.get('http://localhost:5000/api/catagory/get-catagory'),
        ]);

        setProducts(productRes.data);
        setCategories(categoryRes.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchProductsAndCategories();
  }, []);

  const getCategoryImage = (productCategory) => {
    const category = categories.find(cat => cat.Catagory_name === productCategory);
    return category?.Catagory_Image || 'https://via.placeholder.com/260x280.png?text=No+Image';
  };

  if (loading) {
    return (
      <Center minH="60vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Box p={5} width="100%">
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }} spacing={6}
        width="100%"
        justifyItems="center"
      >
        {products.map((product) => (
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
    </Box>
  );
}

export default Cards_product;
