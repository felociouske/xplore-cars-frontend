import fs from "fs";

const DOMAIN = "https://xplorecars.cc"; 
const API_URL = "https://admin.xplorecars.cc/api/cars/"; 
async function generateSitemap() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();

    const cars = data.results || data; 
    // React static routes
    const staticRoutes = [
      "",
      "about",
      "contact",
      "car-listing",
      "services/vehicle-sourcing",
      "services/taxi-masterclass",
    ];

    // Combine static + dynamic URLs
    const urls = [
      ...staticRoutes.map(
        (path) =>
          `<url>
            <loc>${DOMAIN}/${path}</loc>
            <changefreq>monthly</changefreq>
            <priority>0.8</priority>
          </url>`
      ),
      ...cars.map(
        (car) =>
          `<url>
            <loc>${DOMAIN}/car-listing/${car.id}</loc>
            <changefreq>weekly</changefreq>
            <priority>0.9</priority>
          </url>`
      ),
    ];

    // Build the XML structure
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

    // Save the sitemap into your public folder
    fs.writeFileSync("./dist/sitemap.xml", sitemap);
    console.log("✅ Sitemap generated successfully!");
  } catch (error) {
    console.error("❌ Error generating sitemap:", error.message);
  }
}

generateSitemap();
