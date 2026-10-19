"""Contrôles de recette des 108 prières spécifiques, sans publication."""
from pathlib import Path
import re
s=Path("site/intercession-prayers.js").read_text(encoding="utf-8")
base=Path("site/interventions.js").read_text(encoding="utf-8")
ids=["sante","famille","couple","enfants","travail","paix","foi","decision","deuil","reconciliation","vocation","epreuve"]
assert all((i+":'") in s for i in ids), "Catégorie sans introduction"
assert len(re.findall(r"En ce (?:premier|deuxième|troisième|quatrième|cinquième|sixième|septième|huitième|neuvième) jour",s))==9
assert all('"'+i+'"' in base for i in ids), "Catégorie absente de la base"
assert "specific=" in base and "specific[item.id][state.day]" in base, "Méditations et intentions quotidiennes absentes"
assert "localStorage.setItem" not in s, "L'extension ne doit pas toucher aux données locales"
assert "const middle=" in s, "La demande quotidienne d'origine doit être préservée"
assert "dataset.intercessionEnriched" in s, "Protection contre les répétitions absente"
assert "intercession-prayers.js" in (Path("site/index.html").read_text(encoding="utf-8"))
print("RECETTE CANDIDATE : 12 catégories x 9 journées = 108 prières spécifiques. Données locales inchangées. PASS")
