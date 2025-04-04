import React, { useState } from 'react';
import {
  Box,
  Input,
  VStack,
  Text,
  Heading,
  List,
  ListItem,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const SearchWithSuggestions = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // Sample data — replace this with your product list or fetch from backend
  const productList = [
    'Sofa',
    'Chair',
    'Dining Table',
    'LED TV',
    'Laptop',
    'T-shirt',
    'Tomato',
    'Potato',
    'Smartphone',
    'Sneakers',
    'Couch',
  ];

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === '') {
      setSuggestions([]);
    } else {
      const filtered = productList.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    }
  };

  const handleSuggestionClick = (value) => {
    setQuery(value);
    setSuggestions([]);
  };

  return (
    <Box maxW="lg" mx="auto" mt={10}>
      <Heading mb={4} textAlign="center">Search Products</Heading>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.400" />
        </InputLeftElement>
        <Input
          placeholder="Search for products..."
          value={query}
          onChange={handleInputChange}
          autoComplete="off"
        />
      </InputGroup>

      {suggestions.length > 0 && (
        <List borderWidth="1px" borderRadius="md" mt={2} maxH="200px" overflowY="auto">
          {suggestions.map((item, index) => (
            <ListItem
              key={index}
              px={4}
              py={2}
              _hover={{ backgroundColor: 'gray.100', cursor: 'pointer' }}
              onClick={() => handleSuggestionClick(item)}
            >
              {item}
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default SearchWithSuggestions;
