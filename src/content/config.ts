// src/content/config.ts
import { defineCollection, z } from "astro:content";

const reviews = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    heroImage: z.string().optional(),
    primaryCtaLabel: z.string().optional(),
    primaryCtaUrl: z.string().optional(),
  }),
});

export const collections = {
  reviews,
};

