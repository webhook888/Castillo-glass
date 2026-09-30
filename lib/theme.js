import { extendTheme } from "@chakra-ui/react";
import "@fontsource/montserrat"; // Defaults to weight 400
import "@fontsource/montserrat/400.css"; // Specify weight
import "@fontsource/montserrat/400-italic.css"; // Specify weight and style
const theme = extendTheme({
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Montserrat', sans-serif`,
    // brand: `var(--font-jaguares), cursive`,
  },
  colors: {
    brand: {
      black: "#111111",
      dark: "#1a1a1a",
      orange: "#E87722",
      gray50: "#f7f7f8",
      gray100: "#f5f5f5",
      gray200: "#e5e5e7",
      gray500: "#6b6b70",
    },
  },
  styles: {
    global: {
      body: {
        color: "brand.black",
        bg: "white",
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: "full",
        fontWeight: "600",
      },
      variants: {
        solid: {
          bg: "brand.black",
          color: "white",
          _hover: { bg: "#2a2a2a" },
        },
        outline: {
          borderColor: "white",
          color: "white",
        },
      },
    },
  },
});

export default theme;
