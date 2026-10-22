"""Préparer une copie autonome du site public Totus Tuus pour GitHub Pages.
Le dépôt de développement privé et le site Netlify ne sont jamais modifiés.
"""
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.parse import urljoin, urlparse, unquote
from html.parser import HTMLParser
import re
import json
import shutil

BASE = "https://funny-seahorse-1ccdd6.netlify.app/"
FALLBACK_BASE = "https://benkabor2108-tech.github.io/totus-tuus-public/"
OUT = Path("site")
if OUT.exists():
    shutil.rmtree(OUT)
OUT.mkdir()
paths = {
    "index.html", "app.js", "styles.css", "data/neuvaine.json", "prieres.json",
    "rosary-scriptures.json", "interventions.js", "service-worker.js",
    "manifest.webmanifest", "version.json", "couverture.png",
    "neuvaine-imprimable.pdf", "favicon.ico",
}
class Assets(HTMLParser):
    def handle_starttag(self, tag, attrs):
        d = dict(attrs)
        for key in ("src", "href", "poster"):
            if d.get(key):
                add(d[key])
def add(value):
    if not value or value.startswith(("data:", "mailto:", "#", "javascript:")):
        return
    u = urlparse(urljoin(BASE, value))
    if u.netloc != urlparse(BASE).netloc:
        return
    p = unquote(u.path).lstrip("/")
    if p and ".." not in Path(p).parts and not p.endswith("/"):
        paths.add(p)
def fetch(path):
    url = urljoin(BASE, path)
    req = Request(url, headers={"User-Agent": "TotusTuusMigration/1.0"})
    try:
        with urlopen(req, timeout=25) as response:
            if response.status != 200:
                raise ValueError(str(response.status))
            data = response.read(12_000_000)
            typ = response.headers.get("Content-Type", "")
            if path != "index.html" and "text/html" in typ:
                raise ValueError("Réponse HTML inattendue")
            return data
    except Exception as e:
        print("INDISPONIBLE", path, type(e).__name__, str(e)[:130])
        return None

index = fetch("index.html")
if not index:
    print("Netlify indisponible : reprise depuis la dernière version publique GitHub Pages, sans perte de données.")
    BASE = FALLBACK_BASE
    index = fetch("index.html")
if not index:
    raise SystemExit("Impossible de lire le site Netlify ET la version publique GitHub Pages")
Assets().feed(index.decode("utf-8"))
sw = fetch("service-worker.js")
if sw:
    for match in re.findall(r"""['"]((?:\./|/)?[^'"\s]+\.(?:js|css|json|webmanifest|html|png|jpg|jpeg|svg|ico|pdf)(?:\?[^'"]*)?)['"]""", sw.decode("utf-8", "replace"), re.I):
        add(match)
for match in re.findall(r"""['"]((?:\./|/)?[^'"\s]+\.(?:js|css|json|webmanifest|png|jpg|svg|pdf)(?:\?[^'"]*)?)['"]""", index.decode("utf-8", "replace"), re.I):
    add(match)
paths.discard("")
missing = []
for p in sorted(paths):
    data = index if p == "index.html" else sw if p == "service-worker.js" else fetch(p)
    if data is None:
        missing.append(p)
        continue
    dest = OUT / p
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_bytes(data)
for p in ("index.html", "prieres.json", "rosary-scriptures.json", "service-worker.js", "manifest.webmanifest", "interventions.js"):
    if not (OUT/p).is_file():
        raise SystemExit("Fichier essentiel absent du site source : " + p)
# Copier les correctifs vérifiés sans exposer le dépôt privé.
for p in Path("overrides").glob("*.js"):
    shutil.copy2(p, OUT/p.name)
html = (OUT/"index.html").read_text(encoding="utf-8")
if BASE == FALLBACK_BASE:
    # La copie publique contient déjà les scripts du parcours : la préparation RC
    # les réinjectera une seule fois, à la version candidate exacte.
    html = re.sub(r'<script\\b[^>]*src=["\\\'][^"\\\']*(?:intercession-prayers|parcours-marial)\\.js[^"\\\']*["\\\'][^>]*>\\s*</script>', "", html, flags=re.I)
    print("Scripts du parcours public retirés du HTML importé pour éviter les doublons.")
for p in sorted(Path("overrides").glob("*.js")):
    if p.name not in html:
        html = html.replace("</body>", '<script src="./'+p.name+'?v=5.9.1" defer></script></body>', 1)
(OUT/"index.html").write_text(html, encoding="utf-8")
# Ne pas importer un service worker conçu pour le domaine racine Netlify :
# une application sous /totus-tuus-public/ doit utiliser des chemins relatifs.
worker = (OUT/"service-worker.js").read_text(encoding="utf-8")
worker = re.sub(r"const CACHE=['\"][^'\"]+['\"]", "const CACHE='totus-tuus-pages-v5-9-1'", worker, count=1)
worker = worker.replace("const ASSETS=[", "const ASSETS=['./scripture-explanation.js?v=5.9.1','./share-app.js?v=5.9.1','./update-manager.js?v=5.9.1',")
(OUT/"service-worker.js").write_text(worker, encoding="utf-8")
(OUT/".nojekyll").write_text("", encoding="utf-8")
(OUT/"version.json").write_text(json.dumps({"version":"5.9.1-pages","release":"5.9.1"},ensure_ascii=False),encoding="utf-8")
print("FICHIERS IMPORTES:",len([p for p in OUT.rglob("*") if p.is_file()]))
print("FICHIERS INDISPONIBLES:",missing)
