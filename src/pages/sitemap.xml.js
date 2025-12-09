// src/pages/sitemap.xml.js
// Sitemap completo do site (home + categorias + full reviews + mini-reviews)

import { reviews } from "../data/reviews";

const BASE_URL = "https://www.bestsupplementstoday.com";

// 1) Rotas estáticas principais
const STATIC_PATHS = [
  "/",                        // Home
  "/reviews",                 // Página geral de reviews

  // Categorias
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

// 2) Mini-reviews (adicione aqui todas as novas URLs)
// Use exatamente o caminho que aparece no navegador, sem / no final.
const MINI_REVIEW_PATHS = [
  // exemplos – ajuste para as suas URLs reais:
  "/reviews/prostadine/what-is",
  "/reviews/max-boost-plus/what-is",
  "/reviews/endopeak/what-is",
  // se tiver outras minis, continue a lista:
  // "/reviews/flowforce-max/what-is",
  // "/reviews/total-control-24/what-is",
];

// 3) Full reviews a partir do arquivo src/data/reviews.ts
function getReviewPaths() {
  return reviews.map((item) => `/reviews/${item.slug}`);
}

export async function GET() {
  const reviewPaths = getReviewPaths();

  // Junta tudo e remove duplicados
  const allPaths = Array.from(
    new Set([...STATIC_PATHS, ...reviewPaths, ...MINI_REVIEW_PATHS])
  );

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
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
