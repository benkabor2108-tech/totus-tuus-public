#!/usr/bin/env bash
set -euo pipefail
python3 scripts/import_public_site.py
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT
git clone --quiet --depth 1 --branch candidate/intercessions-108 "https://github.com/benkabor2108-tech/totus-tuus-public.git" "$tmp"
(cd "$tmp" && python3 scripts/import_public_site.py)
cp "$tmp/site/intercession-prayers.js" site/intercession-prayers.js
mkdir -p site/modules/parcours-marial
cp modules/parcours-marial/*.js modules/parcours-marial/*.json modules/parcours-marial/*.jpg site/modules/parcours-marial/
python3 scripts/build_traite_33_lectures.py site/modules/parcours-marial/traite_33_lectures.json
python3 scripts/prepare_marial_release_candidate.py site
python3 scripts/check_site.py site
for f in site/*.js site/modules/parcours-marial/*.js; do node --check "$f"; done
echo "Preview ready in site/ (not production)"
