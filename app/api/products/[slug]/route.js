import { NextResponse } from "next/server";
import { getProductBySlug, updateProduct, deleteProduct } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  const product = await getProductBySlug(params.slug);
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
  return NextResponse.json({ product });
}

export async function PUT(request, { params }) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const body = await request.json();
    const updated = await updateProduct(params.slug, body);
    if (!updated) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({ product: updated });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  const authError = await requireAuth();
  if (authError) return authError;

  const success = await deleteProduct(params.slug);
  if (!success) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
