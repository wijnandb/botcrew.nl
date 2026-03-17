# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

botcrew.nl — "100 Games in 100 Dagen" challenge website. A Dutch-language Astro site showcasing daily AI-generated browser games, built by Perceptum. Deploys to https://botcrew.nl.

## Commands

```bash
npm run dev       # Dev server at localhost:4321
npm run build     # Production build to ./dist/
npm run preview   # Preview production build locally
```

No test runner or linter is configured.

## Architecture

- **Astro 6** static site with **Tailwind CSS v4** (via Vite plugin, configured in `astro.config.mjs`)
- Single layout (`src/layouts/Base.astro`) wraps all pages with nav, footer, Google Fonts (Bangers + Inter), and OG meta
- Game data lives in `src/content/games.json` — array of game objects with `day`, `title`, `tagline`, `category`, `tags`, `playUrl`, `screenshot`, `description`
- Pages show games in reverse chronological order (newest first); homepage shows latest game prominently + 6 recent
- `GameCard.astro` is the shared card component used on both homepage and `/games` listing
- Category filter on `/games` is static (no JS filtering yet)

## Adding a New Game

Add an entry to `src/content/games.json`. The homepage and games listing page derive everything from this array — the last entry is treated as the latest game.

## Styling

Custom color palette defined in `src/styles/global.css` via Tailwind `@theme`: `dark`, `orange`, `yellow`, `teal`, `pink`, `light`. All content is in Dutch.

## Deployment

GitHub Pages via CNAME (`public/CNAME` → `botcrew.nl`). Requires Node >= 22.12.0.
