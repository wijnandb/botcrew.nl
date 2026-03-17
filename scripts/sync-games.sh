#!/bin/bash
# Sync built games from 100-games repo into public/games/
# Rewrites absolute asset paths to relative so games work under /games/{date}/

GAMES_REPO="../100-games/output"
PUBLIC_GAMES="public/games"

cd "$(dirname "$0")/.." || exit 1

mkdir -p "$PUBLIC_GAMES"

for game_date_dir in "$GAMES_REPO"/2026-*/; do
  [ -d "$game_date_dir/game/dist" ] || continue
  date=$(basename "$game_date_dir")
  target="$PUBLIC_GAMES/$date"

  echo "Syncing $date..."
  cp -r "$game_date_dir/game/dist" "$target"

  # Rewrite absolute /assets/ paths to relative ./assets/ in HTML files
  find "$target" -name "*.html" -exec sed -i 's|="/assets/|="./assets/|g' {} \;
  find "$target" -name "*.html" -exec sed -i "s|='/assets/|='./assets/|g" {} \;

  # Copy screenshots if available (use initial-load.png as the card screenshot)
  if [ -d "$game_date_dir/screenshots" ]; then
    for img in "$game_date_dir"/screenshots/*.png; do
      cp "$img" "$target/" 2>/dev/null
    done
    # Create screenshot.png from initial-load if it exists
    if [ -f "$game_date_dir/screenshots/initial-load.png" ]; then
      cp "$game_date_dir/screenshots/initial-load.png" "$target/screenshot.png"
      echo "  → screenshot.png from initial-load.png"
    elif [ -f "$game_date_dir/screenshots/mid-game.png" ]; then
      cp "$game_date_dir/screenshots/mid-game.png" "$target/screenshot.png"
      echo "  → screenshot.png from mid-game.png"
    fi
  fi
done

echo "Done. Synced games:"
ls -1 "$PUBLIC_GAMES"
