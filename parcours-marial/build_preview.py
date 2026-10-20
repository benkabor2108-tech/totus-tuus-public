#!/usr/bin/env python3
"""Prepare independent phone preview; does not modify the public Totus Tuus site."""
import hashlib, subprocess, sys
from pathlib import Path
from urllib.request import Request,urlopen
root=Path('preview-marial')
root.mkdir(exist_ok=True)
url='https://laportelatine.org/wp-content/uploads/2020/07/traite_vraie_devotion.pdf'
req=Request(url,headers={'User-Agent':'TotusTuusPreview/1.0'})
with urlopen(req,timeout=50) as response: data=response.read(20_000_000)
assert data.startswith(b'%PDF-') and hashlib.sha256(data).hexdigest()=='f4056a82c0ef59f4771a2ea64a6974dc1ab162d855000ce30c85187aa6029be1', 'PDF source changed: abort'
(root/'traite-vraie-devotion-fr.pdf').write_bytes(data)
(root/'index.html').write_text(Path('parcours-marial/lecteur-candidat.html').read_text(encoding='utf-8'),encoding='utf-8')
(root/'TEST_ANDROID.md').write_text(Path('parcours-marial/TEST_ANDROID.md').read_text(encoding='utf-8'),encoding='utf-8')
# The reading generator uses /tmp/marial; then copy the generated files into the preview directory.
import os,shutil
target=Path('/tmp/marial')
target.mkdir(parents=True,exist_ok=True)
shutil.copy2(root/'traite-vraie-devotion-fr.pdf',target/'traite-vraie-devotion-fr.pdf')
shutil.copy2(root/'index.html',target/'index.html')
subprocess.run([sys.executable,'parcours-marial/build_33_readings.py'],check=True)
for name in ['index.html','parcours-33.js','parcours-33.json']:
    shutil.copy2(target/name,root/name)
(root/'_headers').write_text('/*\n  X-Content-Type-Options: nosniff\n',encoding='utf-8')
print('Preview ready',len(data),'bytes')
