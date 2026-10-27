/* Totus Tuus — parcours marial candidat (sans modifier les données existantes) */
(()=>{'use strict';
const DATA='./modules/parcours-marial/parcours_marial_33_jours_enrichi.json';
// V2 démarre volontairement à 0/33 : les coches V1 provenaient exclusivement des essais confirmés par l'utilisateur.
// Les progrès réels enregistrés désormais sous V2 ne seront jamais réinitialisés automatiquement.
const KEY='totus-tuus-parcours-marial-33-v2';
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
 card.type='button';card.className='tt33-cover';card.setAttribute('aria-label','Ouvrir les 33 jours avec Marie');
 card.innerHTML='<span class="tt33-cover-scene" aria-hidden="true"></span><span class="tt33-cover-scene" aria-hidden="true"></span><span class="tt33-cover-scene" aria-hidden="true"></span><span class="tt33-cover-copy"><span class="tt33-cover-kicker">Totus Tuus · Parcours marial</span><span class="tt33-cover-title">33 jours avec Marie</span><span class="tt33-cover-subtitle">À Jésus par Marie · Saint Louis-Marie de Montfort</span><span class="tt33-cover-action">Commencer les 33 jours ›</span></span>';
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
#tt33-dialog .tt33-page-contents{font-family:Georgia,'Times New Roman',serif;line-height:1.52;letter-spacing:.005em;hyphens:none;overflow-wrap:normal;word-break:normal}
#tt33-dialog .tt33-page-contents p{line-height:1.52;margin-bottom:.65em}
#tt33-dialog .tt33-page-contents h3{font-size:1.06em;line-height:1.25;margin-bottom:.7em}
#tt33-dialog .tt33-book-heading{padding:2px 0 5px}
#tt33-dialog .tt33-book-heading h2{font-size:clamp(.88rem,3.5vw,1.1rem);margin:3px 0}
#tt33-dialog .tt33-page{padding:clamp(14px,4vw,24px);border-left-width:4px}
#tt33-dialog .tt33-page-number{font-size:11px;margin-top:6px}
#tt33-dialog .tt33-top{min-height:44px;padding:6px 12px}
#tt33-dialog .tt33-pad{padding:7px 10px 8px!important}
#tt33-dialog .tt33-check{padding:3px 0}
#tt33-dialog .tt33-page-nav{margin-top:6px}

#tt33-dialog .tt33-reset{font-size:.71rem;padding:5px 9px;align-self:center;opacity:.8}

#tt33-dialog .tt33-verse{line-height:1.65}#tt33-dialog .tt33-verse sup{color:#806333;font-size:.65em;margin-right:.2em}

#tt33-dialog .tt33-top{background:#fbf7ef;border-bottom:1px solid #e7dcc8}
#tt33-dialog .tt33-pad{background:#f4ecdc}
#tt33-dialog .tt33-book-toolbar select{background:transparent;border:1px solid #d2c5ae;color:#263c58}
#tt33-dialog .tt33-page{border-radius:3px 12px 12px 3px;border-left:7px solid #d5c6a9;transition:box-shadow .15s ease}
#tt33-dialog .tt33-page:focus-visible{outline:3px solid #5c4384;outline-offset:2px}
#tt33-dialog .tt33-page-number{letter-spacing:.08em}
#tt33-dialog .tt33-page-nav button{background:#fbf7ef;border-color:#c9baa8;color:#243b57}
#tt33-dialog .tt33-page-nav button:focus-visible{outline:3px solid #5c4384}

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
bookCSS.textContent+=`
/* Mise en page de lecture : caractères mesurés, marges souples, plus de texte coupé. */
#tt33-dialog .tt33-page-contents{font-size:var(--tt33-font-size);line-height:1.48;letter-spacing:0;overflow-y:auto}
#tt33-dialog .tt33-page-contents p{font-size:inherit;line-height:1.48;margin:0 0 .62em}
#tt33-dialog .tt33-page-contents h3{font-size:1.04em;line-height:1.3;margin:0 0 .75em}
#tt33-dialog .tt33-page{padding:clamp(12px,3.5vw,23px)}
#tt33-dialog .tt33-book-heading{padding:2px 0 5px}
#tt33-dialog .tt33-book-heading h2{font-size:clamp(.9rem,3.6vw,1.12rem);margin:3px 0}
#tt33-dialog .tt33-top{min-height:44px;padding:6px 10px}
#tt33-dialog .tt33-top strong{font-size:.84rem}
#tt33-dialog .tt33-pad{padding:7px 10px 9px!important}
#tt33-dialog .tt33-book-toolbar{font-size:.75rem}
#tt33-dialog .tt33-page-number{font-size:11px;margin-top:5px}
#tt33-dialog .tt33-check{font-size:.78rem;padding:3px 0}
#tt33-dialog .tt33-reset{font-size:.67rem;padding:4px 8px}
@media(max-width:420px){#tt33-dialog .tt33-page-nav button{min-height:42px}#tt33-dialog .tt33-page{border-left-width:4px}}
`;
bookCSS.textContent+=`
/* V5.11.2 : lecture naturelle sans césure automatique, pages de prière raccourcies. */
#tt33-dialog .tt33-page-contents{font-size:var(--tt33-font-size);line-height:1.48;hyphens:none!important;overflow-wrap:normal!important;word-break:normal!important}
#tt33-dialog .tt33-page-contents p{line-height:1.48;hyphens:none!important;overflow-wrap:normal!important;word-break:normal!important}
#tt33-dialog .tt33-page-contents h3{font-size:1.03em;margin-bottom:.7em}
#tt33-dialog .tt33-page{padding:clamp(12px,3.5vw,20px)}
#tt33-dialog .tt33-page-contents{scrollbar-width:none}
#tt33-dialog .tt33-page-contents::-webkit-scrollbar{display:none}
`;
bookCSS.textContent+=`
/* V5.11.7 : invocation entière, titre et Amen visibles avec adaptation mobile.
   La lecture reste défilable lorsque l'utilisateur agrandit la police. */
#tt33-dialog .tt33-page-contents.tt33-prayer-page{font-size:var(--tt33-font-size);line-height:1.35;scrollbar-width:thin}
#tt33-dialog .tt33-prayer-page h3{font-size:1.08em;line-height:1.2;margin:0 0 .55em}
#tt33-dialog .tt33-prayer-page p{line-height:1.35;margin:0 0 .55em}
#tt33-dialog .tt33-prayer-page p:last-child{margin-bottom:0}
#tt33-dialog .tt33-prayer-page::-webkit-scrollbar{display:block;width:4px}
#tt33-dialog .tt33-prayer-page::-webkit-scrollbar-thumb{background:#c3b59d;border-radius:5px}
`;
bookCSS.textContent+=`
/* V5.11.9 : indiquer le défilement sur petit écran sans masquer le texte. */
#tt33-dialog .tt33-scroll-cue{display:none;flex:0 0 auto;text-align:center;font:600 .75rem/1.3 system-ui,sans-serif;color:#59472e;background:#f7edd8;border-radius:7px;padding:5px 8px;margin:5px 0}
#tt33-dialog .tt33-scroll-cue.is-visible{display:block}
#tt33-dialog .tt33-prayer-page{scrollbar-width:thin!important;overscroll-behavior:contain}
#tt33-dialog .tt33-prayer-page::-webkit-scrollbar{display:block!important;width:5px}
`;
bookCSS.textContent+=`
/* V5.11.9 : invocation lue dans le défilement naturel du livre,
   sans fenêtre de texte intérieure ni lignes dissimulées. */
#tt33-dialog .tt33-pad.tt33-natural-prayer{overflow-y:auto!important;overscroll-behavior:contain;scrollbar-width:thin}
#tt33-dialog .tt33-natural-prayer .tt33-page{flex:0 0 auto!important;min-height:0!important;height:auto!important;overflow:visible!important}
#tt33-dialog .tt33-natural-prayer .tt33-prayer-page{flex:0 0 auto!important;min-height:0!important;height:auto!important;max-height:none!important;overflow:visible!important}
#tt33-dialog .tt33-natural-prayer .tt33-scroll-cue{display:none!important}
#tt33-dialog .tt33-natural-prayer .tt33-page-nav,
#tt33-dialog .tt33-natural-prayer .tt33-check,
#tt33-dialog .tt33-natural-prayer .tt33-reset{flex-shrink:0}
`;
bookCSS.textContent+=`
/* V5.11.8 : commandes tactiles séparées et accessibles. */
#tt33-dialog .tt33-check{display:flex;align-items:center;justify-content:center;gap:12px;min-height:56px;width:100%;box-sizing:border-box;padding:12px 14px!important;margin:12px 0 0!important;border:2px solid #a99a80;border-radius:12px;background:#fffdf6;font:600 1rem/1.35 system-ui,sans-serif;cursor:pointer;touch-action:manipulation}
#tt33-dialog .tt33-check input{width:25px;height:25px;min-width:25px;min-height:25px;margin:0;accent-color:#2d587d;cursor:pointer}
#tt33-dialog .tt33-check:focus-within{outline:3px solid #5c4384;outline-offset:2px}
#tt33-dialog .tt33-reset{display:block;min-height:48px;max-width:100%;align-self:center;margin:26px auto 8px!important;padding:12px 18px!important;font:500 .85rem/1.3 system-ui,sans-serif!important;opacity:1;touch-action:manipulation;border:1px solid #a99a80;border-radius:10px;background:#f6f1e9}
`;
bookCSS.textContent+=`
#tt33-dialog .tt33-book-notice:empty{display:none}
#tt33-dialog .tt33-book-notice:not(:empty){font:600 .78rem/1.35 system-ui;color:#2e5738;background:#eaf3e7;border-radius:7px;padding:6px 9px;margin:3px 0}
`;
bookCSS.textContent+=`
#tt33-dialog .tt33-guidance{font:500 .72rem/1.3 system-ui;color:#6b604c;text-align:center;margin:0 0 5px}
#tt33-dialog .tt33-page-contents p{margin-bottom:.75em}
`;
bookCSS.textContent+=`
/* V5.12.0 : présentation en journées défilantes, comme une neuvaine guidée. */
#tt33-dialog{background:#f8f5fc}
#tt33-dialog .tt33-novena-view{overflow:hidden!important;gap:0}
#tt33-dialog .tt33-day-heading{flex:0 0 auto;text-align:center;padding:10px 4px 12px}
#tt33-dialog .tt33-day-heading span{font:700 .75rem system-ui;color:#79578d;letter-spacing:.12em}
#tt33-dialog .tt33-day-heading h2{font:700 clamp(1.1rem,4vw,1.45rem)/1.3 Georgia,serif;color:#35204d;margin:6px 0}
#tt33-dialog .tt33-day-scroll{flex:1;min-height:0;overflow-y:auto;overscroll-behavior:contain;padding:4px 3px 14px;scrollbar-width:thin}
#tt33-dialog .tt33-day-section{background:#fff;border:1px solid #e1d7e9;border-radius:14px;margin:0 0 14px;padding:16px 17px;box-shadow:0 2px 8px #3020400d}
#tt33-dialog .tt33-day-section h3{font:700 1.03rem/1.4 system-ui,sans-serif;color:#493462;margin:0 0 13px;padding-bottom:9px;border-bottom:1px solid #eee5f3}
#tt33-dialog .tt33-day-text{font:var(--tt33-font-size)/1.62 Georgia,'Times New Roman',serif;color:#292238;overflow-wrap:normal;word-break:normal;hyphens:none}
#tt33-dialog .tt33-day-text h3{font:700 1em/1.45 Georgia,serif;margin:14px 0 8px;border:0;padding:0}
#tt33-dialog .tt33-day-text p{font:inherit;margin:0 0 .85em}
#tt33-dialog .tt33-day-text p:last-child{margin-bottom:0}
#tt33-dialog .tt33-day-text .tt33-verse{margin:0 0 .7em}
#tt33-dialog .tt33-day-actions{flex:0 0 auto;background:#f8f5fc;border-top:1px solid #e1d7e9;padding:8px 2px 2px}
#tt33-dialog .tt33-novena-view .tt33-page-nav{margin:0;display:grid;grid-template-columns:1fr auto 1fr;gap:6px}
#tt33-dialog .tt33-novena-view .tt33-page-nav button{min-height:44px;font-size:.8rem;padding:8px 6px}
#tt33-dialog .tt33-novena-view .tt33-check{margin:10px 0 0!important;min-height:54px;padding:10px!important}
#tt33-dialog .tt33-novena-view .tt33-reset{margin:18px auto 4px!important;min-height:44px;padding:8px 15px!important}
@media(max-height:680px){#tt33-dialog .tt33-novena-view .tt33-day-heading{padding:5px 2px}#tt33-dialog .tt33-novena-view .tt33-reset{margin-top:12px!important}}
`;
bookCSS.textContent+=`
/* V5.12.1 : priorité à la surface de lecture sur les téléphones. */
#tt33-dialog .tt33-novena-view .tt33-book-toolbar{padding:2px 0 0;gap:3px}
#tt33-dialog .tt33-novena-view .tt33-book-toolbar label{font-size:.77rem}
#tt33-dialog .tt33-novena-view .tt33-book-toolbar select{padding:6px 8px;min-height:38px}
#tt33-dialog .tt33-novena-view .tt33-guidance{font-size:.68rem;line-height:1.2;margin:2px 0 3px}
#tt33-dialog .tt33-novena-view .tt33-day-heading{padding:4px 2px 5px}
#tt33-dialog .tt33-novena-view .tt33-day-heading h2{font-size:clamp(1rem,3.7vw,1.25rem);margin:2px 0}
#tt33-dialog .tt33-novena-view .tt33-day-scroll{padding:2px 2px 8px}
#tt33-dialog .tt33-novena-view .tt33-day-section{padding:12px 13px;margin-bottom:10px}
#tt33-dialog .tt33-novena-view .tt33-day-actions{padding:5px 2px 0}
#tt33-dialog .tt33-novena-view .tt33-page-nav button{min-height:42px}
#tt33-dialog .tt33-novena-view .tt33-check{min-height:52px;margin:6px 0 0!important;padding:7px 10px!important}
#tt33-dialog .tt33-reset-options{text-align:center;margin:6px 0 0;font:500 .76rem/1.3 system-ui,sans-serif}
#tt33-dialog .tt33-reset-options summary{display:inline-block;cursor:pointer;color:#655776;text-decoration:underline;text-underline-offset:3px;padding:6px 12px;min-height:26px;box-sizing:border-box}
#tt33-dialog .tt33-reset-options[open]{padding:4px 0 8px;border-top:1px solid #e1d7e9}
#tt33-dialog .tt33-novena-view .tt33-reset-options .tt33-reset{margin:10px auto 3px!important;min-height:48px}
#tt33-dialog .tt33-reset-options summary:focus-visible{outline:3px solid #5c4384;outline-offset:2px}
`;
bookCSS.textContent+=`
/* V5.12.2 : feuilles de lecture continues, lisibles et sans contenu rogné. */
#tt33-dialog .tt33-novena-view{min-height:0;box-sizing:border-box}
#tt33-dialog .tt33-novena-view .tt33-day-scroll{min-height:0;flex:1 1 auto;overflow-y:auto!important;overflow-x:hidden;scroll-padding-top:12px;scroll-padding-bottom:24px;-webkit-overflow-scrolling:touch;touch-action:pan-y;overscroll-behavior-y:contain}
#tt33-dialog .tt33-novena-view .tt33-day-section{box-sizing:border-box;max-width:740px;margin:0 auto 12px;padding:clamp(14px,3.8vw,24px);overflow:visible}
#tt33-dialog .tt33-novena-view .tt33-day-section>h3{line-height:1.38;overflow-wrap:break-word}
#tt33-dialog .tt33-novena-view .tt33-day-text{font-size:var(--tt33-font-size);line-height:1.6;letter-spacing:0;white-space:normal;overflow:visible;hyphens:none!important;word-break:normal!important}
#tt33-dialog .tt33-novena-view .tt33-day-text p{line-height:1.6;margin:0 0 .82em;orphans:2;widows:2}
#tt33-dialog .tt33-novena-view .tt33-day-text h3{line-height:1.35;margin:1.05em 0 .5em}
#tt33-dialog .tt33-novena-view .tt33-day-text h3:first-child{margin-top:0}
#tt33-dialog .tt33-novena-view .tt33-day-text .tt33-verse{line-height:1.65}
#tt33-dialog .tt33-novena-view .tt33-day-actions{position:relative;z-index:2;flex-shrink:0;padding-bottom:max(4px,env(safe-area-inset-bottom))}
#tt33-dialog .tt33-novena-view .tt33-check{box-sizing:border-box;min-height:52px;flex-shrink:0}
#tt33-dialog .tt33-novena-view .tt33-reset-options{margin-top:6px}
#tt33-dialog .tt33-novena-view .tt33-reset-options summary{min-height:38px;padding:10px 16px}
@media(max-width:380px){
 #tt33-dialog .tt33-novena-view .tt33-day-section{padding:13px 12px}
 #tt33-dialog .tt33-novena-view .tt33-day-heading{padding:3px 2px 4px}
 #tt33-dialog .tt33-novena-view .tt33-page-nav{gap:3px}
 #tt33-dialog .tt33-novena-view .tt33-page-nav button{padding:6px 3px;font-size:.72rem}
}
`;
document.head.append(bookCSS);
const dlg=document.createElement('dialog');dlg.id='tt33-dialog';dlg.setAttribute('aria-label','Parcours marial de 33 jours');dlg.innerHTML='<div class="tt33-top"><strong>Totus Tuus · 33 jours avec Marie</strong><button type="button" id="tt33-close" aria-label="Fermer">Fermer ✕</button></div><div class="tt33-pad" id="tt33-content">Chargement…</div>';document.body.append(dlg);
const root=dlg.querySelector('#tt33-content');
dlg.querySelector('#tt33-close').addEventListener('click',()=>dlg.close());
const safe=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const link=(u,label)=>{try{let p=new URL(u);if(p.protocol==='https:')return '<a target="_blank" rel="noopener noreferrer" href="'+safe(p.href)+'">'+safe(label)+'</a>';}catch(e){}return '';};
let days=[],bookDays=[],bibleDays={},index=0,done={},pageIndex=0,chapter='book';
const PLACE=KEY+'-reading-position';
// La dernière page feuilletée ne doit jamais déterminer la journée de démarrage.
// On conserve uniquement les journées réellement validées (KEY), pas l'ancienne position.
function savePlace(){/* Position volontairement limitée à la session de lecture. */}
function openAtCurrentDay(){
 // Une nouvelle ouverture par la couverture commence toujours par l'invocation
 // du premier jour non accompli. La lecture passée reste consultable au sélecteur.
 const next=Array.from({length:33},(_,i)=>i).find(i=>done[i+1]!==true);
 index=next===undefined?32:next;
 pageIndex=0;chapter='book';
 savePlace();
}

function splitPages(book){
 // Les pages sont des unités de lecture, pas des tranches arbitraires de 440 caractères.
 // Garder les phrases entières et regrouper les paragraphes courts.
 const paragraphs=(book?.paragraphes||[]).map(p=>String(p.texte||'').trim()).filter(Boolean);
 const chunks=[];
 for(const paragraph of paragraphs){
  if(paragraph.length<=880){chunks.push(paragraph);continue;}
  const sentences=paragraph.match(/[^.!?…]+(?:[.!?…]+|$)/gu)||[paragraph];
  const segments=[];let current='';
  for(const raw of sentences){
   const sentence=raw.trim();if(!sentence)continue;
   if(current&&current.length+sentence.length+1>880){segments.push(current);current='';}
   if(sentence.length>880){
    const words=sentence.split(/\\s+/);
    for(const word of words){
     if(current&&current.length+word.length+1>880){segments.push(current);current='';}
     current+=(current?' ':'')+word;
    }
   }else current+=(current?' ':'')+sentence;
  }
  if(current)segments.push(current);
  // Éviter une dernière page ne contenant que quelques mots.
  if(segments.length>1&&segments.at(-1).length<260){
   const last=segments.pop(),previous=segments.pop();
   const words=(previous+' '+last).split(/\\s+/);
   const middle=Math.floor(words.length/2);
   segments.push(words.slice(0,middle).join(' '),words.slice(middle).join(' '));
  }
  chunks.push(...segments);
 }
 const pages=[];let group=[],size=0;
 for(const chunk of chunks){
  if(group.length&&size+chunk.length>900){pages.push(group);group=[];size=0;}
  group.push(chunk);size+=chunk.length;
 }
 if(group.length)pages.push(group);
 // Rééquilibrer une dernière page trop courte lorsque la précédente peut céder un paragraphe entier.
 if(pages.length>1){
  const last=pages.at(-1),prev=pages.at(-2);
  const lastSize=last.join(' ').length,prevSize=prev.join(' ').length;
  if(lastSize<250&&prev.length>1){
   const moved=prev.at(-1);
   if(Math.abs((prevSize-moved.length)-(lastSize+moved.length))<Math.abs(prevSize-lastSize)){
    prev.pop();last.unshift(moved);
   }
  }
 }
 return pages.length?pages:[['Texte indisponible.']];
}

try{
 const x=JSON.parse(localStorage.getItem(KEY)||'{}');
 if(x&&typeof x==='object'&&!Array.isArray(x)){
  // Une journée ultérieure cochée pendant les essais ne doit pas sauter les précédentes.
  let continuous=true,changed=false;
  for(let day=1;day<=33;day++){
   if(x[day]===true&&continuous)done[day]=true;
   else{if(x[day])changed=true;continuous=false;}
  }
  if(changed)localStorage.setItem(KEY,JSON.stringify(done));
 }
}catch(e){}
function makeDayPages(d,book){
 const read=d.lecture_biblique||{};
 const invocationPages=[
  {label:'Invocation',html:'<h3>Invocation au Saint-Esprit</h3><p>Viens, Esprit Saint, remplis mon cœur de ta lumière et de ton amour.</p><p>Ouvre mon intelligence à la Parole de Dieu, dispose mon cœur à accueillir la vérité et guide-moi dans la lecture et la méditation de ce jour.</p><p>Par l’intercession de la Très Sainte Vierge Marie, apprends-moi à écouter Jésus, à comprendre sa volonté et à la mettre en pratique dans ma vie.</p><p>Esprit de sagesse et de sainteté, conduis-moi chaque jour plus près de Jésus-Christ.</p><p><strong>Amen.</strong></p>'}
 ];
 const passage=bibleDays[String(d.jour)];
 const verses=passage?.versets||[];
 const biblePages=[];
 if(verses.length){
  let group=[],count=0;
  for(const v of verses){
   const line='<p class="tt33-verse"><sup>'+safe(v.numero)+'</sup> '+safe(v.texte)+'</p>';
   if(group.length&&count+v.texte.length>530){biblePages.push({label:'Parole de Dieu',html:group.join('')});group=[];count=0;}
   group.push(line);count+=v.texte.length;
  }
  if(group.length)biblePages.push({label:'Parole de Dieu',html:group.join('')});
 }else{
  biblePages.push({label:'Parole de Dieu',html:'<p>Le texte biblique n’est pas disponible dans cette édition du livre.</p>'});
 }
 const meditation='<h3>Méditation</h3><p>'+safe(d.explication_spirituelle)+'</p><h3>Pour réfléchir</h3><p>'+safe(d.question_meditation)+'</p>';
 const texts=splitPages(book).map((parts,i)=>({label:'Traité · '+(i+1),html:parts.map(t=>'<p>'+safe(t)+'</p>').join('')}));
 return [
  ...invocationPages,
  ...biblePages,
  {label:'Méditation',html:meditation},
  ...texts,
  {label:'Prière du jour',html:'<h3>Prière du jour</h3><p>'+safe(d.priere_du_jour)+'</p><h3>Résolution facultative</h3><p>'+safe(d.resolution_facultative)+'</p>'}
 ];
}
function render(){
 const d=days[index];if(!d)return;
 const pages=makeDayPages(d,bookDays[index]);
 const finished=Object.values(done).filter(Boolean).length;
 const current=Array.from({length:33},(_,i)=>i+1).find(n=>done[n]!==true)||33;
 const groups=[
  {title:'Invocation au Saint-Esprit',label:'Invocation',items:pages.filter(p=>p.label==='Invocation')},
  {title:'Parole de Dieu · '+(d.lecture_biblique?.reference||''),label:'Parole de Dieu',items:pages.filter(p=>p.label==='Parole de Dieu')},
  {title:'Méditation et réflexion',label:'Méditation',items:pages.filter(p=>p.label==='Méditation')},
  {title:'Saint Louis-Marie de Montfort · Traité de la vraie dévotion',label:'Traité',items:pages.filter(p=>p.label.startsWith('Traité'))},
  {title:'Prière et résolution du jour',label:'Prière du jour',items:pages.filter(p=>p.label==='Prière du jour')}
 ];
 const sections=groups.map((g,i)=>'<section class="tt33-day-section" aria-labelledby="tt33-section-'+i+'"><h3 id="tt33-section-'+i+'">'+safe(g.title)+'</h3><div class="tt33-day-text">'+g.items.map(p=>p.html).join('')+'</div></section>').join('');
 root.classList.remove('tt33-natural-prayer');
 root.classList.add('tt33-novena-view');
 root.innerHTML='<div class="tt33-book-toolbar"><label for="tt33-day">Choisir une journée <select id="tt33-day">'+days.map((x,i)=>'<option value="'+i+'" '+(i===index?'selected':'')+'>Jour '+safe(x.jour)+' — '+safe(x.titre)+'</option>').join('')+'</select></label><span class="tt33-meta">'+finished+' / 33</span></div>'+
 '<div class="tt33-guidance">Journée à accomplir : '+current+' · Les autres journées peuvent être consultées sans être validées.</div>'+
 '<div id="tt33-book-notice" role="status" aria-live="polite" class="tt33-book-notice"></div>'+
 '<div class="tt33-day-heading"><span>JOUR '+safe(d.jour)+' SUR 33</span><h2>'+safe(d.titre)+'</h2></div>'+
 '<div class="tt33-day-scroll" id="tt33-day-scroll" tabindex="0" aria-label="Lecture complète du jour '+d.jour+'">'+sections+'</div>'+
 '<div class="tt33-day-actions"><div class="tt33-page-nav"><button id="tt33-back" type="button" '+(index===0?'disabled':'')+'>‹ Jour précédent</button><span class="tt33-font-tools"><button id="tt33-smaller" type="button" aria-label="Réduire les caractères">A−</button><button id="tt33-larger" type="button" aria-label="Agrandir les caractères">A+</button></span><button id="tt33-forward" type="button" '+(index===32?'disabled':'')+'>Jour suivant ›</button></div>'+
 '<label class="tt33-check"><input type="checkbox" id="tt33-done" '+(done[d.jour]?'checked':'')+'> Journée accomplie</label>'+
 '<details class="tt33-reset-options"><summary>Options du parcours</summary><button id="tt33-reset" type="button" class="tt33-reset">Recommencer le parcours à 0/33</button></details></div>';
 root.querySelector('#tt33-day').onchange=e=>{index=Number(e.target.value);render();};
 root.querySelector('#tt33-done').onchange=e=>{
  const checked=e.target.checked;
  const next=Array.from({length:33},(_,i)=>i+1).find(n=>done[n]!==true);
  if(checked&&next!==undefined&&d.jour!==next){
   index=next-1;render();
   root.querySelector('#tt33-book-notice').textContent='Commencez par le jour '+next+'. Cette journée n’a pas été validée.';
   return;
  }
  if(checked){
   done[d.jour]=true;
   try{localStorage.setItem(KEY,JSON.stringify(done));}catch(err){}
   openAtCurrentDay();render();
   root.querySelector('#tt33-book-notice').textContent=d.jour===33?'Parcours de 33 jours accompli.':'Jour '+d.jour+' accompli. Voici le jour '+(d.jour+1)+'.';
  }else{
   delete done[d.jour];
   for(let n=d.jour+1;n<=33;n++)delete done[n];
   try{localStorage.setItem(KEY,JSON.stringify(done));}catch(err){}
   openAtCurrentDay();render();
  }
 };
 root.querySelector('#tt33-reset').onclick=()=>{
  if(!confirm('Recommencer tout le parcours à 0/33 ? Cette action effacera les journées accomplies. Les textes et prières seront conservés.'))return;
  done={};index=0;pageIndex=0;chapter='book';
  try{localStorage.setItem(KEY,'{}');localStorage.removeItem(PLACE);}catch(e){}
  openAtCurrentDay();render();
 };
 root.querySelector('#tt33-back').onclick=()=>turn(-1);
 root.querySelector('#tt33-forward').onclick=()=>turn(1);
 root.querySelector('#tt33-smaller').onclick=()=>resize(-1);
 root.querySelector('#tt33-larger').onclick=()=>resize(1);
}
function turn(dir){
 const next=index+dir;
 if(next<0||next>=days.length)return;
 index=next;render();
}
const FONT_KEY=KEY+'-font-size-v2';
let fontSize=Number(localStorage.getItem(FONT_KEY))||15;
function resize(delta){fontSize=Math.max(13,Math.min(21,fontSize+delta));dlg.style.setProperty('--tt33-font-size',fontSize+'px');try{localStorage.setItem(FONT_KEY,String(fontSize));}catch(e){}}
dlg.style.setProperty('--tt33-font-size',fontSize+'px');

let promise;
btn.addEventListener('click',async()=>{if(days.length){openAtCurrentDay();render();if(!dlg.open)dlg.showModal();return;}if(!dlg.open)dlg.showModal();root.textContent='Chargement du parcours…';try{promise ||= Promise.all([fetch(DATA).then(r=>{if(!r.ok)throw Error('HTTP '+r.status);return r.json();}),fetch('./modules/parcours-marial/traite_33_lectures.json').then(r=>{if(!r.ok)throw Error('Livre HTTP '+r.status);return r.json();}),fetch('./modules/parcours-marial/bible_crampon_33_lectures.json').then(r=>{if(!r.ok)throw Error('Bible HTTP '+r.status);return r.json();})]);const [j,b,scripture]=await promise;if(!Array.isArray(j.jours)||j.jours.length!==33||!Array.isArray(b.jours)||b.jours.length!==33||b.jours.some(x=>!x.paragraphes?.length))throw Error('Données incomplètes');if(Object.keys(scripture.jours||{}).length!==33)throw Error('Passages bibliques incomplets');days=j.jours;bookDays=b.jours;bibleDays=scripture.jours;openAtCurrentDay();render();}catch(e){promise=null;root.textContent='Impossible de charger le livre, les passages bibliques et les 33 journées. Réessayez lorsque la connexion est disponible.';}});
})();
