import React, { useEffect, useState } from 'react';
import { SimpleGrid, Text, Spinner, Center } from '@chakra-ui/react';
import BillCard from './BillCard';
import axios from 'axios';

const BillsList = ({ view, searchTerm, searchFilter, triggerSearch }) => {
  const [bills, setBills] = useState([]);
  const [filteredBills, setFilteredBills] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAPIEndpoint = () => {
    if (view === 'paid') return 'http://localhost:5000/api/bills/paidBills';
    if (view === 'unpaid') return 'http://localhost:5000/api/bills/unpaidBills';
    return 'http://localhost:5000/api/bills/allBills';
  };

  const matchesSearch = (bill) => {
    const term = searchTerm.toLowerCase();

    if (!term) return true;

    switch (searchFilter) {
      case 'Customer_name':
        return bill.Customer_name?.toLowerCase().includes(term);
      case 'Product_Name':
        return bill.Billing_Products.some(product =>
          product.Product_Name.toLowerCase().includes(term)
        );
      case 'Product_Price':
        return bill.Billing_Products.some(product =>
          product.Product_Price.toString().includes(term)
        );
      case 'all':
        return (
          bill.Customer_name?.toLowerCase().includes(term) ||
          bill.Billing_Products.some(product =>
            product.Product_Name.toLowerCase().includes(term) ||
            product.Product_Price.toString().includes(term)
          )
        );
      default:
        return true;
    }
  };

  const fetchBills = async () => {
    try {
      setLoading(true);
      const res = await axios.get(getAPIEndpoint());
      setBills(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching bills:', error);
    }
  };

  useEffect(() => {
    fetchBills();
  }, [view]);

  useEffect(() => {
    const result = bills.filter(matchesSearch);
    setFilteredBills(result);
  }, [searchTerm, searchFilter, bills, triggerSearch]);

  if (loading) {
    return (
      <Center mt={10}>
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <SimpleGrid
      columns={{ base: 1, sm: 1, md: 2, lg: 3 }}
      spacing={6}
      w="full"
    >
      {filteredBills.length > 0 ? (
        filteredBills.map((bill) => <BillCard key={bill._id} bill={bill} />)
      ) : (
        <Text>No matching bills found.</Text>
      )}
    </SimpleGrid>

  );
};

export default BillsList;
