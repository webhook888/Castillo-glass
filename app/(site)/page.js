import { Box, Container, Heading, Image, SimpleGrid, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import HeroSlider from "@/components/Hero/HeroSlider";
import CategoryCard from "@/components/ProductCard/CategoryCard";
import Slider from "@/components/CategorySlider/Slider";
import WhyChooseUs from "@/components/Common/WhyChooseUs";
import { STATIC_PRODUCT_CATEGORIES } from "@/constants/productCategories";
import { MEGA_MENU_IMAGES } from "@/constants/megaMenuImages";

export default function HomePage() {
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
            {STATIC_PRODUCT_CATEGORIES.map((category) => (
              <CategoryCard
                key={category.slug}
                name={category.name}
                image={category.image}
                description={category.description}
                href={`/products/category/${category.slug}`}
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
            {STATIC_PRODUCT_CATEGORIES.map((category, index) => (
              <Box
                key={category.slug}
                display="block"
                bg="white"
                borderRadius="md"
                textAlign="center"
                boxShadow="sm"
                overflow="hidden"
              >
                <Image
                  src={MEGA_MENU_IMAGES[index]}
                  alt={category.name}
                  w="100%"
                  h="220px"
                  objectFit="cover"
                />
                <Text
                  as={NextLink}
                  href={`/products/category/${category.slug}`}
                  display="block"
                  fontWeight="600"
                  p={5}
                  _hover={{ color: "black" }}
                >
                  {category.name}
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
