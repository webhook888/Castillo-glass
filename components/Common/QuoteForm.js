"use client";

import { useState } from "react";
import {
  Box,
  VStack,
  SimpleGrid,
  Input,
  Select,
  Textarea,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Checkbox,
  CheckboxGroup,
  Stack,
  Alert,
  AlertIcon,
  Text,
} from "@chakra-ui/react";
import BrandText from "@/components/Common/BrandText";

const WINDOW_DOOR_TYPES = ["Shower doors", "Residential", "Commercial", "Glass railing","Cable system","Window and door","Swichtable Glass","Custom glass"];

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  companyName: "",
  relationshipToProject: "Homeowner",
  projectName: "",
  typeOfProject: "Multifamily",
  streetAddress: "",
  city: "",
  stateProvince: "",
  zipCode: "",
  country: "",
  windowDoorTypes: [],
  additionalDetails: "",
};

const REQUIRED = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "companyName",
  "relationshipToProject",
  "projectName",
  "typeOfProject",
  "zipCode",
];

export default function QuoteForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [fileNames, setFileNames] = useState([]);
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const set = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const validate = () => {
    const next = {};
    REQUIRED.forEach((field) => {
      if (!String(form[field] || "").trim()) next[field] = "Required";
    });
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Enter a valid email";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []).slice(0, 10);
    setFileNames(files.map((f) => f.name));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, attachedFiles: fileNames }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setStatus("success");
      setForm(initialForm);
      setFileNames([]);
    } catch (err) {
      setStatus("error");
      setErrorMessage(err.message);
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit} maxW="900px" mx="auto">
      {status === "success" && (
        <Alert status="success" mb={6} borderRadius="md">
          <AlertIcon />
          <BrandText>Thanks! A CASTILLO’S GLASS team member will be in touch soon.</BrandText>
        </Alert>
      )}
      {status === "error" && (
        <Alert status="error" mb={6} borderRadius="md">
          <AlertIcon />
          {errorMessage}
        </Alert>
      )}

      <Text fontWeight="700" fontSize="lg" mb={4}>
        Contact Info
      </Text>
      <VStack spacing={4} mb={8}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
          <FormControl isInvalid={!!errors.firstName} isRequired>
            <FormLabel>First Name</FormLabel>
            <Input value={form.firstName} onChange={(e) => set("firstName", e.target.value)}
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
          <FormControl isInvalid={!!errors.lastName} isRequired>
            <FormLabel>Last Name</FormLabel>
            <Input value={form.lastName} onChange={(e) => set("lastName", e.target.value)} 
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
          <FormControl isInvalid={!!errors.email} isRequired>
            <FormLabel>Email</FormLabel>
            <Input value={form.email} onChange={(e) => set("email", e.target.value)}
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
          <FormControl isInvalid={!!errors.phone} isRequired>
            <FormLabel>Phone</FormLabel>
            <Input value={form.phone} onChange={(e) => set("phone", e.target.value)}
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
          <FormControl isInvalid={!!errors.companyName} isRequired>
            <FormLabel>Company name</FormLabel>
            <Input value={form.companyName} onChange={(e) => set("companyName", e.target.value)}
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
            <FormErrorMessage>{errors.companyName}</FormErrorMessage>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Relationship to the project</FormLabel>
            <Select
              value={form.relationshipToProject}
              onChange={(e) => set("relationshipToProject", e.target.value)}
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
            >
              <option>Homeowner</option>
              <option>Architect</option>
              <option>Contractor</option>
              <option>Developer</option>
              <option>Other</option>
            </Select>
          </FormControl>
        </SimpleGrid>
      </VStack>

      <Text fontWeight="700" fontSize="lg" mb={4}>
        Project Details
      </Text>
      <VStack spacing={4}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
          <FormControl isInvalid={!!errors.projectName} isRequired>
            <FormLabel>Project name</FormLabel>
            <Input value={form.projectName} onChange={(e) => set("projectName", e.target.value)} 
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
            <FormErrorMessage>{errors.projectName}</FormErrorMessage>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Type of project</FormLabel>
            <Select value={form.typeOfProject} onChange={(e) => set("typeOfProject", e.target.value)}
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
              >
              <option>Multifamily</option>
              <option>Single Family</option>
              <option>Commercial</option>
              <option>Renovation</option>
            </Select>
          </FormControl>
        </SimpleGrid>

        <FormControl>
          <FormLabel>Street Address</FormLabel>
          <Input value={form.streetAddress} onChange={(e) => set("streetAddress", e.target.value)} 
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
        </FormControl>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
          <FormControl>
            <FormLabel>City</FormLabel>
            <Input value={form.city} onChange={(e) => set("city", e.target.value)}
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
          </FormControl>
          <FormControl>
            <FormLabel>State/Province</FormLabel>
            <Input value={form.stateProvince} onChange={(e) => set("stateProvince", e.target.value)}
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
          </FormControl>
          <FormControl isInvalid={!!errors.zipCode} isRequired>
            <FormLabel>Zip code</FormLabel>
            <Input value={form.zipCode} onChange={(e) => set("zipCode", e.target.value)} 
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
            <FormErrorMessage>{errors.zipCode}</FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel>Country</FormLabel>
            <Input value={form.country} onChange={(e) => set("country", e.target.value)}
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
          </FormControl>
        </SimpleGrid>

        <FormControl>
          <FormLabel>Window and door types — check all that apply:</FormLabel>
          <CheckboxGroup
            value={form.windowDoorTypes}
            onChange={(val) => set("windowDoorTypes", val)}
          >
            <Stack>
              {WINDOW_DOOR_TYPES.map((t) => (
                <Checkbox key={t} value={t}>
                  {t}
                </Checkbox>
              ))}
            </Stack>
          </CheckboxGroup>
        </FormControl>

        <FormControl>
          <FormLabel>
            Please provide additional details for your project. Include quantities,
            specifications, colors, measurements, and any other information that should
            be included in your price quote.
          </FormLabel>
          <Textarea
            rows={5}
            value={form.additionalDetails}
            onChange={(e) => set("additionalDetails", e.target.value)}
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
        </FormControl>

        <FormControl>
          <FormLabel>
            Upload any documents related to your project including plans, window
            schedules, photos, etc. (max 10 files)
          </FormLabel>
          <Input type="file" multiple onChange={handleFileChange} p={1} h="auto" 
        
          borderRadius="md"
        
          _focus={{
            borderColor: "black",
            boxShadow: "none",
          }}
          _focusVisible={{
            borderColor: "black",
            boxShadow: "none",
          }}
          />
          {fileNames.length > 0 && (
            <Text fontSize="sm" color="brand.gray500" mt={1}>
              {fileNames.join(", ")}
            </Text>
          )}
        </FormControl>

        <Button type="submit" alignSelf="flex-start" px={10} isLoading={status === "loading"}>
          Submit
        </Button>
      </VStack>
    </Box>
  );
}
