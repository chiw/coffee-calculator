// import { AllRecipePaths } from "../coffee-recipes/CoffeeRecipeConstants";

export const BASE_URL = 'https://your-domain.com';
// import { base } from '$app/paths';

// export const routes = [
//   '/',
//   '/about',
//   '/recipes',
//   // Add all your static routes here
// ];
// export const routes = AllRecipePaths.map((path) => `${base}/recipe/${path}`);
export const routes = [
  'hario', 
  'hario/switch', 
  'hario/switch/tetsukasuyanewhybrid', 
  'hario/switch/tetsukasuya', 
  'hario/switch/emifukahori', 
  'hario/switch/olekristianboen', 
  'hario/switch/coffeechronicler', 
  'hario/switch/cafetaster', 
  'hario/v60', 
  'hario/v60/46method', 
  'hario/v60/jameshoffmann', 
  'hario/v60/mattwinton', 
  'kalita', 
  'kalita/wave155', 
  'kalita/wave155/itoatsuomi'
].map((path) => `${BASE_URL}/recipe/${path}`);


export function generateSitemap() {
  return `<?xml version="1.0" encoding="UTF-8" ?>
<urlset
  xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="https://www.w3.org/1999/xhtml"
>
  ${routes
    .map(
      (route) => `
    <url>
      <loc>${route}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.7</priority>
    </url>`
    )
    .join('')}
</urlset>`;
}