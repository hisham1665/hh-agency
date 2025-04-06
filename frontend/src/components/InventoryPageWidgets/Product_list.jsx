import React, { useEffect, useState, useRef } from 'react';
import {
  Box, Text, Stack, Heading, IconButton,
  useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,
  ModalBody, ModalFooter, Button, Input, useToast, FormControl, FormLabel, Flex, AlertDialog,
  AlertDialogOverlay, AlertDialogContent, AlertDialogHeader,
  AlertDialogBody, AlertDialogFooter, HStack
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
    Wholesale_price: '',
    Product_Catogory: '',
  });

  // 🔢 PAGINATION STATE
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5; // Customize this value as needed

  // 🧮 Get paginated data
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => currentPage < totalPages && setCurrentPage(prev => prev + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(prev => prev - 1);

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/product/delete-product/${selectedProductId}`);
      toast({
        title: 'Product deleted.',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      refreshProducts();
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
      refreshProducts();
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
        {currentProducts.length > 0 ? currentProducts.map(product => (
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
              <IconButton icon={<EditIcon />} aria-label="Edit" colorScheme="yellow" size="sm" onClick={() => handleEditClick(product)} />
              <IconButton icon={<DeleteIcon />} aria-label="Delete" colorScheme="red" size="sm" onClick={() => handleDeleteClick(product._id)} />
            </Flex>
            <Text fontSize="2xl" fontWeight="bold">{product.Product_name}</Text>
            <Text fontSize="lg">Category: {product.Product_Catogory}</Text>
            <Flex justify="space-around">
              <Text fontSize="xl" fontWeight="bold" fontFamily="monospace">
                Purchasing Price: ₹{product.Wholesale_price}
              </Text>
              <Text fontSize="xl" fontWeight="bold" fontFamily="monospace">
                Retailing Price: ₹{product.Product_price}
              </Text>
            </Flex>
          </Box>
        )) : (
          <Text textAlign="center" fontSize="lg" color="gray.500">
            No products found.
          </Text>
        )}
      </Stack>

      {/* PAGINATION CONTROLS */}
      {products.length > productsPerPage && (
        <HStack spacing={2} mt={6} justify="center">
          <Button onClick={prevPage} isDisabled={currentPage === 1}>
            Previous
          </Button>
          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              colorScheme={currentPage === i + 1 ? 'blue' : 'gray'}
            >
              {i + 1}
            </Button>
          ))}
          <Button onClick={nextPage} isDisabled={currentPage === totalPages}>
            Next
          </Button>
        </HStack>
      )}
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
              <FormLabel>Purchasing Price</FormLabel>
              <Input
                type="number"
                name="Wholesale_price"
                value={editForm.Wholesale_price}
                onChange={handleEditChange}
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Retailing Price</FormLabel>
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
