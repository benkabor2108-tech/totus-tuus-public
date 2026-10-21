"""Assemble a non-deployable Totus Tuus 5.11.0 release candidate from an already imported site.
Requires the existing V5.10.0 intercession-prayers.js and the 33-day module.
Never writes to production, deploys, or touches user data.
"""
from pathlib import Path
import json, re, sys

site = Path(sys.argv[1] if len(sys.argv)>1 else "site")
module = site / "modules/parcours-marial"
data = json.loads((module / "parcours_marial_33_jours_enrichi.json").read_text(encoding="utf-8"))
days = data["jours"]
assert [d["jour"] for d in days] == list(range(1,34))
assert all(d["lecture_biblique"]["reference"] and d["priere_du_jour"] and d["explication_spirituelle"] for d in days)
book=json.loads((module / 'traite_33_lectures.json').read_text(encoding='utf-8'))
assert len(book['jours'])==33 and all(d['paragraphes'] for d in book['jours'])
assert sum(len(p['texte']) for d in book['jours'] for p in d['paragraphes']) > 120000
assert (site / "intercession-prayers.js").stat().st_size > 1000
interventions = (site / "interventions.js").read_text(encoding="utf-8")
assert "totus-intercession-v51" in interventions, "Historical intercession storage key missing"
js = (module / "parcours-marial.js").read_text(encoding="utf-8")
assert "totus-tuus-parcours-marial-33-v1" in js
assert "cache:'no-store'" not in js

htmlfile = site / "index.html"
html = htmlfile.read_text(encoding="utf-8")
intercession_tag = '<script src="./intercession-prayers.js?v=5.10.0" defer></script>'
marial_tag = '<script src="./modules/parcours-marial/parcours-marial.js?v=5.11.0-rc2" defer></script>'
assert "intercession-prayers.js" not in html and "parcours-marial.js" not in html
assert html.count("</body>")==1
htmlfile.write_text(html.replace("</body>",intercession_tag+marial_tag+"</body>"),encoding="utf-8")

swfile = site / "service-worker.js"
sw = swfile.read_text(encoding="utf-8")
sw,n = re.subn(r"const CACHE=['\"][^'\"]+['\"]", "const CACHE='totus-tuus-pages-v5-11-0-rc2'", sw, count=1)
assert n==1
assert "const ASSETS=[" in sw
sw=sw.replace("const ASSETS=[", "const ASSETS=['./intercession-prayers.js?v=5.10.0','./modules/parcours-marial/parcours-marial.js?v=5.11.0-rc2','./modules/parcours-marial/parcours_marial_33_jours_enrichi.json','./modules/parcours-marial/traite_33_lectures.json',",1)
# Only clean release-candidate caches. Never purge the historical PWA's caches.
sw=sw.replace("key.startsWith('totus-tuus-')&&key!==CACHE","key.startsWith('totus-tuus-pages-v5-11-0-rc2')&&key!==CACHE")
assert "key.startsWith('totus-tuus-pages-v5-11-0-rc2')" in sw
# JSON requests should not silently receive the app shell when offline.
sw=sw.replace("caches.match(req).then(res=>res||caches.match('./index.html'))","caches.match(req).then(res=>res||(req.mode==='navigate'?caches.match('./index.html'):Response.error()))")
assert "req.mode==='navigate'?caches.match('./index.html'):Response.error()" in sw
# Ensure the browser detects a new service worker after the editorial corrections.
sw += "\n// Marial editorial refresh 2026-10-21: 33 AELF links and revised meditations.\n"
swfile.write_text(sw,encoding="utf-8")
(site/"version.json").write_text(json.dumps({"version":"5.11.0-rc2","release":"release-candidate-not-deployed"},ensure_ascii=False),encoding="utf-8")
assert htmlfile.read_text().count("intercession-prayers.js")==1
assert htmlfile.read_text().count("parcours-marial.js")==1
print("Release candidate 5.11.0-rc2 assembled. No production deployment.")
