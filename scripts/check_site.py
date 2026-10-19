"""Contrôles avant publication publique de Totus Tuus."""
from pathlib import Path
from urllib.parse import urlparse
import json
import re
import sys

root = Path(sys.argv[1]) if len(sys.argv) > 1 else Path("site")
required = ("index.html", "prieres.json", "rosary-scriptures.json",
            "manifest.webmanifest", "service-worker.js", "version.json")
errors = [f"Fichier obligatoire absent : {p}" for p in required
          if not (root / p).is_file()]
if not root.is_dir():
    raise SystemExit("Dossier site/ absent : aucun déploiement autorisé.")
for p in root.rglob("*"):
    if not p.is_file():
        continue
    rel = p.relative_to(root).as_posix()
    if p.name.lower() in {".env", ".npmrc", "credentials.json", "id_rsa"} or p.suffix.lower() in {".key", ".pem", ".p12", ".pfx", ".db", ".sqlite", ".zip"}:
        errors.append(f"Fichier interdit dans le site public : {rel}")
    if p.suffix.lower() in {".html", ".js", ".json", ".css", ".webmanifest", ".txt"}:
        t = p.read_text(encoding="utf-8", errors="replace")
        for pat in (r"-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----",
                    r"gh[pousr]_[A-Za-z0-9_]{20,}",
                    r"github_pat_[A-Za-z0-9_]{20,}",
                    r"AKIA[0-9A-Z]{16}"):
            if re.search(pat, t):
                errors.append(f"Secret potentiel dans {rel}")
for p in ("prieres.json", "rosary-scriptures.json", "version.json", "manifest.webmanifest"):
    if (root / p).is_file():
        try:
            json.loads((root / p).read_text(encoding="utf-8"))
        except (ValueError, UnicodeError) as e:
            errors.append(f"JSON invalide {p}: {e}")
if errors:
    raise SystemExit("\n".join(errors))
print("Contrôles automatiques OK. Revue manuelle des données et tests mobiles encore nécessaires.")
