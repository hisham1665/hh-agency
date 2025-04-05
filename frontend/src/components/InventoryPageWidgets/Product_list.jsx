// components/InventoryPageWidgets/Product_list.jsx
import React, { useEffect, useState } from 'react';

import {
  Box,
  Text,
  Spinner,
  Stack,
  Heading,
  Badge,
} from '@chakra-ui/react';

function Product_list({ products }) {

  return (
    <Box>
      <Heading size="md" mb={3}>Product Inventory</Heading>
      <Stack spacing={3}>
        {products.map(product => (
          <Box
            key={product._id}
            p={4}
            borderWidth={1}
            borderRadius="md"
            boxShadow="sm"
            _hover={{ boxShadow: 'md' }}
          >
            <Text fontSize="2xl" fontWeight="bold">{product.Product_name}</Text>
            <Badge colorScheme="green">₹{product.Product_price }</Badge>
            <Text>Category: {product.Product_Catogory}</Text>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

export default Product_list;
