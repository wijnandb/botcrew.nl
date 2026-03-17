import rss from '@astrojs/rss'
import type { APIContext } from 'astro'
import { getPublishedGames } from '../lib/games'

export function GET(context: APIContext) {
  const games = getPublishedGames()
  return rss({
    title: 'Bot Crew — 100 Games in 100 Dagen',
    description: 'Elke dag een nieuw browserspel, gebouwd door AI',
    site: context.site!,
    items: [...games].reverse().map(game => ({
      title: `Dag ${game.day}: ${game.title}`,
      description: game.description,
      link: game.playUrl,
      pubDate: new Date(game.date + 'T12:00:00'),
    })),
  })
}
