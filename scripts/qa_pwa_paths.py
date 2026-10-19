"""Audit des chemins PWA réels, sans modifier le site en production."""
from pathlib import Path
import json,re,sys
from urllib.parse import urljoin,urlparse,unquote
root=Path("site")
html=(root/"index.html").read_text(encoding="utf-8")
manifest=json.loads((root/"manifest.webmanifest").read_text(encoding="utf-8"))
sw=(root/"service-worker.js").read_text(encoding="utf-8")
errors=[]
def check_ref(label,ref,base="https://example.org/totus-tuus-public/"):
    if not isinstance(ref,str) or not ref: errors.append(f"{label}: reference vide");return
    u=urlparse(urljoin(base,ref))
    if u.netloc!="example.org":return
    p=unquote(u.path)
    if not p.startswith("/totus-tuus-public/"):
        errors.append(f"{label}: sort du sous-dossier GitHub Pages: {ref} -> {p}")
        return
    rel=p.removeprefix("/totus-tuus-public/")
    if rel and not (root/rel).is_file() and not (root/rel).is_dir():
        errors.append(f"{label}: fichier introuvable: {ref} -> {rel}")
m=re.search(r'<link\b[^>]*rel=["\']manifest["\'][^>]*>',html,re.I)
if not m:
    errors.append("HTML: balise rel=manifest absente")
else:
    h=re.search(r'href=["\']([^"\']+)',m.group(),re.I)
    if not h: errors.append("HTML: href manifest absent")
    else: check_ref("HTML manifest",h.group(1))
for field in ("start_url","scope"):
    v=manifest.get(field)
    print("MANIFEST",field,repr(v))
    if v:check_ref(field,v)
    else:errors.append("MANIFEST: "+field+" absent")
for i,icon in enumerate(manifest.get("icons",[])):
    check_ref(f"icon {i}",icon.get("src"))
print("ICONS:",len(manifest.get("icons",[])))
if not manifest.get("icons"):errors.append("MANIFEST: aucune icone")
for v in re.findall(r'''(?:navigator\.serviceWorker\.register\s*\(\s*|register\s*\(\s*)["']([^"']+)''',html):
    check_ref("service worker registration",v)
for ref in re.findall(r"""['"]((?:\./|/)[^'"\s]+\.(?:js|css|html|json|webmanifest|png|svg|ico|pdf)(?:\?[^'"]*)?)['"]""",sw,re.I):
    check_ref("service worker asset",ref)
print("SW SIZE:",len(sw),"HTML SIZE:",len(html))
print("SW REGISTRATION IN HTML:",'serviceWorker' in html)
if errors:
    print("ANOMALIES:",*errors,sep="\n - ")
    sys.exit(1)
print("AUDIT PWA DES CHEMINS : OK (le mode hors connexion reel reste a tester)")
