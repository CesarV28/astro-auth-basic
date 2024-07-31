import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

import cloudflare from "@astrojs/cloudflare";
import auth from 'auth-astro';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), auth()],
  output: "server",
  adapter: cloudflare(),
  experimental: {
    actions: true,
  }
});