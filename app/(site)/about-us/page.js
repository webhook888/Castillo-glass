import BrandText from "@/components/Common/BrandText";
import { Box, Container, Heading, Text } from "@chakra-ui/react";

export const metadata = { title: "About Us | Castillo's Glass" };

export default function AboutUsPage() {
  return (
    <Box py={{ base: 12, md: 16 }}>
      <Container maxW="1280px">
        <Box>
          <Heading
           fontSize={{ base: "2xl", md: "42px" }}
            fontFamily="brand"
            fontWeight="600"
            borderBottom={"2px solid black"}
            pb={"25px"}
          >
            <BrandText >
              Welcome to Castillo's Glass Services
            </BrandText>
          </Heading>
          <Text
            color="black"
            mb={"24px"}
            fontFamily={"Poppins"}
            lineHeight={"32px"}
          >
            <BrandText>
              At Castillo’s Glass Services, we are committed to delivering
              high-quality glass solutions that combine style, durability, and
              exceptional craftsmanship. Whether you need custom glass
              installations, elegant shower doors, residential windows,
              commercial storefronts, or modern glass railings, our experienced
              team provides reliable service tailored to your unique needs.
            </BrandText>
          </Text>
          <Text
            color="black"
            mb={"24px"}
            fontFamily={"Poppins"}
            lineHeight={"32px"}
          >
            We proudly serve both residential and commercial clients, offering
            professional installation, replacement, and repair services using
            premium-quality materials. Every project is completed with precision
            and attention to detail, ensuring long-lasting performance, safety,
            and a flawless finish.
          </Text>
          <Text
            color="black"
            mb={"24px"}
            fontFamily={"Poppins"}
            lineHeight={"32px"}
          >
            Our services include custom glass, shower doors, residential and
            commercial glass, glass railings, cable railing systems, windows and
            doors, and innovative switchable smart glass. From modern
            renovations to new construction projects, we work closely with our
            clients to create solutions that enhance the beauty, functionality,
            and value of every property.
          </Text>
          <Text
            color="black"
            mb={"24px"}
            fontFamily={"Poppins"}
            lineHeight={"32px"}
          >
            Customer satisfaction is at the heart of everything we do. From your
            initial consultation to the final installation, we focus on clear
            communication, dependable workmanship, and outstanding results. No
            matter the size of your project, our goal is to exceed your
            expectations with quality products and professional service you can
            trust.
          </Text>
          <Text color="black" fontFamily={"Poppins"} lineHeight={"32px"}>
            <BrandText>
              Choose Castillo’s Glass Services for expert craftsmanship,
              customized solutions, and a commitment to excellence. Contact us
              today to discuss your project and discover how our premium glass
              services can transform your home or business.
            </BrandText>
          </Text>
        </Box>
      </Container>
    </Box>
  );
}
