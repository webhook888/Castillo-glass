"use client";

import { useState } from "react";
import { Box, Image, SimpleGrid, AspectRatio } from "@chakra-ui/react";

export default function ProductImageGallery({ images, title }) {
  const validImages = images.filter(Boolean);
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (validImages.length === 0) {
    return (
      <AspectRatio ratio={4 / 3}>
        <Box bg="brand.gray100" borderRadius="sm" />
      </AspectRatio>
    );
  }

  const mainImage = validImages[selectedIndex] || validImages[0];
  const thumbnails = validImages.slice(0, 5);

  return (
    <Box>
      <AspectRatio ratio={4 / 3} mb={3}>
        <Image
          src={mainImage}
          alt={title}
          objectFit="cover"
          borderRadius="sm"
          fallbackSrc="https://via.placeholder.com/800x600?text=Bell+Air+Lux"
        />
      </AspectRatio>

      {thumbnails.length > 1 && (
        <SimpleGrid columns={5} spacing={2}>
          {thumbnails.map((src, index) => (
            <AspectRatio key={`${src}-${index}`} ratio={1}>
              <Image
                src={src}
                alt={`${title} thumbnail ${index + 1}`}
                objectFit="cover"
                borderRadius="sm"
                cursor="pointer"
                border="2px solid"
                borderColor={selectedIndex === index ? "brand.black" : "transparent"}
                onClick={() => setSelectedIndex(index)}
                transition="border-color 0.2s"
                _hover={{ borderColor: selectedIndex === index ? "brand.black" : "brand.gray200" }}
                fallbackSrc="https://via.placeholder.com/100"
              />
            </AspectRatio>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
}
