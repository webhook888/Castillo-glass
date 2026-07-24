import fs from "fs";
import path from "path";
import mysql from "mysql2/promise";

function loadEnvFile() {
  const envPath = path.join(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) return;

  fs.readFileSync(envPath, "utf8")
    .split("\n")
    .forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) return;
      const eq = trimmed.indexOf("=");
      if (eq === -1) return;
      const key = trimmed.slice(0, eq).trim();
      const value = trimmed.slice(eq + 1).trim();
      if (!process.env[key]) process.env[key] = value;
    });
}

function readJson(relativePath) {
  const filePath = path.join(process.cwd(), relativePath);
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

async function main() {
  loadEnvFile();

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "bellairlux",
  });

  const categories = readJson("data/categories.json");
  const products = readJson("data/products.json");
  const submissions = readJson("data/submissions.json");

  for (const category of categories) {
    await connection.execute(
      `INSERT INTO categories (id, name, slug, coming_soon, icon)
       VALUES (?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         name = VALUES(name),
         coming_soon = VALUES(coming_soon),
         icon = VALUES(icon)`,
      [category.id, category.name, category.slug, category.comingSoon ? 1 : 0, category.icon]
    );
  }

  for (const product of products) {
    await connection.execute(
      `INSERT INTO products (
        id, title, slug, category, short_description, grid_image, lifestyle_image,
        details, status, featured, seo_title, seo_description, quick_info, specs,
        gallery_images, hardware_configurations, features, specifications,
        detail_gallery_images, feature_banner, feature_details, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        title = VALUES(title),
        category = VALUES(category),
        short_description = VALUES(short_description),
        grid_image = VALUES(grid_image),
        lifestyle_image = VALUES(lifestyle_image),
        details = VALUES(details),
        status = VALUES(status),
        featured = VALUES(featured),
        seo_title = VALUES(seo_title),
        seo_description = VALUES(seo_description),
        quick_info = VALUES(quick_info),
        specs = VALUES(specs),
        gallery_images = VALUES(gallery_images),
        hardware_configurations = VALUES(hardware_configurations),
        features = VALUES(features),
        specifications = VALUES(specifications),
        detail_gallery_images = VALUES(detail_gallery_images),
        feature_banner = VALUES(feature_banner),
        feature_details = VALUES(feature_details),
        updated_at = VALUES(updated_at)`,
      [
        product.id,
        product.title,
        product.slug,
        product.category,
        product.shortDescription || "",
        product.gridImage || "",
        product.lifestyleImage || "",
        product.details || "",
        product.status || "published",
        product.featured ? 1 : 0,
        product.seo?.title || "",
        product.seo?.description || "",
        JSON.stringify(product.quickInfo || {}),
        JSON.stringify(product.specs || {}),
        JSON.stringify(product.galleryImages || []),
        JSON.stringify(product.hardwareConfigurations || []),
        JSON.stringify(product.features || []),
        JSON.stringify(product.specifications || []),
        JSON.stringify(product.detailGalleryImages || []),
        JSON.stringify(product.featureBanner || []),
        JSON.stringify(product.featureDetails || []),
        new Date(product.createdAt || Date.now()),
        new Date(product.updatedAt || Date.now()),
      ]
    );
  }

  for (const submission of submissions) {
    await connection.execute(
      `INSERT INTO submissions (id, type, payload, created_at)
       VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         type = VALUES(type),
         payload = VALUES(payload),
         created_at = VALUES(created_at)`,
      [
        submission.id,
        submission.type,
        JSON.stringify(submission.payload),
        new Date(submission.createdAt || Date.now()),
      ]
    );
  }

  await connection.end();

  console.log(
    `Seeded ${categories.length} categories, ${products.length} products, ${submissions.length} submissions.`
  );
}

main().catch((error) => {
  console.error("Database seed failed:", error.message);
  process.exit(1);
});
