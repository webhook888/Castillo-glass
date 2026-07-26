"use client";

import { useState } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import BrandText from "@/components/Common/BrandText";

export default function AdminLoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("from") || "/admin";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Login failed");

      toast({ status: "success", title: "Welcome back" });
      router.push(redirectTo);
      router.refresh();
    } catch (err) {
      toast({ status: "error", title: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box minH="100vh" display="flex" alignItems="center" py={12}>
      <Container maxW="550px">
        <Box bg="white" p={8} borderRadius="md" boxShadow="md" border={'1px solid #e4e4e7'}>
          <VStack spacing={6} align="stretch">
            <Box textAlign="center">
              <Heading fontSize="25px" mb={2} fontFamily={'Poppins'} fontWeight={'600'}>
                Admin Login
              </Heading>
              <Text fontSize="16px" color="black">
                <BrandText>Sign in to access the Castillo’s Glass dashboard.</BrandText>
              </Text>
            </Box>

            <form onSubmit={handleSubmit}>
              <VStack spacing={4} align="stretch">
                <FormControl isRequired>
                  <FormLabel fontFamily={'Poppins'}>Username</FormLabel>
                  <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="username"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel fontFamily={'Poppins'}>Password</FormLabel>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                  />
                </FormControl>
                <Button type="submit" w="full" isLoading={loading} mt={2}>
                  Sign In
                </Button>
              </VStack>
            </form>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
}
