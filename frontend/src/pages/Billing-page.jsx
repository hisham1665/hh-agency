import React, { useState } from "react";
import {
  Box,
  Container,
  Heading,
  VStack,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  RadioGroup,
  Stack,
  Radio,
  Input,
  Text,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import CustomerForm from "../components/BillingComponents/CustomerForm";
import ProductEntry from "../components/BillingComponents/ProductEntry";
import ProductTable from "../components/BillingComponents/ProductTable";
import SubmitBillButton from "../components/BillingComponents/SubmitBillButton";
import { motion } from "framer-motion";
import HeaderInfo from "../components/BillingComponents/HeaderInfo";
import axios from "axios";
import { useAuth } from '../context/AuthContext';
const MotionBox = motion.create(Box);

const BillingPage = () => {
  const { userName } = useAuth()
  const [customer, setCustomer] = useState({ name: "", phone: "" });
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [amountGiven, setAmountGiven] = useState("");
  const [changeOrDebt, setChangeOrDebt] = useState(null);
  const [isPaid, setIsPaid] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleAddProduct = (product) => setProducts([...products, product]);

  const handleUpdateProduct = (updatedProduct, index) => {
    const updatedList = [...products];
    updatedList[index] = updatedProduct;
    setProducts(updatedList);
  };

  const handleTotal = (total, discount, grand) => {
    setTotal(total);
    setDiscountAmount(discount);
    setGrandTotal(grand);
  };

  const handleDeleteProduct = (index) => {
    const updatedList = products.filter((_, i) => i !== index);
    setProducts(updatedList);
  };

  const handleSubmitBill = async () => {
    onOpen();
  };

  const handleFinalSubmit = async () => {
    const given = parseFloat(amountGiven);
    const paidAmt = paymentMethod === "Cash" ? Math.min(given, grandTotal) : grandTotal;
    const isFullyPaid = paymentMethod === "Cash" ? given >= grandTotal : true;
    const balance = isFullyPaid ? 0 : grandTotal - paidAmt;
    setIsPaid(isFullyPaid);
    setChangeOrDebt(paymentMethod === "Cash"
      ? isFullyPaid
        ? `Change to return: ₹${(given - grandTotal).toFixed(2)}`
        : `Balance due: ₹${(grandTotal - given).toFixed(2)}`
      : null
    );

    try {
      const payload = {
        Bill_ID: Math.floor(Math.random() * 10000) + "" + new Date().toLocaleDateString('en-GB').replace(/\//g, '').slice(0, 6), // Generates ID like XXXXDDMMYY
        Customer_name: customer.name,
        Sale_Man: userName,
        Customer_Number: parseInt(customer.phone),
        Billing_Products: products,
        Bill_Total: total,
        Discount: discountAmount,
        Grand_total: grandTotal,
        isPaid: isFullyPaid,
        Paid_amount: paidAmt,
        Amount_Given: paymentMethod === "Cash" ? given : 0,
        Balance_Amount: balance,
        Payment_Method: paymentMethod,
        Bill_Date: new Date(),
        Bill_Time: new Date().toLocaleTimeString("en-IN", { hour12: false }),
      };
      console.log(payload);  // Add this just before the request in handleFinalSubmit
      await axios.post("http://localhost:5000/api/bills/create-bill", payload);

      toast({
        title: "Bill submitted successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position:'top-right',
      });

      // Reset all
      setCustomer({ name: "", phone: "" });
      setProducts([]);
      setAmountGiven("");
      setPaymentMethod("Cash");
      setIsPaid(false);
      setChangeOrDebt(null);
      onClose();
    } catch (error) {
      toast({
        title: "Error submitting bill",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position:'top-right',
      });
    }
  };
  const BGColor = useColorModeValue('white' , 'gray.800');
  return (
    <Container   maxW="container.lg" py={6} border={'1px'} borderColor={BGColor} borderRadius={'3xl'} backgroundColor={BGColor} boxShadow={'2xl'} >
      <MotionBox initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Heading mb={6} textAlign="center" fontSize={{ base: "2xl", md: "4xl" }}>
          HH Agency Billing Page
        </Heading>
        <VStack spacing={6} align="stretch">
          <HeaderInfo />
          <CustomerForm customer={customer} setCustomer={setCustomer} />
          <ProductEntry onAddProduct={handleAddProduct} />
          <ProductTable
            products={products}
            onDelete={handleDeleteProduct}
            onUpdate={handleUpdateProduct}
            onTotal={handleTotal}
          />
          {products.length > 0 && <SubmitBillButton onSubmit={handleSubmitBill} />}
        </VStack>
      </MotionBox>

      {/* Modal for Payment */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Complete Payment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <RadioGroup value={paymentMethod} onChange={setPaymentMethod}>
              <Stack spacing={4}>
                <Radio value="Cash">Cash</Radio>
                <Radio value="UPI">UPI</Radio>
              </Stack>
            </RadioGroup>

            {paymentMethod === "Cash" && (
              <Box mt={4}>
                <Text>Amount Given</Text>
                <Input
                  type="number"
                  value={amountGiven}
                  onChange={(e) => {
                    setAmountGiven(e.target.value);
                    setChangeOrDebt(null); // Reset when editing
                  }}
                  placeholder="Enter amount"
                />
              </Box>
            )}

            {changeOrDebt && (
              <Text mt={4} fontWeight="bold" color={isPaid ? "green.500" : "red.500"}>
                {changeOrDebt}
              </Text>
            )}
          </ModalBody>

          <ModalFooter>
            {!changeOrDebt ? (
              <>
                <Button
                  colorScheme="green"
                  mr={3}
                  onClick={() => {
                    const given = parseFloat(amountGiven);
                    const paidAmt = paymentMethod === "Cash" ? Math.min(given, grandTotal) : grandTotal;
                    const isFullyPaid = paymentMethod === "Cash" ? given >= grandTotal : true;
                    const balance = isFullyPaid ? 0 : grandTotal - paidAmt;

                    setIsPaid(isFullyPaid);
                    setChangeOrDebt(
                      paymentMethod === "Cash"
                        ? isFullyPaid
                          ? `Change to return: ₹${(given - grandTotal).toFixed(2)}`
                          : `Balance due: ₹${(grandTotal - given).toFixed(2)}`
                        : null
                    );
                  }}
                >
                  Proceed
                </Button>
                <Button variant="ghost" onClick={onClose}>
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button colorScheme="blue" mr={3} onClick={handleFinalSubmit}>
                  Submit
                </Button>
                <Button variant="ghost" onClick={onClose}>
                  Cancel
                </Button>
              </>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>

    </Container>
  );
};

export default BillingPage;
