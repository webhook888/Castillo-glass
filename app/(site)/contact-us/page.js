import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";
import SocialIcons from "@/components/Common/SocialIcons";
import ContactForm from "@/components/Common/ContactForm";

export const metadata = { title: "Contact Us | Bell Air Lux" };

export default function ContactUsPage() {
  return (
    <Box>
      <Box
        bgGradient="linear(to-br, pink.50, white)"
        py={{ base: 12, md: 20 }}
      >
        <Container maxW="1140px">
          <VStack spacing={4} mb={10} textAlign="center">
            <Heading fontSize={{ base: "3xl", md: "40px" }} fontFamily={'Poppins'} fontWeight={'600'}>Contact Us</Heading>
            <Text color="black">
              We would love to speak with you.
              <br />
              Feel free to reach out using the below details.
            </Text>
            <SocialIcons rounded="md" size="44px" />
          </VStack>

          <ContactForm />

          <VStack mt={10}>
            <SocialIcons rounded="full" size="44px" />
          </VStack>
        </Container>
      </Box>

      <Box h={{ base: "300px", md: "380px" }}>
        <iframe
          title="Bell Air Lux Location"
          src="https://www.google.com/maps?q=6+Crown+Street,+London+WC2B+8FE&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
        />
      </Box>
    </Box>
  );
}
