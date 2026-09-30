"use client";

import { useRef, useState } from "react";
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  HStack,
  Link as ChakraLink,
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";
import BrandText from "@/components/Common/BrandText";

export default function AdminTopbar() {
  const router = useRouter();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuCloseTimer = useRef();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updatingPassword, setUpdatingPassword] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const closePasswordModal = (force = false) => {
    if (updatingPassword && !force) return;
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    onClose();
  };

  const handlePasswordUpdate = async (event) => {
    event.preventDefault();
    setUpdatingPassword(true);

    try {
      const response = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Unable to update password");

      toast({ status: "success", title: "Password updated successfully" });
      closePasswordModal(true);
    } catch (error) {
      toast({ status: "error", title: error.message });
    } finally {
      setUpdatingPassword(false);
    }
  };

  return (
    <Box
      as="header"
      borderBottom="1px solid"
      borderColor="brand.gray200"
      bg="white"
    >
      <Container maxW="1600px">
        <Flex align="center" justify="space-between" py={4}>
          <Box>
            <Heading fontSize="lg">Admin Dashboard</Heading>
            <Text fontSize="sm" color="brand.gray500">
              <BrandText>Castillo’s Glass Product Manager</BrandText>
            </Text>
          </Box>
          <HStack spacing={6}>
            <ChakraLink
              as={NextLink}
              href="/admin"
              fontWeight="600"
              fontSize="sm"
            >
              Products
            </ChakraLink>
            <ChakraLink
              as={NextLink}
              href="/"
              fontSize="sm"
              color="brand.gray500"
            >
              View Site
            </ChakraLink>
            <Box
              onMouseEnter={() => {
                clearTimeout(menuCloseTimer.current);
                setMenuOpen(true);
              }}
              onMouseLeave={() => {
                menuCloseTimer.current = setTimeout(
                  () => setMenuOpen(false),
                  200,
                );
              }}
            >
              <Menu isOpen={menuOpen}>
                <MenuButton
                  as={IconButton}
                  aria-label="User menu"
                  icon={<FaUser />}
                  size="sm"
                  variant="ghost"
                />
                <MenuList
                  onMouseEnter={() => clearTimeout(menuCloseTimer.current)}
                  onMouseLeave={() => setMenuOpen(false)}
                >
                  <MenuItem
                    onClick={handleLogout}
                    _hover={{ bg: "brand.black", color: "white" }}
                  >
                    Logout
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setMenuOpen(false);
                      onOpen();
                    }}
                    _hover={{ bg: "brand.black", color: "white" }}
                  >
                    Change Password
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </HStack>
        </Flex>
      </Container>
      <Modal isOpen={isOpen} onClose={closePasswordModal} isCentered>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handlePasswordUpdate}>
            <ModalHeader>Change Password</ModalHeader>
            <ModalBody>
              <VStack spacing={4} align="stretch">
                <FormControl isRequired>
                  <FormLabel>Current Password</FormLabel>
                  <Input
                    type="password"
                    value={currentPassword}
                    onChange={(event) => setCurrentPassword(event.target.value)}
                    autoComplete="current-password"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>New Password</FormLabel>
                  <Input
                    type="password"
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                    autoComplete="new-password"
                    minLength={8}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Confirm Password</FormLabel>
                  <Input
                    type="password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    autoComplete="new-password"
                    minLength={8}
                  />
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={closePasswordModal}>
                Cancel
              </Button>
              <Button type="submit" isLoading={updatingPassword}>
                Update Password
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
}
