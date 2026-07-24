"use client";

import { Box, Container, Flex, Heading, Text, HStack, Link as ChakraLink, Button } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";

export default function AdminTopbar() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <Box as="header" borderBottom="1px solid" borderColor="brand.gray200" bg="white">
      <Container maxW="1600px">
        <Flex align="center" justify="space-between" py={4}>
          <Box>
            <Heading fontSize="lg">Admin Dashboard</Heading>
            <Text fontSize="sm" color="brand.gray500">
            Castillo’s Glass Product Manager
            </Text>
          </Box>
          <HStack spacing={6}>
            <ChakraLink as={NextLink} href="/admin" fontWeight="600" fontSize="sm">
              Products
            </ChakraLink>
            <ChakraLink as={NextLink} href="/" fontSize="sm" color="brand.gray500">
              View Site
            </ChakraLink>
            <Button 
            size="sm" onClick={handleLogout} 
            background={'black'}  
            boxShadow={'0px 0px 10px 0px rgba(0,0,0,0.5)'} 
            minH={'40px'}
            p={'0px 24px'}
            >
              Log Out
            </Button>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}
