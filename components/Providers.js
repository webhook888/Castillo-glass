"use client";

import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/lib/theme";

export default function Providers({ children }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
