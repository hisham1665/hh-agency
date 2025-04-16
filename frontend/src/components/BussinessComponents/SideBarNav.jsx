import {
  VStack,
  Button,
  Box,
  useColorModeValue,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  IconButton,
  useDisclosure,
  HStack,
} from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';

const SidebarNav = ({ currentView, onChangeView }) => {
  const bg = useColorModeValue('gray.100', 'gray.800');
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        display={{ base: 'none', md: 'block' }}
        w={{ md: '250px' }}
        minH="100vh"
        bg={bg}
        p={4}
        borderRight="1px"
        borderColor="gray.300"
      >
        <VStack spacing={4} align="stretch">
          <Button colorScheme="purple" variant={currentView === 'all' ? 'solid' : 'ghost'} onClick={() => onChangeView('all')}>
            All Bills
          </Button>
          <Button colorScheme="green" variant={currentView === 'paid' ? 'solid' : 'ghost'} onClick={() => onChangeView('paid')}>
            Paid Bills
          </Button>
          <Button colorScheme="red" variant={currentView === 'unpaid' ? 'solid' : 'ghost'} onClick={() => onChangeView('unpaid')}>
            Unpaid Bills
          </Button>
        </VStack>
      </Box>

      {/* Drawer for mobile */}
      <Box display={{ base: 'block', md: 'none' }}>
        <HStack p={2}>
          <IconButton icon={<FiMenu />} onClick={onOpen} aria-label="Menu" />
        </HStack>
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader>Filter Bills</DrawerHeader>
            <DrawerBody>
              <VStack spacing={4} align="stretch">
                <Button colorScheme="purple" onClick={() => { onChangeView('all'); onClose(); }}>
                  All Bills
                </Button>
                <Button colorScheme="green" onClick={() => { onChangeView('paid'); onClose(); }}>
                  Paid Bills
                </Button>
                <Button colorScheme="red" onClick={() => { onChangeView('unpaid'); onClose(); }}>
                  Unpaid Bills
                </Button>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
    </>
  );
};

export default SidebarNav;
