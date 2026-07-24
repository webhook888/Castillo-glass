import { Box } from "@chakra-ui/react";

export default function AdminRootLayout({ children }) {
  return (
    <Box bg="brand.gray50" minH="100vh">
      {children}
    </Box>
  );
}
