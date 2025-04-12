import React from "react";
import { Button, Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const SubmitBillButton = ({ onSubmit }) => {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      width="full"
      display="flex"
      justifyContent="center"
    >
      <Button colorScheme="blue" size="lg" px={10} onClick={onSubmit}>
        Submit Bill
      </Button>
    </MotionBox>
  );
};

export default SubmitBillButton;
