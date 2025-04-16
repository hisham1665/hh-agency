import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Box,
    Text,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Button,
    useColorModeValue,
    Divider,
    VStack,
    HStack,
    Badge,
    Stack
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaPrint } from 'react-icons/fa';
import { useRef } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import InvoicePdf from '../InvoicePdf';

const MotionModalContent = motion(ModalContent);

const BillDetailsModal = ({ isOpen, onClose, bill }) => {
    console.log(bill)
    const bgColor = useColorModeValue('white', 'gray.800');
    const textColor = useColorModeValue('gray.700', 'gray.100');
    const borderColor = useColorModeValue('gray.200', 'gray.600');
    const highlightColor = useColorModeValue('teal.600', 'teal.300');
    const printRef = useRef();
    if (!bill) return null;

    const totalPrice = bill.Billing_Products?.reduce((acc, item) => acc + (item.Product_Price * item.Product_QTY), 0) || 0;
    const grandTotal = bill.Grand_total || 0;
    const paidAmount = bill.Paid_amount || 0;
    const discount = totalPrice - grandTotal;
    const balance = grandTotal - paidAmount;
    const paymentMethod = bill.Payment_Method || 'N/A';

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="4xl" isCentered motionPreset="slideInBottom">
            <ModalOverlay />
            <MotionModalContent
                ref={printRef}
                bg={bgColor}
                color={textColor}
                borderRadius="2xl"
                boxShadow="2xl"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <ModalHeader fontSize="2xl" fontWeight="bold">
                    Invoice #{bill.Bill_ID}
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack align="start" spacing={4}>
                        <HStack justify="space-between" w="full">
                            <Box>
                                <Text fontWeight="bold">Customer Name:</Text>
                                <Text>{bill.Customer_name}</Text>
                            </Box>
                            <Box>
                                <Text fontWeight="bold">Status:</Text>
                                <Badge colorScheme={bill.isPaid ? 'green' : 'red'}>
                                    {bill.isPaid ? 'Paid' : 'Unpaid'}
                                </Badge>
                            </Box>
                            <Box>
                                <Text fontWeight="bold">Date:</Text>
                                <Text>{new Date(bill.Bill_Date).toLocaleDateString()}</Text>
                            </Box>
                        </HStack>

                        <Divider />

                        <Box w="full" overflowX="auto">
                            <Box minW="600px">
                                <Text fontWeight="bold" mb={2} fontSize="lg">Products</Text>
                                <Table variant="simple" size="sm">
                                    <Thead>
                                        <Tr>
                                            <Th>#</Th>
                                            <Th>Product Name</Th>
                                            <Th isNumeric>Price</Th>
                                            <Th isNumeric>Quantity</Th>
                                            <Th isNumeric>Total</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {Array.isArray(bill.Billing_Products) && bill.Billing_Products.map((product, index) => (
                                            <Tr key={index}>
                                                <Td>{index + 1}</Td>
                                                <Td>{product.Product_Name}</Td>
                                                <Td isNumeric>₹{product.Product_Price.toFixed(2)}</Td>
                                                <Td isNumeric>{product.Product_QTY}</Td>
                                                <Td isNumeric>₹{product.Product_Total.toFixed(2)}</Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                            </Box>
                        </Box>

                        <Divider />

                        {/* Financial Summary */}
                        <Box
                            w="full"
                            mt={4}
                            p={4}
                            borderWidth={1}
                            borderColor={borderColor}
                            borderRadius="lg"
                            bg={useColorModeValue('gray.50', 'gray.700')}
                        >
                            <Text fontWeight="bold" fontSize="lg" mb={2} color={highlightColor}>
                                Billing Summary
                            </Text>
                            <Stack spacing={2} fontSize="md">
                                <HStack justify="space-between">
                                    <Text>Total Price:</Text>
                                    <Text fontWeight="semibold">₹{totalPrice.toFixed(2)}</Text>
                                </HStack>
                                <HStack justify="space-between">
                                    <Text>Discount:</Text>
                                    <Text fontWeight="semibold">₹{discount.toFixed(2)}</Text>
                                </HStack>
                                <HStack justify="space-between">
                                    <Text fontSize="xl" fontWeight="bold">Grand Total:</Text>
                                    <Text fontSize="xl" fontWeight="bold" color={highlightColor}>
                                        ₹{grandTotal.toFixed(2)}
                                    </Text>
                                </HStack>
                                <Divider />
                                <HStack justify="space-between">
                                    <Text>Paid Amount:</Text>
                                    <Text fontWeight="semibold">₹{paidAmount.toFixed(2)}</Text>
                                </HStack>
                                <HStack justify="space-between">
                                    <Text>Payment Method:</Text>
                                    <Text fontWeight="semibold">{paymentMethod}</Text>
                                </HStack>
                                <HStack justify="space-between">
                                    <Text>Balance:</Text>
                                    <Text fontWeight="semibold" color={balance > 0 ? 'red.400' : 'green.400'}>
                                        ₹{balance.toFixed(2)}
                                    </Text>
                                </HStack>
                            </Stack>
                        </Box>
                    </VStack>
                </ModalBody>
                <ModalFooter justifyContent="space-between">
                    <PDFDownloadLink
                        document={
                            <InvoicePdf
                                invoiceData={{
                                    clientName: bill.Customer_name,
                                    clientAddress: "Phone: " + bill.Customer_Number,
                                    invoiceNumber: bill.Bill_ID,
                                    date: new Date(bill.Bill_Date).toLocaleDateString(),
                                    time: bill.Bill_Time ? bill.Bill_Time : 'N/A',
                                    items: bill.Billing_Products.map(p => ({
                                        name: p.Product_Name,
                                        quantity: p.Product_QTY,
                                        unitPrice: p.Product_Price,
                                    })),
                                    total: bill.Billing_Products.reduce(
                                        (acc, item) => acc + item.Product_Price * item.Product_QTY,
                                        0
                                    ),
                                    discount: bill.Billing_Products.reduce(
                                        (acc, item) => acc + item.Product_Price * item.Product_QTY,
                                        0
                                    ) - bill.Grand_total,
                                    grandTotal: bill.Grand_total,
                                    paidAmount: bill.Paid_amount,
                                    balance: bill.Grand_total - bill.Paid_amount,
                                    paymentMethod: bill.Payment_Method,
                                    saleMan: bill.Sale_Man,
                                    isPaid: bill.isPaid,
                                }}
                            />
                        }
                        fileName={`Invoice_${bill.Customer_name}_${bill.Bill_ID}.pdf`}
                        style={{ textDecoration: 'none' }}
                    >
                        {({ loading }) => (
                            <Button
                                colorScheme="teal"
                                leftIcon={<FaPrint />}
                                isLoading={loading}
                                loadingText="Generating"
                                size="md"
                                px={6}
                                py={2}
                                fontWeight="bold"
                                borderRadius="lg"
                                shadow="md"
                                _hover={{
                                    bg: "teal.500",
                                    boxShadow: "xl",
                                    transform: "translateY(-1px)",
                                }}
                                _active={{
                                    bg: "teal.600",
                                }}
                            >
                                Download Invoice PDF
                            </Button>
                        )}
                    </PDFDownloadLink>

                    <Button onClick={onClose} variant="ghost" size="md">
                        Close
                    </Button>
                </ModalFooter>
            </MotionModalContent>
        </Modal>
    );
};

export default BillDetailsModal;
