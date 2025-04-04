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
import {jwtDecode} from "jwt-decode";


function NavBar() {

    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { colorMode, toggleColorMode } = useColorMode();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setCustom_claim("user")
        navigate('/Login');
    };
    const isLoggedIn = !!localStorage.getItem('token');
    const [custom_claim , setCustom_claim] = useState("user")
    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) {
            const decodedUser = jwtDecode(token);
            setCustom_claim( decodedUser.role);
        }
    }, []);

    // Colors based on theme mode
    const bgColor = useColorModeValue('white', 'gray.800');
    const textColor = useColorModeValue('gray.700', 'gray.200');

    return (
        <Box bg={bgColor} px={4} shadow="md" className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
            <Flex h={16} alignItems="center" justifyContent="space-between" maxW="7xl" mx="auto">
                {/* Logo */}
                <Link to="/" className="flex items-center">
                    <img
                        src="https://flowbite.com/docs/images/logo.svg"
                        alt="Logo"
                        className="h-8 w-auto mr-2"
                    />
                    <span className={`text-xl font-bold ${textColor}`}>Hisham Agencies</span>
                </Link>

                {/* Desktop Menu */}
                <Flex alignItems="center" display={{ base: 'none', md: 'flex' }}>
                    <Stack direction="row" spacing={4} align="center">
                        <Link to="/" className={`hover:text-blue-600 text-md ${textColor}`}>Home</Link>
                        {isLoggedIn && custom_claim === "admin"  &&  (
                            <Link to="/billing" className={`hover:text-blue-600 text-md ${textColor}`}>Billing</Link>
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
                        {isLoggedIn && custom_claim === "admin"  &&  (
                            <Link to="/billing" className={`hover:text-blue-600 text-md ${textColor}`}>Billing</Link>
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
