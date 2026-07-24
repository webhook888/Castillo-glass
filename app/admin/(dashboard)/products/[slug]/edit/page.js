import { notFound } from "next/navigation";
import ProductForm from "@/components/Common/ProductForm";
import { getProductBySlug } from "@/lib/db";

export default async function EditProductPage({ params }) {
  const product = await getProductBySlug(params.slug);
  if (!product) return notFound();

  return <ProductForm mode="edit" initialProduct={product} />;
}
