import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  Heading,
  useToast,
} from '@chakra-ui/react';

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    Product_name: '',
    Product_price: '',
    Product_Catogory: '',
  });

  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.Product_name || !formData.Product_price || !formData.Product_Catogory) {
      toast({
        title: 'Please fill out all fields',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/product/createProduct', formData);

      toast({
        title: 'Product added.',
        description: `Successfully added ${response.data.name}`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      setFormData({
        Product_name: '',
        Product_price: '',
        Product_Catogory: '',
      });
    } catch (error) {
      toast({
        title: 'Error adding product',
        description: error.response?.data?.message || error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }

  };

  return (
    <Box maxW="lg" mx="auto" mt={10} p={6} borderWidth={1} borderRadius="xl" boxShadow="lg">
      <Heading mb={6} textAlign="center">Add New Product</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Product Name</FormLabel>
            <Input
              name="Product_name"
              placeholder="Enter product name"
              value={formData.Product_name}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Price</FormLabel>
            <Input
              type="number"
              name="Product_price"
              placeholder="Enter price"
              value={formData.Product_price}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Category</FormLabel>
            <Select
              name="Product_Catogory"
              placeholder="Select category"
              value={formData.Product_Catogory}
              onChange={handleChange}
            >
              <option value="furniture">Furniture</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="vegetables">Vegetables</option>
            </Select>
          </FormControl>

          <Button type="submit" colorScheme="blue" width="full">
            Add Product
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default AddProductForm;
