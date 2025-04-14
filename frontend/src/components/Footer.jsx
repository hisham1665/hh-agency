import React from 'react';
import {
  Box,
  Container,
  Stack,
  Text,
  Heading,
  Link,
  useColorModeValue,
  SimpleGrid,
} from '@chakra-ui/react';

function Footer() {
  return (
    <Box
      bg={useColorModeValue('gray.100', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      mt={10}
      py={10}
    >
      <Container as={Stack} maxW="7xl" spacing={10}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          {/* Left: Contact Info */}
          <Box>
            <Heading size="md" mb={4}>
              HH Agency
            </Heading>
            <Text>Address: Ala Gothuruth, Kothaparambu, Kodungallur</Text>
            <Text>PIN CODE : 680668</Text>
            <Text>Phone: <Link href="tel:9349818253">9349818253</Link></Text>
            <Text>Email: <Link href="mailto:hishamkhofficial@gmail.com">info@HHAgency.com</Link></Text>
          </Box>

          {/* Right: Google Maps */}
          <Box>
            <iframe
              title="HH Agency Location"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d981.5286594995723!2d76.19425741983785!3d10.252337320836638!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b081c166b828195%3A0xcbea77994b57d4d3!2s752V%2BWV6%2C%20Ala%2C%20Gothuruth%2C%20Kothaparambu%2C%20Kodungallur%2C%20Kerala%20680668%2C%20India!5e0!3m2!1sen!2sus!4v1744650906071!5m2!1sen!2sus"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Box>
        </SimpleGrid>

        <Box textAlign="center" pt={10}>
          <Text fontSize="sm">© {new Date().getFullYear()} HH Agency. All rights reserved.</Text>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
