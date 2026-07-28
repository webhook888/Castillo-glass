"use client";

import {
  Box,
  Image,
  Heading,
  Text,
  AspectRatio,
  Button,
} from "@chakra-ui/react";
import NextLink from "next/link";

export default function CategoryCard({ name, image, description, href }) {
  return (
    <Box>
      <AspectRatio ratio={4 / 3} mb={4}>
        <Image
          src={image}
          alt={name}
          borderRadius="md"
          objectFit="cover"
          fallbackSrc="https://via.placeholder.com/400x300?text=Bell+Air+Lux"
        />
      </AspectRatio>
      <Heading
        as={NextLink}
        href={href}
        display="block"
        fontSize="lg"
        mb={2}
        _hover={{ color: "grey" }}
      >
        {name}
      </Heading>
      <Text
        fontSize="sm"
        color="black"
        mb={4}
        noOfLines={3}
        fontFamily={'"Montserrat"'}
      >
        {description}
      </Text>
      <Button
        as={NextLink}
        href=""
        display={{ base: "inline-flex", md: "inline-flex" }}
        w={{base: "100%", md: "auto"}}
        px={6}
        boxShadow={"0px 0px 10px 0px rgba(0,0,0,0.5)"}
        fontFamily={'"Montserrat"'}
        fontSize={"14px"}
      >
        View Products
      </Button>
    </Box>
  );
}
