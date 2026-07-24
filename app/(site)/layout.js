import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export const dynamic = "force-dynamic";

export default function SiteLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
