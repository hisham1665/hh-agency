import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    useToast,
    FormControl,
    FormLabel,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';

const UpdatePaymentModal = ({ isOpen, onClose, bill, onPaymentUpdated }) => {
    const [amount, setAmount] = useState('');
    const toast = useToast();
    console.log(bill.Balance_Amount) // checked its okay
    useEffect(() => {
        if (isOpen && bill) {
            setAmount(bill.Balance_Amount?.toFixed(2) || '');
        }
    }, [isOpen]);

    const handlePaymentUpdate = async () => {
        const enteredAmount = parseFloat(amount);
        const currentBalance = parseFloat(bill.Balance_Amount);

        if (isNaN(enteredAmount) || enteredAmount <= 0) {
            toast({ title: 'Invalid amount.', status: 'error' });
            return;
        }

        const updatedFields = {
            Balance_Amount: enteredAmount >= currentBalance ? 0 : currentBalance - enteredAmount,
            isPaid: enteredAmount >= currentBalance,
        };

        try {
            const response = await axios.put(`http://localhost:5000/api/bills/updateBalance/${bill.Bill_ID}`, updatedFields);
            toast({ title: 'Payment updated.', status: 'success' });
            onPaymentUpdated(response.data); // assuming your API returns the updated bill
            onClose();
        } catch (error) {
            console.error('Payment update failed:', error);
            toast({ title: 'Failed to update payment.', status: 'error' });
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size={{ base: 'xs', md: 'md' }}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Update Payment</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel>Enter amount</FormLabel>
                        <Input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />

                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="green" mr={3} onClick={handlePaymentUpdate}>
                        Submit
                    </Button>
                    <Button variant="ghost" onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default UpdatePaymentModal;
