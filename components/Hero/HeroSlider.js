"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import { HERO_SLIDES } from "@/constants/hero";
import BrandText from "@/components/Common/BrandText";

const AUTOPLAY_MS = 6000;

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);
  const slideCount = HERO_SLIDES.length;

  const goTo = useCallback(
    (i) => setIndex(((i % slideCount) + slideCount) % slideCount),
    [slideCount]
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % slideCount);
    }, AUTOPLAY_MS);

    return () => clearInterval(timerRef.current);
  }, [slideCount]);

  const resetAutoplay = () => {
    clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % slideCount);
    }, AUTOPLAY_MS);
  };

  const slide = HERO_SLIDES[index];

  return (
    <Box
      position="relative"
      minH={{ base: "420px", md: "700px" }}
      overflow="hidden"
    >
      {/* Background Images */}
      {HERO_SLIDES.map((s, i) => (
        <Box
          key={s.id}
          position="absolute"
          inset={0}
          bgImage={`url('${s.image}')`}
          bgSize="cover"
          bgPosition="center"
          bgRepeat="no-repeat"
          opacity={i === index ? 1 : 0}
          transition="opacity 0.8s ease-in-out"
          zIndex={i === index ? 1 : 0}
        />
      ))}

      {/* Premium Light Black Overlay */}
      <Box
        position="absolute"
        inset={0}
        zIndex={2}
        bg="
          linear-gradient(
            90deg,
            rgba(0,0,0,0.45) 0%,
            rgba(0,0,0,0.35) 30%,
            rgba(0,0,0,0.28) 60%,
            rgba(0,0,0,0.20) 100%
          )
        "
      />

      {/* Content */}
      <Container
        maxW="1400px"
        position="relative"
        zIndex={3}
        color="white"
        h={{ base: "420px", md: "700px" }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Heading
          as="h1"
          fontSize={{ base: "2xl", md: "4xl" }}
          fontWeight="600"
          maxW="750px"
          lineHeight="1.25"
          whiteSpace="pre-line"
        >
          {slide.heading}
        </Heading>

        <Text
          mt={4}
          fontSize={{ base: "md", md: "lg" }}
          maxW="650px"
        >
          <BrandText>{slide.subheading}</BrandText>
        </Text>

        <Button
          as={NextLink}
          href="/get-a-quote"
          mt={8}
          variant="outline"
          border="1.5px solid white"
          bg="transparent"
          color="white"
          _hover={{
            bg: "whiteAlpha.200",
          }}
          px={8}
          w="fit-content"
        >
          Get a Quote
        </Button>
      </Container>

      {/* Previous Button */}
      <IconButton
        aria-label="Previous slide"
        icon={<ChevronLeftIcon boxSize={6} />}
        position="absolute"
        left={4}
        top="50%"
        transform="translateY(-50%)"
        zIndex={4}
        borderRadius="full"
        variant="outline"
        color="white"
        borderColor="whiteAlpha.700"
        _hover={{
          bg: "whiteAlpha.300",
        }}
        onClick={() => {
          prev();
          resetAutoplay();
        }}
      />

      {/* Next Button */}
      <IconButton
        aria-label="Next slide"
        icon={<ChevronRightIcon boxSize={6} />}
        position="absolute"
        right={4}
        top="50%"
        transform="translateY(-50%)"
        zIndex={4}
        borderRadius="full"
        variant="outline"
        color="white"
        borderColor="whiteAlpha.700"
        _hover={{
          bg: "whiteAlpha.300",
        }}
        onClick={() => {
          next();
          resetAutoplay();
        }}
      />

      {/* Dots */}
      <HStack
        position="absolute"
        bottom={6}
        left="50%"
        transform="translateX(-50%)"
        zIndex={4}
        spacing={2}
      >
        {HERO_SLIDES.map((s, i) => (
          <Box
            key={s.id}
            as="button"
            aria-label={`Go to slide ${i + 1}`}
            w={i === index ? "24px" : "8px"}
            h="8px"
            borderRadius="full"
            bg={i === index ? "white" : "whiteAlpha.600"}
            transition="all 0.3s"
            onClick={() => {
              goTo(i);
              resetAutoplay();
            }}
          />
        ))}
      </HStack>
    </Box>
  );
}