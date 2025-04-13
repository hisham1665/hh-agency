import React, { useEffect, useState } from "react";
import { Flex, Text, Stack } from "@chakra-ui/react";
import { useAuth } from "../../context/AuthContext";

const HeaderInfo = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const {userName} = useAuth()
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
        Sales Staff: {userName}
      </Text>
    </Flex>
  );
};

export default HeaderInfo;
