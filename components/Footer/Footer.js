"use client";

import { useState } from "react";
import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  Heading,
  Input,
  Button,
  IconButton,
  HStack,
  Link as ChakraLink,
  useToast,
  Image,
} from "@chakra-ui/react";
import { ArrowUpIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import {
  SITE_NAME,
  SITE_TAGLINE,
  COMPANY_ADDRESS,
  FOOTER_COLUMNS,
} from "@/constants/site";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubscribe = () => {
    if (!email.trim()) {
      toast({ status: "error", title: "Please enter your email address" });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setEmail("");
      toast({ status: "success", title: "Subscribed! Thanks for joining." });
    }, 600);
  };

  return (
    <Box as="footer" bg="brand.gray50" pt={16} pb={10} position="relative">
      <Container maxW="1400px">
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={10}>
          <Box>
            <Box mb={'35px'}>
              <Box w={'230px'} h={'50px'} flexShrink={0}>
                <Image src="/images/logonew.png" alt="Logo" />
              </Box>

            </Box>
            <Text fontSize="16px"
              color="black"
              fontFamily={'Poppins'} >
              {COMPANY_ADDRESS.line1}
              <br />
              {COMPANY_ADDRESS.line2}
              <br />
              Tel: {COMPANY_ADDRESS.phone}
            </Text>
          </Box>

          {FOOTER_COLUMNS.map((col) => (
            <Box key={col.title}>
              <Heading fontSize="19px" mb={4} fontFamily={'Poppins'} fontWeight={'600'} >
                {col.title}
              </Heading>
              <Stack spacing={2}>
                {col.links.map((link) => (
                  <ChakraLink
                    as={NextLink}
                    key={link.label}
                    href={link.href}
                    fontSize="16px"
                    color="black"
                    fontFamily={'Poppins'}
                    _hover={{ color: "brand.black" }}
                  >
                    {link.label}
                  </ChakraLink>
                ))}
              </Stack>
            </Box>
          ))}

          <Box>
            <Heading fontSize="md" mb={4}>
              Newsletter
            </Heading>
            <Text fontSize="16px"
              color="black"
              fontFamily={'Poppins'} mb={4}>
              Stay up to date with our latest news, receive exclusive deals, and
              more.
            </Text>
            <Input
              placeholder="Enter Your Email Address"
              variant="flushed"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              mb={4}
            />
            <Button
              rightIcon={<ArrowForwardIcon />}
              onClick={handleSubscribe}
              isLoading={loading}
              size="sm"
              borderRadius="md"
              w="full"
              minH={'45px'}
            >
              SUBSCRIBE
            </Button>
          </Box>
        </SimpleGrid>

        <Text textAlign="center" fontSize="16px"
          color="black"
          fontFamily={'Poppins'} mt={16}
          borderTop={'1px solid grey'} pt={'13px'}>
          © {SITE_NAME.toUpperCase()} {new Date().getFullYear()}
        </Text>
      </Container>

      <IconButton
        aria-label="Back to top"
        icon={<ArrowUpIcon />}
        position="fixed"
        bottom={6}
        right={6}
        bg="#2563eb"
        color="white"
        _hover={{ bg: "#1d4ed8" }}
        borderRadius="md"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      />
    </Box>
  );
}
