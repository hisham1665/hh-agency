import React, { useEffect, useState , useRef } from 'react';
import {
  Box, Text, Stack, Heading, IconButton,
  useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,
  ModalBody, ModalFooter, Button, Input, useToast, FormControl, FormLabel, Flex , AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import axios from 'axios';

function Product_list({ products, refreshProducts }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit
  } = useDisclosure();
  
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete
  } = useDisclosure();
  
  const toast = useToast();
  const cancelRef = useRef();
  const [editForm, setEditForm] = useState({
    Product_name: '',
    Product_price: '',
    Product_Catogory: '',
  });
  const confirmDelete = async () => {
    try {
      console.log("Selected product to delete:", selectedProductId);

      await axios.delete(`http://localhost:5000/api/product/delete-product/${selectedProductId}`);
      toast({
        title: 'Product deleted.',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      refreshProducts(); // ✅ This properly refreshes the product list; // Refresh the product list
    } catch (error) {
      toast({
        title: 'Error deleting product',
        description: error.response?.data?.message || error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    } finally {
      onCloseDelete();
    }
  };

  const handleDeleteClick = (id) => {
    setSelectedProductId(id);
    onOpenDelete();
  };
  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setEditForm(product);
    onOpenEdit();
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleEditSave = async () => {
    try {
      await axios.put(`http://localhost:5000/api/product/update-product/${selectedProduct._id}`, editForm);
      toast({
        title: 'Product updated successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      onCloseEdit();
      refreshProducts(); // to re-fetch updated products
    } catch (error) {
      toast({
        title: 'Update failed',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  return (
    <Box>
      <Heading size="lg" mb={4}>Products Inventory</Heading>
      <Stack spacing={3}>
        {products.length > 0 ? products.map(product => (
          <Box
            key={product._id}
            p={4}
            borderWidth={1}
            borderRadius="md"
            boxShadow="sm"
            _hover={{ boxShadow: 'md' }}
            position="relative"
          >
            <Flex direction="column" position="absolute" top={2} right={2} gap={2}>
              <IconButton
                icon={<EditIcon />}
                aria-label="Edit product"
                colorScheme="yellow"
                size="sm"
                onClick={() => handleEditClick(product)}
              />
              <IconButton
                icon={<DeleteIcon />}
                aria-label="Delete product"
                colorScheme="red"
                size="sm"
                onClick={() => handleDeleteClick(product._id)}
              />
            </Flex>

            <Text fontSize="2xl" fontWeight="bold">{product.Product_name}</Text>
            <Text fontSize="lg">Category: {product.Product_Catogory}</Text>
            <Text fontSize="xl" fontWeight="bold" fontFamily="monospace">
              Price: ₹{product.Product_price}
            </Text>
          </Box>
        )) : (
          <Text textAlign="center" fontSize="lg" color="gray.500">
            No products found.
          </Text>
        )}
      </Stack>

      {/* EDIT MODAL */}
      <Modal isOpen={isOpenEdit} onClose={onCloseEdit}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={3}>
              <FormLabel>Product Name</FormLabel>
              <Input
                name="Product_name"
                value={editForm.Product_name}
                onChange={handleEditChange}
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Price</FormLabel>
              <Input
                type="number"
                name="Product_price"
                value={editForm.Product_price}
                onChange={handleEditChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Category</FormLabel>
              <Input
                name="Product_Catogory"
                value={editForm.Product_Catogory}
                onChange={handleEditChange}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleEditSave} colorScheme="blue" mr={3}>Save</Button>
            <Button variant="ghost" onClick={onCloseEdit}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <AlertDialog
        isOpen={isOpenDelete}
        leastDestructiveRef={cancelRef}
        onClose={onCloseDelete}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Product
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCloseDelete}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={confirmDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}

export default Product_list;
