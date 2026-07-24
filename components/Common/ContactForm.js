"use client";

import { useState } from "react";
import {
  Box,
  VStack,
  HStack,
  Input,
  Textarea,
  Button,
  FormControl,
  FormErrorMessage,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

const initialForm = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const validate = () => {
    const next = {};
    if (!form.firstName.trim()) next.firstName = "Required";
    if (!form.lastName.trim()) next.lastName = "Required";
    if (!form.phone.trim()) next.phone = "Required";
    if (!form.email.trim()) next.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setStatus("success");
      setForm(initialForm);
    } catch (err) {
      setStatus("error");
      setErrorMessage(err.message);
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit} maxW="1140px" mx="auto">
      {status === "success" && (
        <Alert status="success" mb={6} borderRadius="md">
          <AlertIcon />
          Thanks for reaching out! We&rsquo;ll get back to you shortly.
        </Alert>
      )}
      {status === "error" && (
        <Alert status="error" mb={6} borderRadius="md">
          <AlertIcon />
          {errorMessage}
        </Alert>
      )}

      <VStack spacing={5}>
        <HStack w="full" spacing={5} align="flex-start" flexDir={{ base: "column", md: "row" }}>
          <FormControl isInvalid={!!errors.firstName}>
            <Input placeholder="Your Name*" value={form.firstName} onChange={handleChange("firstName")}
             border="1px solid"
             borderColor="black"
             borderRadius="md"
             _hover={{
               borderColor: "black",
             }}
             _focus={{
               borderColor: "black",
               boxShadow: "none",
             }}
             _focusVisible={{
               borderColor: "black",
               boxShadow: "none",
             }}
            />
            <FormErrorMessage>{errors.firstName}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.lastName}>
            <Input placeholder="Last Name*" value={form.lastName} onChange={handleChange("lastName")}
             border="1px solid"
             borderColor="black"
             borderRadius="md"
             _hover={{
               borderColor: "black",
             }}
             _focus={{
               borderColor: "black",
               boxShadow: "none",
             }}
             _focusVisible={{
               borderColor: "black",
               boxShadow: "none",
             }}
            />
            <FormErrorMessage>{errors.lastName}</FormErrorMessage>
          </FormControl>
        </HStack>
        <HStack w="full" spacing={5} align="flex-start" flexDir={{ base: "column", md: "row" }}>
          <FormControl isInvalid={!!errors.phone}>
            <Input placeholder="Phone Number*" value={form.phone} onChange={handleChange("phone")}
             border="1px solid"
             borderColor="black"
             borderRadius="md"
             _hover={{
               borderColor: "black",
             }}
             _focus={{
               borderColor: "black",
               boxShadow: "none",
             }}
             _focusVisible={{
               borderColor: "black",
               boxShadow: "none",
             }}
            />
            <FormErrorMessage>{errors.phone}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.email}>
            <Input placeholder="Email*" value={form.email} onChange={handleChange("email")}
             border="1px solid"
             borderColor="black"
             borderRadius="md"
             _hover={{
               borderColor: "black",
             }}
             _focus={{
               borderColor: "black",
               boxShadow: "none",
             }}
             _focusVisible={{
               borderColor: "black",
               boxShadow: "none",
             }}
            />
            <FormErrorMessage>{errors.email}</FormErrorMessage>
          </FormControl>
        </HStack>
        <Textarea
          placeholder="Message"
          rows={5}
          value={form.message}
          onChange={handleChange("message")}
          border="1px solid"
          borderColor="black"
          borderRadius="md"
          _hover={{
            borderColor: "black",
          }}
          _focus={{
            borderColor: "black",
            boxShadow: "none",
          }}
          _focusVisible={{
            borderColor: "black",
            boxShadow: "none",
          }}
        />
        <Button
          type="submit"
          alignSelf="flex-start"
          px={10}
          isLoading={status === "loading"}
        >
          Submit
        </Button>
      </VStack>
    </Box>
  );
}
