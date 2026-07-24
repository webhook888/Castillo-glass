import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";
import QuoteForm from "@/components/Common/QuoteForm";
import { QUOTE_CONTACT } from "@/constants/site";

export const metadata = { title: "Get a Quote | Bell Air Lux" };

export default function GetAQuotePage() {
  return (
    <Box py={{ base: 12, md: 16 }}>
      <Container maxW="1140px">
        <VStack spacing={3} mb={10} textAlign="center">
          <Heading fontSize={{ base: "2xl", md: "3xl" }}>Quote Request</Heading>
          <Text color="black" maxW="900px" fontSize={'16px'} fontFamily={'Montserrat'} lineHeight={'30px'}>
          Ready to start your next glass project? Fill out the form below, and a member of the Castillo’s Glass Services team will contact you shortly. Whether you need custom glass, 
          shower doors, railings, windows, or commercial glass solutions, we’re here to provide expert guidance and a free estimate.
          </Text>
          <Text fontWeight="600">{QUOTE_CONTACT.email}</Text>
          {QUOTE_CONTACT.phones.map((phone) => (
            <Text key={phone} fontWeight="600">
              {phone}
            </Text>
          ))}
          <Text color="brand.gray500" fontSize="sm">
            {QUOTE_CONTACT.hours}
          </Text>
        </VStack>

        <QuoteForm />
      </Container>
    </Box>
  );
}
