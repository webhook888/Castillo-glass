"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Flex,
  Heading,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  IconButton,
  HStack,
  Text,
  useToast,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { ExternalLinkIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import { useRef } from "react";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [target, setTarget] = useState(null);
  const cancelRef = useRef();
  const toast = useToast();

  const loadProducts = () => {
    setLoading(true);
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async () => {
    if (!target) return;
    try {
      const res = await fetch(`/api/products/${target.slug}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      toast({ status: "success", title: "Product deleted" });
      setProducts((prev) => prev.filter((p) => p.slug !== target.slug));
    } catch (err) {
      toast({ status: "error", title: "Could not delete product" });
    } finally {
      setTarget(null);
    }
  };

  return (
    <Container maxW="1600px" py={10}>
      <Flex justify="space-between" align="center" mb={8}>
        <Heading fontSize="2xl">Products</Heading>
        <Button as={NextLink} href="/admin/products/new">
          Add Product
        </Button>
      </Flex>

      <Box bg="white" borderRadius="md" boxShadow="sm" overflowX="auto">
        {loading ? (
          <Center py={20}>
            <Spinner />
          </Center>
        ) : products.length === 0 ? (
          <Center py={20}>
            <Text color="brand.gray500">
              No products yet. Click &ldquo;Add Product&rdquo; to create your first one.
            </Text>
          </Center>
        ) : (
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Image</Th>
                <Th>Title</Th>
                <Th>Category</Th>
                <Th>Slug</Th>
                <Th textAlign="right">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {products.map((product) => (
                <Tr key={product.id}>
                  <Td>
                    <Image
                      src={product.gridImage || product.lifestyleImage}
                      alt={product.title}
                      boxSize="48px"
                      objectFit="cover"
                      borderRadius="sm"
                      fallbackSrc="https://via.placeholder.com/48"
                    />
                  </Td>
                  <Td fontWeight="600" maxW="320px">
                    {product.title}
                  </Td>
                  <Td>{product.category}</Td>
                  <Td color="blue.600" fontSize="sm">
                    {product.slug}
                  </Td>
                  <Td>
                    <HStack justify="flex-end" spacing={1}>
                      <IconButton
                        as={NextLink}
                        href={`/products/${product.slug}`}
                        target="_blank"
                        aria-label="View product"
                        icon={<ExternalLinkIcon />}
                        variant="ghost"
                        size="sm"
                      />
                      <IconButton
                        as={NextLink}
                        href={`/admin/products/${product.slug}/edit`}
                        aria-label="Edit product"
                        icon={<EditIcon />}
                        variant="ghost"
                        size="sm"
                      />
                      <IconButton
                        aria-label="Delete product"
                        icon={<DeleteIcon />}
                        variant="ghost"
                        size="sm"
                        color="red.500"
                        onClick={() => setTarget(product)}
                      />
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Box>

      <AlertDialog isOpen={!!target} leastDestructiveRef={cancelRef} onClose={() => setTarget(null)}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Delete Product</AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete &ldquo;{target?.title}&rdquo;? This will remove it
              everywhere, including the live site.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} variant="ghost" onClick={() => setTarget(null)}>
                Cancel
              </Button>
              <Button colorScheme="red" bg="red.500" color="white" onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Container>
  );
}
