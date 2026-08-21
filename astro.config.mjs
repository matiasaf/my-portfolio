import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://builtbymatias.dev',
  output: 'static',
  redirects: {
    '/': '/en/',
  },
});
