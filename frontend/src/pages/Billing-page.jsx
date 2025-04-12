import React from "react";
import { Box, Container, Heading, VStack, useToast } from "@chakra-ui/react";
import CustomerForm from "../components/BillingComponents/CustomerForm";
import ProductEntry from "../components/BillingComponents/ProductEntry";
import ProductTable from "../components/BillingComponents/ProductTable";
import SubmitBillButton from "../components/BillingComponents/SubmitBillButton";
import { AnimatePresence, motion } from "framer-motion";
import HeaderInfo from "../components/BillingComponents/HeaderInfo";

const MotionBox = motion(Box);

const BillingPage = () => {
  const [customer, setCustomer] = React.useState({ name: "", phone: "" });
  const [products, setProducts] = React.useState([]);
  const toast = useToast();

  const handleAddProduct = (product) => {
    setProducts([...products, product]);
  };

  const handleUpdateProduct = (updatedProduct, index) => {
    const updatedList = [...products];
    updatedList[index] = updatedProduct;
    setProducts(updatedList);
  };

  const handleDeleteProduct = (index) => {
    const updatedList = products.filter((_, i) => i !== index);
    setProducts(updatedList);
  };

  const handleSubmitBill = () => {
    toast({
      title: "Bill submitted successfully!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    setCustomer({ name: "", phone: "" });
    setProducts([]);
  };

  return (
    <Container maxW="container.lg" py={6}>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
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
          />
          {products.length > 0 && (
            <SubmitBillButton onSubmit={handleSubmitBill} />
          )}
        </VStack>
      </MotionBox>
    </Container>
  );
};

export default BillingPage;
