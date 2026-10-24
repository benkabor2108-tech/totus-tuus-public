#!/usr/bin/env python3
"""Préparer les 33 lectures bibliques catholiques pour une consultation hors ligne.
Source : Bible Crampon (1923), édition du domaine public. Échec fermé si un verset manque.
"""
import json, re, unicodedata, urllib.request, xml.etree.ElementTree as ET
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
DATA=ROOT/"modules/parcours-marial/parcours_marial_33_jours_enrichi.json"
OUTPUT=ROOT/"modules/parcours-marial/bible_crampon_33_lectures.json"
URL="https://raw.githubusercontent.com/Beblia/Holy-Bible-XML-Format/master/FrenchCramponBible.xml"
BOOKS={"Gn":"genese","Mt":"matthieu","Lc":"luc","Jn":"jean","Rm":"romains","1 Co":"1 corinthiens","2 Co":"2 corinthiens","Ga":"galates","Ep":"ephesiens","Ph":"philippiens","Col":"colossiens","1 Tm":"1 timothee","He":"hebreux"}
ALIASES={"genese":["genesis","genese"],"matthieu":["matthew","matthieu","matt"],"luc":["luke","luc"],"jean":["john","jean"],"romains":["romans","romains"],"1 corinthiens":["1 corinthians","1 corinthiens","i corinthiens"],"2 corinthiens":["2 corinthians","2 corinthiens","ii corinthiens"],"galates":["galatians","galates"],"ephesiens":["ephesians","ephesiens"],"philippiens":["philippians","philippiens"],"colossiens":["colossians","colossiens"],"1 timothee":["1 timothy","1 timothee","i timothee"],"hebreux":["hebrews","hebreux"]}
def norm(s):
 s=unicodedata.normalize("NFKD",str(s))
 return re.sub(r"\s+"," ",re.sub(r"[^a-z0-9 ]","", "".join(c for c in s if not unicodedata.combining(c)).lower())).strip()
def tag(node):return node.tag.rsplit("}",1)[-1].lower()
def attr(node,*names):
 d={k.lower():v for k,v in node.attrib.items()}
 for n in names:
  if n in d:return d[n]
 return None
def parse_ref(ref):
 m=re.fullmatch(r"(.+?)\s+(\d+),(\d+)(?:-(\d+))?",ref.strip())
 if not m:raise ValueError("Référence inconnue: "+ref)
 book,chapter,first,last=m.group(1),int(m.group(2)),int(m.group(3)),int(m.group(4) or m.group(3))
 if book not in BOOKS or first>last:raise ValueError("Référence non prise en charge: "+ref)
 return BOOKS[book],chapter,first,last
def extract(xml):
 root=ET.fromstring(xml)
 books=[n for n in root.iter() if tag(n) in ("biblebook","book")]
 if len(books)<60:raise ValueError("XML biblique: livres non reconnus")
 indexed={}
 for book in books:
  name=norm(attr(book,"bname","name","bookname","bsname") or "")
  if not name:continue
  for key,aliases in ALIASES.items():
   if name in [norm(a) for a in aliases]:indexed[key]=book
 if len(indexed)<len(BOOKS):
  # Beblia XML numérote les livres sans leur nom (canon de 66 livres).
  if len(books)!=66:raise ValueError("Numérotation biblique inattendue: "+str(len(books)))
  nums={"genese":1,"matthieu":40,"luc":42,"jean":43,"romains":45,"1 corinthiens":46,"2 corinthiens":47,"galates":48,"ephesiens":49,"philippiens":50,"colossiens":51,"1 timothee":54,"hebreux":58}
  indexed={k:next(b for b in books if attr(b,"number","bnumber")==str(n)) for k,n in nums.items()}
  print("Structure XML:",[(b.tag,b.attrib,[(c.tag,c.attrib) for c in list(b)[:1]]) for b in books[:1]])

 out={}
 for day in json.loads(DATA.read_text(encoding="utf-8"))["jours"]:
  ref=day["lecture_biblique"]["reference"];key,chapter,start,end=parse_ref(ref)
  chapters=[c for c in indexed[key] if tag(c) in ("chapter","chap")]
  selected=next((c for c in chapters if str(attr(c,"cnumber","number","n"))==str(chapter)),None)
  if selected is None:raise ValueError("Chapitre absent: "+ref)
  verses={}
  for v in selected:
   if tag(v) not in ("vers","verse","v"):continue
   n=attr(v,"vnumber","number","n")
   if n and str(n).isdigit():verses[int(n)]=" ".join("".join(v.itertext()).split())
  missing=[n for n in range(start,end+1) if not verses.get(n)]
  if missing:raise ValueError(f"Versets absents {ref}: {missing}")
  out[str(day["jour"])]={"reference":ref,"traduction":"Bible Crampon (1923)","source":"Wikisource / Beblia — domaine public","versets":[{"numero":n,"texte":verses[n]} for n in range(start,end+1)]}
 if len(out)!=33:raise ValueError("Il faut 33 lectures")
 OUTPUT.write_text(json.dumps({"source":URL,"jours":out},ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
 print("Bible Crampon : 33 passages vérifiés, "+str(OUTPUT.stat().st_size)+" octets")
if __name__=="__main__":
 with urllib.request.urlopen(urllib.request.Request(URL,headers={"User-Agent":"TotusTuus/1.0 (biblique public-domain)"}),timeout=45) as r:xml=r.read()
 extract(xml)
