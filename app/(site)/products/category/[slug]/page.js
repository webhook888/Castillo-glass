import { Box, Container, SimpleGrid, Text, HStack } from "@chakra-ui/react";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard/ProductCard";
import { getCategoryBySlug, getProducts } from "@/lib/db";

export async function generateMetadata({ params }) {
  const category = await getCategoryBySlug(params.slug);
  return { title: category ? `${category.name} | Bell Air Lux` : "Bell Air Lux" };
}

export default async function CategoryPage({ params }) {
  const category = await getCategoryBySlug(params.slug);
  if (!category) return notFound();

  const products = await getProducts({ category: params.slug, status: "published" });

  return (
    <Box>
      <Box bg="brand.gray100" py={3}>
        <Container maxW="1280px">
          <HStack
            spacing={2}
            fontSize="sm"
            fontFamily="Montserrat, sans-serif"
            flexWrap="wrap"
          >
            <Box as={NextLink} href="/" color="brand.orange" fontWeight="500" _hover={{ opacity: 0.85 }}>
              Home
            </Box>
            <Text color="brand.black">/</Text>
            <Text color="brand.black">{category.name}</Text>
          </HStack>
        </Container>
      </Box>

      <Container maxW="1280px" py={{ base: 8, md: 10 }}>
        {products.length === 0 ? (
          <Text color="brand.gray500" fontFamily="Montserrat, sans-serif">
            No products in this category yet. Check back soon.
          </Text>
        ) : (
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="20px">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </SimpleGrid>
        )}
      </Container>
    </Box>
  );
}
