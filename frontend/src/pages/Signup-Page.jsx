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
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon, SunIcon, MoonIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const MotionBox = motion(Box);
const SignUpPage = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const formBg = useColorModeValue("white", "gray.700");
  // 👇 State variables for form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
    const role = "admin"
    const navigate = useNavigate();
  // 👇 Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    const signupData = {
        name,
        email,
        password,
        role,
      };
      try {
        const response = await axios.post("http://localhost:5000/api/user/createuser", signupData);
        console.log("Signup successful!", response.data);
        setName("");
        setEmail("");
        setPassword("");
        navigate('/')
      }catch (error) {
        console.error("Error during signup:", error.response?.data || error.message);
      }
  }
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
            Create an Account
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <Input
            placeholder="Full Name"
            type="text"
            variant="filled"
            size="lg"
            focusBorderColor="teal.400"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          {/* Email */}
          <Input
            marginTop={2}
            placeholder="Email Address"
            type="email"
            variant="filled"
            size="lg"
            focusBorderColor="teal.400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password */}
          <InputGroup size="lg"  marginTop={2}>
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

          {/* Sign Up Button */}
          <Button
            colorScheme="teal"
            size="lg"
            w="full"
            _hover={{ bg: "teal.500" }}
            transition="0.3s"
            type="submit"
          >
            Sign Up
          </Button>
        </form>

        {/* Login Link */}
        <Box textAlign="center" fontSize="sm" color="gray.500">
          Already have an account?{" "}
          <a href="Login" className="text-teal-400 hover:underline hover:text-teal-500">
            Sign In
          </a>
        </Box>
      </MotionBox>
    </Flex>
  );
};
export default SignUpPage;
