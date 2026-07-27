"use client";

import { Box } from "@chakra-ui/react";

// Lightweight line-art icons approximating the window/door glyphs used
// in the design screenshots. Rendered as inline SVG so they inherit
// currentColor and scale cleanly.
const PATHS = {
  bifold: (
    <>
      <rect x="4" y="6" width="10" height="36" />
      <rect x="16" y="6" width="10" height="36" />
      <rect x="28" y="6" width="10" height="36" />
      <line x1="9" y1="6" x2="9" y2="42" />
      <line x1="21" y1="6" x2="21" y2="42" />
      <line x1="33" y1="6" x2="33" y2="42" />
    </>
  ),
  slidingDoor: (
    <>
      <rect x="6" y="6" width="14" height="36" />
      <rect x="20" y="6" width="14" height="36" />
      <line x1="20" y1="6" x2="20" y2="42" />
    </>
  ),
  slidingWindow: (
    <>
      <rect x="4" y="10" width="32" height="24" />
      <line x1="20" y1="10" x2="20" y2="34" />
    </>
  ),
  casement: (
    <>
      <rect x="6" y="6" width="28" height="36" />
      <line x1="20" y1="6" x2="20" y2="42" />
      <path d="M6 6 L20 24" />
      <path d="M34 6 L20 24" />
    </>
  ),
  tiltTurn: (
    <>
      <rect x="6" y="6" width="28" height="36" />
      <path d="M6 42 L20 24" />
      <path d="M34 42 L20 24" />
    </>
  ),
  entrance: (
    <>
      <rect x="12" y="4" width="16" height="40" />
      <circle cx="24" cy="24" r="1.5" fill="currentColor" />
    </>
  ),
};

export default function CategoryIcon({ name, boxSize = "48px", ...rest }) {
  const path = PATHS[name] || PATHS.casement;
  return (
    <Box color="brand.black" {...rest}>
      <svg
        width={boxSize}
        height={boxSize}
        viewBox="0 0 40 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      >
        {path}
      </svg>
    </Box>
  );
}
