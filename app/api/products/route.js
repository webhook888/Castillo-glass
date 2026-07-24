import { NextResponse } from "next/server";
import { getProducts, createProduct } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || undefined;
  const status = searchParams.get("status") || undefined;
  const featured = searchParams.get("featured") === "true" || undefined;

  const products = await getProducts({ category, status, featured });
  return NextResponse.json({ products });
}

export async function POST(request) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const body = await request.json();
    const product = await createProduct(body);
    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
