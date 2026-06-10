import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = "https://xplorecars.cc";

// Define all static routes that actually exist in the application
const staticRoutes = [
  {
    path: "/",
    changefreq: "weekly",
    priority: "1.0",
  },
  {
    path: "/car-options",
    changefreq: "daily",
    priority: "0.9",
  },
  
  {
    path: "/blog",
    changefreq: "weekly",
    priority: "0.8",
  },
  {
    path: "/about",
    changefreq: "monthly",
    priority: "0.7",
  },
  {
    path: "/contact",
    changefreq: "monthly",
    priority: "0.7",
  },
];

// Generate XML
const generateSitemap = async () => {
  try {
    let xml =
      '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    staticRoutes.forEach((route) => {
      xml += `\n  <url>\n    <loc>${BASE_URL}${route.path}</loc>\n    <changefreq>${route.changefreq}</changefreq>\n    <priority>${route.priority}</priority>\n  </url>`;
    });

    xml += "\n\n</urlset>";

    // Ensure dist directory exists
    const distDir = path.join(__dirname, "dist");
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
    }

    // Write sitemap.xml to dist (Vite copies public files to dist root)
    const sitemapPath = path.join(distDir, "sitemap.xml");
    fs.writeFileSync(sitemapPath, xml);

    console.log(`✓ Sitemap generated successfully at ${sitemapPath}`);
    console.log(`  Routes included: ${staticRoutes.length}`);
  } catch (error) {
    console.error("Error generating sitemap:", error);
    process.exit(1);
  }
};

generateSitemap();
