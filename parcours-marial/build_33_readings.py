#!/usr/bin/env python3
"""Build 33 local reading units from the verified PDF, preserving page order."""
import json, subprocess
from meditations_33 import THEMES
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
# Extract each page once. Split at the beginning of a numbered paragraph, not at PDF page breaks.
import re
from bisect import bisect_right
page_texts=[]
for page in range(1,pages+1):
    extracted=(subprocess.check_output(['pdftotext','-f',str(page),'-l',str(page),'-layout',str(pdf),'-'],text=True)
               if doc is None else doc[page-1].get_text())
    page_texts.append(extracted.replace(chr(0),''))
full_text='\n'.join(page_texts)
page_offsets=[0]
for p in page_texts[:-1]:
    page_offsets.append(page_offsets[-1]+len(p)+1)
# Paragraph numbers are part of the author's text (e.g. 1., 2., ...).
# Keep all material, including headings and unnumbered sections, in its original order.
anchors=sorted({m.start() for m in re.finditer(r'(?m)^[ \t]*[0-9]{1,3}\.[ \t]+(?=\S)',full_text)})
assert len(anchors)>=32, f'Insufficient paragraph boundaries: {len(anchors)}'
# Choose 32 ordered cuts near equal-length targets, constrained to genuine paragraph starts.
cuts=[0]
for day in range(1,33):
    remaining=33-day
    choices=[p for p in anchors if p>cuts[-1] and p<len(full_text) and
             sum(x>p for x in anchors)>=remaining-1]
    assert choices, f'No boundary for day {day}'
    target=len(full_text)*day/33
    cut=min(choices,key=lambda p:(abs(p-target),p))
    cuts.append(cut)
cuts.append(len(full_text))
assert len(cuts)==34 and all(cuts[i]<cuts[i+1] for i in range(33))
units=[]
for i in range(33):
    first=bisect_right(page_offsets,cuts[i])
    last=bisect_right(page_offsets,cuts[i+1]-1)
    txt=full_text[cuts[i]:cuts[i+1]].strip()
    # Remove isolated PDF folio numbers from the reading view only; the source PDF remains intact.
    txt=re.sub(r'(?m)^[ \t]*(?:[1-9]|[1-4][0-9]|5[0-3])[ \t]*(?=\n|\Z)', '', txt)
    txt=re.sub(r'\n{3,}', '\n\n', txt).strip()
    assert len(txt)>100, f'Insufficient text on day {i+1}'
    if i>0:
        assert re.match(r'^[ \t]*[0-9]{1,3}\.[ \t]+',full_text[cuts[i]:]), f'Day {i+1} starts inside paragraph'
    theme,meditation,prayer=THEMES[i]
    units.append({'day':i+1,'pdf_pages':[first,last],'theme':theme,'text':txt,
                  'meditation':meditation,'prayer':prayer})
assert ''.join(full_text[cuts[i]:cuts[i+1]] for i in range(33))==full_text
assert units[0]['pdf_pages'][0]==1 and units[-1]['pdf_pages'][1]==pages
data={'source':'PDF français La Porte Latine; pagination PDF et non pagination imprimée 1859',
      'method':'33 sections continues du PDF, coupées aux débuts des paragraphes numérotés; révision éditoriale encore nécessaire',
      'total_pdf_pages':pages,'paragraph_boundaries_found':len(anchors),'days':units}
(root/'parcours-33.json').write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf-8')
(root/'parcours-33.js').write_text('window.TOTUS_MARIAL_READING='+json.dumps(data,ensure_ascii=False)+';',encoding='utf-8')
h=(root/'index.html').read_text(encoding='utf-8')
h=h.replace('<script>','<script src="./parcours-33.js"></script><script>',1)
needle="state.day=n;\nif(!persist())"
assert needle in h, "Point d'insertion des lectures introuvable"
insertion=("const unit=window.TOTUS_MARIAL_READING?.days?.[n-1];"
           "if(!unit){document.getElementById('reading').textContent='Lecture indisponible : actualisez la page.';return;}"
           "document.getElementById('guide').textContent=unit.theme+'. Lisez, méditez et priez à votre rythme.';"
           "document.getElementById('pages').textContent='Pages du PDF : '+unit.pdf_pages.join(' à ');"
           "bookPages=paginateBook(unit.text);bookPage=Math.min(bookPage,bookPages.length-1);renderBook();"
           "document.getElementById('meditation').textContent=unit.meditation;"
           "document.getElementById('prayer').textContent=unit.prayer;")
h=h.replace(needle,insertion+needle,1)
assert "window.TOTUS_MARIAL_READING?.days?.[n-1]" in h
assert '<script src="./parcours-33.js"></script>' in h
assert 'id="reading"' in h and 'id="meditation"' in h and 'id="prayer"' in h
(root/'index.html').write_text(h,encoding='utf-8')
print(f'33 journées générées à partir de {pages} pages PDF; {sum(len(x["text"]) for x in units)} caractères.')
