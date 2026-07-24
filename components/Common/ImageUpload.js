"use client";

import { useRef, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  Text,
  VStack,
  Spinner,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE_MB = 5;

function UploadIcon() {
  return (
    <Box as="svg" viewBox="0 0 64 64" w="56px" h="56px" fill="none">
      <path
        d="M32 12v24M32 12l-8 8M32 12l8 8"
        stroke="#4a5568"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 38h36"
        stroke="#4a5568"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <rect x="18" y="38" width="28" height="14" rx="2" stroke="#4a5568" strokeWidth="2.5" fill="none" />
    </Box>
  );
}

async function uploadFile(file) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Upload failed");
  return data.url;
}

export default function ImageUpload({ label, value, onChange }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (file) => {
    if (!file) return;

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError("Please upload a JPG, PNG, WebP, or GIF image.");
      return;
    }

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`Image must be smaller than ${MAX_SIZE_MB}MB.`);
      return;
    }

    setError("");
    setUploading(true);

    try {
      const url = await uploadFile(file);
      onChange(url);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const onInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = "";
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  return (
    <FormControl>
      {label && (
        <FormLabel fontSize="sm" mb={2}>
          {label}
        </FormLabel>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(",")}
        style={{ display: "none" }}
        onChange={onInputChange}
      />

      {value ? (
        <Box position="relative" borderRadius="md" overflow="hidden" border="1px solid" borderColor="brand.gray200">
          <Image src={value} alt={label || "Uploaded image"} maxH="220px" w="100%" objectFit="cover" />
          <HStack position="absolute" top={2} right={2} spacing={2}>
            <Button
              size="sm"
              bg="#3730a3"
              color="white"
              _hover={{ bg: "#312e81" }}
              onClick={() => inputRef.current?.click()}
              isLoading={uploading}
            >
              Change
            </Button>
            <IconButton
              aria-label="Remove image"
              icon={<CloseIcon boxSize={3} />}
              size="sm"
              bg="white"
              onClick={() => onChange("")}
            />
          </HStack>
        </Box>
      ) : (
        <Box
          border="2px solid"
          borderColor={dragging ? "#3730a3" : "#a5b4fc"}
          borderRadius="lg"
          bg="white"
          py={10}
          px={6}
          textAlign="center"
          cursor={uploading ? "not-allowed" : "pointer"}
          transition="border-color 0.2s ease, background 0.2s ease"
          bgGradient={dragging ? "linear(to-b, white, #eef2ff)" : undefined}
          onClick={() => !uploading && inputRef.current?.click()}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
        >
          <VStack spacing={4}>
            {uploading ? <Spinner color="#3730a3" size="lg" /> : <UploadIcon />}
            <Text fontSize="md" color="gray.600" fontFamily="Montserrat, sans-serif">
              {uploading ? "Uploading..." : "Select a file or drag here"}
            </Text>
            <Button
              bg="#3730a3"
              color="white"
              borderRadius="md"
              px={8}
              _hover={{ bg: "#312e81" }}
              onClick={(e) => {
                e.stopPropagation();
                inputRef.current?.click();
              }}
              isLoading={uploading}
              isDisabled={uploading}
            >
              Select a file
            </Button>
          </VStack>
        </Box>
      )}

      {error && (
        <Text fontSize="sm" color="red.500" mt={2}>
          {error}
        </Text>
      )}
    </FormControl>
  );
}
