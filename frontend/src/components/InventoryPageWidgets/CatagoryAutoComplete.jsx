import React, { useState, useEffect, useRef } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  List,
  ListItem,
  Spinner,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';
import axios from 'axios';

const CategoryAutocomplete = ({ value, onChange }) => {
  const [input, setInput] = useState(value || '');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const listRef = useRef(null);

  const bgColor = useColorModeValue('white', 'gray.800');
  const itemHoverBg = useColorModeValue('gray.100', 'blue.600');
  const itemTextColor = useColorModeValue('black', 'white');
  const borderColor = useColorModeValue('gray.300', 'gray.600');

  const fetchCategories = async (query = '') => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/catagory/get-catagory?q=${query}`);
      setSuggestions(res.data || []);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchCategories(input);
    }, 300);

    return () => clearTimeout(debounce);
  }, [input]);
  useEffect(() => {
    setInput(value || '');
  }, [value]);
  const handleFocus = () => {
    setShowSuggestions(true);
    fetchCategories('');
  };

  const handleSelect = (categoryName) => {
    setInput(categoryName);
    onChange(categoryName);
    setShowSuggestions(false);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === 'Enter') {
      if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
        e.preventDefault();
        handleSelect(suggestions[highlightedIndex].Catagory_name);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  return (
    <FormControl isRequired position="relative">
      <FormLabel>Category</FormLabel>
      <InputGroup>
        <Input
          placeholder="Type to search category"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={handleFocus}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          onKeyDown={handleKeyDown}
          bg={bgColor}
          color={itemTextColor}
          borderColor={borderColor}
        />
        {loading && (
          <InputRightElement>
            <Spinner size="sm" />
          </InputRightElement>
        )}
      </InputGroup>

      {showSuggestions && suggestions.length > 0 && (
        <Box
          position="absolute"
          width="100%"
          bg={bgColor}
          border="1px solid"
          borderColor={borderColor}
          mt={1}
          borderRadius="md"
          boxShadow="lg"
          zIndex="20"
          maxH="150px"
          overflowY="auto"
          ref={listRef}
        >
          <List spacing={0}>
            {suggestions.map((cat, idx) => (
              <ListItem
                key={idx}
                px={4}
                py={2}
                color={itemTextColor}
                bg={highlightedIndex === idx ? itemHoverBg : 'transparent'}
                cursor="pointer"
                onMouseEnter={() => setHighlightedIndex(idx)}
                onClick={() => handleSelect(cat.Catagory_name)}
              >
                {cat.Catagory_name}
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </FormControl>
  );
};

export default CategoryAutocomplete;
