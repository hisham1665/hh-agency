import React, { useState } from 'react';
import {
    Box,
    Button,
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    useDisclosure,
    Flex
} from '@chakra-ui/react';
import axios from 'axios';

const PopupForm = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [formData, setFormData] = useState({
        Catagory_name: '',
        Catagory_Image: '',
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/catagory/createCatagory', formData);
            setFormData({ Catagory_name: '', Catagory_Image: '' });
            onClose(); // close modal after successful submit
        } catch (error) {
            console.error('API Error:', error);
        }
    };

    return (
        <>
            <Flex justify="center">
                <Button
                    colorScheme="green"
                    onClick={onOpen}
                    size="md"
                    width="90%"
                >
                    Add Catagory
                </Button>
            </Flex>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Catagory</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={handleSubmit}>
                        <ModalBody pb={6}>
                            <FormControl mb={4} isRequired>
                                <FormLabel>Catagory Name</FormLabel>
                                <Input
                                    placeholder="Enter Catagory name"
                                    name="Catagory_name"
                                    value={formData.Catagory_name}
                                    onChange={handleChange}
                                />
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel>Catagory Image URL</FormLabel>
                                <Input
                                    type="url"
                                    placeholder="Enter Catagory image URL"
                                    name="Catagory_Image"
                                    value={formData.Catagory_Image}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button onClick={onClose} mr={3}>
                                Close
                            </Button>
                            <Button colorScheme="blue" type="submit">
                                Submit
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    );
};

export default PopupForm;
