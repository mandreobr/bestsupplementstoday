// astro.config.mjs
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  // Domínio público do site (IMPORTANTE para o sitemap)
  site: "https://bestsupplementstoday.com",

  // Aqui entram as integrações (plugins) do Astro
  integrations: [
    sitemap(),
  ],
});
