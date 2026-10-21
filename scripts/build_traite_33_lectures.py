"""Prépare les lectures intégrales du Traité (édition Gaume frères, 1859).
Source: Wikisource, sections Introduction / Première partie / Deuxième partie.
La répartition en 33 jours est éditoriale, non une division établie par Montfort.
Échec explicite si la source ne peut pas être vérifiée.
"""
import json
import re
import sys
import urllib.parse
import urllib.request
from html.parser import HTMLParser
from pathlib import Path

TITLE = "Traité de la vraie dévotion à la Sainte Vierge"
BASE = "https://fr.wikisource.org/wiki/" + urllib.parse.quote(TITLE.replace(" ", "_"))
API = "https://fr.wikisource.org/w/api.php"
OUT = Path(sys.argv[1] if len(sys.argv) > 1 else "modules/parcours-marial/traite_33_lectures.json")

class Extract(HTMLParser):
    def __init__(self):
        super().__init__()
        self.level = 0
        self.in_root = False
        self.ignore = 0
        self.tag = None
        self.buf = []
        self.parts = []
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if not self.in_root and tag == "div" and "mw-parser-output" in a.get("class", "").split():
            self.in_root = True
            self.level = 1
            return
        if not self.in_root:
            return
        if tag == "div":
            self.level += 1
        if tag in ("sup", "style", "script", "table"):
            self.ignore += 1
        if not self.ignore and tag in ("p", "h2", "h3", "h4") and self.tag is None:
            self.tag = tag
            self.buf = []
    def handle_data(self, data):
        if self.in_root and not self.ignore and self.tag:
            self.buf.append(data)
    def handle_endtag(self, tag):
        if not self.in_root:
            return
        if self.tag == tag:
            t = re.sub(r"\\s+", " ", "".join(self.buf)).strip()
            if len(t) > 25:
                self.parts.append(t)
            self.tag = None
            self.buf = []
        if tag in ("sup", "style", "script", "table") and self.ignore:
            self.ignore -= 1
        if tag == "div":
            self.level -= 1
            if self.level == 0:
                self.in_root = False

def section(n):
    name = TITLE + "/" + str(n)
    url = API + "?" + urllib.parse.urlencode({"action": "parse", "page": name, "prop": "text", "format": "json", "formatversion": 2})
    req = urllib.request.Request(url, headers={"User-Agent": "TotusTuusReadingBuilder/1.0 (noncommercial educational source attribution)"})
    with urllib.request.urlopen(req, timeout=45) as response:
        obj = json.load(response)
    html = obj["parse"]["text"]
    parser = Extract()
    parser.feed(html)
    paragraphs = [p for p in parser.parts if not p.startswith(("◄", "►", "Image:", "book "))]
    if len(paragraphs) < (5 if n == 3 else 40):
        raise RuntimeError(f"Section {n}: extraction trop courte ({len(paragraphs)} paragraphes)")
    return paragraphs

parts = [section(i) for i in (3, 4, 5)]
all_paragraphs = [(i + 3, p) for i, section_parts in enumerate(parts) for p in section_parts]
total = sum(len(p) for _, p in all_paragraphs)
if total < 120000:
    raise RuntimeError(f"Texte source anormalement court: {total} caractères")
# Découpage ordonné par paragraphes entiers; chaque mot appartient à une seule journée.
days = [[] for _ in range(33)]
day = 0
count = 0
for source, paragraph in all_paragraphs:
    if day < 32 and count >= (day + 1) * total / 33 and days[day]:
        day += 1
    days[day].append({"texte": paragraph, "section": source})
    count += len(paragraph)
assert all(days) and sum(map(len, days)) == len(all_paragraphs)
output = {
    "ouvrage": TITLE,
    "auteur": "Saint Louis-Marie Grignion de Montfort",
    "edition": "Gaume frères, 1859, transcription Wikisource",
    "source": BASE,
    "licence_source": "Wikisource : CC BY-SA pour la transcription et contributions ; œuvre originale du domaine public",
    "avertissement": "Découpage éditorial du texte historique en 33 lectures ; il ne constitue pas la préparation traditionnelle de 33 jours à la consécration.",
    "jours": [{"jour": i + 1, "paragraphes": day_parts, "sources": sorted(set(BASE + "/" + str(x["section"]) for x in day_parts))} for i, day_parts in enumerate(days)],
}
OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text(json.dumps(output, ensure_ascii=False, indent=2), encoding="utf-8")
# Rapport de relecture : limites de journées, longueur et provenance.
# Un contrôle automatique ne garantit pas une coupure pertinente sur le plan spirituel.
audit = {
    "statut": "RELECTURE_HUMAINE_REQUISE",
    "source": BASE,
    "nombre_paragraphes": len(all_paragraphs),
    "caracteres": total,
    "points_de_controle": [
        "Comparer le texte à l'édition historique et vérifier l'intégralité",
        "Vérifier que chaque journée se termine à une articulation logique",
        "Faire correspondre chaque titre, référence biblique et méditation au passage exact",
        "Contrôler les numéros de paragraphes de Montfort et supprimer les éléments éditoriaux parasites",
        "Ne pas présenter ce découpage comme la préparation traditionnelle à la consécration"
    ],
    "jours": [
        {
            "jour": i+1,
            "paragraphes": len(items),
            "caracteres": sum(len(p["texte"]) for p in items),
            "debut": items[0]["texte"][:160],
            "fin": items[-1]["texte"][-160:],
            "sections": sorted(set(p["section"] for p in items)),
            "validation_editoriale": False
        } for i, items in enumerate(days)
    ]
}
OUT.with_name("audit_decoupage_33_lectures.json").write_text(
    json.dumps(audit, ensure_ascii=False, indent=2), encoding="utf-8"
)

print(f"Traité authentique extrait: {len(all_paragraphs)} paragraphes, {total} caractères, 33 lectures. Sortie: {OUT}")
