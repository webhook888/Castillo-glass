import { Box, Container, Heading, SimpleGrid, Text } from "@chakra-ui/react";

const REASONS = [
  {
    title: "Quality Craftsmanship",
    body: "Every project is completed with precision, attention to detail, and premium-quality materials. We take pride in delivering flawless glass installations built to last.",
  },
  {
    title: "Expert Installation",
    body: "Our experienced professionals provide safe, efficient, and accurate installations for residential and commercial glass projects, ensuring exceptional results every time.",
  },
  {
    title: "Custom Solutions",
    body: "No two projects are the same. We create custom glass solutions tailored to your style, space, and functional requirements for a perfect fit.",
  },
  {
    title: "Reliable Service",
    body: "From your first consultation to project completion, we provide honest communication, timely service, and dependable workmanship you can trust.",
  },
  {
    title: "Customer Satisfaction",
    body: "Your satisfaction is our priority. We work closely with every client to ensure each project exceeds expectations in quality, appearance, and performance.",
  },
];

export default function WhyChooseUs() {
  return (
    <Box py={{ base: 12, md: 20 }}>
      <Container maxW="1400px">
        <Heading fontSize={{ base: "25px", md: "30px" }} mb={10} fontFamily={'"Montserrat"'} fontWeight={'600'}>
          Why Choose Us
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacingX={12} spacingY={10}>
          {REASONS.map((reason) => (
            <Box key={reason.title} borderTop={'1px solid'} borderColor={'black'} p={'20px'}>
              <Heading fontSize="lg" mb={3} >
                {reason.title}
              </Heading>
              <Text fontSize="sm" color="brand.gray500" fontFamily={'"Montserrat"'}>
                {reason.body}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
