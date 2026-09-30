import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";

export const metadata = {
  title: "Coming Soon | Castillo's Glass",
  description: "Castillo's Glass is coming soon.",
};

export default function ComingSoonPage() {
  return (
    <Flex
      minH="100dvh"
      position="relative"
      overflow="hidden"
      bg="white"
      backgroundImage="radial-gradient(circle at 25% 12%, rgba(255, 193, 161, 0.48), transparent 27%), radial-gradient(circle at 73% 12%, rgba(207, 252, 154, 0.5), transparent 24%), radial-gradient(circle at 86% 36%, rgba(129, 239, 247, 0.5), transparent 31%), radial-gradient(circle at 55% 34%, rgba(255, 252, 202, 0.32), transparent 29%)"
      direction="column"
      justify={"center"}
      fontFamily="Arial, sans-serif"
    >
      <Heading
        as="h1"
        fontSize="48px"
        fontWeight="600"
        letterSpacing="0.06em"
        color="black"
        display="flex"
        justifyContent="center"
        alignItems="center"
       
      >
        Castillo's Glass
      </Heading>
      <VStack
        w="100%"
        px={{ base: 6, md: 10 }}
        pt={{ base: 24, md: 28, lg: "118px" }}
        spacing={0}
        textAlign="center"
      >
        <Heading
          maxW="1040px"
          color="black"
          fontSize={{ base: "54px", md: "76px", lg: "100px" }}
          fontWeight="400"
          letterSpacing="-0.055em"
          lineHeight="1.17"
        >
          Coming soon.
        </Heading>

        <Text
          mt={{ base: 10, lg: "42px" }}
          color="black"
          fontSize={{ base: "18px", md: "21px" }}
        >
          We are a small and growing consulting firm with big ideas.
        </Text>

        <Button
          mt={{ base: 12, lg: "64px" }}
          h="56px"
          minW="200px"
          border="1px solid"
          borderColor="black"
          borderRadius="4px"
          bg="transparent"
          color="black"
          fontSize="14px"
          fontWeight="700"
          letterSpacing="0.06em"
          _hover={{ bg: "black", color: "white" }}
        >
          LEARN MORE →
        </Button>
      </VStack>
    </Flex>
  );
}
