"use client";

import { Box, Image, Heading, Text, Button, AspectRatio } from "@chakra-ui/react";
import NextLink from "next/link";

export default function CategoryCard({ name, image, description, href, comingSoon }) {
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
      <Heading fontSize="lg" mb={2}>
        {name}
      </Heading>
      <Text fontSize="sm" color="black" mb={4} noOfLines={3} fontFamily={'"Montserrat"'}>
        {description}
      </Text>
      <Button
        as={NextLink}
        href={comingSoon ? "#" : href}
        size="sm"
        h={'40px'}
        p={'15px 30px 015px 30px'}
        
        
      >
        View Products
      </Button>
    </Box>
  );
}
