import { Box, Container, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import NextLink from "next/link";
import CategoryIcon from "@/components/Common/CategoryIcon";
import { getCategories } from "@/lib/db";

export const metadata = { title: "Products | Bell Air Lux" };

export default async function ProductsIndexPage() {
  const categories = await getCategories();

  return (
    <Box py={{ base: 12, md: 16 }}>
      <Container maxW="1400px">
        <Heading fontSize={{ base: "2xl", md: "3xl" }} mb={10} textAlign="center">
          Browse Products by Category
        </Heading>
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={10}>
          {categories.map((cat) => (
            <VStack
              as={NextLink}
              key={cat.id}
              href={cat.comingSoon ? "#" : `/products/category/${cat.slug}`}
              spacing={4}
              p={8}
              bg="brand.gray50"
              borderRadius="md"
              opacity={cat.comingSoon ? 0.5 : 1}
              pointerEvents={cat.comingSoon ? "none" : "auto"}
              _hover={{ boxShadow: "md" }}
              transition="box-shadow 0.2s"
            >
              <CategoryIcon name={cat.icon} boxSize="64px" />
              <Text fontWeight="600" textAlign="center">
                {cat.name}
                {cat.comingSoon && (
                  <Text as="span" display="block" fontSize="sm" color="brand.gray500">
                    Coming soon
                  </Text>
                )}
              </Text>
            </VStack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
