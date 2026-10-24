#!/usr/bin/env bash
# Reassembles the D'Bahamas Court video from the committed chunks in media-src/.
# The full 53MB MP4 exceeds the repository's 10MB per-file limit, so it is
# stored as <10MB parts and rebuilt here (locally and on Netlify) before
# `vite build` copies public/ into the site output.
set -euo pipefail

out="public/media/dbahamas-court-web.mp4"
mkdir -p public/media
cat media-src/dbahamas-court-web.mp4.part-* >"$out"
bytes=$(wc -c <"$out" | tr -d ' ')
if [ "$bytes" != "53319514" ]; then
  echo "ERROR: reassembled video is $bytes bytes, expected 53319514" >&2
  exit 1
fi
echo "Reassembled $out ($bytes bytes)"
