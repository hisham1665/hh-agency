import React, { useState, Suspense, lazy, useEffect } from 'react';
import {
  Box,
  Flex,
  Stack,
  Spinner,
  useBreakpointValue,
} from '@chakra-ui/react';
import AddProductForm from '../components/InventoryPageWidgets/AddProduct';
import SearchWithSuggestions from '../components/InventoryPageWidgets/SearchWithSugggestion';
import axios from 'axios';
import PopupForm from '../components/InventoryPageWidgets/AddCatagory';

const Inventory_list = lazy(() =>
  import('../components/InventoryPageWidgets/Product_list')
);

function InventoryPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const flexDirection = useBreakpointValue({
    base: 'column',
    md: 'row',
  });

  const isMobile = useBreakpointValue({ base: true, md: false });

  const fetchProducts = async () => {
    try {
      const url = searchQuery
        ? `/api/product/get-products?q=${searchQuery}`
        : '/api/product/get-products';
      const res = await axios.get(url);
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchProducts();
  }, [searchQuery]);

  if (loading) return <Spinner size="lg" color="blue.500" />;

  return (
    <Flex w="full" p={4} direction={flexDirection} gap={6}>
      {/* Left Section: Search, AddProduct (on mobile), and Product List */}
      <Box flex="1">
        <Box mb={4}>
          <SearchWithSuggestions setSearchQuery={setSearchQuery} />
        </Box>
        {/* Show AddProductForm below search and above list on mobile */}
        {isMobile && (
          <Box mb={4}>
            <AddProductForm />
            <Box mt={4}>
              <PopupForm /> {/* Button will now be placed inside a Box with margin */}
            </Box>
          </Box>
        )}

        <Box>
          <Stack spacing={4}>
            <Suspense fallback={<Spinner size="lg" color="blue.500" />}>
              <Inventory_list products={products} refreshProducts={fetchProducts}  />
            </Suspense>
          </Stack>
        </Box>
      </Box>

      {/* Right Section: AddProductForm only for desktop/tablet */}
      {!isMobile && (
        <Box flex={{ base: '1', md: '0.6' }} minW="300px">
          <AddProductForm />
          <Box mt={4}>
            <PopupForm /> {/* Button will now be placed inside a Box with margin */}
          </Box>
        </Box>
      )}
    </Flex>
  );
}

export default InventoryPage;
