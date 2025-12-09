// src/pages/sitemap.xml.js
// Sitemap AUTOMÁTICO — agora respeitando a estrutura Category / Product / Mini

import { getCollection } from "astro:content";

const BASE_URL = "https://www.bestsupplementstoday.com";

export async function GET() {
  // 1) Todas as páginas da collection "reviews" (inclui subpastas)
  const entries = await getCollection("reviews");

  const reviewPaths = entries
    .map((entry) => {
      // Exemplos de entry.slug:
      // "Men-Health/prostadine/index"
      // "Men-Health/prostadine/what-is"
      // "Men-Health/prostadine/ingredients"
      const parts = entry.slug.split("/");

      if (parts.length < 2) return null;

      // penúltima parte = produto (prostadine, endopeak, etc.)
      const product = parts[parts.length - 2];
      // última parte = "index" ou nome da mini (what-is, ingredients, etc.)
      const last = parts[parts.length - 1];

      // Se for o index.md → URL /reviews/prostadine
      if (last === "index") {
        return `/reviews/${product}`;
      }

      // Se for mini → URL /reviews/prostadine/what-is, /ingredients etc.
      return `/reviews/${product}/${last}`;
    })
    .filter(Boolean);

  // 2) Rotas estáticas fixas
  const STATIC_PATHS = [
    "/",
    "/reviews",
    "/reviews/category/weight-loss",
    "/reviews/category/brain-and-neuro",
    "/reviews/category/men-health",
    "/reviews/category/women-health",
    "/reviews/category/heart-and-circulation",
    "/reviews/category/liver-and-gut",
    "/reviews/category/dental-health",
    "/reviews/category/hearing-and-vision",
    "/reviews/category/pain-joint-muscle",
    "/reviews/category/blood-sugar",
    "/reviews/category/skin-hair-aging",
    "/reviews/category/other",
  ];

  // 3) Junta tudo e remove duplicados (caso algum se repita)
  const allPaths = Array.from(new Set([...STATIC_PATHS, ...reviewPaths]));

  // 4) Gera o XML
  const urlsXml = allPaths
    .map(
      (path) => `
  <url>
    <loc>${BASE_URL}${path}</loc>
  </url>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
