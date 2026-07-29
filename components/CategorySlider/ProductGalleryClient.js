"use client";

import { useEffect, useState } from "react";
import { Box, Container, Flex, Heading, IconButton, SimpleGrid, Image, AspectRatio } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const PAGE_SIZE = 6;

export default function ProductGalleryClient({ images }) {
  const [page, setPage] = useState(0);
  const pageCount = Math.max(Math.ceil(images.length / PAGE_SIZE), 1);
  const visible = images.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  useEffect(() => {
    if (pageCount < 2) return undefined;

    const interval = setInterval(() => {
      setPage((currentPage) => (currentPage + 1) % pageCount);
    }, 5000);

    return () => clearInterval(interval);
  }, [pageCount]);

  return (
    <Box py={{ base: 12, md: 16 }} bg="brand.gray50">
      <Container maxW="1400px">
        <Flex justify="space-between" align="center" mb={8}>
          <Heading fontSize={{ base: "2xl", md: "3xl" }}>Products Gallery</Heading>
          <Flex gap={2}>
            <IconButton
              aria-label="Previous page"
              icon={<ChevronLeftIcon />}
              borderRadius="full"
              variant="outline"
              bg="#F0F5FA"
              color="black"
              isDisabled={pageCount < 2}
              onClick={() => setPage((p) => (p - 1 + pageCount) % pageCount)}
            />
            <IconButton
              aria-label="Next page"
              icon={<ChevronRightIcon />}
              borderRadius="full"
              variant="outline"
              bg="#F0F5FA"
              color="black"
              isDisabled={pageCount < 2}
              onClick={() => setPage((p) => (p + 1) % pageCount)}
            />
          </Flex>
        </Flex>

        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
          {visible.map((src, i) => (
            <AspectRatio key={`${page}-${i}`} ratio={4 / 3}>
              <Image src={src} alt="Bell Air Lux product" borderRadius="md" objectFit="cover" />
            </AspectRatio>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
