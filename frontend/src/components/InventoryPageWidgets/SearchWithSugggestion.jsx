import { InputGroup, Input, InputLeftElement, Box, Heading } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const SearchWithSuggestions = ({ setSearchQuery }) => {
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Box maxW="lg" mx="auto" mt={10} >
      <Heading mb={4} textAlign="center">Search Products   </Heading>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.400" />
        </InputLeftElement>
        <Input
          placeholder="Search products..."
          onChange={handleChange}
          variant="filled"
          />
      </InputGroup>
    </Box>
  );
};

export default SearchWithSuggestions;
