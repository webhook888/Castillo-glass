"use client";

import { useState } from "react";
import {
  Box,
  Container,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  SimpleGrid,
  Button,
  IconButton,
  HStack,
  VStack,
  Divider,
  Switch,
  useToast,
  Text,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";
import NextLink from "next/link";
import ImageUpload from "@/components/Common/ImageUpload";

const CATEGORY_OPTIONS = [
  { value: "sliding-door", label: "Sliding Door" },
  { value: "sliding-windows", label: "Sliding Windows" },
  { value: "bi-fold-door", label: "Bi-Fold Door" },
  { value: "casement-window", label: "Casement Window" },
  { value: "tilt-turn-window", label: "Tilt & Turn Window" },
  { value: "entrance-door", label: "Entrance Door" },
];

const QUICK_INFO_FIELDS = [
  { key: "productOrigin", label: "Product Origin" },
  { key: "itemNo", label: "Item NO." },
  { key: "color", label: "Color" },
  { key: "leadTime", label: "Lead Time" },
  { key: "tradeTerms", label: "Trade terms" },
  { key: "shippingPort", label: "Shipping Port" },
];

const MAX_THUMBNAIL_IMAGES = 5;

function emptyProduct() {
  return {
    title: "",
    slug: "",
    category: "bi-fold-door",
    shortDescription: "",
    lifestyleImage: "",
    galleryImages: [],
    quickInfo: {
      productOrigin: "",
      itemNo: "",
      color: "",
      leadTime: "",
      tradeTerms: "",
      shippingPort: "",
    },
    hardwareConfigurations: [],
    details: "",
    specifications: [],
    detailGalleryImages: [],
    gridImage: "",
    status: "published",
    featured: false,
    seo: { title: "", description: "" },
  };
}

function normalizeProduct(initialProduct) {
  const base = emptyProduct();
  if (!initialProduct) return base;

  const legacyQuickInfo = {
    productOrigin: initialProduct.specs?.productOrigin || "",
    itemNo: initialProduct.specs?.productCode || initialProduct.specs?.itemNo || "",
    color: initialProduct.specs?.color || "",
    leadTime: initialProduct.specs?.leadTime || "",
    tradeTerms: initialProduct.specs?.tradeTerms || "",
    shippingPort: initialProduct.specs?.shippingPort || "",
  };

  const detailGalleryImages =
    initialProduct.detailGalleryImages?.length > 0
      ? initialProduct.detailGalleryImages
      : (initialProduct.featureDetails || []).map((item) => item.imageUrl).filter(Boolean);

  return {
    ...base,
    ...initialProduct,
    quickInfo: { ...base.quickInfo, ...legacyQuickInfo, ...initialProduct.quickInfo },
    galleryImages: initialProduct.galleryImages || [],
    hardwareConfigurations: initialProduct.hardwareConfigurations || [],
    specifications: initialProduct.specifications || [],
    detailGalleryImages,
  };
}

export default function ProductForm({ initialProduct, mode = "create" }) {
  const [product, setProduct] = useState(() => normalizeProduct(initialProduct));
  const [saving, setSaving] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const update = (field, value) => setProduct((p) => ({ ...p, [field]: value }));
  const updateQuickInfo = (field, value) =>
    setProduct((p) => ({ ...p, quickInfo: { ...p.quickInfo, [field]: value } }));

  const updateGalleryImage = (index, value) => {
    const next = [...product.galleryImages];
    next[index] = value;
    update("galleryImages", next);
  };

  const addGalleryImage = () => {
    if (product.galleryImages.length >= MAX_THUMBNAIL_IMAGES) {
      toast({
        status: "warning",
        title: `Maximum ${MAX_THUMBNAIL_IMAGES} thumbnail images allowed`,
      });
      return;
    }
    update("galleryImages", [...product.galleryImages, ""]);
  };

  const removeGalleryImage = (index) => {
    update(
      "galleryImages",
      product.galleryImages.filter((_, i) => i !== index)
    );
  };

  const updateDetailGalleryImage = (index, value) => {
    const next = [...product.detailGalleryImages];
    next[index] = value;
    update("detailGalleryImages", next);
  };

  const addDetailGalleryImage = () => {
    update("detailGalleryImages", [...product.detailGalleryImages, ""]);
  };

  const removeDetailGalleryImage = (index) => {
    update(
      "detailGalleryImages",
      product.detailGalleryImages.filter((_, i) => i !== index)
    );
  };

  const addHardware = () =>
    update("hardwareConfigurations", [
      ...product.hardwareConfigurations,
      { label: "", imageUrl: "" },
    ]);

  const updateHardware = (i, field, value) => {
    const next = [...product.hardwareConfigurations];
    next[i] = { ...next[i], [field]: value };
    update("hardwareConfigurations", next);
  };

  const removeHardware = (i) =>
    update(
      "hardwareConfigurations",
      product.hardwareConfigurations.filter((_, idx) => idx !== i)
    );

  const addSpecRow = () =>
    update("specifications", [...product.specifications, { label: "", value: "" }]);

  const updateSpecRow = (i, field, value) => {
    const next = [...product.specifications];
    next[i] = { ...next[i], [field]: value };
    update("specifications", next);
  };

  const removeSpecRow = (i) =>
    update(
      "specifications",
      product.specifications.filter((_, idx) => idx !== i)
    );

  const handleSubmit = async () => {
    if (!product.title.trim()) {
      toast({ status: "error", title: "Product Title is required" });
      return;
    }
    setSaving(true);

    const galleryImages = product.galleryImages.map((url) => url.trim()).filter(Boolean).slice(0, MAX_THUMBNAIL_IMAGES);
    const detailGalleryImages = product.detailGalleryImages.map((url) => url.trim()).filter(Boolean);
    const hardwareConfigurations = product.hardwareConfigurations
      .map((row) => ({
        label: row.label.trim(),
        imageUrl: row.imageUrl.trim(),
      }))
      .filter((row) => row.label || row.imageUrl);

    const payload = {
      ...product,
      galleryImages,
      detailGalleryImages,
      hardwareConfigurations,
      gridImage: product.gridImage || galleryImages[0] || product.lifestyleImage,
    };

    try {
      const url = mode === "edit" ? `/api/products/${initialProduct.slug}` : "/api/products";
      const method = mode === "edit" ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save product");

      toast({ status: "success", title: mode === "edit" ? "Product updated" : "Product created" });
      router.push("/admin");
      router.refresh();
    } catch (err) {
      toast({ status: "error", title: err.message });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Container maxW="1400px" py={10}>
      <Heading fontSize="2xl" mb={8}>
        {mode === "edit" ? "Edit Product" : "Add Product"}
      </Heading>

      <VStack align="stretch" spacing={10} bg="white" p={8} borderRadius="md" boxShadow="0px 0px 2px 0px rgba(0,0,0,0.5)" border={'1px solid black'}>
        {/* 1. Basic Information */}
        <Box>
          <Heading fontSize="md" mb={4}>
            Basic Information
          </Heading>
          <VStack align="stretch" spacing={4}>
            <FormControl isRequired>
              <FormLabel>Product Title</FormLabel>
              <Input value={product.title} onChange={(e) => update("title", e.target.value)} />
            </FormControl>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <FormControl>
                <FormLabel>Slug</FormLabel>
                <Input
                  placeholder="auto-generated from title if left blank"
                  value={product.slug}
                  onChange={(e) => update("slug", e.target.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Category (Breadcrumb)</FormLabel>
                <Select value={product.category} onChange={(e) => update("category", e.target.value)}>
                  {CATEGORY_OPTIONS.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </SimpleGrid>
            <FormControl>
              <FormLabel>Introductory Description</FormLabel>
              <Textarea
                rows={4}
                value={product.shortDescription}
                onChange={(e) => update("shortDescription", e.target.value)}
                placeholder="Short paragraph shown below the product title"
              />
            </FormControl>
          </VStack>
        </Box>

        <Divider />

        {/* 2. Main Gallery Images */}
        <Box>
          <Heading fontSize="md" mb={2}>
            Main Gallery Images
          </Heading>
          <Text fontSize="sm" color="brand.gray500" mb={4}>
            Upload images directly from your device. Each field accepts one image.
          </Text>
          <VStack align="stretch" spacing={4}>
            <ImageUpload
              label="Main Image"
              value={product.lifestyleImage}
              onChange={(value) => update("lifestyleImage", value)}
            />

            <Box>
              <HStack justify="space-between" mb={3}>
                <Box>
                  <FormLabel mb={0}>Thumbnail Images</FormLabel>
                  <Text fontSize="xs" color="brand.gray500" mt={1}>
                    Upload one image per field. Up to {MAX_THUMBNAIL_IMAGES} thumbnail images will be displayed.
                  </Text>
                </Box>
                <Button
                  size="sm"
                  leftIcon={<AddIcon />}
                  onClick={addGalleryImage}
                  isDisabled={product.galleryImages.length >= MAX_THUMBNAIL_IMAGES}
                >
                  Add Thumbnail
                </Button>
              </HStack>
              <VStack align="stretch" spacing={3}>
                {product.galleryImages.length === 0 ? (
                  <Text fontSize="sm" color="brand.gray500">
                    No thumbnail images added yet.
                  </Text>
                ) : (
                  product.galleryImages.map((url, index) => (
                    <HStack key={index} align="flex-end">
                      <Box flex={1}>
                        <ImageUpload
                          label={`Thumbnail ${index + 1}`}
                          value={url}
                          onChange={(value) => updateGalleryImage(index, value)}
                        />
                      </Box>
                      <IconButton
                        aria-label={`Remove thumbnail ${index + 1}`}
                        icon={<DeleteIcon />}
                        bg="black"
                        color="white"
                        mb={1}
                        onClick={() => removeGalleryImage(index)}
                      />
                    </HStack>
                  ))
                )}
              </VStack>
            </Box>
          </VStack>
        </Box>

        <Divider />

        {/* 3. Quick Info Table */}
        <Box>
          <Heading fontSize="md" mb={4}>
            Quick Info Table
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            {QUICK_INFO_FIELDS.map(({ key, label }) => (
              <FormControl key={key}>
                <FormLabel>{label}</FormLabel>
                <Input
                  value={product.quickInfo[key]}
                  onChange={(e) => updateQuickInfo(key, e.target.value)}
                />
              </FormControl>
            ))}
          </SimpleGrid>
        </Box>

        <Divider />

        {/* 4. Hardware Configurations */}
        <Box>
          <HStack justify="space-between" mb={2}>
            <Heading fontSize="md">Hardware Configuration</Heading>
            <IconButton aria-label="Add hardware row" icon={<AddIcon />} size="sm" onClick={addHardware} />
          </HStack>
          <Text fontSize="sm" color="brand.gray500" mb={4}>
            Add each hardware item with a label and upload its image.
          </Text>
          <VStack align="stretch" spacing={4}>
            {product.hardwareConfigurations.length === 0 ? (
              <Text fontSize="sm" color="brand.gray500">
                No hardware items added yet.
              </Text>
            ) : (
              product.hardwareConfigurations.map((row, i) => (
                <Box key={i} border="1px solid" borderColor="brand.gray200" borderRadius="md" p={4}>
                  <HStack justify="space-between" mb={3}>
                    <Text fontSize="sm" fontWeight="600">
                      Hardware Item {i + 1}
                    </Text>
                    <IconButton
                      aria-label="Remove hardware item"
                      icon={<DeleteIcon />}
                      size="sm"
                      bg="black"
                      color="white"
                      onClick={() => removeHardware(i)}
                    />
                  </HStack>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                    <FormControl>
                      <FormLabel fontSize="sm">Label</FormLabel>
                      <Input
                        placeholder="e.g. High Load Bearing Roller"
                        value={row.label}
                        onChange={(e) => updateHardware(i, "label", e.target.value)}
                      />
                    </FormControl>
                    <ImageUpload
                      label="Image"
                      value={row.imageUrl}
                      onChange={(value) => updateHardware(i, "imageUrl", value)}
                    />
                  </SimpleGrid>
                </Box>
              ))
            )}
          </VStack>
        </Box>

        <Divider />

        {/* 5. Product Features */}
        <Box>
          <Heading fontSize="md" mb={4}>
            Product Features
          </Heading>
          <FormControl>
            <FormLabel>Product Features Text</FormLabel>
            <Textarea
              rows={6}
              value={product.details}
              onChange={(e) => update("details", e.target.value)}
              placeholder="Paragraph shown under the Product Features heading"
            />
          </FormControl>
        </Box>

        <Divider />

        {/* 6. Product Specifications Table */}
        <Box>
          <HStack justify="space-between" mb={4}>
            <Heading fontSize="md">Product Specifications Table</Heading>
            <IconButton aria-label="Add specification row" icon={<AddIcon />} size="sm" onClick={addSpecRow} />
          </HStack>
          <VStack align="stretch" spacing={3}>
            {product.specifications.map((row, i) => (
              <HStack key={i} align="flex-start">
                <Input
                  placeholder="Label (e.g. Product Name, Profile Information)"
                  value={row.label}
                  onChange={(e) => updateSpecRow(i, "label", e.target.value)}
                />
                <Textarea
                  placeholder="Value"
                  rows={3}
                  value={row.value}
                  onChange={(e) => updateSpecRow(i, "value", e.target.value)}
                />
                <IconButton
                  aria-label="Remove row"
                  icon={<DeleteIcon />}
                  bg="black"
                  color="white"
                  onClick={() => removeSpecRow(i)}
                />
              </HStack>
            ))}
          </VStack>
        </Box>

        <Divider />

        {/* 7. Detail Gallery Images */}
        <Box>
          <HStack justify="space-between" mb={2}>
            <Heading fontSize="md">Detail Gallery Images</Heading>
            <Button size="sm" leftIcon={<AddIcon />} onClick={addDetailGalleryImage}>
              Add Image
            </Button>
          </HStack>
          <Text fontSize="sm" color="brand.gray500" mb={4}>
            Upload one image per field. Images are shown in a 2-column grid on the product page.
          </Text>
          <VStack align="stretch" spacing={3}>
            {product.detailGalleryImages.length === 0 ? (
              <Text fontSize="sm" color="brand.gray500">
                No detail gallery images added yet.
              </Text>
            ) : (
              product.detailGalleryImages.map((url, index) => (
                <HStack key={index} align="flex-end">
                  <Box flex={1}>
                    <ImageUpload
                      label={`Detail Image ${index + 1}`}
                      value={url}
                      onChange={(value) => updateDetailGalleryImage(index, value)}
                    />
                  </Box>
                  <IconButton
                    aria-label={`Remove detail image ${index + 1}`}
                    icon={<DeleteIcon />}
                    bg="black"
                    color="white"
                    mb={1}
                    onClick={() => removeDetailGalleryImage(index)}
                  />
                </HStack>
              ))
            )}
          </VStack>
        </Box>

        <Divider />

        {/* Publishing */}
        <Box>
          <Heading fontSize="md" mb={4}>
            Publishing
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={4}>
            <FormControl>
              <FormLabel>Status</FormLabel>
              <Select value={product.status} onChange={(e) => update("status", e.target.value)}>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </Select>
            </FormControl>
            <FormControl display="flex" alignItems="center" mt={{ base: 0, md: 8 }}>
              <FormLabel mb="0">Featured Product</FormLabel>
              <Switch isChecked={product.featured} onChange={(e) => update("featured", e.target.checked)} />
            </FormControl>
          </SimpleGrid>
          <Heading fontSize="sm" mb={3} color="brand.gray500">
            SEO Fields
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            <FormControl>
              <FormLabel>SEO Title</FormLabel>
              <Input value={product.seo.title} onChange={(e) => update("seo", { ...product.seo, title: e.target.value })} />
            </FormControl>
            <FormControl>
              <FormLabel>SEO Description</FormLabel>
              <Input
                value={product.seo.description}
                onChange={(e) => update("seo", { ...product.seo, description: e.target.value })}
              />
            </FormControl>
          </SimpleGrid>
        </Box>

        <HStack justify="flex-end" spacing={4}>
          <Button as={NextLink} href="/admin" variant="ghost">
            Cancel
          </Button>
          <Button onClick={handleSubmit} isLoading={saving}>
            {mode === "edit" ? "Save Changes" : "Create Product"}
          </Button>
        </HStack>
      </VStack>
    </Container>
  );
}
