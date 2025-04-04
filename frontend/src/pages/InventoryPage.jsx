import React, { Suspense, lazy } from 'react';
import {
  Box,
  Flex,
  Stack,
  Spinner,
  useBreakpointValue,
} from '@chakra-ui/react';
import AddProductForm from '../components/InventoryPageWidgets/AddProduct';
import SearchWithSuggestions from '../components/InventoryPageWidgets/SearchWithSugggestion';

// Lazy-load Inventory_list
const Inventory_list = lazy(() =>
  import('../components/InventoryPageWidgets/Product_list')
);

function InventoryPage() {
  // Responsive direction for mobile/tablet
  const flexDirection = useBreakpointValue({
    base: 'column',
    md: 'row',
  });

  return (
    <Flex w="full" p={4} direction={flexDirection} gap={6}>
      {/* Left Panel: Search + Inventory List */}
      <Box flex="1">
        <Box mb={4}>
          <SearchWithSuggestions />
        </Box>

        <Box>
          <Stack spacing={4}>
            {/* Lazy load list */}
            <Suspense fallback={<Spinner size="lg" color="blue.500" />}>
              <Inventory_list />
              <Inventory_list />
              <Inventory_list />
              <Inventory_list />
              <Inventory_list />
            </Suspense>
          </Stack>
        </Box>
      </Box>

      {/* Right Panel: Add Product Form */}
      <Box flex={{ base: '1', md: '0.6' }} minW="300px">
        <AddProductForm />
      </Box>
    </Flex>
  );
}

export default InventoryPage;
