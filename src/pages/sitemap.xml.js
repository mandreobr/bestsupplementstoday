// src/pages/sitemap.xml.js
// Gera um sitemap completo usando as rotas do site

import { reviews } from "../data/reviews";

const BASE_URL = "https://bestsupplementstoday.com";

// Rotas estáticas principais do site
const STATIC_PATHS = [
  "/",                        // Home
  "/reviews",                 // Lista de reviews

  // Categorias (EXATAMENTE como estão publicadas)
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

// Gera URLs dos reviews a partir do arquivo src/data/reviews.ts
function getReviewPaths() {
  return reviews.map((item) => `/reviews/${item.slug}`);
}

export async function GET() {
  const reviewPaths = getReviewPaths();
  const allPaths = [...STATIC_PATHS, ...reviewPaths];

  const urlsXml = allPaths
    .map((path) => {
      return `
  <url>
    <loc>${BASE_URL}${path}</loc>
  </url>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
