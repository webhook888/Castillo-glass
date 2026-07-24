"use client";

import { Box, Image, Text, AspectRatio } from "@chakra-ui/react";
import NextLink from "next/link";

export default function ProductCard({ product }) {
  const imageSrc = product.gridImage || product.lifestyleImage;

  return (
    <Box
      as={NextLink}
      href={`/products/${product.slug}`}
      role="group"
      display="flex"
      flexDirection="column"
      bg="white"
      border="1px solid"
      borderColor="#dddddd"
      boxShadow="0 2px 5px rgba(0, 0, 0, 0.08)"
      p="15px"
      textDecoration="none"
      _hover={{ textDecoration: "none", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.12)" }}
      transition="box-shadow 0.3s ease"
    >
      <Box overflow="hidden" mb="15px">
        <AspectRatio ratio={1}>
          <Image
            src={imageSrc}
            alt={product.title}
            objectFit="cover"
            w="100%"
            h="100%"
            transition="transform 0.5s ease"
            _groupHover={{ transform: "scale(1.1)" }}
            fallbackSrc="https://via.placeholder.com/400x400?text=Bell+Air+Lux"
          />
        </AspectRatio>
      </Box>

      <Box
        overflow="hidden"
        maxH={0}
        mb={0}
        opacity={0}
        transition="max-height 0.4s ease, opacity 0.35s ease, margin-bottom 0.35s ease"
        _groupHover={{
          maxH: "52px",
          mb: "12px",
          opacity: 1,
        }}
      >
        <Box
          bg="#1a2332"
          color="white"
          borderRadius="full"
          py={2.5}
          px={6}
          textAlign="center"
          fontSize="sm"
          fontWeight="700"
          fontFamily="Montserrat, sans-serif"
          letterSpacing="0.02em"
          transform="translateY(100%)"
          transition="transform 0.35s ease"
          _groupHover={{ transform: "translateY(0)" }}
        >
          Read More
        </Box>
      </Box>

      <Text
        fontWeight="700"
        fontSize="14px"
        lineHeight="1.5"
        textAlign="center"
        color="brand.black"
        fontFamily="Montserrat, sans-serif"
        noOfLines={3}
        mt="auto"
      >
        {product.title}
      </Text>
    </Box>
  );
}
