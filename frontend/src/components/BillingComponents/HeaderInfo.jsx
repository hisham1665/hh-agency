import React, { useEffect, useState } from "react";
import { Flex, Text, Stack } from "@chakra-ui/react";

const HeaderInfo = ({ saleStaff = "John Doe" }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      justify="space-between"
      align={{ base: "flex-start", md: "center" }}
      mb={4}
      px={2}
    >
      <Stack spacing={0}>
        <Text fontSize="sm"><strong>Date:</strong> {currentTime.toLocaleDateString()}</Text>
        <Text fontSize="sm"><strong>Time:</strong> {currentTime.toLocaleTimeString()}</Text>
      </Stack>

      <Text fontSize="sm" fontWeight="bold">
        Sales Staff: {saleStaff}
      </Text>
    </Flex>
  );
};

export default HeaderInfo;
