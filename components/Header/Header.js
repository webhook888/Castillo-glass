"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Flex,
  Button,
  HStack,
  Text,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  DrawerCloseButton,
  VStack,
  Icon,
  Image,
} from "@chakra-ui/react";
import { HamburgerIcon, ChevronDownIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS, SITE_NAME, SITE_TAGLINE } from "@/constants/site";
import MegaMenu from "@/components/MegaMenu/MegaMenu";

function Logo() {
  return (
    <HStack as={NextLink} href="/" spacing={2} align="center">
      <Box w={'230px'} h={'50px'} flexShrink={0}>
        <Image
          src="/images/logonew.png"
          alt="Logo"
          w="100%"
          h="100%"
          objectFit="contain"
        />
      </Box>

    </HStack>
  );
}

export default function Header() {
  const [categories, setCategories] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data.categories || []))
      .catch(() => setCategories([]));
  }, []);

  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex={50}
      bg="white"
      borderBottom="1px solid"
      borderColor="brand.gray200"
      onMouseLeave={() => setMenuOpen(false)}
    >
      <Container maxW="1280px">
        <Flex align="center" justify="space-between" py={'30px'}>
          <Logo />

          <HStack spacing={8} display={{ base: "none", lg: "flex" }} fontFamily={'Montserrat'} fontWeight={'400'} fontSize={'15px'}>
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Box
                  key={link.label}
                  position="relative"
                  onMouseEnter={() => link.hasMegaMenu && setMenuOpen(true)}
                >
                  <HStack
                    as={NextLink}
                    href={link.href}
                    spacing={1}
                    fontWeight="600"
                    color={active ? "brand.gray500" : "brand.black"}
                    _hover={{ color: "brand.gray500" }}
                    transition="color 0.2s"
                  >
                    <Text>{link.label}</Text>
                    {link.hasMegaMenu && <ChevronDownIcon />}
                  </HStack>
                </Box>
              );
            })}
          </HStack>

          <HStack spacing={4}>
            <Button
              as={NextLink}
              href="/get-a-quote"
              display={{ base: "none", md: "inline-flex" }}
              px={6}
              boxShadow={'0px 0px 10px 0px rgba(0,0,0,0.5)'}
            >
              Get a Quote
            </Button>
            <IconButton
              aria-label="Open menu"
              icon={<HamburgerIcon />}
              variant="ghost"
              display={{ base: "inline-flex", lg: "none" }}
              onClick={() => setIsOpen(true)}
            />
          </HStack>
        </Flex>
      </Container>

      {menuOpen && (
        <MegaMenu categories={categories} onNavigate={() => setMenuOpen(false)} />
      )}

      <Drawer isOpen={isOpen} placement="right" onClose={() => setIsOpen(false)}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody pt={16}>
            <VStack align="stretch" spacing={6}>
              {NAV_LINKS.map((link) => (
                <Text
                  as={NextLink}
                  key={link.label}
                  href={link.href}
                  fontWeight="600"
                  fontSize="lg"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Text>
              ))}
              <Button as={NextLink} href="/get-a-quote" onClick={() => setIsOpen(false)}>
                Get a Quote
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
