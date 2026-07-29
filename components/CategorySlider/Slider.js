"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Box, HStack, IconButton, Flex } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

export default function Slider({ children, itemWidth = 260, gap = 24, showDots = true }) {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const childCount = children?.length || 0;

  const scrollByAmount = useCallback(
    (direction) => {
      const el = trackRef.current;
      if (!el) return;

      const isAtStart = el.scrollLeft <= 2;
      const isAtEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2;

      if (direction > 0 && isAtEnd) {
        el.scrollTo({ left: 0, behavior: "smooth" });
        return;
      }

      if (direction < 0 && isAtStart) {
        el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
        return;
      }

      el.scrollBy({ left: direction * (itemWidth + gap), behavior: "smooth" });
    },
    [itemWidth, gap]
  );

  useEffect(() => {
    if (childCount < 2) return undefined;

    const interval = setInterval(() => scrollByAmount(1), 4000);
    return () => clearInterval(interval);
  }, [childCount, scrollByAmount]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      const index = Math.round(el.scrollLeft / (itemWidth + gap));
      setActiveIndex(Math.min(Math.max(index, 0), childCount - 1));
    };
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, [itemWidth, gap, childCount]);

  return (
    <Box position="relative">
      <HStack
        ref={trackRef}
        spacing={`${gap}px`}
        overflowX="auto"
        scrollSnapType="x mandatory"
        css={{
          "&::-webkit-scrollbar": { display: "none" },
          scrollbarWidth: "none",
        }}
        pb={2}
      >
        {children?.map((child, i) => (
          <Box key={i} flex={`0 0 ${itemWidth}px`} scrollSnapAlign="start">
            {child}
          </Box>
        ))}
      </HStack>

      <IconButton
        aria-label="Previous"
        icon={<ChevronLeftIcon />}
        position="absolute"
        left={-5}
        top="40%"
        transform="translateY(-50%)"
        borderRadius="full"
        bg="#F0F5FA"
        color="black"
        _hover={{ bg: "#F0F5FA" }}
        boxShadow="md"
        onClick={() => scrollByAmount(-1)}
        display={{ base: "none", md: "inline-flex" }}
      />
      <IconButton
        aria-label="Next"
        icon={<ChevronRightIcon />}
        position="absolute"
        right={-5}
        top="40%"
        transform="translateY(-50%)"
        borderRadius="full"
        bg="#F0F5FA"
        color="black"
        _hover={{ bg: "#F0F5FA" }}
        boxShadow="md"
        onClick={() => scrollByAmount(1)}
        display={{ base: "none", md: "inline-flex" }}
      />

      {showDots && (
        <Flex justify="center" mt={4} gap={2}>
          {children?.map((_, i) => (
            <Box
              key={i}
              w="8px"
              h="8px"
              borderRadius="full"
              bg={i === activeIndex ? "brand.black" : "brand.gray200"}
              transition="background 0.2s"
            />
          ))}
        </Flex>
      )}
    </Box>
  );
}
