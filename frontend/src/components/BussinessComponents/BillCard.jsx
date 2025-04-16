import {
  Box,
  Text,
  Badge,
  useColorModeValue,
  useDisclosure,
  Button,
  Stack,
  Flex,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import BillDetailsModal from './BillDetailsModal';
import { useState } from 'react';
import UpdatePaymentModal from './UpdatePaymentModal';
const MotionBox = motion(Box);

const BillCard = ({ bill }) => {
  const cardBg = useColorModeValue('white', 'gray.700');
  const [selectedBill, setSelectedBill] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const handleOpenModal = (bill) => {
    setSelectedBill(bill);
    onOpen();
  };
  const handleUpdatePayement = (bill) => {
    console.log(bill);
  }
  const handleOpenPaymentModal = (bill) => {
    setSelectedBill(bill);
    setIsPaymentModalOpen(true);
  };
  const handlePaymentUpdated = (updatedBill) => {
    // You can update your bill list here if needed
    setSelectedBill(updatedBill);
  };
  return (
    <>
      <MotionBox
        p={5}
        borderRadius="xl"
        boxShadow="lg"
        bg={cardBg}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 250 }}
        w="full"
      >
        <Stack spacing={3}>
          <Text fontWeight="bold" fontSize="lg">#{bill.Bill_ID}</Text>
          <Text>Customer: {bill.Customer_name}</Text>
          <Text>Grand Total: ₹{bill.Grand_total.toFixed(2)}</Text>
            <Badge fontSize={'sm'} colorScheme={bill.isPaid ? 'green' : 'red'} w="fit-content">
              {bill.isPaid ? 'Paid' : `Balance : ₹${bill.Balance_Amount.toFixed(2)}`}
            </Badge>
          <Flex justify={'space-between'}>
            <Button onClick={() => handleOpenModal(bill)} colorScheme="blue" size="sm" w={{ base: 'full', md: 'fit-content' }}>
              View Details
            </Button>
            {
              bill.isPaid == false ? (
                <Button onClick={() => handleOpenPaymentModal(bill)} colorScheme="green" size="sm" w={{ base: 'full', md: 'fit-content' }}>
                  Update payment
                </Button>
              ) : null
            }

          </Flex>
        </Stack>
      </MotionBox>

      {selectedBill && (
        <BillDetailsModal isOpen={isOpen} onClose={onClose} bill={selectedBill} />
      )}
      {selectedBill && (
        <UpdatePaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          bill={selectedBill}
          onPaymentUpdated={handlePaymentUpdated}
        />
      )}

    </>
  );
};

export default BillCard;
