import React, { useState , useEffect } from "react";
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

const ProductTable = ({ products, onDelete, onUpdate, onTotal }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [applyDiscount, setApplyDiscount] = useState(false);

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditItem({ ...products[index] });
  };

  const handleSave = () => {
    if (editItem) {
      editItem.Product_Total = editItem.Product_QTY * editItem.Product_Price;
      onUpdate(editItem, editIndex);
    }
    setEditIndex(null);
    setEditItem(null);
  };

  const total = products.reduce((sum, p) => sum + p.Product_Total, 0);
  const GrandTotal = applyDiscount ? total * 0.95 : total;
  const discountAmount = applyDiscount ? total * 0.05 : 0;
  useEffect(() => {
    onTotal(total , discountAmount , GrandTotal);
  }, [total, discountAmount, GrandTotal]);
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
                      value={editItem.Product_Name}
                      onChange={(e) => setEditItem({ ...editItem, Product_Name: e.target.value })}
                    />
                  ) : (
                    product.Product_Name
                  )}
                </Td>
                <Td>
                  {editIndex === index ? (
                    <Input
                      value={editItem.Product_Catagory}
                      onChange={(e) => setEditItem({ ...editItem,  Product_Catagory: e.target.value })}
                    />
                  ) : (
                    product.Product_Catagory
                  )}
                </Td>
                <Td isNumeric>
                  {editIndex === index ? (
                    <Input
                      type="number"
                      value={editItem.Product_Price}
                      onChange={(e) => setEditItem({ ...editItem, Product_Price: parseFloat(e.target.value) })}
                    />
                  ) : (
                    product.Product_Price
                  )}
                </Td>
                <Td isNumeric>
                  {editIndex === index ? (
                    <Input
                      type="number"
                      value={editItem.Product_QTY}
                      onChange={(e) => setEditItem({ ...editItem, Product_QTY: parseInt(e.target.value) })}
                    />
                  ) : (
                    product.Product_QTY
                  )}
                </Td>
                <Td isNumeric>{product.Product_Total}</Td>
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
          <Text className="text-xl">₹ {total.toFixed(2)}</Text>
        </Flex>

        {applyDiscount && (
          <Flex justify="space-between" color="green.500" fontWeight="bold">
            <Text>Discounted Total:</Text>
            <Text className="text-xl">₹ {discountAmount.toFixed(2)}</Text>
          </Flex>
        )}
        <Flex justify="space-between">
          <Text fontWeight="bold"> Grand Total:</Text>
          <Text className="text-4xl" >₹ {applyDiscount ? GrandTotal.toFixed(2) : total.toFixed(2)}</Text>
        </Flex>
      </Box>
    </Box>
  );
};

export default ProductTable;