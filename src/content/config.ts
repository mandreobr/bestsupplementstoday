import { z, defineCollection } from 'astro:content';

const reviews = defineCollection({
  type: 'content',
  schema: z.object({
    // Slug não é necessário — Astro gera automaticamente a partir da pasta/arquivo
    title: z.string(),
    description: z.string(),
    pageTitle: z.string(),
    metaDescription: z.string(),

    heroImage: z.string(),
    heroAlt: z.string(),
    heroCaption: z.string(),

    primaryCtaLabel: z.string(),
    primaryCtaUrl: z.string(),

    // Categorias validadas com enum
    category: z.enum([
      'weight-loss',
      'brain-and-neuro',
      'men-health',
      'women-health',
      'heart-and-circulation',
      'liver-and-gut',
      'dental-health',
      'hearing-and-vision',
      'pain-joint-muscle',
      'blood-sugar',
      'skin-hair-aging',
      'other',
    ]),
  }),
});

export const collections = {
  reviews,
};