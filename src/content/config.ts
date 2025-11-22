import { z, defineCollection } from 'astro:content';

const reviews = defineCollection({
  type: 'content',
  schema: z.object({
    // NÃO vamos exigir "slug" aqui – o Astro já gera slug automático
    title: z.string(),
    description: z.string(),
    pageTitle: z.string(),
    metaDescription: z.string(),

    heroImage: z.string(),
    heroAlt: z.string(),
    heroCaption: z.string(),

    primaryCtaLabel: z.string(),
    primaryCtaUrl: z.string(),
    reviewCategory: z.string(),
  }),
});

export const collections = {
  reviews,
};

