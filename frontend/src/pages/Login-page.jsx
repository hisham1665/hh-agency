import React, { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  IconButton,
  useColorMode,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon, SunIcon, MoonIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const MotionBox = motion.create(Box);

const LoginPage = () => {
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const formBg = useColorModeValue("white", "gray.700");
  const toast = useToast()
  // 👇 State variables for email, password, and password visibility
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // 👇 Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = {
      email,
      password,
    };
    try {
      const res = await axios.post('http://localhost:5000/api/user/login', loginData);

      // Save token in localStorage (optional)
        loginUser(res.data.token);
        navigate('/');
        window.location.reload()

    } catch (error) {
      console.error('Login error:', error.response.data.message);
      toast({
        title: 'Error',
        description: error.response.data.message,
        status: 'error',
        duration: 2000,
        isClosable: true,
        position:"top-right"
      })
      // Check if error.response exists
    }
  };

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={useColorModeValue("gray.100", "gray.900")}
      className="px-4"
    >
      <MotionBox
        bg={formBg}
        p={8}
        rounded="2xl"
        boxShadow="lg"
        maxW="md"
        w="full"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        {/* Heading + Dark Mode Button */}
        <Flex justify="center" align="center" position="relative" mb={4}>
          <Heading fontSize="2xl" color="teal.400" textAlign="center">
            Welcome Back
          </Heading>
          <IconButton
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            variant="ghost"
            aria-label="Toggle Dark Mode"
            position="absolute"
            right="0"
          />
        </Flex>

        {/* Form starts here */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <Input
            placeholder="Email address"
            type="email"
            variant="filled"
            size="lg"
            focusBorderColor="teal.400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password */}
          <InputGroup size="lg" marginTop={2}>
            <Input
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              variant="filled"
              focusBorderColor="teal.400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={() => setShowPassword(!showPassword)}
                type="button"
              >
                {showPassword ? <ViewOffIcon /> : <ViewIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>

          {/* Login Button */}
          <Button
            colorScheme="teal"
            size="lg"
            w="full"
            _hover={{ bg: "teal.500" }}
            transition="0.3s"
            type="submit"
          >
            Sign In
          </Button>
        </form>

        {/* Sign Up Link */}
        <Box textAlign="center" fontSize="sm" color="gray.500">
          Don't have an account?{" "}
          <a
            href="/sign-up"
            className="text-teal-400 hover:underline hover:text-teal-500"
          >
            Sign Up
          </a>
        </Box>
      </MotionBox>
    </Flex>
  );
};

export default LoginPage;
