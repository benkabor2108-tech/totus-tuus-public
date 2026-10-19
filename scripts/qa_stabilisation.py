"""Audit de stabilisation sans changement fonctionnel."""
from pathlib import Path
import json,re,sys
root=Path('site')
errors=[]
data=json.loads((root/'data/neuvaine.json').read_text(encoding='utf-8'))
print('TYPE DONNEES NEUVAINE:',type(data).__name__)
if isinstance(data,dict): print('CLES NEUVAINE:',list(data)[:20])
if isinstance(data,list): print('ELEMENTS NEUVAINE:',len(data))
source=Path('overrides/scripture-explanation.js').read_text(encoding='utf-8')
part=source.split('const notes = [',1)[1].split('];',1)[0]
notes=re.findall(r"^\s*\['([^']+)','([^']+)','([^']+)'\]",part,re.M)
print('MEDITATIONS PERSONNALISEES:',len(notes))
if len(notes)!=9: errors.append('Il faut exactement neuf commentaires distincts')
if len({x[1] for x in notes})!=9: errors.append('Commentaires dupliques')
for i,(title,body,question) in enumerate(notes,1):
    print(f'JOUR {i}: {title} / {len(body)} caracteres / question: {question}')
    if len(body)<100 or len(question)<15: errors.append(f'Jour {i}: meditation trop courte')
pdf=root/'neuvaine-imprimable.pdf'
if not pdf.exists(): errors.append('Livret PDF absent')
else:
    b=pdf.read_bytes()
    print('PDF TAILLE:',len(b),'OCTETS, EN-TETE:',repr(b[:8]))
    if not b.startswith(b'%PDF-') or len(b)<20000: errors.append('PDF manquant, tronque ou non valide')
    try:
        from pypdf import PdfReader
        reader=PdfReader(str(pdf))
        print('PDF PAGES:',len(reader.pages))
        text=' '.join((p.extract_text() or '') for p in reader.pages)
        print('PDF TEXTE EXTRAIT:',len(text),'caracteres')
        if len(reader.pages)<5 or len(text)<1000: errors.append('PDF anormalement court ou sans texte')
        print('PDF EXTRAIT INITIAL:',text[:450].replace('\n',' '))
    except Exception as e: errors.append('Erreur ouverture PDF: '+str(e))
sw=(root/'service-worker.js').read_text(encoding='utf-8')
print('SERVICE WORKER CACHE:',re.findall(r'const CACHE[^;]+',sw)[:1])
for filename in ('app.js','styles.css','prieres.json','rosary-scriptures.json','scripture-explanation.js','scroll-fix.js'):
    if not (root/filename).exists(): errors.append('Ressource absente: '+filename)
print('VERSION:',(root/'version.json').read_text(encoding='utf-8'))
if errors:
    print('ECHECS:',*errors,sep='\n- ')
    sys.exit(1)
print('AUDIT STATIQUE ET PDF : REUSSI (tests interactifs hors-ligne non inclus)')
