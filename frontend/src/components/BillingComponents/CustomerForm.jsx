import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  HStack,
  Box,
} from "@chakra-ui/react";

const CustomerForm = ({ customer, setCustomer }) => {
  return (
    <HStack spacing={4} flexWrap="wrap">
      <Box flex={1} minW="250px">
        <FormControl isRequired>
          <FormLabel>Customer Name</FormLabel>
          <Input
            placeholder="Enter name"
            value={customer.name}
            onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
          />
        </FormControl>
      </Box>
      <Box flex={1} minW="250px">
        <FormControl isRequired>
          <FormLabel>Phone Number</FormLabel>
          <Input
            placeholder="Enter phone"
            type="tel"
            value={customer.phone}
            onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
          />
        </FormControl>
      </Box>
    </HStack>
  );
};

export default CustomerForm;
