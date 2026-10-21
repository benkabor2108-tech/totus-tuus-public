/* Totus Tuus — parcours marial candidat (sans modifier les données existantes) */
(()=>{'use strict';
const DATA='./modules/parcours-marial/parcours_marial_33_jours_enrichi.json';
const KEY='totus-tuus-parcours-marial-33-v1';
const css=`#tt33-open{position:fixed;right:16px;bottom:20px;z-index:2147482000;background:#604183;color:white;border:0;border-radius:30px;padding:13px 18px;box-shadow:0 3px 16px #0004;font:600 15px system-ui;cursor:pointer}#tt33-dialog{border:0;border-radius:16px;max-width:760px;width:calc(100% - 22px);max-height:90vh;overflow:auto;padding:0;background:#fff;color:#292238;box-shadow:0 12px 55px #0005}#tt33-dialog::backdrop{background:#0009}#tt33-dialog .tt33-pad{padding:20px}#tt33-dialog h2{margin:8px 0;font-size:1.5rem}#tt33-dialog h3{font-size:1.05rem;margin:20px 0 6px}#tt33-dialog p{line-height:1.65}#tt33-dialog .tt33-top{position:sticky;top:0;background:#fff;display:flex;align-items:center;justify-content:space-between;gap:12px;border-bottom:1px solid #ddd;padding:12px 18px}#tt33-dialog button{cursor:pointer;padding:9px 12px;border:1px solid #9a8ab0;border-radius:8px;background:#f7f4fa;color:#35204d}#tt33-dialog button:disabled{opacity:.45;cursor:not-allowed}#tt33-dialog .tt33-nav{display:flex;gap:8px;flex-wrap:wrap;align-items:center;justify-content:space-between}#tt33-dialog a{color:#57348c}#tt33-dialog .tt33-meta{color:#60586c;font-size:.92rem}#tt33-dialog .tt33-check{display:flex;gap:9px;align-items:center;padding:12px 0}#tt33-dialog select{padding:9px;max-width:100%;border-radius:8px} @media(max-width:480px){#tt33-open{bottom:12px;right:12px;font-size:13px}#tt33-dialog .tt33-pad{padding:15px}}`;
const style=document.createElement('style');style.textContent=css;document.head.append(style);
const btn=document.createElement('button');btn.id='tt33-open';btn.type='button';btn.textContent='Parcours marial · 33 jours';document.body.append(btn);
const dlg=document.createElement('dialog');dlg.id='tt33-dialog';dlg.setAttribute('aria-label','Parcours marial de 33 jours');dlg.innerHTML='<div class="tt33-top"><strong>Totus Tuus · Parcours marial</strong><button type="button" id="tt33-close" aria-label="Fermer">Fermer ✕</button></div><div class="tt33-pad" id="tt33-content">Chargement…</div>';document.body.append(dlg);
const root=dlg.querySelector('#tt33-content');
dlg.querySelector('#tt33-close').addEventListener('click',()=>dlg.close());
const safe=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const link=(u,label)=>{try{let p=new URL(u);if(p.protocol==='https:')return '<a target="_blank" rel="noopener noreferrer" href="'+safe(p.href)+'">'+safe(label)+'</a>';}catch(e){}return '';};
let days=[],index=0,done={};
try{const x=JSON.parse(localStorage.getItem(KEY)||'{}');if(x&&typeof x==='object'&&!Array.isArray(x))done=x;}catch(e){}
function render(){const d=days[index];if(!d)return;
const read=d.lecture_biblique||{},page=d.pages_imprimees||{};
root.innerHTML='<div class="tt33-nav"><label for="tt33-day">Jour <select id="tt33-day">'+days.map((x,i)=>'<option value="'+i+'" '+(i===index?'selected':'')+'>'+safe(x.jour)+' — '+safe(x.titre)+'</option>').join('')+'</select></label><span class="tt33-meta">'+Object.values(done).filter(Boolean).length+' / 33 accomplis</span></div>'+
'<h2>Jour '+safe(d.jour)+' — '+safe(d.titre)+'</h2><p class="tt33-meta">'+safe(d.phase)+' · Traité, pages indicatives '+safe(page.debut)+'–'+safe(page.fin)+'</p>'+
'<h3>Parole de Dieu</h3><p><strong>'+safe(read.reference||d.reference_biblique)+'</strong></p><p>'+safe(read.resume_original)+'</p><p>'+link(read.url_lecture,'Lire le passage biblique')+'</p>'+
'<h3>Lecture du Traité</h3><p>'+link(d.source_texte_integral,'Ouvrir le Traité de la vraie dévotion')+'</p>'+
'<h3>Méditation</h3><p>'+safe(d.explication_spirituelle)+'</p><h3>Question pour méditer</h3><p>'+safe(d.question_meditation)+'</p>'+
'<h3>Prière du jour</h3><p>'+safe(d.priere_du_jour)+'</p><h3>Résolution facultative</h3><p>'+safe(d.resolution_facultative)+'</p>'+
'<label class="tt33-check"><input type="checkbox" id="tt33-done" '+(done[d.jour]?'checked':'')+'> Marquer ce jour comme accompli</label>'+
'<div class="tt33-nav"><button id="tt33-prev" '+(index===0?'disabled':'')+'>← Précédent</button><button id="tt33-next" '+(index===days.length-1?'disabled':'')+'>Suivant →</button></div>'+
'<p class="tt33-meta">Parcours éditorial original inspiré du Traité, distinct d’une préparation officielle de consécration. Références bibliques et pages à vérifier avant publication.</p>';
root.querySelector('#tt33-day').onchange=e=>{index=Number(e.target.value);render();};
root.querySelector('#tt33-done').onchange=e=>{done[d.jour]=e.target.checked;try{localStorage.setItem(KEY,JSON.stringify(done));}catch(err){}render();};
root.querySelector('#tt33-prev').onclick=()=>{index--;render();};
root.querySelector('#tt33-next').onclick=()=>{index++;render();};
root.scrollTop=0;dlg.scrollTop=0;
}
let promise;
btn.addEventListener('click',async()=>{if(!dlg.open)dlg.showModal();if(days.length){render();return;}root.textContent='Chargement du parcours…';try{promise ||= fetch(DATA).then(r=>{if(!r.ok)throw Error('HTTP '+r.status);return r.json();});const j=await promise;if(!Array.isArray(j.jours)||j.jours.length!==33)throw Error('Données incomplètes');days=j.jours;render();}catch(e){promise=null;root.textContent='Impossible de charger les 33 journées. Réessayez lorsque la connexion est disponible.';}});
})();
