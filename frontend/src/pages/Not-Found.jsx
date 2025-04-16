import React from 'react';
import {
  Box,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function Not() {
  const navigate = useNavigate();
  const bgColor = useColorModeValue('gray.100', 'gray.900');
  const textColor = useColorModeValue('gray.700', 'gray.300');
  const subTextColor = useColorModeValue('gray.500', 'gray.500');
  const headingColor = useColorModeValue('blue.600', 'blue.300');

  return (
    <Box
      bg={bgColor}
      className="flex flex-col items-center justify-center min-h-screen text-center px-4"
    >
      <Heading
        as="h1"
        size="4xl"
        color={headingColor}
        className="mb-4 animate-bounce"
      >
        404
      </Heading>

      <Text fontSize="xl" color={textColor} className="mb-2">
        Oops! Page Not Found.
      </Text>

      <Text fontSize="md" color={subTextColor} className="mb-6 max-w-md">
        The page you're looking for doesn’t exist or has been moved.
      </Text>

      <Button
        colorScheme="blue"
        size="lg"
        onClick={() => navigate('/')}
        className="transition-all duration-200 hover:scale-105"
      >
        Go Home
      </Button>
    </Box>
  );
}

export default Not;
