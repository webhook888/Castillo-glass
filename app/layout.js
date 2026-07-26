import Providers from "@/components/Providers";
import { brandFont } from "@/lib/fonts";

export const metadata = {
  title: "CASTILLO’S GLASS | Premium Glass & Doors Services",
  description:
    "CASTILLO'S GLASS specializes in premium glass and door services, including custom shower doors, glass railings, windows, commercial glass, and expert installation.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={brandFont.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={brandFont.variable}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
