import { Box, Container, Heading, SimpleGrid, Text, Button } from "@chakra-ui/react";
import NextLink from "next/link";
import { getCategories, getProducts } from "@/lib/db";

export const metadata = { title: "Catalog | Bell Air Lux" };

export default async function CatalogPage() {
  const categories = await getCategories();
  const products = await getProducts({ status: "published" });

  return (
    <Box py={{ base: 12, md: 16 }}>
      <Container maxW="1400px">
        <Heading fontSize={{ base: "2xl", md: "3xl" }} mb={4} textAlign="center">
          Full Catalog
        </Heading>
        <Text textAlign="center" color="brand.gray500" mb={12}>
          Every Bell Air Lux product, organized by category.
        </Text>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          {categories.map((cat) => {
            const count = products.filter((p) => p.category === cat.slug).length;
            return (
              <Box key={cat.id} p={6} bg="brand.gray50" borderRadius="md">
                <Heading fontSize="lg" mb={2}>
                  {cat.name}
                </Heading>
                <Text color="brand.gray500" mb={4}>
                  {count} product{count === 1 ? "" : "s"} available
                </Text>
                <Button
                  as={NextLink}
                  href={`/products/category/${cat.slug}`}
                  size="sm"
                  isDisabled={cat.comingSoon}
                >
                  {cat.comingSoon ? "Coming Soon" : "View Products"}
                </Button>
              </Box>
            );
          })}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
