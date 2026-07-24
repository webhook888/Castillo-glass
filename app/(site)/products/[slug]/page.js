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

export async function generateMetadata({ params }) {
  const product = await getProductBySlug(params.slug);
  return {
    title: product?.seo?.title || (product ? `${product.title} | Bell Air Lux` : "Bell Air Lux"),
    description: product?.seo?.description || product?.shortDescription,
  };
}

function getQuickInfo(product) {
  if (product.quickInfo) return product.quickInfo;

  return {
    productOrigin: product.specs?.productOrigin || "",
    itemNo: product.specs?.productCode || product.specs?.itemNo || "",
    color: product.specs?.color || "",
    leadTime: product.specs?.leadTime || "",
    tradeTerms: product.specs?.tradeTerms || "",
    shippingPort: product.specs?.shippingPort || "",
  };
}

function QuickInfoTable({ quickInfo }) {
  const rows = [
    ["Product Origin", quickInfo.productOrigin],
    ["Item NO.", quickInfo.itemNo],
    ["Color", quickInfo.color],
    ["Lead Time", quickInfo.leadTime],
    ["Trade terms", quickInfo.tradeTerms],
    ["Shipping Port", quickInfo.shippingPort],
  ].filter(([, value]) => value);

  if (rows.length === 0) return null;

  return (
    <Box border="1px solid" borderColor="brand.gray200">
      <Table variant="unstyled" size="sm">
        <Tbody>
          {rows.map(([label, value], index) => (
            <Tr key={label} bg={index % 2 === 0 ? "white" : "brand.gray50"}>
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
                {label}
              </Td>
              <Td
                fontSize="sm"
                py={3}
                px={4}
                borderBottom="1px solid"
                borderColor="brand.gray200"
                fontFamily="Montserrat, sans-serif"
              >
                {value}
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

  const category = await getCategoryBySlug(product.category);
  const quickInfo = getQuickInfo(product);
  const galleryImages = [product.lifestyleImage, ...(product.galleryImages || [])].filter(Boolean);
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

            <QuickInfoTable quickInfo={quickInfo} />

            {product.hardwareConfigurations?.length > 0 && (
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
                <SimpleGrid columns={{ base: 2, sm: 3, md: 5 }} spacing={4}>
                  {product.hardwareConfigurations.map((item, index) => (
                    <VStack key={`${item.label}-${index}`} spacing={2} align="center" textAlign="center">
                      <Box w="full" maxW="80px">
                        <AspectRatio ratio={1}>
                          <Image
                            src={item.imageUrl}
                            alt={item.label}
                            objectFit="contain"
                            fallbackSrc="https://via.placeholder.com/80"
                          />
                        </AspectRatio>
                      </Box>
                      <Text fontSize="xs" lineHeight="1.4" fontFamily="Montserrat, sans-serif">
                        {item.label}
                      </Text>
                    </VStack>
                  ))}
                </SimpleGrid>
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
