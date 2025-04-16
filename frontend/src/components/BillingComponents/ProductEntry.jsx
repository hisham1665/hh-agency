import React, { useState, useEffect, useRef } from "react";
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    HStack,
    Box,
    VStack,
    InputGroup,
    InputRightElement,
    Spinner,
    List,
    ListItem,
    useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";

const ProductEntry = ({ onAddProduct }) => {
    const [input, setInput] = useState({
        Product_Name: "",
        Product_Catagory: "",
        Product_Price: "",
        Product_QTY: 1,
    });
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [highlightIndex, setHighlightIndex] = useState(-1);
    const suggestionsListRef = useRef(null);

    const inputRef = useRef();

    const bgColor = useColorModeValue("white", "gray.800");
    const itemHoverBg = useColorModeValue("gray.100", "blue.600");
    const itemTextColor = useColorModeValue("black", "white");
    const borderColor = useColorModeValue("gray.300", "gray.600");
    const [isFromSuggestion, setIsFromSuggestion] = useState(false);

    const fetchProducts = async (query = "") => {
        setLoading(true);
        try {
            const res = await axios.get(
                `/api/product/get-products?q=${query}`
            );
            // Adjust this part based on your API response structure
            setSuggestions(res.data || []);
        } catch (err) {
            console.error("Failed to fetch products:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const delay = setTimeout(() => {
            if (input.Product_Name) {
                fetchProducts(input.Product_Name);  // Fetch based on product name input
                setShowSuggestions(true);
            } else {
                setSuggestions([]);
            }
        }, 300);
        return () => clearTimeout(delay);
    }, [input.Product_Name]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({ ...prev, [name]: value }));
        setHighlightIndex(-1);

        if (name === "Product_Name") {
            setIsFromSuggestion(false); // <-- reset if editing product name
        }
    };


    const handleSuggestionSelect = (product) => {
        setInput({
            Product_Name: product.Product_name,  // Use Product_name from the response
            Product_Catagory: product.Product_Catogory,  // Use Product_Catogory
            Product_Price: product.Product_price,  // Use Product_price
            Product_QTY: 1,
        });
        setIsFromSuggestion(true);
        setSuggestions([]);
        setShowSuggestions(false);
        setHighlightIndex(-1);
    };

    const handleKeyDown = (e) => {
        if (!showSuggestions || suggestions.length === 0) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setHighlightIndex((prev) => (prev + 1) % suggestions.length);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlightIndex((prev) =>
                prev <= 0 ? suggestions.length - 1 : prev - 1
            );
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (highlightIndex >= 0) {
                handleSuggestionSelect(suggestions[highlightIndex]);
            }
        } else if (e.key === "Escape") {
            setShowSuggestions(false);
            setHighlightIndex(-1);
        }
    };

    useEffect(() => {
        if (highlightIndex !== -1 && suggestionsListRef.current) {
            const highlightedItem = suggestionsListRef.current.children[highlightIndex];
            if (highlightedItem) {
                highlightedItem.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });
            }
        }
    }, [highlightIndex]);

    const handleAdd = () => {
        if (!input.Product_Name || !input.Product_Price || !input.Product_QTY) return;
        onAddProduct({
            ...input,
            Product_Total: input.Product_QTY * input.Product_Price,  // Corrected the multiplication logic
        });
        setInput({ Product_Name: "", Product_Catagory: "", Product_Price: "", Product_QTY: 1 });
        setIsFromSuggestion(false);
    };

    return (
        <VStack align="start" spacing={4} position="relative">
            <HStack spacing={4} flexWrap="wrap">
                <Box minW="200px" position="relative">
                    <FormControl isRequired>
                        <FormLabel>Product Name</FormLabel>
                        <InputGroup>
                            <Input
                                name="Product_Name"
                                placeholder="Enter product"
                                value={input.Product_Name}
                                onChange={handleInputChange}
                                onFocus={() => setShowSuggestions(true)}
                                onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                                onKeyDown={handleKeyDown}
                                autoComplete="off"
                                bg={bgColor}
                                color={itemTextColor}
                                borderColor={borderColor}
                                ref={inputRef}
                            />
                            <InputRightElement width="2.5rem" pointerEvents="none">
                                {loading && <Spinner size="xs" thickness="2px" speed="0.5s" />}
                            </InputRightElement>
                        </InputGroup>
                        {showSuggestions && suggestions.length > 0 && (
                            <Box
                                position="absolute"
                                zIndex="10"
                                width="100%"
                                bg={bgColor}
                                border="1px solid"
                                borderColor={borderColor}
                                borderRadius="md"
                                boxShadow="lg"
                                mt={1}
                                maxH="150px"
                                overflowY="auto"
                            >
                                <List spacing={0} ref={suggestionsListRef}>
                                    {suggestions.map((product, idx) => (
                                        <ListItem
                                            key={product._id}
                                            px={4}
                                            py={2}
                                            bg={highlightIndex === idx ? itemHoverBg : bgColor}
                                            color={itemTextColor}
                                            cursor="pointer"
                                            _hover={{ bg: itemHoverBg }}
                                            onClick={() => handleSuggestionSelect(product)}
                                        >
                                            {product.Product_name}  {/* Corrected property name */}
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                        )}
                    </FormControl>
                </Box>
                <Box minW="150px">
                    <FormControl>
                        <FormLabel>Category</FormLabel>
                        <Input
                            name="Product_Catagory"
                            placeholder="Category"
                            value={input.Product_Catagory}
                            onChange={handleInputChange}
                            readOnly={isFromSuggestion}
                        />
                    </FormControl>
                </Box>
                <Box minW="100px">
                    <FormControl isRequired>
                        <FormLabel>Price</FormLabel>
                        <Input
                            name="Product_Price"
                            placeholder="Price"
                            type="number"
                            value={input.Product_Price}
                            onChange={handleInputChange}
                            readOnly={isFromSuggestion}
                        />
                    </FormControl>
                </Box>
                <Box minW="100px">
                    <FormControl isRequired>
                        <FormLabel>Qty</FormLabel>
                        <Input
                            name="Product_QTY"
                            placeholder="Qty"
                            type="number"
                            value={input.Product_QTY}
                            min={1}
                            step={1}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                </Box>
                <Box w="100%">
                    <Button colorScheme="teal" onClick={handleAdd} width="100%">
                        Add Product
                    </Button>
                </Box>
            </HStack>
        </VStack>
    );
};

export default ProductEntry;
