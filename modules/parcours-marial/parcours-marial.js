/* Totus Tuus — parcours marial candidat (sans modifier les données existantes) */
(()=>{'use strict';
const DATA='./modules/parcours-marial/parcours_marial_33_jours_enrichi.json';
const KEY='totus-tuus-parcours-marial-33-v1';
const css=`#tt33-open{position:fixed;right:16px;bottom:20px;z-index:2147482000;background:#604183;color:white;border:0;border-radius:30px;padding:13px 18px;box-shadow:0 3px 16px #0004;font:600 15px system-ui;cursor:pointer}#tt33-dialog{border:0;border-radius:16px;max-width:760px;width:calc(100% - 22px);max-height:90vh;overflow:auto;padding:0;background:#fff;color:#292238;box-shadow:0 12px 55px #0005}#tt33-dialog::backdrop{background:#0009}#tt33-dialog .tt33-pad{padding:20px}#tt33-dialog h2{margin:8px 0;font-size:1.5rem}#tt33-dialog h3{font-size:1.05rem;margin:20px 0 6px}#tt33-dialog p{line-height:1.65}#tt33-dialog .tt33-book{font-family:Georgia,serif;line-height:1.7}#tt33-dialog .tt33-section{border:1px solid #ddd5e4;border-radius:12px;margin:14px 0;overflow:hidden}#tt33-dialog .tt33-section summary{cursor:pointer;background:#f6f2fa;color:#35204d;font-weight:700;padding:14px 12px;line-height:1.4}#tt33-dialog .tt33-section-body{padding:4px 14px 14px}#tt33-dialog .tt33-book-meta{margin:10px 0;color:#60586c}#tt33-dialog .tt33-jump{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0}#tt33-dialog .tt33-jump button{font-size:.9rem}#tt33-dialog .tt33-top{position:sticky;top:0;background:#fff;display:flex;align-items:center;justify-content:space-between;gap:12px;border-bottom:1px solid #ddd;padding:12px 18px}#tt33-dialog button{cursor:pointer;padding:9px 12px;border:1px solid #9a8ab0;border-radius:8px;background:#f7f4fa;color:#35204d}#tt33-dialog button:disabled{opacity:.45;cursor:not-allowed}#tt33-dialog .tt33-nav{display:flex;gap:8px;flex-wrap:wrap;align-items:center;justify-content:space-between}#tt33-dialog a{color:#57348c}#tt33-dialog .tt33-meta{color:#60586c;font-size:.92rem}#tt33-dialog .tt33-check{display:flex;gap:9px;align-items:center;padding:12px 0}#tt33-dialog select{padding:9px;max-width:100%;border-radius:8px} @media(max-width:480px){#tt33-open{bottom:12px;right:12px;font-size:13px}#tt33-dialog .tt33-pad{padding:15px}}`;
const style=document.createElement('style');style.textContent=css;document.head.append(style);
const btn=document.createElement('button');btn.id='tt33-open';btn.type='button';btn.textContent='Parcours marial · 33 jours';document.body.append(btn);

// Couverture de livre animee dans la rubrique Commencer : sans modifier les donnees sauvegardees.
const coverCSS=document.createElement('style');
coverCSS.textContent=`
.tt33-cover{position:relative;display:block;width:min(100%,390px);aspect-ratio:2/3;margin:24px auto;padding:0;border:0;border-radius:12px;overflow:hidden;cursor:pointer;background:#e5d5bd url('./modules/parcours-marial/couverture-33-jours-v2.jpg') center/contain no-repeat;box-shadow:0 12px 30px #18263b38}
.tt33-cover .tt33-cover-scene,.tt33-cover .tt33-cover-kicker,.tt33-cover .tt33-cover-title,.tt33-cover .tt33-cover-subtitle{display:none!important}
.tt33-cover .tt33-cover-copy{position:absolute;inset:0;display:flex;align-items:flex-end;justify-content:center;padding:0 12px 16px}
.tt33-cover .tt33-cover-action{display:inline-block;background:#142944ed;color:white;border:1px solid #fff8;border-radius:30px;padding:10px 20px;font:600 15px system-ui;box-shadow:0 3px 10px #0005}
.tt33-cover:focus-visible{outline:4px solid #aa8cd7;outline-offset:4px}
`;
document.head.append(coverCSS);
function installCover(){
 if(document.querySelector('.tt33-cover'))return;
 const heads=[...document.querySelectorAll('h1,h2,h3,h4')];
 const anchor=heads.find(h=>/la neuvaine guidée/i.test(h.textContent||''))||heads.find(h=>/quelle prière souhaitez-vous faire/i.test(h.textContent||''))||heads.find(h=>/commencer/i.test(h.textContent||''));
 if(!anchor)return;
 const card=document.createElement('button');
 card.type='button';card.className='tt33-cover';card.setAttribute('aria-label','Ouvrir le livre 33 jours avec Marie');
 card.innerHTML='<span class="tt33-cover-scene" aria-hidden="true"></span><span class="tt33-cover-scene" aria-hidden="true"></span><span class="tt33-cover-scene" aria-hidden="true"></span><span class="tt33-cover-copy"><span class="tt33-cover-kicker">Totus Tuus · Parcours marial</span><span class="tt33-cover-title">33 jours avec Marie</span><span class="tt33-cover-subtitle">À Jésus par Marie · Saint Louis-Marie de Montfort</span><span class="tt33-cover-action">Ouvrir le livre ↗</span></span>';
 card.addEventListener('click',()=>btn.click());
 anchor.parentElement?.insertBefore(card,anchor);
 btn.style.display='none';
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',installCover,{once:true});else installCover();
const coverObserver=new MutationObserver(()=>{if(!document.querySelector('.tt33-cover'))installCover();});coverObserver.observe(document.body,{childList:true,subtree:true});
const bookCSS=document.createElement('style');
bookCSS.textContent=`
#tt33-dialog{--tt33-font-size:18px;max-width:780px;background:#f6f0e5}
#tt33-dialog .tt33-pad{padding:16px}
#tt33-dialog .tt33-book-toolbar,#tt33-dialog .tt33-page-nav{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:9px}
#tt33-dialog .tt33-chapters{display:flex;flex-wrap:wrap;gap:7px;margin:12px 0}
#tt33-dialog .tt33-chapters button[aria-pressed="true"]{background:#483263;color:white}
#tt33-dialog .tt33-page{background:#fffdf7;border:1px solid #ded3bb;border-radius:8px;box-shadow:inset 8px 0 15px #947f5012,0 5px 20px #281c2a17;min-height:330px;margin:14px 0;padding:clamp(18px,4vw,38px);display:flex;flex-direction:column;justify-content:space-between}
#tt33-dialog .tt33-page-contents{font:var(--tt33-font-size)/1.72 Georgia,'Times New Roman',serif;overflow-wrap:anywhere}
#tt33-dialog .tt33-page-contents p{font-size:inherit;line-height:inherit}
#tt33-dialog .tt33-invocation{padding:14px 17px;margin:0 0 24px;border:1px solid #e1d5bd;border-radius:10px;background:#faf5e9}
#tt33-dialog .tt33-invocation h3{margin:0 0 12px;color:#493462;font:700 1.05em Georgia,serif}
#tt33-dialog .tt33-invocation p{font-style:italic}
#tt33-dialog .tt33-page-number{font:12px system-ui;text-align:center;color:#7c6c5c;margin-top:25px}
#tt33-dialog .tt33-font-tools{display:flex;gap:5px}
#tt33-dialog .tt33-page-nav button{min-height:44px}
@media(max-width:520px){#tt33-dialog .tt33-page-nav{justify-content:center}#tt33-dialog .tt33-page{min-height:360px}}
`;
bookCSS.textContent+=`
/* Liseuse mobile plein écran : une page à la fois, commandes fixes, sans panneau géant. */
#tt33-dialog{position:fixed;inset:0!important;margin:0!important;width:100vw!important;max-width:none!important;height:100dvh!important;max-height:100dvh!important;border-radius:0!important;overflow:hidden!important;display:none;flex-direction:column;padding:0!important}
#tt33-dialog[open]{display:flex}
#tt33-dialog .tt33-top{flex:0 0 auto;z-index:3;padding:8px 14px;min-height:52px}
#tt33-dialog .tt33-top strong{font-size:.9rem}
#tt33-dialog #tt33-close{padding:8px 12px}
#tt33-dialog .tt33-pad{display:flex;flex-direction:column;flex:1;min-height:0;padding:10px 12px 12px!important;overflow:hidden}
#tt33-dialog .tt33-book-toolbar{flex:0 0 auto;font-size:.8rem;gap:4px}
#tt33-dialog .tt33-book-toolbar select{max-width:72vw;font-size:.8rem;padding:6px}
#tt33-dialog h2{font:700 clamp(1rem,4vw,1.35rem)/1.2 Georgia,serif;margin:6px 0}
#tt33-dialog .tt33-chapters{flex:0 0 auto;flex-wrap:nowrap;gap:4px;margin:5px 0 8px}
#tt33-dialog .tt33-chapters button{flex:1;min-width:0;padding:9px 3px;font-size:clamp(.73rem,3vw,.94rem)}
#tt33-dialog .tt33-page{flex:1;min-height:0!important;margin:0!important;padding:clamp(13px,4vw,28px);overflow:hidden}
#tt33-dialog .tt33-page-contents{flex:1;min-height:0;overflow-y:auto;overscroll-behavior:contain;scrollbar-width:thin}
#tt33-dialog .tt33-page-number{flex:0 0 auto;margin-top:7px}
#tt33-dialog .tt33-page-nav{flex:0 0 auto;display:grid;grid-template-columns:1fr auto 1fr;gap:5px;align-items:center;margin-top:8px}
#tt33-dialog .tt33-page-nav button{font-size:.77rem;min-height:43px;padding:6px 7px}
#tt33-dialog .tt33-font-tools{gap:3px}
#tt33-dialog .tt33-check{flex:0 0 auto;padding:5px 0;font-size:.82rem}
#tt33-dialog .tt33-pad>.tt33-meta{display:none}
#tt33-dialog .tt33-invocation{padding:12px;margin:0;border:0;background:transparent}
#tt33-dialog .tt33-invocation p{margin:10px 0}
@media(max-width:390px){#tt33-dialog .tt33-pad{padding:7px!important}#tt33-dialog .tt33-page-nav button{font-size:.71rem}#tt33-dialog .tt33-top strong{font-size:.8rem}}
`;
bookCSS.textContent+=`
/* Livre continu : les rubriques deviennent des pages, non des onglets. */
#tt33-dialog .tt33-book-heading{flex:0 0 auto;text-align:center;padding:5px 0 8px}
#tt33-dialog .tt33-book-heading>span{font:600 11px system-ui;letter-spacing:.15em;color:#8b754e;text-transform:uppercase}
#tt33-dialog .tt33-book-heading h2{font:600 clamp(.95rem,3.8vw,1.25rem)/1.2 Georgia,serif;margin:5px 0}
#tt33-dialog .tt33-page{background:#fffdf6;touch-action:pan-y;box-shadow:0 3px 16px #4c3e2a20}
#tt33-dialog .tt33-page-contents h3{font:600 1.12em Georgia,serif;color:#243b57;margin:0 0 18px}
#tt33-dialog .tt33-page-contents p{margin:0 0 16px}
#tt33-dialog .tt33-page-contents .tt33-note{font:italic .8em/1.5 Georgia,serif;color:#776d63}
#tt33-dialog .tt33-page-nav{grid-template-columns:minmax(0,1fr) auto minmax(0,1fr)}
#tt33-dialog .tt33-page-nav button{font-size:clamp(.7rem,3vw,.87rem)}
#tt33-dialog .tt33-book-toolbar{align-items:center}
#tt33-dialog .tt33-check{justify-content:center}
`;
document.head.append(bookCSS);
const dlg=document.createElement('dialog');dlg.id='tt33-dialog';dlg.setAttribute('aria-label','Parcours marial de 33 jours');dlg.innerHTML='<div class="tt33-top"><strong>Totus Tuus · Parcours marial</strong><button type="button" id="tt33-close" aria-label="Fermer">Fermer ✕</button></div><div class="tt33-pad" id="tt33-content">Chargement…</div>';document.body.append(dlg);
const root=dlg.querySelector('#tt33-content');
dlg.querySelector('#tt33-close').addEventListener('click',()=>dlg.close());
const safe=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const link=(u,label)=>{try{let p=new URL(u);if(p.protocol==='https:')return '<a target="_blank" rel="noopener noreferrer" href="'+safe(p.href)+'">'+safe(label)+'</a>';}catch(e){}return '';};
let days=[],bookDays=[],index=0,done={},pageIndex=0,chapter='book';
const PLACE=KEY+'-reading-position';
try{const p=JSON.parse(localStorage.getItem(PLACE)||'{}');if(Number.isInteger(p.day)&&p.day>=0&&p.day<33)index=p.day;if(Number.isInteger(p.page)&&p.page>=0)pageIndex=p.page;if(['book','bible','meditation','priere'].includes(p.chapter))chapter=p.chapter;}catch(e){}
function savePlace(){try{localStorage.setItem(PLACE,JSON.stringify({day:index,page:pageIndex,chapter}));}catch(e){}}
function splitPages(book){
 const paragraphs=book?.paragraphes||[],pages=[];let current='',limit=590;
 function flush(){if(current.trim()){pages.push([current.trim()]);current='';}}
 for(const p of paragraphs){
  const text=String(p.texte||'').trim();if(!text)continue;
  const sentences=text.match(/[^.!?…]+(?:[.!?…]+|$)/gu)||[text];
  for(const sentence of sentences){
   const part=sentence.trim();if(!part)continue;
   if(current.length+part.length+1>limit)flush();
   if(part.length>limit){const words=part.split(/\s+/);for(const word of words){if(current.length+word.length+1>limit)flush();current+=(current?' ':'')+word;}continue;}
   current+=(current?' ':'')+part;
  }
  flush();
 }
 flush();return pages.length?pages:[['Texte indisponible.']];
}

try{const x=JSON.parse(localStorage.getItem(KEY)||'{}');if(x&&typeof x==='object'&&!Array.isArray(x))done=x;}catch(e){}
function makeDayPages(d,book){
 const read=d.lecture_biblique||{};
 const invocation='<h3>Invocation au Saint-Esprit</h3><p>Viens, Esprit Saint, remplis mon cœur de ta lumière et de ton amour.</p><p>Ouvre mon intelligence à la Parole de Dieu, dispose mon cœur à accueillir la vérité et guide-moi dans la lecture et la méditation de ce jour.</p><p>Par l’intercession de la Très Sainte Vierge Marie, apprends-moi à écouter Jésus, à comprendre sa volonté et à la mettre en pratique dans ma vie.</p><p>Esprit de sagesse et de sainteté, conduis-moi chaque jour plus près de Jésus-Christ.</p><p><strong>Amen.</strong></p>';
 const bible='<h3>Parole de Dieu</h3><p><strong>'+safe(read.reference||d.reference_biblique)+'</strong></p><p class="tt33-note">Présentation du passage (ce résumé n’est pas le texte biblique intégral).</p><p>'+safe(read.resume_original)+'</p><p class="tt33-note">Pour lire les versets dans une Bible, consultez la référence indiquée. Le lien externe peut être momentanément indisponible.</p>';
 const meditation='<h3>Méditation</h3><p>'+safe(d.explication_spirituelle)+'</p><h3>Pour réfléchir</h3><p>'+safe(d.question_meditation)+'</p>';
 const texts=splitPages(book).map(parts=>({label:'Lecture du Traité',html:parts.map(t=>'<p>'+safe(t)+'</p>').join('')}));
 return [
  {label:'Invocation',html:invocation},
  {label:'Parole de Dieu',html:bible},
  {label:'Méditation',html:meditation},
  ...texts,
  {label:'Prière du jour',html:'<h3>Prière du jour</h3><p>'+safe(d.priere_du_jour)+'</p><h3>Résolution facultative</h3><p>'+safe(d.resolution_facultative)+'</p>'}
 ];
}
function render(){
 const d=days[index];if(!d)return;
 const pages=makeDayPages(d,bookDays[index]);
 // Compatibilité avec les anciennes positions sauvegardées, sans toucher aux journées accomplies.
 if(chapter!=='book'){const targets={bible:1,meditation:2,priere:pages.length-1};pageIndex=targets[chapter]??0;chapter='book';}
 pageIndex=Math.max(0,Math.min(pageIndex,pages.length-1));savePlace();
 const pg=pages[pageIndex],finished=Object.values(done).filter(Boolean).length;
 root.innerHTML='<div class="tt33-book-toolbar"><label for="tt33-day">Chapitre <select id="tt33-day">'+days.map((x,i)=>'<option value="'+i+'" '+(i===index?'selected':'')+'>Jour '+safe(x.jour)+' — '+safe(x.titre)+'</option>').join('')+'</select></label><span class="tt33-meta">'+finished+' / 33</span></div>'+
 '<div class="tt33-book-heading"><span>JOUR '+safe(d.jour)+' · '+safe(pg.label)+'</span><h2>'+safe(d.titre)+'</h2></div>'+
 '<article class="tt33-page" id="tt33-page" aria-label="Page '+(pageIndex+1)+' du jour '+d.jour+'" tabindex="0"><div class="tt33-page-contents">'+pg.html+'</div><div class="tt33-page-number">Jour '+d.jour+' · Page '+(pageIndex+1)+' / '+pages.length+'</div></article>'+
 '<div class="tt33-page-nav"><button id="tt33-back" type="button" '+(index===0&&pageIndex===0?'disabled':'')+' aria-label="Tourner la page précédente">‹ Précédente</button><span class="tt33-font-tools"><button id="tt33-smaller" type="button" aria-label="Réduire les caractères">A−</button><button id="tt33-larger" type="button" aria-label="Agrandir les caractères">A+</button></span><button id="tt33-forward" type="button" '+(index===32&&pageIndex===pages.length-1?'disabled':'')+' aria-label="Tourner la page suivante">Suivante ›</button></div>'+
 '<label class="tt33-check"><input type="checkbox" id="tt33-done" '+(done[d.jour]?'checked':'')+'> Journée accomplie</label>';
 root.querySelector('#tt33-day').onchange=e=>{index=Number(e.target.value);pageIndex=0;chapter='book';render();};
 root.querySelector('#tt33-done').onchange=e=>{done[d.jour]=e.target.checked;try{localStorage.setItem(KEY,JSON.stringify(done));}catch(err){}render();};
 root.querySelector('#tt33-back').onclick=()=>turn(-1);
 root.querySelector('#tt33-forward').onclick=()=>turn(1);
 root.querySelector('#tt33-smaller').onclick=()=>resize(-1);
 root.querySelector('#tt33-larger').onclick=()=>resize(1);
 const sheet=root.querySelector('.tt33-page'),inner=root.querySelector('.tt33-page-contents');
 let startX=0,startY=0;
 sheet.addEventListener('touchstart',e=>{if(e.touches.length!==1)return;startX=e.touches[0].clientX;startY=e.touches[0].clientY;},{passive:true});
 sheet.addEventListener('touchend',e=>{if(e.changedTouches.length!==1)return;const dx=e.changedTouches[0].clientX-startX,dy=e.changedTouches[0].clientY-startY;if(Math.abs(dx)>65&&Math.abs(dx)>Math.abs(dy)*1.4)turn(dx<0?1:-1);},{passive:true});
 sheet.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();turn(e.key==='ArrowRight'?1:-1);}});
 if(inner)inner.scrollTop=0;
}
function turn(dir){
 const pages=makeDayPages(days[index],bookDays[index]);
 if(dir>0){if(pageIndex<pages.length-1)pageIndex++;else if(index<32){index++;pageIndex=0;}else return;}
 else{if(pageIndex>0)pageIndex--;else if(index>0){index--;pageIndex=makeDayPages(days[index],bookDays[index]).length-1;}else return;}
 chapter='book';render();
}
const FONT_KEY=KEY+'-font-size';
let fontSize=Number(localStorage.getItem(FONT_KEY))||18;
function resize(delta){fontSize=Math.max(15,Math.min(28,fontSize+delta));dlg.style.setProperty('--tt33-font-size',fontSize+'px');try{localStorage.setItem(FONT_KEY,String(fontSize));}catch(e){}}
dlg.style.setProperty('--tt33-font-size',fontSize+'px');

let promise;
btn.addEventListener('click',async()=>{if(!dlg.open)dlg.showModal();if(days.length){render();return;}root.textContent='Chargement du parcours…';try{promise ||= Promise.all([fetch(DATA).then(r=>{if(!r.ok)throw Error('HTTP '+r.status);return r.json();}),fetch('./modules/parcours-marial/traite_33_lectures.json').then(r=>{if(!r.ok)throw Error('Livre HTTP '+r.status);return r.json();})]);const [j,b]=await promise;if(!Array.isArray(j.jours)||j.jours.length!==33||!Array.isArray(b.jours)||b.jours.length!==33||b.jours.some(x=>!x.paragraphes?.length))throw Error('Données incomplètes');days=j.jours;bookDays=b.jours;render();}catch(e){promise=null;root.textContent='Impossible de charger le texte authentique du Traité et les 33 journées. Réessayez lorsque la connexion est disponible.';}});
})();
