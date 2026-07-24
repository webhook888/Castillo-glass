import { query, execute } from "./mysql.js";

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function parseJson(value, fallback) {
  if (value == null) return fallback;
  if (typeof value === "object") return value;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function toIso(value) {
  if (!value) return new Date().toISOString();
  if (value instanceof Date) return value.toISOString();
  return new Date(value).toISOString();
}

function rowToCategory(row) {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    comingSoon: Boolean(row.coming_soon),
    icon: row.icon,
  };
}

function rowToProduct(row) {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    category: row.category,
    shortDescription: row.short_description || "",
    gridImage: row.grid_image || "",
    lifestyleImage: row.lifestyle_image || "",
    galleryImages: parseJson(row.gallery_images, []),
    quickInfo: parseJson(row.quick_info, {
      productOrigin: "",
      itemNo: "",
      color: "",
      leadTime: "",
      tradeTerms: "",
      shippingPort: "",
    }),
    specs: parseJson(row.specs, {}),
    hardwareConfigurations: parseJson(row.hardware_configurations, []),
    details: row.details || "",
    features: parseJson(row.features, []),
    specifications: parseJson(row.specifications, []),
    detailGalleryImages: parseJson(row.detail_gallery_images, []),
    featureBanner: parseJson(row.feature_banner, []),
    featureDetails: parseJson(row.feature_details, []),
    status: row.status,
    featured: Boolean(row.featured),
    seo: {
      title: row.seo_title || "",
      description: row.seo_description || "",
    },
    createdAt: toIso(row.created_at),
    updatedAt: toIso(row.updated_at),
  };
}

function productToDbValues(product) {
  const quickInfo = product.quickInfo || {
    productOrigin: "",
    itemNo: "",
    color: "",
    leadTime: "",
    tradeTerms: "",
    shippingPort: "",
  };

  return {
    id: product.id,
    title: product.title,
    slug: product.slug,
    category: product.category,
    short_description: product.shortDescription || "",
    grid_image: product.gridImage || "",
    lifestyle_image: product.lifestyleImage || "",
    details: product.details || "",
    status: product.status || "published",
    featured: product.featured ? 1 : 0,
    seo_title: product.seo?.title || "",
    seo_description: product.seo?.description || "",
    quick_info: JSON.stringify(quickInfo),
    specs: JSON.stringify(product.specs || {}),
    gallery_images: JSON.stringify(product.galleryImages || []),
    hardware_configurations: JSON.stringify(product.hardwareConfigurations || []),
    features: JSON.stringify(product.features || []),
    specifications: JSON.stringify(product.specifications || []),
    detail_gallery_images: JSON.stringify(product.detailGalleryImages || []),
    feature_banner: JSON.stringify(product.featureBanner || []),
    feature_details: JSON.stringify(product.featureDetails || []),
    created_at: product.createdAt ? new Date(product.createdAt) : new Date(),
    updated_at: product.updatedAt ? new Date(product.updatedAt) : new Date(),
  };
}

// ---------- Categories ----------
export async function getCategories() {
  const rows = await query("SELECT * FROM categories ORDER BY name ASC");
  return rows.map(rowToCategory);
}

export async function getCategoryBySlug(slug) {
  const rows = await query("SELECT * FROM categories WHERE slug = ? LIMIT 1", [slug]);
  return rows[0] ? rowToCategory(rows[0]) : null;
}

// ---------- Products ----------
export async function getProducts({ category, status, featured } = {}) {
  const conditions = [];
  const params = [];

  if (category) {
    conditions.push("category = ?");
    params.push(category);
  }
  if (status) {
    conditions.push("status = ?");
    params.push(status);
  }
  if (featured) {
    conditions.push("featured = 1");
  }

  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
  const rows = await query(
    `SELECT * FROM products ${where} ORDER BY created_at DESC`,
    params
  );
  return rows.map(rowToProduct);
}

export async function getProductBySlug(slug) {
  const rows = await query("SELECT * FROM products WHERE slug = ? LIMIT 1", [slug]);
  return rows[0] ? rowToProduct(rows[0]) : null;
}

export async function getProductById(id) {
  const rows = await query("SELECT * FROM products WHERE id = ? LIMIT 1", [id]);
  return rows[0] ? rowToProduct(rows[0]) : null;
}

export async function createProduct(input) {
  if (!input.title || !input.category) {
    throw new Error("Product title and category are required");
  }

  let slug = input.slug ? slugify(input.slug) : slugify(input.title);
  let uniqueSlug = slug;
  let counter = 2;

  while (true) {
    const existing = await getProductBySlug(uniqueSlug);
    if (!existing) break;
    uniqueSlug = `${slug}-${counter}`;
    counter += 1;
  }

  const now = new Date();
  const product = {
    id: `prod-${Date.now()}`,
    title: input.title,
    slug: uniqueSlug,
    category: input.category,
    shortDescription: input.shortDescription || "",
    gridImage: input.gridImage || "",
    lifestyleImage: input.lifestyleImage || "",
    galleryImages: input.galleryImages || [],
    quickInfo: input.quickInfo || {},
    specs: input.specs || {},
    hardwareConfigurations: input.hardwareConfigurations || [],
    details: input.details || "",
    features: input.features || [],
    specifications: input.specifications || [],
    detailGalleryImages: input.detailGalleryImages || [],
    featureBanner: input.featureBanner || [],
    featureDetails: input.featureDetails || [],
    status: input.status || "published",
    featured: input.featured || false,
    seo: input.seo || { title: "", description: "" },
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  };

  const values = productToDbValues(product);

  await query(
    `INSERT INTO products (
      id, title, slug, category, short_description, grid_image, lifestyle_image,
      details, status, featured, seo_title, seo_description, quick_info, specs,
      gallery_images, hardware_configurations, features, specifications,
      detail_gallery_images, feature_banner, feature_details, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      values.id,
      values.title,
      values.slug,
      values.category,
      values.short_description,
      values.grid_image,
      values.lifestyle_image,
      values.details,
      values.status,
      values.featured,
      values.seo_title,
      values.seo_description,
      values.quick_info,
      values.specs,
      values.gallery_images,
      values.hardware_configurations,
      values.features,
      values.specifications,
      values.detail_gallery_images,
      values.feature_banner,
      values.feature_details,
      values.created_at,
      values.updated_at,
    ]
  );

  return product;
}

export async function updateProduct(slug, updates) {
  const existing = await getProductBySlug(slug);
  if (!existing) return null;

  const merged = {
    ...existing,
    ...updates,
    seo: { ...existing.seo, ...(updates.seo || {}) },
    quickInfo: { ...existing.quickInfo, ...(updates.quickInfo || {}) },
    updatedAt: new Date().toISOString(),
  };

  const values = productToDbValues(merged);

  await query(
    `UPDATE products SET
      title = ?, slug = ?, category = ?, short_description = ?, grid_image = ?,
      lifestyle_image = ?, details = ?, status = ?, featured = ?, seo_title = ?,
      seo_description = ?, quick_info = ?, specs = ?, gallery_images = ?,
      hardware_configurations = ?, features = ?, specifications = ?,
      detail_gallery_images = ?, feature_banner = ?, feature_details = ?, updated_at = ?
    WHERE slug = ?`,
    [
      values.title,
      values.slug,
      values.category,
      values.short_description,
      values.grid_image,
      values.lifestyle_image,
      values.details,
      values.status,
      values.featured,
      values.seo_title,
      values.seo_description,
      values.quick_info,
      values.specs,
      values.gallery_images,
      values.hardware_configurations,
      values.features,
      values.specifications,
      values.detail_gallery_images,
      values.feature_banner,
      values.feature_details,
      values.updated_at,
      slug,
    ]
  );

  return getProductBySlug(values.slug);
}

export async function deleteProduct(slug) {
  const result = await execute("DELETE FROM products WHERE slug = ?", [slug]);
  return result.affectedRows > 0;
}

// ---------- Form Submissions ----------
export async function saveSubmission(type, payload) {
  const entry = {
    id: `sub-${Date.now()}`,
    type,
    payload,
    createdAt: new Date().toISOString(),
  };

  await query("INSERT INTO submissions (id, type, payload, created_at) VALUES (?, ?, ?, ?)", [
    entry.id,
    entry.type,
    JSON.stringify(entry.payload),
    new Date(entry.createdAt),
  ]);

  return entry;
}
