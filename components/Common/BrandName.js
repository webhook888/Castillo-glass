"use client";

import { Text } from "@chakra-ui/react";

export default function BrandName({ children, as = "span", ...props }) {
  return (
    <Text as={as} fontFamily="brand" display="inline" {...props}>
      {children}
    </Text>
  );
}
