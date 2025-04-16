import React, { useState } from 'react';
import SidebarNav from '../components/BussinessComponents/SideBarNav';
import BillsList from '../components/BussinessComponents/BillsList';
import {
  Box,
  Flex,
  Input,
  Select,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';

// Imports unchanged
const BusinessPage = () => {
  const [view, setView] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchFilter, setSearchFilter] = useState('all');
  const [triggerSearch, setTriggerSearch] = useState(false);

  const bg = useColorModeValue('gray.100', 'linear-gradient(to bottom right, #1e1e2f, #2d2d44)');

  const handleSearch = () => setTriggerSearch(prev => !prev);

  return (
    <Box minH="100vh" bg={bg}>
      {/* Header Search Bar */}
      <Box p={4} bg={useColorModeValue('white', 'gray.800')} boxShadow="md" position="sticky" top="0" zIndex={10}>
        <Flex gap={4} align="center" flexWrap="wrap">
          <Input placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} w={{ base: '100%', sm: '250px' }} />
          <Select value={searchFilter} onChange={(e) => setSearchFilter(e.target.value)} w={{ base: '100%', sm: '200px' }}>
            <option value="all">All</option>
            <option value="Customer_name">Customer Name</option>
            <option value="Product_Name">Product Name</option>
            <option value="Product_Price">Product Price</option>
          </Select>
          <Button colorScheme="blue" onClick={handleSearch} w={{ base: 'full', sm: 'auto' }}>
            Search
          </Button>
        </Flex>
      </Box>

      <Flex direction={{ base: 'column', md: 'row' }}>
        <SidebarNav currentView={view} onChangeView={setView} />
        <Box flex="1" p={{ base: 4, md: 6 }} overflowY="auto">
          <BillsList view={view} searchTerm={searchTerm} searchFilter={searchFilter} triggerSearch={triggerSearch} />
        </Box>
      </Flex>
    </Box>
  );
};

export default BusinessPage;
