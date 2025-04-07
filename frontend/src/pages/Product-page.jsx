import React, { useEffect, useState } from 'react';
import Cards_product from '../components/ProductPageWIdgets/Cards';
import { SimpleGrid, Box, Spinner, Center } from '@chakra-ui/react';
import axios from 'axios';
import SearchWithSuggestions from '../components/InventoryPageWidgets/SearchWithSugggestion';

function Product() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      try {
        const productURL = searchQuery
          ? `http://localhost:5000/api/product/get-products?q=${searchQuery}`
          : 'http://localhost:5000/api/product/get-products';

        const [productRes, categoryRes] = await Promise.all([
          axios.get(productURL),
          axios.get('http://localhost:5000/api/catagory/get-catagory'),
        ]);

        setProducts(productRes.data);
        setCategories(categoryRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsAndCategories();
  }, [searchQuery]);

  const getCategoryImage = (productCategory) => {
    const category = categories.find(
      (cat) => cat.Catagory_name === productCategory
    );
    return (
      category?.Catagory_Image ||
      'https://via.placeholder.com/260x280.png?text=No+Image'
    );
  };

  if (loading) {
    return (
      <Center minH="60vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Box p={4}>
      <Box marginBottom={5}>
        
      <SearchWithSuggestions setSearchQuery={setSearchQuery} />
      </Box>
      <Cards_product product={products} getCategoryImage={getCategoryImage} />
    </Box>
  );
}

export default Product;
