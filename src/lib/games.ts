import allGames from '../content/games.json'

export type Game = (typeof allGames)[number]

/** Returns games visible for the current environment: all in dev, published-only in prod. */
export function getGames(): Game[] {
  if (import.meta.env.DEV) return allGames
  return allGames.filter(g => g.status === 'published')
}

/** Returns only published games, regardless of environment. Useful for RSS/sitemap. */
export function getPublishedGames(): Game[] {
  return allGames.filter(g => g.status === 'published')
}
