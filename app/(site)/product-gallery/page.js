import ProductGalleryClient from "@/components/CategorySlider/ProductGalleryClient";
import { getProducts } from "@/lib/db";

export const metadata = { title: "Product Gallery | Bell Air Lux" };

export default async function ProductGalleryPage() {
  const products = await getProducts({ status: "published" });
  const images = products
    .flatMap((p) => [p.gridImage, p.lifestyleImage, ...(p.galleryImages || [])])
    .filter(Boolean);

  return <ProductGalleryClient images={images} />;
}
