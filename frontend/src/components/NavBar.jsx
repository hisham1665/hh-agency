import React, { useState , useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    Box,
    Flex,
    Button,
    IconButton,
    useDisclosure,
    Stack,
    useColorMode,
    useColorModeValue
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, SunIcon, MoonIcon } from '@chakra-ui/icons';
import { useAuth } from '../context/AuthContext';


function NavBar({key}) {
    const {logoutUser} = useAuth();
    const {user , setUser} = useAuth()
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { colorMode, toggleColorMode } = useColorMode();
    const custom_claim = user
    const handleLogout = () => {
        logoutUser()
        navigate('/Login');
        window.location.reload()
    };
    const isLoggedIn = !!user
    const bgColor = useColorModeValue('linear-gradient(to bottom, #FFFFFF, #F7FAFC)', 'gray.800');
    const textColor = useColorModeValue('gray.700', 'gray.200');

    return (
        <Box bg={bgColor} px={4} shadow="md" className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
            <Flex h={16} alignItems="center" justifyContent="space-between" maxW="7xl" mx="auto">
                <Link to="/" className="flex items-center">
                    <span className={`text-xl font-bold ${textColor}`}>Hisham Agencies</span>
                </Link>
                <Flex alignItems="center" display={{ base: 'none', md: 'flex' }}>
                    <Stack direction="row" spacing={4} align="center">
                        <Link to="/" className={`hover:text-blue-600 text-md ${textColor}`}>Home</Link>
                        {isLoggedIn && user === "admin"  &&  (
                            <Link to="/billing" className={`hover:text-blue-600 text-md ${textColor}`}>Billing</Link>
                        )}
                        {isLoggedIn && user === "admin"  &&  (
                            <Link to="/inventory" className={`hover:text-blue-600 text-md ${textColor}`}>Inventory</Link>
                        )}
                        {isLoggedIn && user === "admin"  &&  (
                            <Link to="/bussiness" className={`hover:text-blue-600 text-md ${textColor}`}>Bussiness</Link>
                        )}
                        <Link to="/product" className={`hover:text-blue-600 text-md ${textColor}`}>Product</Link>

                        {!isLoggedIn ? (
                            <Link to="/Login">
                                <Button colorScheme="blue" size="sm">
                                    Login
                                </Button>
                            </Link>
                        ) : (
                            <Button colorScheme="red" size="sm" onClick={handleLogout}>
                                Logout
                            </Button>
                        )}

                        {/* Dark / Light Mode Toggle Button */}
                        <IconButton
                            size="sm"
                            onClick={toggleColorMode}
                            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                            aria-label="Toggle Theme"
                        />
                    </Stack>
                </Flex>

                {/* Mobile Menu Button */}
                <IconButton
                    size="md"
                    icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                    aria-label="Open Menu"
                    display={{ md: 'none' }}
                    onClick={isOpen ? onClose : onOpen}
                />
            </Flex>

            {/* Mobile Menu Content */}
            {isOpen && (
                <Box pb={4} display={{ md: 'none' }}>
                    <Stack as="nav" spacing={4}>
                        <Link to="/" onClick={onClose} className={`hover:text-blue-600 text-md ${textColor}`}>Home</Link>
                        <Link to="/product" onClick={onClose} className={`hover:text-blue-600 text-md ${textColor}`}>Product</Link>
                        {isLoggedIn && user === "admin"  &&  (
                            <Link to="/billing" onClick={onClose} className={`hover:text-blue-600 text-md ${textColor}`}>Billing</Link>
                        )}
                        {isLoggedIn && user === "admin"  &&  (
                            <Link to="/inventory" onClick={onClose} className={`hover:text-blue-600 text-md ${textColor}`}>Inventory</Link>
                        )}
                        {isLoggedIn && user === "admin"  &&  (
                            <Link to="/bussiness" onClick={onClose} className={`hover:text-blue-600 text-md ${textColor}`}>Bussiness</Link>
                        )}

                        {!isLoggedIn ? (
                            <Link to="/Login" onClick={onClose}>
                                <Button colorScheme="blue" size="sm" w="100%">
                                    Login
                                </Button>
                            </Link>
                        ) : (
                            <Button
                                colorScheme="red"
                                size="sm"
                                w="100%"
                                onClick={() => {
                                    onClose();
                                    handleLogout();
                                }}
                            >
                                Logout
                            </Button>
                        )}

                        {/* Dark / Light Mode Toggle for Mobile */}
                        <IconButton
                            size="sm"
                            onClick={() => {
                                toggleColorMode();
                                onClose();
                            }}
                            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                            aria-label="Toggle Theme"
                        />
                    </Stack>
                </Box>
            )}
        </Box>
    );
}

export default NavBar;
