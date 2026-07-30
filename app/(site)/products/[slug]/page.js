import { notFound } from "next/navigation";
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Image,
  VStack,
  HStack,
  Button,
  Table,
  Tbody,
  Tr,
  Td,
  AspectRatio,
} from "@chakra-ui/react";
import NextLink from "next/link";
import ProductImageGallery from "@/components/ProductDetail/ProductImageGallery";
import { getProductBySlug, getCategoryBySlug } from "@/lib/db";
import { STATIC_PRODUCT_CATEGORIES } from "@/constants/productCategories";

export async function generateMetadata({ params }) {
  const product = await getProductBySlug(params.slug);
  return {
    title: product?.seo?.title || (product ? `${product.title} | Bell Air Lux` : "Bell Air Lux"),
    description: product?.seo?.description || product?.shortDescription,
  };
}

function getQuickInfoRows(product) {
  const quickInfo = product.quickInfo;

  if (Array.isArray(quickInfo)) {
    return quickInfo.filter((row) => row.label?.trim() || row.value?.trim());
  }

  if (quickInfo && typeof quickInfo === "object") {
    const legacyLabels = {
      productOrigin: "Product Origin",
      itemNo: "Item NO.",
      color: "Color",
      leadTime: "Lead Time",
      tradeTerms: "Trade terms",
      shippingPort: "Shipping Port",
    };

    return Object.entries(legacyLabels)
      .map(([key, label]) => ({ label, value: quickInfo[key] || "" }))
      .filter((row) => row.value);
  }

  const specs = product.specs || {};
  const legacyLabels = {
    productOrigin: "Product Origin",
    itemNo: "Item NO.",
    color: "Color",
    leadTime: "Lead Time",
    tradeTerms: "Trade terms",
    shippingPort: "Shipping Port",
  };

  const legacyValues = {
    productOrigin: specs.productOrigin || "",
    itemNo: specs.productCode || specs.itemNo || "",
    color: specs.color || "",
    leadTime: specs.leadTime || "",
    tradeTerms: specs.tradeTerms || "",
    shippingPort: specs.shippingPort || "",
  };

  return Object.entries(legacyLabels)
    .map(([key, label]) => ({ label, value: legacyValues[key] || "" }))
    .filter((row) => row.value);
}

function QuickInfoTable({ rows }) {
  if (rows.length === 0) return null;

  return (
    <Box border="1px solid" borderColor="brand.gray200">
      <Table variant="unstyled" size="sm">
        <Tbody>
          {rows.map((row, index) => (
            <Tr key={`${row.label}-${index}`} bg={index % 2 === 0 ? "white" : "brand.gray50"}>
              <Td
                fontWeight="600"
                fontSize="sm"
                py={3}
                px={4}
                w="45%"
                borderBottom="1px solid"
                borderColor="brand.gray200"
                fontFamily="Montserrat, sans-serif"
              >
                {row.label}
              </Td>
              <Td
                fontSize="sm"
                py={3}
                px={4}
                borderBottom="1px solid"
                borderColor="brand.gray200"
                fontFamily="Montserrat, sans-serif"
              >
                {row.value}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default async function ProductDetailPage({ params }) {
  const product = await getProductBySlug(params.slug);
  if (!product || product.status === "draft") return notFound();

  const category =
    (await getCategoryBySlug(product.category)) ||
    STATIC_PRODUCT_CATEGORIES.find((item) => item.slug === product.category);
  const quickInfoRows = getQuickInfoRows(product);
  const galleryImages = [product.lifestyleImage, ...(product.galleryImages || [])].filter(Boolean);
  const hardwareImage = product.hardwareConfigurations?.[0]?.imageUrl;
  const detailImages =
    product.detailGalleryImages?.length > 0
      ? product.detailGalleryImages
      : (product.featureDetails || []).map((item) => item.imageUrl).filter(Boolean);

  return (
    <Box>
      {/* Breadcrumb bar */}
      <Box bg="brand.gray100" pb={3} pt={'40px'}>
        <Container maxW="1280px" bg={'#E2E2E2'} p={'10px 20px'} color={'black'} fontWeight={'700'}>
          <HStack
            spacing={2}
            fontSize="sm"
            color="brand.gray500"
            fontFamily="Montserrat, sans-serif"
            flexWrap="wrap"
          >
            <Box as={NextLink} href="/" _hover={{ color: "brand.black" }}>
              Home
            </Box>
            <Text>/</Text>
            {category && (
              <>
                <Box
                  as={NextLink}
                  href={`/products/category/${category.slug}`}
                  _hover={{ color: "brand.black" }}
                >
                  {category.name}
                </Box>
                <Text>/</Text>
              </>
            )}
            <Text color="brand.black" noOfLines={1}>
              {product.title}
            </Text>
          </HStack>
        </Container>
      </Box>

      {/* Hero section */}
      <Container maxW="1280px" py={{ base: 8, md: 10 }}>
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 8, lg: 12 }} alignItems="start">
          <ProductImageGallery images={galleryImages} title={product.title} />

          <VStack align="stretch" spacing={6}>
            <Heading
              as="h1"
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="700"
              lineHeight="1.3"
              fontFamily="Poppins, sans-serif"
            >
              {product.title}
            </Heading>

            {product.shortDescription && (
              <Text
                fontSize="sm"
                lineHeight="1.8"
                color="brand.black"
                fontFamily="Montserrat, sans-serif"
              >
                {product.shortDescription}
              </Text>
            )}

            <QuickInfoTable rows={quickInfoRows} />

            {hardwareImage && (
              <Box>
                <Heading
                  as="h3"
                  fontSize="md"
                  fontWeight="700"
                  mb={4}
                  fontFamily="Poppins, sans-serif"
                >
                  Hardware Configuration
                </Heading>
                <Image
                  src={hardwareImage}
                  alt=""
                  objectFit="contain"
                  w="full"
                  maxH="320px"
                  fallbackSrc="https://via.placeholder.com/400x200"
                />
              </Box>
            )}

            <Button
              as={NextLink}
              href={`/get-a-quote?product=${encodeURIComponent(product.title)}`}
              alignSelf="flex-start"
              px={10}
              py={6}
              fontSize="sm"
              letterSpacing="wider"
              boxShadow={'0px 0px 10px 0px rgba(0,0,0,0.5)'}
            >
              INQUIRY NOW
            </Button>
          </VStack>
        </SimpleGrid>
      </Container>

      {/* Product Details tab section */}
      <Box mt={4}>
        <Container maxW="1280px">
          <Box bg="brand.black" p={3} w={'100%'} maxW={'190px'} textAlign={'center'}>
            <Text
              color="white"
              fontWeight="600"
              fontSize="sm"
              fontFamily="Montserrat, sans-serif"
            >
              Product Details
            </Text>
          </Box>



        </Container>

        <Container maxW="1280px" py={{ base: 8, md: 10 }}>
          {product.details && (
            <Box mb={10}>
              <Heading
                as="h2"
                fontSize="lg"
                fontWeight="700"
                mb={4}
                fontFamily="Poppins, sans-serif"
              >
                Product Features
              </Heading>
              <Text
                fontSize="sm"
                lineHeight="1.9"
                color="brand.black"
                fontFamily="Montserrat, sans-serif"
                whiteSpace="pre-line"
              >
                {product.details}
              </Text>
            </Box>
          )}

          {product.specifications?.length > 0 && (
            <Box>
              <Heading
                as="h2"
                fontSize="lg"
                fontWeight="700"
                mb={4}
                fontFamily="Poppins, sans-serif"
              >
                Product Specifications
              </Heading>
              <Box border="1px solid" borderColor="brand.gray200" overflow="hidden">
                <Table variant="unstyled" size="sm">
                  <Tbody>
                    {product.specifications.map((row, index) => (
                      <Tr key={`${row.label}-${index}`}>
                        <Td
                          fontWeight="600"
                          fontSize="sm"
                          py={4}
                          px={5}
                          w={{ base: "40%", md: "30%" }}
                          verticalAlign="top"
                          borderBottom="1px solid"
                          borderRight="1px solid"
                          borderColor="brand.gray200"
                          bg="brand.gray50"
                          fontFamily="Montserrat, sans-serif"
                        >
                          {row.label}
                        </Td>
                        <Td
                          fontSize="sm"
                          py={4}
                          px={5}
                          verticalAlign="top"
                          borderBottom="1px solid"
                          borderColor="brand.gray200"
                          fontFamily="Montserrat, sans-serif"
                          whiteSpace="pre-line"
                        >
                          {row.value}
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            </Box>
          )}
        </Container>
      </Box>

      {/* Detail image gallery */}
      {detailImages.length > 0 && (
        <Container maxW="1280px" pb={{ base: 10, md: 14 }}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            {detailImages.map((src, index) => (
              <AspectRatio key={`${src}-${index}`} ratio={4 / 3}>
                <Image
                  src={src}
                  alt={`${product.title} detail ${index + 1}`}
                  objectFit="cover"
                  borderRadius="sm"
                  fallbackSrc="https://via.placeholder.com/600x450"
                />
              </AspectRatio>
            ))}
          </SimpleGrid>
        </Container>
      )}
    </Box>
  );
}
