import { Box, Container, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import HeroSlider from "@/components/Hero/HeroSlider";
import CategoryCard from "@/components/ProductCard/CategoryCard";
import Slider from "@/components/CategorySlider/Slider";
import CategoryIcon from "@/components/Common/CategoryIcon";
import WhyChooseUs from "@/components/Common/WhyChooseUs";
import { getCategories, getProducts } from "@/lib/db";

const CATEGORY_DESCRIPTION =
  "With a sleek and modern design, our products redefine the concept of seamless transitions between indoor and outdoor spaces.";

const CATEGORY_IMAGES = {
  "bi-fold-door": "https://images.unsplash.com/photo-1600566752734-2a0cd53d5c99?w=800",
  "sliding-door": "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800",
  "sliding-windows": "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800",
  "casement-window": "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800",
  "tilt-turn-window": "https://images.unsplash.com/photo-1600566752734-2a0cd53d5c99?w=800",
  "entrance-door": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
};

export default async function HomePage() {
  const categories = await getCategories();
  const products = await getProducts({ status: "published" });

  return (
    <Box>
      <HeroSlider />

      {/* Product by Categories — dynamically sourced from the categories dataset,
          each card's product count comes live from the products data. */}
      <Box py={{ base: 12, md: 16 }}>
        <Container maxW="1400px">
          <Heading textAlign="center" fontSize={{ base: "2xl", md: "3xl" }} mb={10}>
            Product by Categories
          </Heading>
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacingX={8} spacingY={12}>
            {categories.map((cat) => (
              <CategoryCard
                key={cat.id}
                name={cat.name}
                image={CATEGORY_IMAGES[cat.slug]}
                description={CATEGORY_DESCRIPTION}
                href={`/products/category/${cat.slug}`}
                comingSoon={cat.comingSoon}
              />
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Find Your Inspiration */}
      <Box py={{ base: 12, md: 16 }} bg="brand.gray50">
        <Container maxW="1400px">
          <Heading textAlign="center" fontSize={{ base: "2xl", md: "3xl" }} mb={4} fontFamily={'"Montserrat"'}>
            Find Your Inspiration
          </Heading>
          <Text textAlign="center" color="black" maxW="900px" mx="auto" mb={12} fontFamily={'"Montserrat"'}>
            Explore our collection of stunning glass projects and discover ideas to transform your home or business. From modern shower doors to custom glass installations, find the perfect design that matches your style and vision.
          </Text>
          <Slider itemWidth={260}>
            {categories.map((cat) => (
              <Box
                key={cat.id}
                as="a"
                href={cat.comingSoon ? "#" : `/products/category/${cat.slug}`}
                display="block"
                bg="white"
                borderRadius="md"
                p={10}
                textAlign="center"
                boxShadow="sm"
              >
                <CategoryIcon name={cat.icon} boxSize="80px" />
                <Text fontWeight="600" mt={6}>
                  {cat.name}
                </Text>
              </Box>
            ))}
          </Slider>
        </Container>
      </Box>

      <WhyChooseUs />
    </Box>
  );
}
