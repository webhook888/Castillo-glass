"use client";

import { Box, Container, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import NextLink from "next/link";
import CategoryIcon from "@/components/Common/CategoryIcon";

export default function MegaMenu({ categories = [], onNavigate }) {
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
              {categories.map((cat) => (
                <VStack
                  as={NextLink}
                  key={cat.id}
                  href={cat.comingSoon ? "#" : `/products/category/${cat.slug}`}
                  onClick={onNavigate}
                  spacing={3}
                  opacity={cat.comingSoon ? 0.5 : 1}
                  pointerEvents={cat.comingSoon ? "none" : "auto"}
                  _hover={{ opacity: cat.comingSoon ? 0.5 : 0.7 }}
                  transition="opacity 0.2s"
                >
                  <CategoryIcon name={cat.icon} boxSize="60px" />
                  <Text fontWeight="600" textAlign="center" fontSize="sm">
                    {cat.name}
                    {cat.comingSoon && (
                      <Text as="span" display="block" fontWeight="400" color="brand.gray500">
                        Coming soon
                      </Text>
                    )}
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
