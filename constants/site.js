export const SITE_NAME = "Castillo’s Glass";
export const SITE_TAGLINE = "Premium Windows & Doors";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  // Keep the mega-menu implementation in place; set this back to true to re-enable it.
  { label: "Products", href: "/products", hasMegaMenu: false },
  { label: "Product Gallery", href: "/product-gallery" },
  { label: "Catalog", href: "/catalog" },
  { label: "About Us", href: "/about-us" },
  { label: "Contact Us", href: "/contact-us" },
];

export const SOCIAL_LINKS = [
  { label: "Facebook", href: "#", icon: "facebook", bg: "white",border:'1px solid black',color:'blue' },
  { label: "YouTube", href: "#", icon: "youtube", bg: "white",border:'1px solid red',color:'red' },
  { label: "Instagram", href: "#", icon: "instagram", bg: "white",color:'#F5017E',border:'1px solid #F5017E' },
  // { label: "Pinterest", href: "#", icon: "pinterest", bg: "#e02424" },
  // { label: "Amazon", href: "#", icon: "amazon", bg: "#232323" },
];

export const FOOTER_COLUMNS = [
  {
    title: "Categories",
    links: [
      { label: "Shower doors", href: "/products/category/sliding-windows" },
      { label: "Residential Door", href: "/products/category/tilt-turn-window" },
      { label: "Commercial Door", href: "/products/category/casement-window" },
      { label: "Glass railing", href: "/products/category/casement-window" },
      { label: "Window and doors", href: "/products/category/casement-window" },
      { label: "Swichtable Glass", href: "/products/category/casement-window" },
      { label: "Custom glass", href: "/products/category/casement-window" },
    ],
  },
 
  {
    title: "Help",
    links: [{ label: "Get a Quote", href: "/get-a-quote" }],
  },
];

export const COMPANY_ADDRESS = {
  line1: "4537 Fountain Ave Los Angeles CA",
  phone: "020-7946-0855",
};

export const QUOTE_CONTACT = {
  email: "Castillosglass@gmail.com",
  phones: ["+1 (323) 875-9453"],
  hours: "We are open Monday through Friday from 9:00am – 5:00pm Central Time.",
};
