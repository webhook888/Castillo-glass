CREATE DATABASE IF NOT EXISTS bellairlux
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE bellairlux;

CREATE TABLE IF NOT EXISTS categories (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  coming_soon TINYINT(1) NOT NULL DEFAULT 0,
  icon VARCHAR(64) NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
  id VARCHAR(64) PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  category VARCHAR(255) NOT NULL,
  short_description TEXT,
  grid_image TEXT,
  lifestyle_image TEXT,
  details TEXT,
  status ENUM('published', 'draft') NOT NULL DEFAULT 'published',
  featured TINYINT(1) NOT NULL DEFAULT 0,
  seo_title VARCHAR(500),
  seo_description TEXT,
  quick_info JSON,
  specs JSON,
  gallery_images JSON,
  hardware_configurations JSON,
  features JSON,
  specifications JSON,
  detail_gallery_images JSON,
  feature_banner JSON,
  feature_details JSON,
  created_at DATETIME(3) NOT NULL,
  updated_at DATETIME(3) NOT NULL,
  INDEX idx_products_category (category),
  INDEX idx_products_status (status),
  INDEX idx_products_featured (featured),
  INDEX idx_products_created_at (created_at)
);

CREATE TABLE IF NOT EXISTS submissions (
  id VARCHAR(64) PRIMARY KEY,
  type VARCHAR(64) NOT NULL,
  payload JSON NOT NULL,
  created_at DATETIME(3) NOT NULL,
  INDEX idx_submissions_type (type),
  INDEX idx_submissions_created_at (created_at)
);
