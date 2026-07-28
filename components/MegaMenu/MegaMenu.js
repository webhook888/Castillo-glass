"use client";

import { Box, Container, Heading, Image, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { STATIC_PRODUCT_CATEGORIES } from "@/constants/productCategories";

export default function MegaMenu() {
  return (
    <Box
      position="absolute"
      top="100%"
      left={'16.5%'}
      w="100%"
      maxW={"1280px"}
      bg="white"
      borderRadius="10px"
      borderColor="brand.gray200"
      boxShadow="0px 0px 10px 0px rgba(0, 0, 0, 0.07)"
      zIndex={40}
      p={'30px'}
    >
      <Container maxW="1280px" py={8}>
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={10}>
          <Box>
            <Heading fontSize="lg" fontWeight="700">
              Product Categories
            </Heading>
            <Text fontSize="sm" color="black" mt={4} lineHeight="1.9">
              We specialize in custom glass solutions that enhance the beauty, safety, and value of your property. Browse our product categories to find the perfect solution for your next residential or commercial project.
            </Text>
          </Box>
          <Box gridColumn={{ md: "2 / span 3" }}>
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={8}>
              {STATIC_PRODUCT_CATEGORIES.map((category) => (
                <VStack
                  key={category.name}
                  align="center"
                  justify="center"
                  spacing={3}
                  minH="130px"
                >
                  <Image
                    src={category.image}
                    alt={category.name}
                    w="90px"
                    h="99px"
                    objectFit="cover"
                    borderRadius="sm"
                  />
                  <Text fontWeight="600" fontSize="sm" textAlign="center">
                    {category.name}
                  </Text>
                </VStack>
              ))}
            </SimpleGrid>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
