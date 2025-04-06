import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  useToast,
} from '@chakra-ui/react';
import CategoryAutocomplete from './CatagoryAutoComplete';


const AddProductForm = () => {
  const [formData, setFormData] = useState({
    Product_name: '',
    Product_price: '',
    Wholesale_price: '',
    Product_Catogory: '',
  });

  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.Product_name || !formData.Product_price || !formData.Wholesale_price || !formData.Product_Catogory) {
      toast({
        title: 'Please fill out all fields',
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
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
        position: 'top-right',
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
        position: 'top-right',
      });
    }
  };
  
  return (
    <Box maxW="lg" mx="auto" mt={10} p={6} borderWidth={1} borderRadius="xl" boxShadow="lg" position="relative">
      <Heading mb={6} textAlign="center">
        Add New Product
      </Heading>
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
            <FormLabel>Purchasing price</FormLabel>
            <Input
              type="number"
              name="Wholesale_price"
              placeholder="Enter price"
              value={formData.Wholesale_price}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Retailing Price</FormLabel>
            <Input
              type="number"
              name="Product_price"
              placeholder="Enter price"
              value={formData.Product_price}
              onChange={handleChange}
            />
          </FormControl>

          <CategoryAutocomplete 
             value={formData.Product_Catogory}
             onChange={(value) =>
               setFormData((prev) => ({ ...prev, Product_Catogory: value }))
             }
          />

          <Button type="submit" colorScheme="blue" width="full">
            Add Product
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default AddProductForm;
