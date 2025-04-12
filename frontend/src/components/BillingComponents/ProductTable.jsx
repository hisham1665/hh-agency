import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Input,
  Box,
  Checkbox,
  Text,
  Flex,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, CheckIcon } from "@chakra-ui/icons";

const ProductTable = ({ products, onDelete, onUpdate }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [applyDiscount, setApplyDiscount] = useState(false);

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditItem({ ...products[index] });
  };

  const handleSave = () => {
    if (editItem) {
      editItem.total = editItem.qty * editItem.price;
      onUpdate(editItem, editIndex);
    }
    setEditIndex(null);
    setEditItem(null);
  };

  const total = products.reduce((sum, p) => sum + p.total, 0);
  const discountedTotal = applyDiscount ? total * 0.95 : total;

  return (
    <Box>
      <Box overflowX={{ base: "auto", md: "unset" }}>
        <Table variant="simple" size="md" minW="700px">
          <Thead>
            <Tr>
              <Th>Sl. No</Th>
              <Th>Name</Th>
              <Th>Category</Th>
              <Th isNumeric>Price</Th>
              <Th isNumeric>Qty</Th>
              <Th isNumeric>Total</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.map((product, index) => (
              <Tr key={index}>
                <Td>{index + 1}</Td>
                <Td>
                  {editIndex === index ? (
                    <Input
                      value={editItem.name}
                      onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                    />
                  ) : (
                    product.name
                  )}
                </Td>
                <Td>
                  {editIndex === index ? (
                    <Input
                      value={editItem.category}
                      onChange={(e) => setEditItem({ ...editItem, category: e.target.value })}
                    />
                  ) : (
                    product.category
                  )}
                </Td>
                <Td isNumeric>
                  {editIndex === index ? (
                    <Input
                      type="number"
                      value={editItem.price}
                      onChange={(e) => setEditItem({ ...editItem, price: parseFloat(e.target.value) })}
                    />
                  ) : (
                    product.price
                  )}
                </Td>
                <Td isNumeric>
                  {editIndex === index ? (
                    <Input
                      type="number"
                      value={editItem.qty}
                      onChange={(e) => setEditItem({ ...editItem, qty: parseInt(e.target.value) })}
                    />
                  ) : (
                    product.qty
                  )}
                </Td>
                <Td isNumeric>{product.total}</Td>
                <Td>
                  {editIndex === index ? (
                    <IconButton
                      aria-label="Save"
                      icon={<CheckIcon />}
                      size="sm"
                      onClick={handleSave}
                      colorScheme="green"
                    />
                  ) : (
                    <>
                      <IconButton
                        aria-label="Edit"
                        icon={<EditIcon />}
                        size="sm"
                        mr={2}
                        onClick={() => handleEdit(index)}
                      />
                      <IconButton
                        aria-label="Delete"
                        icon={<DeleteIcon />}
                        size="sm"
                        colorScheme="red"
                        onClick={() => onDelete(index)}
                      />
                    </>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Discount and Total Section */}
      <Box mt={4}>
        <Checkbox
          isChecked={applyDiscount}
          onChange={(e) => setApplyDiscount(e.target.checked)}
          mb={2}
        >
          Apply 5% Discount
        </Checkbox>

        <Flex justify="space-between">
          <Text fontWeight="bold">Total:</Text>
          <Text className="text-4xl">₹ {total.toFixed(2)}</Text>
        </Flex>

        {applyDiscount && (
          <Flex justify="space-between" color="green.500" fontWeight="bold">
            <Text>Discounted Total:</Text>
            <Text className="text-xl">₹ {discountedTotal.toFixed(2)}</Text>
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default ProductTable;