#!/usr/bin/env python3
"""Build 33 local reading units from the verified PDF, preserving page order."""
import json, subprocess
from pathlib import Path
root=Path('/tmp/marial')
pdf=root/'traite-vraie-devotion-fr.pdf'
try:
    info=subprocess.check_output(['pdfinfo',str(pdf)],text=True)
    pages=int(next(line.split(':',1)[1] for line in info.splitlines() if line.startswith('Pages:')))
    doc=None
except FileNotFoundError:
    import fitz
    doc=fitz.open(str(pdf))
    pages=len(doc)
assert pages>=33
units=[]
for day in range(1,34):
    first=((day-1)*pages)//33+1
    last=(day*pages)//33
    assert first<=last
    txt=(subprocess.check_output(['pdftotext','-f',str(first),'-l',str(last),'-layout',str(pdf),'-'],text=True) if doc is None else '\\n'.join(doc[i].get_text() for i in range(first-1,last)))
    txt=txt.replace('\\x00','').strip()
    assert len(txt)>100, f'No readable text on day {day}'
    stage= ('Se préparer à la rencontre de Jésus par Marie' if day<=7 else
            'Discerner et approfondir la vraie dévotion' if day<=14 else
            'Comprendre le don de soi à Jésus par Marie' if day<=21 else
            'Grandir dans la consécration au Christ')
    units.append({'day':day,'pdf_pages':[first,last],'theme':stage,'text':txt,
      'meditation':"Quel appel concret à aimer davantage Jésus et à suivre son Évangile ce passage m'adresse-t-il aujourd'hui ?",
      'prayer':"Seigneur Jésus, par l'intercession de la Vierge Marie, apprends-moi à t'aimer et à te servir avec fidélité. Amen."})
assert units[0]['pdf_pages'][0]==1 and units[-1]['pdf_pages'][1]==pages
assert all(units[i]['pdf_pages'][1]+1==units[i+1]['pdf_pages'][0] for i in range(32))
data={'source':'PDF français La Porte Latine; pagination PDF et non pagination imprimée 1859',
      'method':'Répartition continue par pages PDF, non par chapitres; à revoir éditorialement',
      'total_pdf_pages':pages,'days':units}
(root/'parcours-33.json').write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf-8')
(root/'parcours-33.js').write_text('window.TOTUS_MARIAL_READING='+json.dumps(data,ensure_ascii=False)+';',encoding='utf-8')
h=(root/'index.html').read_text(encoding='utf-8')
h=h.replace('<script>','<script src="./parcours-33.js"></script><script>',1)
h=h.replace('<p id="guide"></p>','<p id="guide"></p><p id="pages"></p><h2>Lecture du jour</h2><pre id="reading" style="white-space:pre-wrap;overflow-wrap:anywhere;font:inherit;max-height:50vh;overflow:auto"></pre><h3>Méditation</h3><p id="meditation"></p><h3>Prière</h3><p id="prayer"></p>',1)
needle="state.day=n;try{localStorage.setItem"
assert needle in h, "Point d'insertion des lectures introuvable"
insertion=("const unit=window.TOTUS_MARIAL_READING?.days?.[n-1];"
           "if(!unit){document.getElementById('reading').textContent='Lecture indisponible : actualisez la page.';return;}"
           "document.getElementById('pages').textContent='Pages du PDF : '+unit.pdf_pages.join(' à ');"
           "document.getElementById('reading').textContent=unit.text;"
           "document.getElementById('meditation').textContent=unit.meditation;"
           "document.getElementById('prayer').textContent=unit.prayer;")
h=h.replace(needle,insertion+needle,1)
assert "window.TOTUS_MARIAL_READING?.days?.[n-1]" in h
assert '<script src="./parcours-33.js"></script>' in h
assert 'id="reading"' in h and 'id="meditation"' in h and 'id="prayer"' in h
(root/'index.html').write_text(h,encoding='utf-8')
print(f'33 journées générées à partir de {pages} pages PDF; {sum(len(x["text"]) for x in units)} caractères.')
