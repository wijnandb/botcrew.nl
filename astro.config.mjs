// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

/** Vite plugin that serves index.html for public/games/{date}/ directories in dev */
function serveGamesDev() {
  return {
    name: 'serve-games-dev',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.startsWith('/games/2026-') && req.url.endsWith('/')) {
          const filePath = resolve('public', req.url.slice(1), 'index.html');
          if (existsSync(filePath)) {
            res.setHeader('Content-Type', 'text/html');
            res.end(readFileSync(filePath, 'utf-8'));
            return;
          }
        }
        next();
      });
    }
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://botcrew.nl',
  trailingSlash: 'always',
  integrations: [sitemap()],
  vite: {
    plugins: [serveGamesDev(), tailwindcss()],
    server: {
      fs: {
        allow: ['..']
      }
    }
  }
});