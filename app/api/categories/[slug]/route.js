import { NextResponse } from "next/server";
import { getCategoryBySlug, updateCategoryBySlug } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  const category = await getCategoryBySlug(params.slug);
  if (!category) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }
  return NextResponse.json({ category });
}

export async function PUT(request, { params }) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const body = await request.json();
    const updated = await updateCategoryBySlug(params.slug, body);
    if (!updated) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }
    return NextResponse.json({ category: updated });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
