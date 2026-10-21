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
.tt33-cover{position:relative;isolation:isolate;display:block;width:min(100%,520px);min-height:330px;margin:24px auto;padding:0;border:0;border-radius:20px;overflow:hidden;cursor:pointer;background:#142944;color:#fff;box-shadow:0 18px 38px #10182d42;text-align:center;transform:translateZ(0)}
.tt33-cover .tt33-cover-scene{position:absolute;inset:0;background-size:cover;background-position:center;opacity:0;transform:scale(1.06);animation:tt33-cover-fade 18s ease-in-out infinite}
.tt33-cover .tt33-cover-scene:nth-child(1){background-image:linear-gradient(#09152c22,#07142e66),url('./modules/parcours-marial/couverture-33-jours.png'),linear-gradient(#07152c,#29446b);animation-delay:0s}
.tt33-cover .tt33-cover-scene:nth-child(2){background-image:linear-gradient(#09152c44,#07142e88),url('./modules/parcours-marial/couverture-33-jours.png'),linear-gradient(#07152c,#29446b);background-size:cover;animation-delay:6s}
.tt33-cover .tt33-cover-scene:nth-child(3){background-image:linear-gradient(#09152c22,#07142e66),url('./modules/parcours-marial/couverture-33-jours.png'),linear-gradient(#07152c,#29446b);background-position:70% center;animation-delay:12s}
.tt33-cover::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,#06132722 0%,#07132922 35%,#071329df 100%);z-index:1}
.tt33-cover .tt33-cover-copy{position:relative;z-index:2;display:flex;min-height:330px;flex-direction:column;justify-content:flex-end;align-items:center;gap:9px;padding:26px 18px 30px;text-shadow:0 2px 8px #0009}
.tt33-cover .tt33-cover-kicker{font:600 .78rem system-ui;letter-spacing:.16em;text-transform:uppercase}
.tt33-cover .tt33-cover-title{font:700 clamp(2rem,6vw,2.9rem) Georgia,serif;line-height:1.12}
.tt33-cover .tt33-cover-subtitle{font:400 1rem Georgia,serif}
.tt33-cover .tt33-cover-action{margin-top:8px;padding:9px 18px;border:1px solid #fffc;border-radius:99px;background:#ffffff25;font:600 .95rem system-ui}
.tt33-cover:focus-visible{outline:4px solid #aa8cd7;outline-offset:4px}
@keyframes tt33-cover-fade{0%{opacity:0;transform:scale(1.06)}8%,29%{opacity:1}37%,100%{opacity:0;transform:scale(1.0)}}
@media(prefers-reduced-motion:reduce){.tt33-cover .tt33-cover-scene{animation:none;opacity:0;transform:none}.tt33-cover .tt33-cover-scene:first-child{opacity:1}}
@media(max-width:480px){.tt33-cover,.tt33-cover .tt33-cover-copy{min-height:300px}}
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
function splitPages(book){const paras=book?.paragraphes||[];const pages=[];let current=[],size=0;for(const p of paras){const t=String(p.texte||'');if(current.length&&size+t.length>1150){pages.push(current);current=[];size=0;}current.push(t);size+=t.length;}if(current.length)pages.push(current);return pages.length?pages:[['Texte indisponible.']];}

try{const x=JSON.parse(localStorage.getItem(KEY)||'{}');if(x&&typeof x==='object'&&!Array.isArray(x))done=x;}catch(e){}
function render(){const d=days[index];if(!d)return;
const read=d.lecture_biblique||{},book=bookDays[index],pages=splitPages(book);
pageIndex=Math.max(0,Math.min(pageIndex,pages.length-1));savePlace();
const invocation='<section class="tt33-invocation" aria-label="Invocation au Saint-Esprit"><h3>Invocation au Saint-Esprit</h3><p>Viens, Esprit Saint, remplis mon cœur de ta lumière et de ton amour.</p><p>Ouvre mon intelligence à la Parole de Dieu, dispose mon cœur à accueillir la vérité et guide-moi dans la lecture et la méditation de ce jour.</p><p>Par l’intercession de la Très Sainte Vierge Marie, apprends-moi à écouter Jésus, à comprendre sa volonté et à la mettre en pratique dans ma vie.</p><p>Esprit de sagesse et de sainteté, conduis-moi chaque jour plus près de Jésus-Christ.</p><p><strong>Amen.</strong></p></section>';
const content={
book:'<p class="tt33-book-meta">Lecture du Traité · transcription de l’édition Gaume frères (1859). Découpage en 33 jours à caractère éditorial.</p>'+pages[pageIndex].map(t=>'<p class="tt33-book">'+safe(t)+'</p>').join('')+'<p class="tt33-book-meta">'+link(d.source_texte_integral,'Consulter le texte source')+'</p>',
bible:'<h3>Parole de Dieu</h3><p><strong>'+safe(read.reference||d.reference_biblique)+'</strong></p><p>'+safe(read.resume_original)+'</p><p>'+link(read.url_lecture,'Lire le passage biblique')+'</p>',
meditation:'<h3>Méditation</h3><p>'+safe(d.explication_spirituelle)+'</p><h3>Question pour méditer</h3><p>'+safe(d.question_meditation)+'</p>',
priere:'<h3>Prière du jour</h3><p>'+safe(d.priere_du_jour)+'</p><h3>Résolution facultative</h3><p>'+safe(d.resolution_facultative)+'</p>'
};
root.innerHTML='<div class="tt33-book-toolbar"><label for="tt33-day">Jour <select id="tt33-day">'+days.map((x,i)=>'<option value="'+i+'" '+(i===index?'selected':'')+'>'+safe(x.jour)+' — '+safe(x.titre)+'</option>').join('')+'</select></label><span class="tt33-meta">'+Object.values(done).filter(Boolean).length+' / 33 accomplis</span></div>'+
'<h2>Jour '+safe(d.jour)+' — '+safe(d.titre)+'</h2>'+
'<nav class="tt33-chapters" aria-label="Rubriques du jour">'+[['book','Livre'],['bible','Bible'],['meditation','Méditation'],['priere','Prière']].map(([id,label])=>'<button type="button" data-chapter="'+id+'" aria-pressed="'+(chapter===id)+'">'+label+'</button>').join('')+'</nav>'+
'<article class="tt33-page" id="tt33-page" aria-label="Page du livre"><div class="tt33-page-contents">'+(chapter==='book'&&pageIndex===0?invocation:'')+content[chapter]+'</div><div class="tt33-page-number">'+(chapter==='book'?'Page '+(pageIndex+1)+' / '+pages.length:'Jour '+d.jour)+'</div></article>'+
'<div class="tt33-page-nav"><button id="tt33-back" type="button" '+(chapter==='book'&&index===0&&pageIndex===0?'disabled':'')+'>← Page précédente</button><span class="tt33-font-tools"><button id="tt33-smaller" type="button" aria-label="Réduire les caractères">A−</button><button id="tt33-larger" type="button" aria-label="Agrandir les caractères">A+</button></span><button id="tt33-forward" type="button">Page suivante →</button></div>'+
'<label class="tt33-check"><input type="checkbox" id="tt33-done" '+(done[d.jour]?'checked':'')+'> Marquer ce jour comme accompli</label>'+
'<p class="tt33-meta">Parcours spirituel original inspiré du Traité ; ce découpage ne constitue pas une édition officielle de préparation à la consécration.</p>';
root.querySelector('#tt33-day').onchange=e=>{index=Number(e.target.value);pageIndex=0;chapter='book';render();};
root.querySelectorAll('[data-chapter]').forEach(b=>b.onclick=()=>{chapter=b.dataset.chapter;render();});
root.querySelector('#tt33-done').onchange=e=>{done[d.jour]=e.target.checked;try{localStorage.setItem(KEY,JSON.stringify(done));}catch(err){}render();};
root.querySelector('#tt33-back').onclick=()=>{if(chapter!=='book'){chapter='book';render();return;}if(pageIndex>0)pageIndex--;else if(index>0){index--;pageIndex=splitPages(bookDays[index]).length-1;}render();};
root.querySelector('#tt33-forward').onclick=()=>{if(chapter!=='book'){chapter='book';render();return;}if(pageIndex<pages.length-1)pageIndex++;else if(index<32){index++;pageIndex=0;}else{done[d.jour]=true;try{localStorage.setItem(KEY,JSON.stringify(done));}catch(e){}}render();};
root.querySelector('#tt33-smaller').onclick=()=>resize(-1);
root.querySelector('#tt33-larger').onclick=()=>resize(1);
dlg.scrollTop=0;
}
const FONT_KEY=KEY+'-font-size';
let fontSize=Number(localStorage.getItem(FONT_KEY))||18;
function resize(delta){fontSize=Math.max(15,Math.min(28,fontSize+delta));dlg.style.setProperty('--tt33-font-size',fontSize+'px');try{localStorage.setItem(FONT_KEY,String(fontSize));}catch(e){}}
dlg.style.setProperty('--tt33-font-size',fontSize+'px');

let promise;
btn.addEventListener('click',async()=>{if(!dlg.open)dlg.showModal();if(days.length){render();return;}root.textContent='Chargement du parcours…';try{promise ||= Promise.all([fetch(DATA).then(r=>{if(!r.ok)throw Error('HTTP '+r.status);return r.json();}),fetch('./modules/parcours-marial/traite_33_lectures.json').then(r=>{if(!r.ok)throw Error('Livre HTTP '+r.status);return r.json();})]);const [j,b]=await promise;if(!Array.isArray(j.jours)||j.jours.length!==33||!Array.isArray(b.jours)||b.jours.length!==33||b.jours.some(x=>!x.paragraphes?.length))throw Error('Données incomplètes');days=j.jours;bookDays=b.jours;render();}catch(e){promise=null;root.textContent='Impossible de charger le texte authentique du Traité et les 33 journées. Réessayez lorsque la connexion est disponible.';}});
})();
